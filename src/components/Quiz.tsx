"use client";

import { useRef, useState } from "react";
import { PillLink } from "@/components/Button";
import { OfferTermsText } from "@/components/OfferTermsText";
import { BOOKING_URL, keyMessage } from "@/lib/site";

type Question = { id: string; label: string; options: string[]; multiple?: boolean };

const questions: Question[] = [
  {
    id: "severity",
    label: "How would you describe your acne?",
    options: ["Mild", "Moderate", "Severe", "Not sure"],
  },
  {
    id: "duration",
    label: "How long have you had it?",
    options: ["Less than 6 months", "6–12 months", "1+ years"],
  },
  { id: "location", label: "Where is it?", options: ["Face", "Back", "Chest"], multiple: true },
  {
    id: "tried",
    label: "What have you tried?",
    options: [
      "Nothing",
      "Skincare",
      "Prescription creams",
      "Prescription tablets",
      "Treatment from my GP",
    ],
    multiple: true,
  },
  { id: "scarring", label: "Do you have scarring or dark marks?", options: ["Yes", "No", "Not sure"] },
  {
    id: "goal",
    label: "What's your main goal?",
    options: [
      "Clear skin",
      "Prevent scarring",
      "Treat severe or persistent acne",
      "Ongoing management",
    ],
  },
  {
    id: "preference",
    label: "Who would you prefer to see?",
    options: ["Our GP trained in acne - lower cost", "Dermatologist", "No preference"],
  },
];

type Answers = Record<string, string[]>;

/** Result logic from the build guide. Anything pointing to a dermatologist wins. */
function recommend(a: Answers): "gp" | "dermatologist" {
  const has = (id: string, value: string) => a[id]?.includes(value) ?? false;
  const dermatologist =
    has("severity", "Moderate") ||
    has("severity", "Severe") ||
    has("scarring", "Yes") ||
    has("tried", "Prescription tablets") ||
    has("tried", "Treatment from my GP") ||
    has("goal", "Treat severe or persistent acne") ||
    has("preference", "Dermatologist");
  return dermatologist ? "dermatologist" : "gp";
}

export function Quiz() {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<"gp" | "dermatologist" | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const toggle = (q: Question, option: string) => {
    setResult(null);
    setAnswers((prev) => {
      const current = prev[q.id] ?? [];
      if (!q.multiple) return { ...prev, [q.id]: [option] };
      return {
        ...prev,
        [q.id]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setResult(recommend(answers));
        requestAnimationFrame(() => {
          resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
          resultRef.current?.focus();
        });
      }}
    >
      {questions.map((q, i) => (
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
        {result && (
          <div className="mt-[30px] rounded-2xl bg-brand p-6 text-white lg:p-[33px]">
            <h2 className="text-h2 lg:text-h2-lg">
              {result === "gp"
                ? "Start with our acne nurse and our GP trained in acne ($99)."
                : "Start with our acne nurse and a dermatologist."}
            </h2>
            <p className="mt-6 text-body lg:text-big">{keyMessage}</p>
            <p className="mt-3 text-note text-white/85">
              <OfferTermsText />
            </p>
            <PillLink href={BOOKING_URL} tone="light" className="mt-8 w-full sm:w-auto">
              Book your free nurse consultation →
            </PillLink>
          </div>
        )}
        <p className="mt-6 text-small text-black italic">
          This quiz is a guide only and does not diagnose or prescribe.
        </p>
      </div>
    </form>
  );
}
