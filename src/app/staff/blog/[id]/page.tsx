import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/staff";
import type { BlogPost } from "@/lib/blog";
import { StaffNav } from "../../StaffNav";
import { PostEditor } from "../PostEditor";
import { deletePost } from "../actions";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { supabase, name, role } = await requireAdmin();
  if (!z.uuid().safeParse(id).success) notFound();
  const { data } = await supabase.from("blog_posts").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const post = data as BlogPost;
  return (
    <>
      <StaffNav name={name} role={role} />
      <Link href="/staff/blog" className="text-small text-brand underline underline-offset-2">← All posts</Link>
      <h1 className="mt-4 mb-6 text-h2">Edit post</h1>
      <PostEditor post={post} />
      <details className="mt-10 rounded-2xl bg-white p-5 text-small">
        <summary className="cursor-pointer text-black/70">Delete this post</summary>
        <form action={deletePost} className="mt-3 flex flex-wrap items-center gap-4">
          <input type="hidden" name="id" value={post.id} />
          <p>This can&apos;t be undone.</p>
          <button type="submit" className="rounded-full bg-red-700 px-5 py-2 text-white hover:bg-red-800">Delete post</button>
        </form>
      </details>
    </>
  );
}
