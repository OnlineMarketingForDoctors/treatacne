import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { PostCard } from "@/components/blog/PostCard";
import { listPublishedPosts } from "@/lib/blog";
import { PillLink } from "@/components/Button";
import { revealDelay } from "@/lib/reveal";
import { COURSE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mastering Acne online course",
  description:
    "Mastering Acne, an online course by dermatologist Dr Niyati Sharma: 11 self-paced modules on how acne works, building a routine that suits your skin, and getting the most from treatment. $49.",
  alternates: { canonical: "/learn" },
};

// Module titles from the Mastering Acne course outline (check they match Kajabi exactly).
// "Patient success stories" is left off the website: it would count as testimonials (AHPRA).
const modules = [
  { title: "Introduction to acne", body: "What acne is, the different types, and what causes and triggers it." },
  { title: "Understanding your skin", body: "How your skin works, and the role of genes and hormones." },
  { title: "Acne myths vs facts", body: "Common misconceptions, and what the evidence really says." },
  { title: "A personalised skincare routine", body: "Choosing products, cleansing and moisturising, and exfoliating safely." },
  { title: "Lifestyle and diet", body: "Nutrition, stress and sleep, and how they affect your skin." },
  { title: "Acne and mental health", body: "The emotional impact of acne, building confidence, and getting support." },
  { title: "When to seek professional help", body: "Signs your acne needs medical care, and how treatment works." },
  { title: "Skincare tips for acne-prone skin", body: "Makeup, sun protection, and managing marks and scarring." },
  { title: "Acne through life stages", body: "Teenage acne, adult acne and hormonal acne." },
  { title: "Tracking progress and setting goals", body: "Monitoring your skin and creating your own acne action plan." },
  { title: "Review and next steps", body: "A recap, ongoing support and resources." },
];

// Re-checked every 10 minutes for newly published articles
export const revalidate = 600;

export default async function LearnPage() {
  const posts = await listPublishedPosts(3);
  return (
    <>
      <section className="grid grid-cols-1 items-center gap-8 px-5 pt-10 pb-12 lg:grid-cols-2 lg:gap-[40px] lg:px-[30px] lg:pt-[60px] lg:pb-[60px]">
        <div>
          <p data-reveal="up" className="text-small tracking-[0.12em] uppercase">
            Online course
          </p>
          <h1 data-reveal="up" className="mt-4 text-h1 lg:text-h1-lg">
            Mastering Acne
          </h1>
          <p data-reveal="up" style={revealDelay(100)} className="mt-6 max-w-[560px] text-body text-black lg:text-big">
            Created by dermatologist Dr Niyati Sharma. Learn how acne works, how to build a routine
            that suits your skin, and how to get the most from treatment, at your own pace.
          </p>
          <div data-reveal="up" style={revealDelay(200)}>
            {/* Public price only: patient pricing lives in Kajabi as single-use codes (AHPRA) */}
            <p className="mt-8 text-[44px] leading-none lg:text-[56px]">$49</p>
            <p className="mt-5 max-w-[520px] text-small text-black/80">
              Already a Treat:Acne patient? Patient pricing is available after a completed
              consultation. Codes are single-use and not redeemable for cash.
            </p>
            <p className="mt-2 max-w-[520px] text-small text-black/80">
              The course is non-refundable once purchased, except where required by the Australian
              Consumer Law.
            </p>
            {/* TODO: Kajabi checkout link (due from Niyati) */}
            <PillLink href={COURSE_URL} className="mt-7 w-full bg-brand !text-white hover:!bg-brand-soft sm:w-auto">
              Enrol now →
            </PillLink>
          </div>
        </div>
        <div className="relative aspect-[1410/1210] overflow-hidden rounded-2xl">
          <Image
            src="/images/phone.jpg"
            alt="Person holding a phone showing the Treat:Acne app"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            data-reveal="zoom"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-t border-brand px-5 py-12 lg:px-[30px] lg:py-[60px]">
        <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
          What&apos;s in the course
        </h2>
        <ol className="mt-8 grid gap-x-[40px] md:grid-cols-2">
          {modules.map((m, i) => (
            <li
              key={m.title}
              data-reveal="up"
              style={revealDelay((i % 2) * 80)}
              className="grid grid-cols-[40px_1fr] gap-x-3 border-b border-brand/40 py-4"
            >
              <span aria-hidden className="text-big">
                {i + 1}
              </span>
              <div>
                <h3 className="text-body text-black">{m.title}</h3>
                <p className="mt-1 text-small text-black/70">{m.body}</p>
              </div>
            </li>
          ))}
        </ol>
        {/* TODO: add the total course length once known */}
        <p className="mt-6 text-small text-black/80">
          11 modules · Self-paced video and written lessons · By Dr Niyati Sharma, Dermatologist
          (FACD). General education only, not medical advice. If your acne is painful, leaving marks
          or scars, or not improving, we recommend booking a consultation.
        </p>
      </section>

      {/* Latest 3 articles (hidden until the first one is published) */}
      {posts.length > 0 && (
        <section className="bg-cream px-5 py-12 lg:px-[30px] lg:py-[60px]">
          <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
            From the blog
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-[30px]">
            {posts.map((p) => (
              <li key={p.id}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
          <Link href="/blog" className="mt-8 inline-block text-body text-brand underline underline-offset-2">
            See all articles →
          </Link>
        </section>
      )}

      <FinalCta />
    </>
  );
}
