"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { COURSE_PAGE, GET_STARTED_URL } from "@/lib/site";
import { saveQuiz, type QuizAnswers, type QuizResult } from "@/lib/quizStore";
import { GP_OPTION, NOT_READY, quizQuestions, type Question } from "@/lib/quiz";

/**
 * Result rules from Niyati's review, checked in order; the first match wins. Q2, Q3, Q5 and
 * Q6 don't change the result (they go to the nurse with the form).
 */
function recommend(a: QuizAnswers): { result: QuizResult; reason?: string } {
  const has = (id: string, value: string) => a[id]?.includes(value) ?? false;
  if (has("preference", NOT_READY)) return { result: "D" };
  if (has("preference", "Dermatologist"))
    return { result: "B", reason: "You told us you'd prefer a dermatologist." };
  if (has("preference", GP_OPTION)) return { result: "A" };
  if (has("severity", "Severe"))
    return { result: "B", reason: "Severe acne is best managed by a dermatologist." };
  if (["Treatment from my GP", "Prescription creams", "Prescription tablets"].some((o) => has("tried", o)))
    return {
      result: "B",
      reason: "You've already tried treatment, so it's time for a specialist approach.",
    };
  if (has("severity", "Moderate"))
    return { result: "B", reason: "For moderate acne, we recommend our dermatologist." };
  if (has("severity", "Mild")) return { result: "A" };
  return { result: "C" };
}

export function Quiz() {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [outcome, setOutcome] = useState<{ result: QuizResult; reason?: string } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const toggle = (q: Question, option: string) => {
    setOutcome(null);
    setAnswers((prev) => {
      const current = prev[q.id] ?? [];
      if (!q.multiple) return { ...prev, [q.id]: [option] };
      if (current.includes(option)) return { ...prev, [q.id]: current.filter((o) => o !== option) };
      // "Nothing" can't be ticked with anything else
      if (option === "Nothing") return { ...prev, [q.id]: ["Nothing"] };
      return { ...prev, [q.id]: [...current.filter((o) => o !== "Nothing"), option] };
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const next = recommend(answers);
        setOutcome(next);
        saveQuiz(answers, next.result);
        requestAnimationFrame(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          resultRef.current?.focus();
        });
      }}
    >
      {quizQuestions.map((q, i) => (
        <fieldset key={q.id} className="border-t border-brand py-[26px]">
          <legend className="float-left mb-4 w-full text-body text-black">
            <span className="text-brand">{i + 1}.</span> {q.label}
            {q.multiple && <span className="text-black/60"> (select all that apply)</span>}
          </legend>
          <div className="clear-left flex flex-wrap gap-2.5">
            {q.options.map((option) => {
              const checked = answers[q.id]?.includes(option) ?? false;
              return (
                <label
                  key={option}
                  className={`inline-flex min-h-10 cursor-pointer items-center rounded-full border border-brand px-4 py-2 text-small transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand lg:text-body ${
                    checked ? "bg-brand text-white" : "hover:bg-brand/10"
                  }`}
                >
                  <input
                    type={q.multiple ? "checkbox" : "radio"}
                    name={q.id}
                    value={option}
                    checked={checked}
                    onChange={() => toggle(q, option)}
                    className="sr-only"
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="border-t border-brand pt-[30px]">
        <button
          type="submit"
          className="flex h-[42px] w-full items-center justify-center rounded-full bg-brand px-8 text-body text-white transition-colors hover:bg-brand-soft sm:w-auto"
        >
          See my result →
        </button>
      </div>

      <div ref={resultRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {outcome && <Result {...outcome} />}
        {!outcome && (
          <p className="mt-6 text-small text-black italic">
            This quiz is a guide only and does not diagnose or prescribe.
          </p>
        )}
      </div>
    </form>
  );
}

const copy: Record<Exclude<QuizResult, "D">, { heading: string; body: string }> = {
  A: {
    heading: "Start with our acne nurse, then see our GP.",
    body: "Based on your answers, our GP with a special interest in acne is a good place to start. Your first phone consultation with our acne nurse is free. She'll review your history and photos, then book you with our GP.",
  },
  B: {
    heading: "Start with our acne nurse, then see our dermatologist.",
    body: "Based on your answers, our dermatologist is the right place to start. Your first phone consultation with our acne nurse is free. She'll review your history and photos, then book you with our dermatologist by secure video.",
  },
  C: {
    heading: "Start with our acne nurse.",
    body: "Not sure how severe your acne is? That's fine. Your first phone consultation with our acne nurse is free. She'll review your photos and help you choose the right doctor.",
  },
};

const card = "mt-[30px] rounded-2xl border bg-white p-6 lg:p-[33px]";
const box = "mt-5 rounded-xl px-4 py-3 text-body text-black";
const primary = "mt-8 flex h-[48px] w-full items-center justify-center rounded-full bg-brand px-8 text-body text-white transition-colors hover:bg-brand-soft";
const small = "mt-5 text-note text-black/70";

function NotReady() {
  return (
    <p className="mt-3 text-note text-black/70">
      Not ready?{" "}
      <Link href={COURSE_PAGE} className="text-brand underline underline-offset-2">
        See the course →
      </Link>
    </p>
  );
}

function Result({ result, reason }: { result: QuizResult; reason?: string }) {
  if (result === "D") {
    return (
      <div className={`${card} border-brand`}>
        <h2 className="text-[26px] leading-[1.15] lg:text-[32px]">
          Start with our dermatologist&apos;s online course.
        </h2>
        <p className="mt-4 text-body text-black">
          Not ready to see someone yet? That&apos;s okay. Mastering Acne, created by our
          dermatologist Dr Niyati Sharma, explains how acne works, how to build a routine that suits
          your skin, and how to get the most from treatment, at your own pace.
        </p>
        {/* Only the public price here (AHPRA: no patient discounts on the website) */}
        <p className={`${box} bg-[#fcede6]`}>Mastering Acne online course: $49</p>
        <Link href={COURSE_PAGE} className={primary}>
          See the course →
        </Link>
        <Link
          href={GET_STARTED_URL}
          className="mt-3 flex h-[48px] w-full items-center justify-center rounded-full border border-brand px-8 text-body transition-colors hover:bg-brand hover:text-white"
        >
          Or book your free nurse consultation
        </Link>
        <p className={small}>
          If your acne is painful, leaving marks or scars, or not improving, we recommend booking a
          consultation. The course is general education only and is not medical advice.
        </p>
      </div>
    );
  }

  const { heading, body } = copy[result];
  return (
    <div className={`${card} ${result === "B" ? "border-brand" : "border-brand/40"}`}>
      <h2 className="text-[26px] leading-[1.15] lg:text-[32px]">{heading}</h2>
      <p className="mt-4 text-body text-black">{body}</p>
      {/* Only Result A shows a price (the GP fee) */}
      {result === "A" && (
        <>
          <p className={`${box} bg-[#fcede6]`}>GP consultation by video: $99 (no Medicare rebate).</p>
          <p className="mt-4 text-body text-black">If you need a dermatologist later, our GP can refer you.</p>
        </>
      )}
      {result === "B" && (
        <>
          {reason && <p className={`${box} bg-cream`}>{reason}</p>}
          <p className="mt-4 text-body text-black">
            Have a GP referral? Upload it in the form to claim a Medicare rebate.
          </p>
        </>
      )}
      {/* Form first: the answers are attached to the Get Started form, then the patient books */}
      <Link href={GET_STARTED_URL} className={primary}>
        Book your free nurse consultation →
      </Link>
      <p className={small}>
        Nurse consultations don&apos;t include prescribing.{" "}
        {result !== "A" && (
          <>
            {result === "B" ? "Dermatologist" : "Doctor"} fees apply.{" "}
            <Link href="/pricing" className="text-brand underline underline-offset-2">
              See Pricing
            </Link>
            .{" "}
          </>
        )}
        The doctor you see will be confirmed based on your consultation with our acne nurse, who
        may recommend a different pathway. This quiz is a guide only and does not diagnose or
        prescribe.
      </p>
      <NotReady />
    </div>
  );
}
