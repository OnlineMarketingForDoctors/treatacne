import type { Metadata } from "next";
import Link from "next/link";
import { PillLink } from "@/components/Button";
import { CourseLine } from "@/components/CourseLine";
import { Block, PageLayout } from "@/components/PageLayout";
import { BOOKING_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Severe & persistent acne",
  description:
    "Our dermatologist has a particular interest in severe, scarring and persistent acne, and sees patients by secure video wherever they live in Australia.",
  alternates: { canonical: "/severe-persistent-acne" },
};

const includes = [
  {
    title: "Dermatologist-led treatment plan:",
    body: "tailored to your skin, history and what you've already tried.",
  },
  { title: "Regular dermatologist reviews:", body: "to track progress and adjust your plan." },
  {
    title: "Nurse support between visits:",
    body: "text or email us with any concerns, and our nurse will get back to you.",
  },
  {
    title: "Monitoring when needed:",
    body: "blood test forms emailed to you, usable at any pathology centre and bulk-billed.",
  },
  {
    title: "Treatment your way:",
    body: "posted to your home, or collected from your local pharmacy.",
  },
];

export default function SevereAcnePage() {
  return (
    <PageLayout
      title="Severe or persistent acne? You don't have to keep guessing."
      intro={
        <p>
          Some acne needs more than skincare. Our dermatologist has a particular interest in
          severe, scarring and persistent acne, and sees patients wherever they live in Australia.
        </p>
      }
    >
      <Block heading="What your care includes">
        <ul className="space-y-3">
          {includes.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span aria-hidden className="text-brand">
                +
              </span>
              <span>
                <strong className="font-bold">{item.title}</strong> {item.body}
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block heading="Is this right for me?">
        <p>
          It may be if your acne is painful, cystic, scarring, or hasn&apos;t improved with previous
          treatments.
        </p>
        <p className="text-small italic">
          Treatment is only prescribed when clinically appropriate, after a consultation. Some acne
          treatments can only be prescribed by a dermatologist, so if you have moderate to severe
          acne we recommend our dermatologist. Our nurse will guide you.
        </p>
      </Block>

      <Block heading="Fees">
        <p>
          Dermatologist consultations by secure video are $365 for the first consultation and $280
          for reviews, with a Medicare rebate if you have a valid referral. Your first
          consultation with our acne nurse is free.{" "}
          <Link href="/pricing" className="text-brand underline underline-offset-2">
            See Pricing
          </Link>
        </p>
      </Block>

      <div data-reveal="up" className="border-t border-brand pt-[30px]">
        {/* Books the free nurse consultation; the nurse then books the dermatologist */}
        <PillLink href={BOOKING_URL} className="w-full sm:w-auto">
          Book your free nurse consultation →
        </PillLink>
        <CourseLine className="mt-4 text-black/70" />
      </div>
    </PageLayout>
  );
}
