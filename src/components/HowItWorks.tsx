import Image from "next/image";
import Link from "next/link";
import { budgetCallout, steps } from "@/lib/site";
import { NumberedList } from "@/components/NumberedList";

const linkClass = "text-brand underline underline-offset-2";

/** Step links shared by Home and How it works (Home links to its own quiz section) */
export const stepExtras = (quizHref: string): Record<number, React.ReactNode> => ({
  0: (
    <>
      Taking follow-up photos later?{" "}
      <Link href="/photo-guide" className={linkClass}>
        See our photo guide
      </Link>
      .
    </>
  ),
  2: (
    <>
      Not sure which?{" "}
      <Link href={quizHref} className={linkClass}>
        {quizHref.startsWith("#") ? "Take the quiz below ↓" : "Take the quiz →"}
      </Link>
    </>
  ),
});

/** "On a budget?" callout: must stay with the steps (AHPRA) */
export function BudgetCallout({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-2xl bg-cream p-5 lg:p-7 ${className}`}>
      <h3 className="text-body font-bold">{budgetCallout.title}</h3>
      <p className="mt-2 text-body text-black">{budgetCallout.body}</p>
    </div>
  );
}

// Home page version: photo on the left, the 5 steps as a list, the callout underneath.
export function HowItWorks({ className = "" }: { className?: string }) {
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
            Skip the waiting room. Get dermatologist-led care from the comfort of your home.
          </p>
        </div>

        <NumberedList items={steps.map((s, i) => ({ ...s, extra: stepExtras("#quiz")[i] }))} lastGap />
        <div className="rule-t px-5 py-6 lg:rule-l lg:px-[30px] lg:py-8 lg:[--rule-x0:10px] lg:[--rule-y0:10px]">
          <BudgetCallout />
        </div>
      </div>
    </section>
  );
}
