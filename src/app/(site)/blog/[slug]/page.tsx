import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FinalCta } from "@/components/FinalCta";
import { PostView } from "@/components/blog/PostView";
import { coverUrl, getPublishedPost } from "@/lib/blog";

export const revalidate = 600;

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const post = await getPublishedPost((await params).slug);
  if (!post) return {};
  const cover = coverUrl(post.cover_image);
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt, ...(cover ? { images: [cover] } : {}) },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const post = await getPublishedPost((await params).slug);
  if (!post) notFound();
  return (
    <>
      <PostView post={post} />
      <FinalCta />
    </>
  );
}
