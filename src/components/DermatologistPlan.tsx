import Image from "next/image";
import { BoxLink } from "@/components/Button";

// Full-bleed photo section, also used on the product page.
export function DermatologistPlan() {
  return (
    <section className="relative border-y border-brand lg:min-h-[694px]">
      <Image
        src="/images/man.jpg"
        alt="Man applying cleanser to his face"
        fill
        sizes="100vw"
        className="object-cover object-[30%_25%]"
      />
      <div className="relative flex flex-col text-white lg:absolute lg:inset-y-0 lg:right-0 lg:w-[34.8%] lg:border-l lg:border-brand">
        <div className="bg-gradient-to-b from-black/25 to-transparent px-5 pt-8 pb-40 lg:flex-1 lg:border-b lg:border-brand lg:bg-none lg:px-[30px] lg:pt-[30px] lg:pb-8">
          <h2 className="text-h2 lg:text-h2-lg">
            Get a personalised acne treatment plan guided by a dermatologist
          </h2>
        </div>
        <div className="space-y-3 bg-gradient-to-t from-black/35 to-transparent px-5 pt-16 pb-6 text-small lg:bg-black/10 lg:from-transparent lg:px-[30px] lg:py-8 lg:text-body">
          <p>
            No more guesswork, no more wasted products. At TreatAcne, we connect you with qualified
            dermatology professionals who design customised treatment plans based on your skin,
            symptoms, and goals.
          </p>
          <p>
            Whether you&apos;re dealing with hormonal breakouts, persistent blackheads, painful
            cysts, or post-acne marks, our team will build a plan that&apos;s right for you—combining
            prescription treatments, science-backed skincare, and expert support.
          </p>
          <p className="lg:font-bold">
            No subscriptions. No upsells.
            <br />
            Just expert care when you need it.
          </p>
        </div>
        <BoxLink href="/how-it-works" tone="responsive">
          Learn More →
        </BoxLink>
      </div>
    </section>
  );
}
