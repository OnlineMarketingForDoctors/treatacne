import Image from "next/image";
import { BoxLink } from "@/components/Button";

const points = [
  "Online Dermatologist-Led Care from the Start",
  "Personalised, Prescription-Strength Treatments",
  "End-to-End Virtual Care with Real Follow-Up",
  "Science-Backed Cosmeceuticals",
  "No GP referral or clinic visit needed.",
];

export function Hero() {
  return (
    <section className="grid border-b border-brand lg:min-h-[793px] lg:grid-cols-2">
      <div className="relative h-[265px] lg:order-2 lg:h-auto">
        <Image
          src="/images/hero-face.jpg"
          alt="Smiling woman with cleanser on her face"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[50%_20%]"
        />
      </div>

      <div className="grid grid-rows-[auto_auto_auto] bg-brand text-white lg:order-1 lg:grid-cols-[66.3%_1fr] lg:grid-rows-[1fr_203px_86px]">
        <h1 className="px-5 py-10 text-h1 lg:border-r lg:border-white lg:px-[30px] lg:pt-[50px] lg:text-h1-lg">
          Your own personalised acne treatment plan in 24 hours or less.
        </h1>
        <div aria-hidden className="hidden lg:block" />

        <ul className="space-y-[9px] border-t border-white px-5 py-9 text-small lg:col-start-1 lg:space-y-[11px] lg:border-r lg:px-[30px] lg:py-7 lg:text-body">
          {points.map((point) => (
            <li key={point}>+ {point}</li>
          ))}
        </ul>
        <div aria-hidden className="hidden border-t border-white lg:block" />

        <BoxLink href="/get-started" tone="responsive" className="lg:col-start-1 lg:h-full">
          Get Started Today →
        </BoxLink>
      </div>
    </section>
  );
}
