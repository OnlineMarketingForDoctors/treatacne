"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { SUBMISSIONS_BUCKET } from "@/lib/supabase/env";
import { notifyNewSubmission } from "@/lib/notify";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_BYTES,
  allFileSlots,
  fieldIds,
  isUnder18,
  steps,
  validateStep,
  visibleFields,
  type Answers,
} from "@/lib/intake";

const answerValue = z.union([
  z.string().max(2000),
  z.array(z.string().max(300)).max(20),
  z.boolean(),
]);

const startInput = z.object({
  answers: z.record(z.string(), answerValue),
  files: z
    .array(
      z.object({
        slot: z.string(),
        type: z.string(),
        size: z.number().int().positive().max(MAX_FILE_BYTES),
      }),
    )
    .max(allFileSlots.length),
  /** Honeypot: hidden from people, filled in by bots */
  website: z.string().optional(),
});

const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/heic": "heic",
  "image/heif": "heif",
  "application/pdf": "pdf",
};

type StartResult =
  | { ok: true; id: string; uploads: { slot: string; path: string; token: string }[] }
  | { ok: false; error: string };

/** Saves the answers and returns one-time upload links for the photos/referral. */
export async function startSubmission(input: unknown): Promise<StartResult> {
  const parsed = startInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Some answers couldn't be read. Please check the form and try again." };
  const { files, website } = parsed.data;
  if (website) return { ok: false, error: "Something went wrong. Please try again." };

  // Keep only known fields that are currently shown (drops answers hidden by later choices)
  const raw = parsed.data.answers as Answers;
  const shown = new Set(steps.flatMap((s) => visibleFields(s, raw)).map((f) => f.id));
  const answers: Answers = {};
  for (const [key, value] of Object.entries(raw)) {
    if (fieldIds.has(key) && shown.has(key)) answers[key] = value;
  }

  for (let i = 0; i < steps.length; i++) {
    if (Object.keys(validateStep(i, answers)).length > 0) {
      return { ok: false, error: "Please complete the required fields and try again." };
    }
  }

  const slotIds = new Set(allFileSlots.map((s) => s.id));
  const seen = new Set<string>();
  for (const f of files) {
    if (!slotIds.has(f.slot) || seen.has(f.slot) || !ALLOWED_FILE_TYPES.includes(f.type)) {
      return { ok: false, error: "One of your files isn't a supported type. Please use JPG, PNG, HEIC or PDF." };
    }
    seen.add(f.slot);
  }

  const id = crypto.randomUUID();
  const fileRecords = files.map((f) => ({
    slot: f.slot,
    type: f.type,
    size: f.size,
    path: `${id}/${f.slot}.${extensions[f.type]}`,
  }));

  const supabase = createAdminClient();
  const { error } = await supabase.from("submissions").insert({
    id,
    first_name: String(answers.firstName).trim(),
    last_name: String(answers.lastName).trim(),
    date_of_birth: answers.dob,
    mobile: String(answers.mobile).trim(),
    email: typeof answers.email === "string" && answers.email.trim() ? answers.email.trim() : null,
    under_18: isUnder18(answers),
    data: answers,
    files: fileRecords,
  });
  if (error) {
    console.error("Failed to save submission", error);
    return { ok: false, error: "We couldn't save your form. Please try again in a moment." };
  }

  const uploads: { slot: string; path: string; token: string }[] = [];
  for (const f of fileRecords) {
    const { data, error: urlError } = await supabase.storage
      .from(SUBMISSIONS_BUCKET)
      .createSignedUploadUrl(f.path);
    if (urlError || !data) {
      console.error("Failed to create upload URL", urlError);
      return { ok: false, error: "We couldn't prepare your photo upload. Please try again." };
    }
    uploads.push({ slot: f.slot, path: data.path, token: data.token });
  }

  return { ok: true, id, uploads };
}

/** Marks the submission as received once uploads finish, and notifies the team. */
export async function completeSubmission(id: unknown): Promise<{ ok: boolean }> {
  const parsedId = z.uuid().safeParse(id);
  if (!parsedId.success) return { ok: false };

  const supabase = createAdminClient();
  const { data: row } = await supabase
    .from("submissions")
    .select("id, status, files, created_at")
    .eq("id", parsedId.data)
    .single();
  // Only submissions started in the last hour and not yet completed
  if (!row || row.status !== "uploading" || Date.now() - Date.parse(row.created_at) > 60 * 60 * 1000) {
    return { ok: false };
  }

  const { data: stored } = await supabase.storage.from(SUBMISSIONS_BUCKET).list(row.id);
  const present = new Set((stored ?? []).map((o) => `${row.id}/${o.name}`));
  const files = (row.files as { path: string }[]).filter((f) => present.has(f.path));

  const { error } = await supabase
    .from("submissions")
    .update({ status: "new", files })
    .eq("id", row.id)
    .eq("status", "uploading");
  if (error) {
    console.error("Failed to complete submission", error);
    return { ok: false };
  }

  await notifyNewSubmission(row.id);
  return { ok: true };
}
