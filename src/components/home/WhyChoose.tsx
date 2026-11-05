import Image from "next/image";
import { NumberedList } from "@/components/NumberedList";
import { whyChoose } from "@/lib/site";

// Not in the Figma design: built from the "How it works" list component.
export function WhyChoose() {
  return (
    <section className="grid border-t border-brand lg:grid-cols-2">
      <div className="px-5 pt-10 pb-6 lg:px-[30px] lg:pt-[30px] lg:pb-[30px]">
        <div className="lg:sticky lg:top-[92px]">
          <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
            Why choose Treat:Acne
          </h2>
          {/* Generated with Nano Banana Pro from the "How it works" photo (same model) */}
          <div className="mt-8 w-full overflow-hidden rounded-lg lg:mt-10 lg:max-w-[440px]">
            <Image
              data-reveal="zoom"
              src="/images/why-choose-laughing.jpg"
              alt="Laughing woman touching her cheek"
              width={962}
              height={983}
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <NumberedList items={whyChoose} firstDivider={false} />
    </section>
  );
}
