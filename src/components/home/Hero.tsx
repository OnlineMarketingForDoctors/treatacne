import Image from "next/image";
import { OfferTermsText } from "@/components/OfferTermsText";
import { BoxLink } from "@/components/Button";
import { revealDelay } from "@/lib/reveal";
import Link from "next/link";
import { COURSE_PAGE, GET_STARTED_URL, keyMessage, tagline } from "@/lib/site";

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

      <div className="grid grid-rows-[1fr_auto_auto] bg-brand text-white lg:order-1 lg:grid-cols-[66.3%_1fr] lg:grid-rows-[1fr_86px_auto]">
        <div className="px-5 py-10 lg:rule-r lg:[--rule-color:white] lg:[--rule-y1:10px] lg:px-[30px] lg:pt-[50px] lg:pb-10">
          <h1 data-reveal="up" className="text-h1 lg:text-h1-lg">
            {tagline}
          </h1>
          <div data-reveal="up" style={revealDelay(150)}>
            <p className="mt-6 text-big lg:mt-8 lg:text-[32px] lg:leading-[1.15]">{keyMessage}</p>
            <p className="mt-4 text-small text-white/85 lg:text-body">
              <OfferTermsText />
            </p>
          </div>
        </div>
        <div aria-hidden className="hidden lg:block" />

        <BoxLink href={GET_STARTED_URL} tone="responsive" className="lg:col-start-1 lg:h-full">
          Get Started →
        </BoxLink>
        <div aria-hidden className="hidden lg:block" />
        <p className="px-5 py-5 text-small lg:col-start-1 lg:px-[30px] lg:rule-r lg:[--rule-color:white] lg:[--rule-y0:10px]">
          <Link href={COURSE_PAGE} className="underline underline-offset-2 hover:no-underline">
            Learn more about acne →
          </Link>
        </p>
      </div>
    </section>
  );
}
