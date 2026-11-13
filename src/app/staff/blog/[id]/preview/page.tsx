import { notFound } from "next/navigation";
import { z } from "zod";
import { PostView } from "@/components/blog/PostView";
import { requireAdmin } from "@/lib/staff";
import type { BlogPost } from "@/lib/blog";

export const metadata = { title: "Preview", robots: { index: false } };

export default async function PreviewPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  if (!z.uuid().safeParse(id).success) notFound();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const post = data as BlogPost;
  return (
    <>
      <p className="rounded-xl bg-[#fcede6] px-4 py-3 text-small">
        Preview: {post.status === "draft" ? "draft, not visible on the site" : "published"} · this is how the article will look.
      </p>
      <div className="mt-4 rounded-2xl bg-white">
        <PostView post={post} />
      </div>
    </>
  );
}
