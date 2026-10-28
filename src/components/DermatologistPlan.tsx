import { getImageProps } from "next/image";
import { BoxLink } from "@/components/Button";
import { revealDelay } from "@/lib/reveal";

// Photos recreated (text-free) from the Figma exports; mobile uses its own portrait crop.
const photo = { alt: "Man applying cleanser to his face", sizes: "100vw" };
const {
  props: { srcSet: desktopSrcSet },
} = getImageProps({ ...photo, src: "/images/man-desktop.jpg", width: 3000, height: 1388 });
const {
  props: { srcSet: mobileSrcSet, ...mobileProps },
} = getImageProps({ ...photo, src: "/images/man-mobile.jpg", width: 1080, height: 1935 });

// Full-bleed photo section, also used on the product page.
export function DermatologistPlan() {
  return (
    <section className="relative overflow-hidden border-y border-brand lg:min-h-[694px]">
      <picture>
        <source media="(min-width: 1024px)" srcSet={desktopSrcSet} />
        <img
          {...mobileProps}
          srcSet={mobileSrcSet}
          alt={photo.alt}
          data-reveal="zoom"
          className="absolute inset-0 size-full object-cover object-top lg:object-center"
        />
      </picture>
      <div className="relative flex flex-col text-white lg:absolute lg:inset-y-0 lg:right-0 lg:w-[34.8%]">
        <div className="rule-b min-h-[275px] px-5 pt-[45px] pb-8 lg:min-h-0 lg:flex-1 lg:rule-l lg:[--rule-x0:10px] lg:[--rule-y1:10px] lg:px-[30px] lg:pt-[30px] lg:pb-8">
          <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
            Get a personalised acne treatment plan guided
            <br className="hidden lg:inline" /> by a dermatologist
          </h2>
        </div>
        <div className="space-y-3 px-5 pt-[55px] pb-[50px] text-small lg:px-[30px] lg:py-8 lg:text-body lg:rule-l lg:[--rule-y0:10px]">
          <p data-reveal="up">
            No more guesswork, no more wasted products. At TreatAcne, we connect you with qualified
            dermatology professionals who design customised treatment plans based on your skin,
            symptoms, and goals.
          </p>
          <p data-reveal="up" style={revealDelay(100)}>
            Whether you&apos;re dealing with hormonal breakouts, persistent blackheads, painful
            cysts, or post-acne marks, our team will build a plan that&apos;s right for you—combining
            prescription treatments, science-backed skincare, and expert support.
          </p>
          <p data-reveal="up" style={revealDelay(200)} className="lg:font-bold">
            No subscriptions. No upsells.
            <br />
            Just expert care when you need it.
          </p>
        </div>
        <BoxLink
          href="/how-it-works"
          tone="responsive"
          className="max-lg:border-t max-lg:border-white/70 lg:rule-t lg:rule-l"
        >
          Learn More →
        </BoxLink>
      </div>
    </section>
  );
}
