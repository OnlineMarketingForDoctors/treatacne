import type { Metadata } from "next";
import { FinalCta } from "@/components/FinalCta";
import { PostCard } from "@/components/blog/PostCard";
import { listPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles on acne from the Treat:Acne team, reviewed by dermatologist Dr Niyati Sharma: causes, types, life stages, skincare and treatment.",
  alternates: { canonical: "/blog" },
};

// Re-checked every 10 minutes, so scheduled posts appear on their publish date
export const revalidate = 600;

export default async function BlogPage() {
  const posts = await listPublishedPosts();
  return (
    <>
      <section className="px-5 pt-10 pb-12 lg:px-[30px] lg:pt-[60px] lg:pb-[60px]">
        <p className="text-small tracking-[0.12em] uppercase">Learn</p>
        <h1 className="mt-4 text-h2 lg:text-h2-lg">From the blog</h1>
        <p className="mt-5 max-w-[640px] text-body text-black lg:text-big">
          Clear, practical articles on acne, reviewed by our dermatologist Dr Niyati Sharma.
        </p>
        {posts.length ? (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
            {posts.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 rounded-2xl bg-cream p-6 text-body text-black">
            Our first articles are coming soon.
          </p>
        )}
      </section>
      <FinalCta />
    </>
  );
}
