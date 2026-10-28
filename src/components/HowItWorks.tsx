import Image from "next/image";
import { steps } from "@/lib/site";
import { NumberedList } from "@/components/NumberedList";

export function HowItWorks({ className = "", note }: { className?: string; note?: string }) {
  return (
    <section id="how-it-works" className={`grid border-b border-brand lg:grid-cols-2 ${className}`}>
      <div className="flex items-center justify-center px-5 pt-5 pb-5 max-lg:order-2 lg:p-[30px]">
        <div className="w-full overflow-hidden rounded-lg lg:max-w-[503px]">
          <Image
            data-reveal="zoom"
            src="/images/hands.jpg"
            alt="Laughing woman covering her face with her hands"
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
          <h2 className="text-h2 lg:text-h2-lg">How it works in 5 simple steps</h2>
          <p className="mt-6 max-w-[430px] text-body lg:mt-8">
            Skip the waiting room. Get affordable dermatologist-led care from the comfort of your
            home.
          </p>
        </div>

        <NumberedList items={steps} lastGap={Boolean(note)} />
        {note && (
          <p className="rule-t px-5 py-6 text-small italic lg:rule-l lg:px-[30px] lg:py-8 lg:text-body lg:[--rule-x0:10px] lg:[--rule-y0:10px]">
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
