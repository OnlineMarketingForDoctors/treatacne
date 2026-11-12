import { PillLink } from "@/components/Button";
import { COURSE_PAGE } from "@/lib/site";

// "Learn more about acne" course card, shown inside the orange Home FAQ panel.
export function LearnCard() {
  return (
    <div data-reveal="up" className="rounded-2xl bg-white p-5 text-black lg:p-6">
      <h3 className="text-[22px] leading-[1.15] text-brand lg:text-[26px]">Learn more about acne</h3>
      <p className="mt-3 text-small lg:text-body">
        Understand your skin, build a routine that works, and get the most from your treatment.
      </p>
      <PillLink href={COURSE_PAGE} className="mt-5 w-full">
        See the course →
      </PillLink>
    </div>
  );
}
