import Link from "next/link";
import { coverUrl, formatPostDate, type BlogPost } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  const cover = coverUrl(post.cover_image);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-brand/30 bg-white">
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element -- Supabase public image
        <img src={cover} alt={post.cover_alt ?? ""} loading="lazy" className="aspect-[16/9] w-full object-cover" />
      ) : (
        <div aria-hidden className="aspect-[16/9] bg-cream" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-note">{post.category}</p>
        <h3 className="mt-2 text-[20px] leading-[1.2] text-black">
          <Link href={`/blog/${post.slug}`} className="hover:text-brand">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-small text-black/80">{post.excerpt}</p>
        <p className="mt-4 text-note text-black/60">Dr Niyati Sharma · {formatPostDate(post.publish_date)}</p>
        <Link href={`/blog/${post.slug}`} className="mt-3 self-start text-small text-brand underline underline-offset-2">
          Read more →
        </Link>
      </div>
    </article>
  );
}
