import Link from "next/link";
import { ageFrom } from "@/lib/intake";
import { formatDateTime, requireStaff, statusLabels } from "@/lib/staff";
import { StaffNav } from "./StaffNav";

export const metadata = { title: "Submissions" };

const filters = [
  { key: "new", label: "New" },
  { key: "reviewed", label: "Reviewed" },
  { key: "added_to_xestro", label: "Added to Xestro" },
  { key: "uploading", label: "Incomplete" },
  { key: "all", label: "All" },
];

export default async function StaffHome({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { supabase, name } = await requireStaff();
  const { status: requested } = await searchParams;
  const status = filters.some((f) => f.key === requested) ? requested! : "new";

  let query = supabase
    .from("submissions")
    .select("id, created_at, status, first_name, last_name, date_of_birth, mobile, under_18, files")
    .order("created_at", { ascending: false })
    .limit(200);
  if (status !== "all") query = query.eq("status", status);
  const { data: rows, error } = await query;

  return (
    <>
      <StaffNav name={name} />
      <h1 className="text-h2">Get Started submissions</h1>
      <nav aria-label="Filter by status" className="mt-6 flex flex-wrap gap-2.5">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key === "new" ? "/staff" : `/staff?status=${f.key}`}
            aria-current={status === f.key ? "page" : undefined}
            className={`rounded-full border border-brand px-4 py-1.5 text-small ${
              status === f.key ? "bg-brand text-white" : "bg-white text-brand hover:bg-brand/10"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </nav>
      {status === "uploading" && (
        <p className="mt-4 text-small text-black/70">
          Incomplete: the patient started submitting but their photos didn&apos;t finish uploading.
        </p>
      )}

      {error ? (
        <p className="mt-8 text-small text-red-700">Couldn&apos;t load submissions. Please refresh.</p>
      ) : !rows?.length ? (
        <p className="mt-8 text-small">No submissions here.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white">
          <table className="w-full text-left text-small">
            <thead>
              <tr className="border-b border-brand">
                {["Received", "Patient", "Age", "Mobile", "Files", "Status"].map((h) => (
                  <th key={h} scope="col" className="px-4 py-3 font-normal text-brand">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-black/10 last:border-0 hover:bg-cream">
                  <td className="px-4 py-3 whitespace-nowrap">{formatDateTime(r.created_at)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/staff/submissions/${r.id}`} className="text-brand underline underline-offset-2">
                      {r.first_name} {r.last_name}
                    </Link>
                    {r.under_18 && (
                      <span className="ml-2 rounded-full bg-brand px-2 py-0.5 text-note text-white">Under 18</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{ageFrom(r.date_of_birth) ?? "-"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.mobile}</td>
                  <td className="px-4 py-3">{(r.files as unknown[]).length}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{statusLabels[r.status] ?? r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
