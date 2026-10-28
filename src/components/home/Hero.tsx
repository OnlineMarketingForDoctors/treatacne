import Image from "next/image";
import { OfferTermsText } from "@/components/OfferTermsText";
import { BoxLink } from "@/components/Button";
import { revealDelay } from "@/lib/reveal";
import { GET_STARTED_URL, keyMessage } from "@/lib/site";

const points = [
  "Dermatologist-led care from the start",
  "Personalised treatment plans",
  "Our GPs are trained and guided by our dermatologist throughout your consultation process",
  "Real follow-up, with nurse support between appointments",
  "No referral or clinic visit needed",
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

      <div className="grid grid-rows-[auto_auto_auto] bg-brand text-white lg:order-1 lg:grid-cols-[66.3%_1fr] lg:grid-rows-[1fr_auto_86px]">
        <div className="px-5 py-10 lg:rule-r lg:[--rule-color:white] lg:[--rule-y1:10px] lg:px-[30px] lg:pt-[50px] lg:pb-8">
          <h1 data-reveal="up" className="text-h1 lg:text-h1-lg">
            Your personalised acne treatment plan starts here.
          </h1>
          <div data-reveal="up" style={revealDelay(150)}>
            <p className="mt-6 text-body lg:mt-8 lg:text-big">{keyMessage}</p>
            <p className="mt-3 text-note text-white/85">
              <OfferTermsText />
            </p>
          </div>
        </div>
        <div aria-hidden className="hidden lg:block" />

        <ul className="rule-t space-y-[9px] px-5 py-8 text-small [--rule-color:white] lg:col-start-1 lg:space-y-[11px] lg:rule-r lg:[--rule-x1:10px] lg:[--rule-y0:10px] lg:px-[30px] lg:py-7 lg:text-body">
          {points.map((point, i) => (
            <li key={point} data-reveal="left" style={revealDelay(300 + i * 80)}>
              + {point}
            </li>
          ))}
        </ul>
        <div aria-hidden className="hidden lg:block lg:rule-t lg:[--rule-color:white] lg:[--rule-x0:10px]" />

        <BoxLink href={GET_STARTED_URL} tone="responsive" className="lg:col-start-1 lg:h-full">
          Get Started Today →
        </BoxLink>
      </div>
    </section>
  );
}
