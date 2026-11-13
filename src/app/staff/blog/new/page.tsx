import Link from "next/link";
import { requireAdmin } from "@/lib/staff";
import { StaffNav } from "../../StaffNav";
import { PostEditor } from "../PostEditor";

export const metadata = { title: "New post" };

export default async function NewPostPage() {
  const { name, role } = await requireAdmin();
  return (
    <>
      <StaffNav name={name} role={role} />
      <Link href="/staff/blog" className="text-small text-brand underline underline-offset-2">← All posts</Link>
      <h1 className="mt-4 mb-6 text-h2">New post</h1>
      <PostEditor />
    </>
  );
}
