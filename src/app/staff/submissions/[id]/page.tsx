import Link from "next/link";
import { notFound } from "next/navigation";
import { ageFrom, allFileSlots, steps, visibleFields, type Answers } from "@/lib/intake";
import { formatDateTime, requireStaff, statusLabels } from "@/lib/staff";
import { cdlqiBand, cdlqiScore, dlqiBand, dlqiScore } from "@/lib/dlqi";
import { SUBMISSIONS_BUCKET } from "@/lib/supabase/env";
import { updateStatus } from "../../actions";
import { StaffNav } from "../../StaffNav";

export const metadata = { title: "Submission" };

type StoredFile = { slot: string; path: string; type: string; size: number };

function display(value: Answers[string], type?: string) {
  if (type === "date" && typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-");
    return `${d}/${m}/${y}`;
  }
  if (value === true) return "Yes";
  if (value === false || value === undefined || value === "") return "-";
  return Array.isArray(value) ? value.join(", ") || "-" : value;
}

export default async function SubmissionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { supabase, userId, name } = await requireStaff();

  const { data: row } = await supabase.from("submissions").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  // Record that this staff member opened the record
  await supabase.from("submission_access_log").insert({ submission_id: id, user_id: userId, action: "viewed" });

  const files = (row.files as StoredFile[]) ?? [];
  const { data: signed } = files.length
    ? await supabase.storage.from(SUBMISSIONS_BUCKET).createSignedUrls(
        files.map((f) => f.path),
        60 * 10,
      )
    : { data: [] };
  const urls = new Map((signed ?? []).map((s) => [s.path, s.signedUrl]));

  const { data: log } = await supabase
    .from("submission_access_log")
    .select("action, at, user_id")
    .eq("submission_id", id)
    .order("at", { ascending: false })
    .limit(50);
  const { data: staff } = await supabase.from("staff_members").select("user_id, name");
  const staffNames = new Map((staff ?? []).map((s) => [s.user_id, s.name]));

  const answers = row.data as Answers;
  const age = ageFrom(row.date_of_birth);
  const answeredKeys = Object.keys(answers);
  const qol = answeredKeys.some((k) => k.startsWith("dlqi"))
    ? { name: "DLQI", score: dlqiScore(answers), band: dlqiBand }
    : answeredKeys.some((k) => k.startsWith("cdlqi"))
      ? { name: "CDLQI", score: cdlqiScore(answers), band: cdlqiBand }
      : null;

  return (
    <>
      <StaffNav name={name} />
      <Link href="/staff" className="text-small text-brand hover:underline">
        ← All submissions
      </Link>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-h2">
            {row.first_name} {row.last_name}
            {row.under_18 && (
              <span className="ml-3 rounded-full bg-brand px-3 py-1 align-middle text-small text-white">
                Under 18
              </span>
            )}
          </h1>
          <p className="mt-2 text-small text-black/70">
            Age {age ?? "-"} · Mobile {row.mobile} · Received {formatDateTime(row.created_at)}
          </p>
          {qol && (
            <p className="mt-2 text-small">
              {qol.name} score:{" "}
              <strong className="font-bold">
                {qol.score === null
                  ? "not scored (2 or more questions unanswered)"
                  : `${qol.score}/30 - ${qol.band(qol.score)}`}
              </strong>
            </p>
          )}
        </div>
        <form action={updateStatus} className="flex items-center gap-3">
          <input type="hidden" name="id" value={row.id} />
          <label htmlFor="status" className="text-small">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={row.status === "uploading" ? "new" : row.status}
            className="h-10 rounded-[10px] border border-[#c4c4c4] bg-white px-3 text-small"
          >
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="added_to_xestro">Added to Xestro</option>
          </select>
          <button type="submit" className="h-10 rounded-full bg-brand px-5 text-small text-white hover:bg-brand-soft">
            Save
          </button>
        </form>
      </div>
      {row.status === "uploading" && (
        <p className="mt-4 rounded-[10px] bg-white p-3 text-small text-red-700">
          Incomplete: the patient&apos;s upload didn&apos;t finish, so some photos may be missing.
        </p>
      )}

      <section className="mt-8 rounded-2xl bg-white p-6">
        <h2 className="text-big text-brand">Photos and documents</h2>
        {files.length === 0 ? (
          <p className="mt-4 text-small">No files uploaded.</p>
        ) : (
          <ul className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {files.map((f) => {
              const slot = allFileSlots.find((s) => s.id === f.slot);
              const url = urls.get(f.path);
              const previewable = /^image\/(jpeg|png|webp)$/.test(f.type);
              return (
                <li key={f.path} className="text-small">
                  <p className="mb-2">{slot ? `${slot.label}${slot.hint ? ` ${slot.hint}` : ""}` : f.slot}</p>
                  {url && previewable ? (
                    <a href={url} target="_blank" rel="noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element -- short-lived signed URL */}
                      <img src={url} alt={slot?.label ?? f.slot} className="aspect-square w-full rounded-[10px] object-cover" />
                    </a>
                  ) : url ? (
                    <a href={url} target="_blank" rel="noreferrer" className="text-brand underline underline-offset-2">
                      Open {f.type === "application/pdf" ? "PDF" : "file"}
                    </a>
                  ) : (
                    <span className="text-red-700">Unavailable</span>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <p className="mt-4 text-note text-black/60">Links expire after 10 minutes; refresh the page for new ones.</p>
      </section>

      {steps.map((step) => (
        <div key={step.heading}>
          {step.sections
            .filter((section) => visibleFields({ ...step, sections: [section] }, answers).some((f) => f.type !== "note"))
            .map((section) => (
              <section key={section.title} className="mt-6 rounded-2xl bg-white p-6">
                <h2 className="text-big text-brand">{section.title}</h2>
                <dl className="mt-4 grid gap-x-8 gap-y-3 text-small sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                  {visibleFields({ ...step, sections: [section] }, answers)
                    .filter((f) => f.type !== "note")
                    .map((f) => (
                      <div key={f.id} className="contents">
                        <dt className="text-black/60">{"title" in f && f.title ? f.title : f.label}</dt>
                        <dd className="break-words">{display(answers[f.id], f.type)}</dd>
                      </div>
                    ))}
                </dl>
              </section>
            ))}
        </div>
      ))}

      <section className="mt-6 rounded-2xl bg-white p-6">
        <h2 className="text-big text-brand">Access log</h2>
        <ul className="mt-4 space-y-1 text-small">
          {(log ?? []).map((entry, i) => (
            <li key={i}>
              {formatDateTime(entry.at)} - {staffNames.get(entry.user_id) ?? "Staff member"}{" "}
              {entry.action === "viewed" ? "viewed" : "changed the status"}
            </li>
          ))}
        </ul>
      </section>
      {row.reviewed_at && (
        <p className="mt-4 text-note text-black/60">
          Status last changed {formatDateTime(row.reviewed_at)} ({statusLabels[row.status]}).
        </p>
      )}
    </>
  );
}
