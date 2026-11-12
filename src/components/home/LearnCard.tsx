import { PillLink } from "@/components/Button";
import { COURSE_PAGE } from "@/lib/site";

// "Learn more about acne" card under the Home FAQ, pointing to the course.
export function LearnCard() {
  return (
    <section className="p-5 lg:p-[30px]">
      <div
        data-reveal="up"
        className="flex flex-col justify-between gap-8 p-5 lg:flex-row lg:items-end lg:p-[33px]"
      >
        <div className="max-w-[620px]">
          <h2 className="text-h2 lg:text-h2-lg">Learn more about acne</h2>
          <p className="mt-4 text-body text-black lg:text-big">
            Understand your skin, build a routine that works, and get the most from your treatment.
          </p>
        </div>
        <PillLink href={COURSE_PAGE} className="w-full shrink-0 lg:w-[245px]">
          See the course →
        </PillLink>
      </div>
    </section>
  );
}
