import { NumberedList } from "@/components/NumberedList";
import { whyChoose } from "@/lib/site";

// Not in the Figma design: built from the "How it works" list component.
export function WhyChoose() {
  return (
    <section className="grid border-t border-brand lg:grid-cols-2">
      <div className="px-5 pt-10 pb-6 lg:px-[30px] lg:pt-[30px]">
        <h2 data-reveal="up" className="text-h2 lg:sticky lg:top-[92px] lg:text-h2-lg">
          Why choose Treat:Acne
        </h2>
      </div>
      <NumberedList items={whyChoose} firstDivider={false} />
    </section>
  );
}
