import { PillLink } from "@/components/Button";

export function QuizCard() {
  return (
    <section id="quiz" className="scroll-mt-[80px] p-5 lg:p-[30px]">
      <div
        data-reveal="up"
        className="flex min-h-[480px] flex-col justify-between gap-10 rounded-2xl bg-brand p-5 text-white lg:min-h-[318px] lg:flex-row lg:items-end lg:p-[33px]"
      >
        <div className="max-w-[460px] text-h2 lg:text-h2-lg">
          <h2>Find the right care for your skin.</h2>
          <p className="mt-3 text-white/90 lg:mt-2">
            Answer 7 quick questions to see where to start.
          </p>
        </div>
        {/* White button with orange text for contrast (WCAG AA) */}
        <PillLink
          href="/quiz"
          tone="light"
          className="w-full bg-white !text-brand hover:!bg-cream lg:w-[245px]"
        >
          Take The Quiz →
        </PillLink>
      </div>
    </section>
  );
}
