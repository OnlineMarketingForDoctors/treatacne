import Image from "next/image";
import { BoxLink } from "@/components/Button";
import { revealDelay } from "@/lib/reveal";

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
      <div className="relative h-[265px] overflow-hidden lg:order-2 lg:h-auto">
        <Image
          src="/images/hero-face.jpg"
          alt="Smiling woman with cleanser on her face"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          data-reveal="zoom"
          className="object-cover object-[50%_20%]"
        />
      </div>

      <div className="grid grid-rows-[auto_auto_auto] bg-brand text-white lg:order-1 lg:grid-cols-[66.3%_1fr] lg:grid-rows-[1fr_203px_86px]">
        <h1 className="px-5 py-10 text-h1 lg:rule-r lg:[--rule-color:white] lg:[--rule-y1:10px] lg:px-[30px] lg:pt-[50px] lg:text-h1-lg">
          <span data-reveal="up" className="block">
            Your own personalised acne treatment plan in 24 hours or less.
          </span>
        </h1>
        <div aria-hidden className="hidden lg:block" />

        <ul className="rule-t space-y-[9px] px-5 py-9 text-small [--rule-color:white] lg:col-start-1 lg:space-y-[11px] lg:rule-r lg:[--rule-x1:10px] lg:[--rule-y0:10px] lg:px-[30px] lg:py-7 lg:text-body">
          {points.map((point, i) => (
            <li key={point} data-reveal="left" style={revealDelay(300 + i * 80)}>
              + {point}
            </li>
          ))}
        </ul>
        <div aria-hidden className="hidden lg:block lg:rule-t lg:[--rule-color:white] lg:[--rule-x0:10px]" />

        <BoxLink href="/get-started" tone="responsive" className="lg:col-start-1 lg:h-full">
          Get Started Today →
        </BoxLink>
      </div>
    </section>
  );
}
