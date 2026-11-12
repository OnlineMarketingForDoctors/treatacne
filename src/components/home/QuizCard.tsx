import { PillLink } from "@/components/Button";

export function QuizCard() {
  return (
    <section id="quiz" className="scroll-mt-[80px] p-5 lg:p-[30px]">
      <div
        data-reveal="up"
        className="flex min-h-[480px] flex-col justify-between gap-10 rounded-2xl bg-[#fcede6] p-5 text-black lg:min-h-[318px] lg:flex-row lg:items-end lg:p-[33px]"
      >
        <div className="max-w-[460px] text-h2 lg:text-h2-lg">
          <h2>Find the right care for your skin.</h2>
          <p className="mt-3 lg:mt-2">Answer 7 quick questions to see where to start.</p>
        </div>
        {/* Solid orange button on the light background */}
        <PillLink
          href="/quiz"
          className="w-full bg-brand !text-white hover:!bg-brand-soft lg:w-[245px]"
        >
          Take The Quiz →
        </PillLink>
      </div>
    </section>
  );
}
