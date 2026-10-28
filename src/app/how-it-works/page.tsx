import type { Metadata } from "next";
import Image from "next/image";
import { HowItWorks } from "@/components/HowItWorks";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Dermatologist-led acne care in 5 simple steps: submit your details and photos, have a telehealth consultation, and receive a personalised treatment plan delivered to your door.",
};

export default function HowItWorksPage() {
  return (
    <>
      <section className="p-5 lg:p-[30px]">
        <div className="flex min-h-[560px] flex-col items-center overflow-hidden rounded-2xl bg-brand px-5 pt-14 text-center text-white lg:min-h-[717px] lg:pt-[72px]">
          <h1 data-reveal="up" className="text-h1 lg:text-h1-lg">
            Bringing Dermatologist <br className="hidden sm:inline" />
            Care to Every Australian.
          </h1>
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

      <HowItWorks className="border-t" />

      <FinalCta tone="white" />
    </>
  );
}
