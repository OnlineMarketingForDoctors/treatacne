import Link from "next/link";
import { requireAdmin } from "@/lib/staff";
import { formatPostDate, type BlogPost } from "@/lib/blog";
import { StaffNav } from "../StaffNav";

export const metadata = { title: "Blog" };

function statusOf(p: Pick<BlogPost, "status" | "publish_date">) {
  if (p.status === "draft") return { label: "Draft", cls: "bg-white text-black/70" };
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Australia/Melbourne" }).format(new Date());
  return p.publish_date > today
    ? { label: "Scheduled", cls: "bg-[#fcede6] text-brand" }
    : { label: "Live", cls: "bg-brand text-white" };
}

export default async function StaffBlogPage() {
  const { supabase, name, role } = await requireAdmin();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, category, status, publish_date, updated_at")
    .order("publish_date", { ascending: false });

  return (
    <>
      <StaffNav name={name} role={role} />
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-h2">Blog</h1>
        <Link href="/staff/blog/new" className="rounded-full bg-brand px-6 py-2.5 text-small text-white hover:bg-brand-soft">
          New post
        </Link>
      </div>
      <p className="mt-3 max-w-[720px] text-small text-black/70">
        Posts show on the site when they&apos;re set to Published and their publish date has
        arrived. Dr Sharma reviews each article before it goes live.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white">
        <table className="w-full min-w-[640px] text-left text-small">
          <thead>
            <tr className="border-b border-brand/30">
              <th className="px-4 py-3 font-normal">Title</th>
              <th className="px-4 py-3 font-normal">Category</th>
              <th className="px-4 py-3 font-normal">Publish date</th>
              <th className="px-4 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {(posts ?? []).map((p) => {
              const st = statusOf(p);
              return (
                <tr key={p.id} className="border-b border-brand/10 last:border-0">
                  <td className="px-4 py-3">
                    <Link href={`/staff/blog/${p.id}`} className="text-brand hover:underline">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{p.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{formatPostDate(p.publish_date)}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full border border-brand/30 px-3 py-1 text-note ${st.cls}`}>{st.label}</span>
                  </td>
                </tr>
              );
            })}
            {!posts?.length && (
              <tr>
                <td colSpan={4} className="px-4 py-6">
                  No posts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
