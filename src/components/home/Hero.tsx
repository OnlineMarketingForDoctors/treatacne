import Image from "next/image";
import { OfferTermsText } from "@/components/OfferTermsText";
import { BoxLink } from "@/components/Button";
import { revealDelay } from "@/lib/reveal";
import Link from "next/link";
import { COURSE_PAGE, GET_STARTED_URL, keyMessage } from "@/lib/site";

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

      {/* Orange area as in the Figma hero: a 2-column grid of panels split by white rules.
          Left: headline / offer + terms / Get Started (white). Right: two empty panels, then
          the "Learn more about acne" panel beside the button. */}
      <div className="grid grid-rows-[auto_auto_auto_auto] bg-brand text-white lg:order-1 lg:grid-cols-[66.3%_1fr] lg:grid-rows-[1fr_auto_86px]">
        <div className="px-5 py-10 lg:rule-r lg:[--rule-color:white] lg:[--rule-y1:10px] lg:px-[30px] lg:pt-[50px] lg:pb-8">
          <h1 data-reveal="up" className="text-h1 lg:text-h1-lg">
            Treat:Acne – dermatologist-led care
          </h1>
        </div>
        <div aria-hidden className="hidden lg:block" />

        <div
          data-reveal="up"
          style={revealDelay(150)}
          className="rule-t px-5 py-8 [--rule-color:white] lg:col-start-1 lg:rule-r lg:[--rule-x1:10px] lg:[--rule-y0:10px] lg:px-[30px] lg:py-7"
        >
          <p className="text-big lg:text-[26px] lg:leading-[1.2]">{keyMessage}</p>
          <p className="mt-3 text-small text-white/85 lg:text-body">
            <OfferTermsText />
          </p>
        </div>
        <div aria-hidden className="hidden lg:block lg:rule-t lg:[--rule-color:white] lg:[--rule-x0:10px]" />

        <BoxLink href={GET_STARTED_URL} tone="responsive" className="lg:col-start-1 lg:h-full">
          Get Started →
        </BoxLink>
        <Link
          href={COURSE_PAGE}
          className="flex h-[64px] items-center px-5 text-body whitespace-nowrap text-white underline-offset-2 transition-colors hover:bg-brand-soft hover:underline lg:h-full lg:px-4 lg:text-small xl:px-[30px] xl:text-body"
        >
          Learn more about acne →
        </Link>
      </div>
    </section>
  );
}
