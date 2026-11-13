import Link from "next/link";
import { BlogBody } from "@/components/blog/BlogBody";
import { coverUrl, DEFAULT_NURSE_CTA, formatPostDate, REVIEWER, type BlogPost } from "@/lib/blog";
import { COURSE_URL, GET_STARTED_URL } from "@/lib/site";

/** One article, shared by the public page and the staff preview. */
export function PostView({ post }: { post: BlogPost }) {
  const cover = coverUrl(post.cover_image);
  return (
    <article className="mx-auto max-w-[760px] px-5 pt-10 pb-16 lg:pt-[60px] lg:pb-[90px]">
      <Link href="/blog" className="text-small text-brand underline underline-offset-2">
        ← All articles
      </Link>
      <p className="mt-8 text-small tracking-[0.12em] uppercase">{post.category}</p>
      <h1 className="mt-3 text-h2 lg:text-h2-lg">{post.title}</h1>
      <p className="mt-5 text-small text-black/70">
        Reviewed by {REVIEWER} · {formatPostDate(post.publish_date)}
        {post.last_reviewed && <> · Last reviewed {formatPostDate(post.last_reviewed)}</>}
      </p>
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element -- Supabase public image
        <img src={cover} alt={post.cover_alt ?? ""} className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />
      )}
      <div className="mt-8">
        <BlogBody markdown={post.body} />
      </div>

      <div className="mt-12 rounded-2xl bg-cream p-6 lg:p-8">
        <p className="text-big">Want to go deeper?</p>
        {post.nurse_cta && <p className="mt-2 text-body text-black">{post.nurse_cta}</p>}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {/* TODO: COURSE_URL is the Kajabi checkout link (due from Niyati) */}
          <Link
            href={COURSE_URL}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full py-2.5 text-center sm:whitespace-nowrap bg-brand px-7 text-body text-white transition-colors hover:bg-brand-soft"
          >
            Continue in our Mastering Acne course →
          </Link>
          {/* Form first, then book (the Get Started form leads to the booking) */}
          <Link
            href={GET_STARTED_URL}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full py-2.5 text-center sm:whitespace-nowrap border border-brand px-7 text-body transition-colors hover:bg-brand hover:text-white"
          >
            {DEFAULT_NURSE_CTA} →
          </Link>
        </div>
      </div>

      <p className="mt-8 text-small text-black/70">
        This article is general information, not medical advice. If acne is affecting how you feel,
        talk to someone: Lifeline{" "}
        <a href="tel:131114" className="underline underline-offset-2">
          13 11 14
        </a>{" "}
        or Kids Helpline{" "}
        <a href="tel:1800551800" className="underline underline-offset-2">
          1800 55 1800
        </a>{" "}
        (24/7). In an emergency, call{" "}
        <a href="tel:000" className="underline underline-offset-2">
          000
        </a>
        .
      </p>
    </article>
  );
}
