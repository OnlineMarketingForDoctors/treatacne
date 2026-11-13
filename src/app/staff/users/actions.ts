"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/staff";
import { createAdminClient } from "@/lib/supabase/admin";

export type UserResult = { ok: true; message: string; password?: string } | { ok: false; error: string };

const roleSchema = z.enum(["admin", "nurse"]);

/** Readable temporary password, shown once to the admin who creates the account. */
const tempPassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = randomBytes(16);
  return Array.from(bytes, (b) => chars[b % chars.length]).join("").replace(/(.{4})(?!$)/g, "$1-");
};

async function adminCount() {
  const { count } = await createAdminClient()
    .from("staff_members")
    .select("user_id", { count: "exact", head: true })
    .eq("role", "admin");
  return count ?? 0;
}

export async function addUser(_: UserResult | null, formData: FormData): Promise<UserResult> {
  await requireAdmin();
  const parsed = z
    .object({
      name: z.string().trim().min(1, "Add a name.").max(100),
      email: z.email("Enter a valid email address.").trim().toLowerCase(),
      role: roleSchema,
    })
    .safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const { name, email, role } = parsed.data;
  const admin = createAdminClient();
  const password = tempPassword();
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error || !data.user) {
    const exists = /already|registered|exists/i.test(error?.message ?? "");
    return { ok: false, error: exists ? "There's already an account with that email." : "The account couldn't be created." };
  }
  const { error: memberErr } = await admin.from("staff_members").insert({ user_id: data.user.id, name, role });
  if (memberErr) {
    await admin.auth.admin.deleteUser(data.user.id);
    console.error("Failed to add staff member", memberErr);
    return { ok: false, error: "The account couldn't be created." };
  }
  revalidatePath("/staff/users");
  return { ok: true, message: `${name} has been added as ${role === "admin" ? "an Admin" : "a Nurse"}.`, password };
}

export async function changeRole(formData: FormData) {
  const { userId } = await requireAdmin();
  const id = z.uuid().safeParse(formData.get("userId"));
  const role = roleSchema.safeParse(formData.get("role"));
  if (!id.success || !role.success || id.data === userId) return;
  const admin = createAdminClient();
  if (role.data === "nurse") {
    const { data: current } = await admin.from("staff_members").select("role").eq("user_id", id.data).maybeSingle();
    if (current?.role === "admin" && (await adminCount()) <= 1) return;
  }
  await admin.from("staff_members").update({ role: role.data }).eq("user_id", id.data);
  revalidatePath("/staff/users");
}

export async function removeUser(formData: FormData) {
  const { userId } = await requireAdmin();
  const id = z.uuid().safeParse(formData.get("userId"));
  if (!id.success || id.data === userId) return;
  const admin = createAdminClient();
  const { data: current } = await admin.from("staff_members").select("role").eq("user_id", id.data).maybeSingle();
  if (!current) return;
  if (current.role === "admin" && (await adminCount()) <= 1) return;
  await admin.from("staff_members").delete().eq("user_id", id.data);
  // Remove the login too; if other records still point at the account, block it instead
  const { error } = await admin.auth.admin.deleteUser(id.data);
  if (error) await admin.auth.admin.updateUserById(id.data, { ban_duration: "876000h" });
  revalidatePath("/staff/users");
}
