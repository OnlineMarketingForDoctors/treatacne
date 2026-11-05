import Image from "next/image";
import { NumberedList } from "@/components/NumberedList";
import { whyChoose } from "@/lib/site";

// Same layout as the Home "How it works" section: photo on the left, heading and list on the right.
export function WhyChoose() {
  return (
    <section className="grid border-t border-brand lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 pt-5 pb-5 max-lg:order-2 lg:p-[30px]">
        <div className="w-full overflow-hidden rounded-lg lg:max-w-[503px]">
          {/* Generated with Nano Banana Pro from the "How it works" photo (same model) */}
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

      <div>
        <div
          data-reveal="up"
          className="px-5 pt-10 pb-6 lg:px-[30px] lg:pt-[30px] lg:pb-10 lg:rule-l lg:[--rule-y1:10px]"
        >
          <h2 className="text-h2 lg:text-h2-lg">Why choose Treat:Acne</h2>
        </div>

        <NumberedList items={whyChoose} />
      </div>
    </section>
  );
}
