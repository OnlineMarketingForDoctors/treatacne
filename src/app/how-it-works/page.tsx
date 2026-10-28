import type { Metadata } from "next";
import { OfferTermsText } from "@/components/OfferTermsText";
import Image from "next/image";
import { HowItWorks } from "@/components/HowItWorks";
import { FinalCta } from "@/components/FinalCta";
import { keyMessage } from "@/lib/site";

const stepsNote =
  "Your acne nurse will call you by phone. GP and dermatologist consultations are by secure video: we'll send you a private link when your appointment is booked — just click to join, no app needed. Prefer to see a dermatologist? Just tell our nurse and they'll book you in. Some acne treatments can only be prescribed by a dermatologist, so if you have moderate to severe acne you'll need to see our dermatologist. Our nurse will guide you.";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Dermatologist-led acne care in 5 simple steps: a free acne nurse consultation by phone, then a video consultation with our GP trained in acne or a dermatologist.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="p-5 lg:p-[30px]">
        <div className="flex min-h-[560px] flex-col items-center overflow-hidden rounded-2xl bg-brand px-5 pt-14 text-center text-white lg:min-h-[717px] lg:pt-[72px]">
          <h1 data-reveal="up" className="text-h1 lg:text-h1-lg">
            Bringing dermatologist care <br className="hidden sm:inline" />
            to every Australian.
          </h1>
          <p data-reveal="up" className="mt-6 max-w-[560px] text-body lg:text-big">
            {keyMessage}
          </p>
          <p className="mt-3 max-w-[560px] text-note text-white/85">
            <OfferTermsText />
          </p>
          <div className="mt-auto pt-10">
            {/* The photo's background is the exact brand orange, so it blends into the card */}
            <Image
              data-reveal="up"
              src="/images/hiw-hero.jpg"
              alt="Smiling woman with dabs of cream on her face"
              width={664}
              height={932}
              priority
              sizes="(min-width: 1024px) 332px, 240px"
              className="w-[240px] lg:w-[332px]"
            />
          </div>
        </div>
      </section>

      <HowItWorks className="border-t" note={stepsNote} />

      <FinalCta tone="white" />
    </>
  );
}
