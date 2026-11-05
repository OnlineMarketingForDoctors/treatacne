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
          {/* Generated with Nano Banana Pro */}
          <div className="mt-8 w-full overflow-hidden rounded-lg lg:mt-10 lg:max-w-[503px]">
            <Image
              data-reveal="zoom"
              src="/images/why-choose.jpg"
              alt="Smiling young woman on the sofa at home, on a call on her phone"
              width={1200}
              height={1490}
              sizes="(min-width: 1024px) 34vw, 100vw"
              className="aspect-[4/3] w-full object-cover object-[50%_40%] lg:aspect-[8/7]"
            />
          </div>
        </div>
      </div>
      <NumberedList items={whyChoose} firstDivider={false} />
    </section>
  );
}
