import { PillLink } from "@/components/Button";
import { COURSE_PAGE } from "@/lib/site";

// "Learn more about acne" course card, shown inside the orange Home FAQ panel.
export function LearnCard() {
  return (
    <div
      data-reveal="up"
      className="flex h-full flex-col justify-between gap-6 rounded-2xl bg-white p-5 text-black lg:p-6 min-[1440px]:p-5"
    >
      <div>
        <h3 className="text-[22px] leading-[1.15] text-brand lg:text-[26px] min-[1440px]:text-[24px]">
          Learn more about acne
        </h3>
        <p className="mt-3 text-small lg:text-body min-[1440px]:text-small">
          Understand your skin, build a routine that works, and get the most from your treatment.
        </p>
      </div>
      <PillLink href={COURSE_PAGE} className="w-full px-4 whitespace-nowrap min-[1440px]:text-small">
        See the course →
      </PillLink>
    </div>
  );
}
