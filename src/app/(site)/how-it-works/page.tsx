import type { Metadata } from "next";
import Image from "next/image";
import { BudgetCallout, stepExtras } from "@/components/HowItWorks";
import { CourseLine } from "@/components/CourseLine";
import { FinalCta } from "@/components/FinalCta";
import { OfferTermsText } from "@/components/OfferTermsText";
import { PillLink } from "@/components/Button";
import { QuizCard } from "@/components/home/QuizCard";
import { revealDelay } from "@/lib/reveal";
import { BOOKING_URL, goodToKnow, keyMessage, ongoingCare, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Dermatologist-led acne care from home in 5 steps: a short online form, a free call with our acne nurse, then a video consultation with our dermatologist or GP.",
  alternates: { canonical: "/how-it-works" },
};

const extras = stepExtras("/quiz");

export default function HowItWorksPage() {
  return (
    <>
      <section className="p-5 lg:p-[30px]">
        <div className="flex min-h-[560px] flex-col items-center overflow-hidden rounded-2xl bg-brand px-5 pt-14 text-center text-white lg:min-h-[717px] lg:pt-[72px]">
          <h1 data-reveal="up" className="text-h1 lg:text-h1-lg">
            Dermatologist-led acne care, <br className="hidden sm:inline" />
            from home.
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

      <section className="border-t border-brand px-5 py-12 lg:px-[30px] lg:py-[60px]">
        <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
          How it works in 5 simple steps
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-5">
          {steps.map((step, i) => {
            const highlight = i === 2;
            return (
              <li
                key={step.title}
                data-reveal="up"
                style={revealDelay(i * 90)}
                className={`relative flex flex-col rounded-2xl p-5 lg:p-6 ${
                  highlight ? "bg-brand text-white" : "border border-brand bg-white"
                }`}
              >
                <span aria-hidden className="text-[40px] leading-none font-light">
                  {i + 1}
                </span>
                {highlight && (
                  <Image
                    src="/images/dr-niyati-sharma-avatar.jpg"
                    alt="Dr Niyati Sharma, dermatologist"
                    width={160}
                    height={160}
                    className="absolute top-4 right-4 size-16 rounded-full border-2 border-white object-cover lg:top-5 lg:right-5"
                  />
                )}
                <h3 className="mt-6 text-body font-bold">{step.title}</h3>
                <p className={`mt-3 text-body ${highlight ? "" : "text-black"}`}>{step.body}</p>
                {extras[i] && (
                  <div
                    className={`mt-3 text-body ${highlight ? "" : "text-black [&_a]:text-brand"}`}
                  >
                    {extras[i]}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <BudgetCallout className="mt-6" />

        <dl className="mt-10 grid gap-8 lg:grid-cols-2">
          <div data-reveal="up">
            <dt className="text-[22px] leading-[1.2] lg:text-[26px]">Ongoing care</dt>
            <dd className="mt-3 text-body text-black">{ongoingCare}</dd>
          </div>
          <div data-reveal="up" style={revealDelay(100)}>
            <dt className="text-[22px] leading-[1.2] lg:text-[26px]">Good to know</dt>
            <dd className="mt-3 text-body text-black">{goodToKnow}</dd>
          </div>
        </dl>

        <div data-reveal="up" className="mt-12 text-center">
          <PillLink href={BOOKING_URL} className="w-full sm:w-auto">
            Book your free nurse consultation →
          </PillLink>
          <CourseLine className="mx-auto mt-4 max-w-[560px]" />
        </div>
      </section>

      <QuizCard />

      <FinalCta />
    </>
  );
}
