import { PillLink } from "@/components/Button";

export function QuizCard() {
  return (
    <section className="p-5 lg:p-[30px]">
      <div data-reveal="up" className="flex min-h-[480px] flex-col justify-between gap-10 rounded-2xl bg-brand p-5 text-white lg:min-h-[318px] lg:flex-row lg:items-end lg:p-[33px]">
        <div className="max-w-[420px] text-h2 lg:text-h2-lg">
          <h2>Check How Your Life Style is Affecting Your Acne.</h2>
          <p className="mt-3 text-brand-muted lg:mt-2">
            Did you know changes in your hormones, diet and activity can impact your skin health?
          </p>
        </div>
        <PillLink href="/quiz" tone="light" className="w-full lg:w-[245px]">
          Take The Quiz →
        </PillLink>
      </div>
    </section>
  );
}
