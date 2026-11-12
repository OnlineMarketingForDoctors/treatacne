"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PillLink } from "@/components/Button";
import { FormField, inputClass } from "@/components/form/FormField";
import { PhotoSlot } from "@/components/form/PhotoSlot";
import { PhotoTips } from "@/components/PhotoTips";
import { createUploadClient } from "@/lib/supabase/browser";
import { SUBMISSIONS_BUCKET } from "@/lib/supabase/env";
import {
  ALLOWED_FILE_TYPES,
  MAX_BULK_PHOTOS,
  MAX_FILE_BYTES,
  QUESTIONNAIRE_INTRO,
  STEP,
  isUnder18,
  photoGroups,
  questionnaireFor,
  steps,
  validateStep,
  visibleFields,
  type Answers,
} from "@/lib/intake";
import { BOOKING_URL } from "@/lib/site";
import { TEST_PREFILL, testAnswers } from "@/lib/testPrefill";
import { clearDraft, loadDraft, saveDraft } from "@/lib/formDraft";
import { clearQuiz, loadQuiz, type SavedQuiz } from "@/lib/quizStore";
import { completeSubmission, startSubmission } from "./actions";

const typeFromName: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  heic: "image/heic",
  heif: "image/heif",
  pdf: "application/pdf",
};

/** Some browsers leave HEIC types blank, so fall back to the file extension */
function fileType(file: File) {
  return file.type || typeFromName[file.name.split(".").pop()?.toLowerCase() ?? ""] || "";
}

/** Quiz answers that map onto form questions (step 2 stays editable) */
function answersFromQuiz(quiz: SavedQuiz): Answers {
  const a = quiz.answers;
  const out: Answers = {};
  const pref = a.preference?.[0];
  if (pref === "Dermatologist" || pref === "No preference") out.practitionerPreference = pref;
  else if (pref?.startsWith("Our GP")) out.practitionerPreference = "Our GP with a special interest in acne";
  const duration = a.duration?.[0];
  if (duration === "Less than 6 months" || duration === "6–12 months") out.acneDuration = duration;
  const body = (a.location ?? []).filter((l) => l === "Chest" || l === "Back");
  if (body.length) out.acneLocations = body;
  return out;
}

type Status =
  | { kind: "editing" }
  | { kind: "submitting"; message: string }
  | { kind: "error"; message: string }
  | { kind: "done"; firstName: string; photos: boolean };

export function GetStartedForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const emptyAnswers = (): Answers => ({});
  const [answers, setAnswers] = useState<Answers>(() => (TEST_PREFILL ? testAnswers() : emptyAnswers()));
  const [files, setFiles] = useState<Record<string, File | undefined>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "editing" });
  const [quiz, setQuiz] = useState<SavedQuiz | null>(null);
  const [restored, setRestored] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const dirty = useRef(false);

  // After the first render (browser only): test photos, or the saved draft, or quiz answers.
  // Browser storage can't be read during server rendering, so this restores after hydration.
  useEffect(() => {
    const savedQuiz = loadQuiz();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off restore after hydration
    setQuiz(savedQuiz);
    if (!TEST_PREFILL) {
      const draft = loadDraft();
      if (draft) {
        setAnswers({ ...emptyAnswers(), ...draft.answers });
        setStepIndex(Math.min(draft.stepIndex, steps.length - 1));
      } else if (savedQuiz) {
        setAnswers((prev) => ({ ...prev, ...answersFromQuiz(savedQuiz) }));
      }
    }
    setRestored(true);
  }, []);

  // Save progress in this browser as they go (not in test mode)
  useEffect(() => {
    if (restored && !TEST_PREFILL && dirty.current && status.kind !== "done") saveDraft(answers, stepIndex);
  }, [answers, stepIndex, restored, status.kind]);

  const clearAll = () => {
    clearDraft();
    dirty.current = false;
    setAnswers(emptyAnswers());
    setFiles({});
    setErrors({});
    setFileErrors({});
    setStepIndex(0);
  };

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const update = (id: string, value: Answers[string]) => {
    dirty.current = true;
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const checkFile = (file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(fileType(file))) return "Please choose a JPG, PNG, HEIC or PDF file.";
    if (file.size > MAX_FILE_BYTES) return "This file is over 15MB. Please choose a smaller one.";
    return "";
  };

  const setFile = (slot: string, file: File | undefined) => {
    dirty.current = true;
    const problem = file ? checkFile(file) : "";
    setFileErrors((prev) => ({ ...prev, [slot]: problem }));
    setFiles((prev) => ({ ...prev, [slot]: problem ? undefined : file }));
  };

  /** "Upload all photos at once": fills the unlabelled extra-1… slots */
  const addBulk = (list: File[]) => {
    dirty.current = true;
    setFiles((prev) => {
      const next = { ...prev };
      const problems: string[] = [];
      for (const file of list) {
        const problem = checkFile(file);
        if (problem) {
          problems.push(`${file.name}: ${problem}`);
          continue;
        }
        const free = Array.from({ length: MAX_BULK_PHOTOS }, (_, i) => `extra-${i + 1}`).find((k) => !next[k]);
        if (!free) {
          problems.push(`You can add up to ${MAX_BULK_PHOTOS} photos this way.`);
          break;
        }
        next[free] = file;
      }
      setFileErrors((e) => ({ ...e, bulk: problems.join(" ") }));
      return next;
    });
  };

  const scrollToTop = () => top.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goTo = (index: number) => {
    setStepIndex(index);
    requestAnimationFrame(scrollToTop);
  };

  const next = () => {
    const stepErrors = validateStep(stepIndex, answers);
    setErrors(stepErrors);
    const firstError = Object.keys(stepErrors)[0];
    if (firstError) {
      requestAnimationFrame(() => {
        const el = document.getElementById(firstError) ?? document.getElementsByName(firstError)[0];
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.focus({ preventScroll: true });
      });
      return;
    }
    if (isLast) void submit();
    else goTo(stepIndex + 1);
  };

  async function submit() {
    setStatus({ kind: "submitting", message: "Saving your details securely…" });
    const chosen = Object.entries(files).filter((entry): entry is [string, File] => Boolean(entry[1]));
    const hadPhotos = chosen.some(([slot]) => slot !== "referral");
    try {
      const started = await startSubmission({
        answers,
        files: chosen.map(([slot, file]) => ({ slot, type: fileType(file), size: file.size })),
        quiz: quiz ? { answers: quiz.answers, result: quiz.result } : undefined,
        website: honeypot.current?.value,
      });
      if (!started.ok) return setStatus({ kind: "error", message: started.error });

      const uploader = createUploadClient().storage.from(SUBMISSIONS_BUCKET);
      for (const [i, upload] of started.uploads.entries()) {
        const file = files[upload.slot]!;
        setStatus({
          kind: "submitting",
          message: `Uploading ${started.uploads.length > 1 ? `file ${i + 1} of ${started.uploads.length}` : "your file"}…`,
        });
        let { error } = await uploader.uploadToSignedUrl(upload.path, upload.token, file, {
          contentType: fileType(file),
        });
        if (error) {
          // One retry for flaky mobile connections
          ({ error } = await uploader.uploadToSignedUrl(upload.path, upload.token, file, {
            contentType: fileType(file),
          }));
        }
        if (error) {
          return setStatus({
            kind: "error",
            message: "One of your photos didn't upload. Please check your connection and try again.",
          });
        }
      }

      setStatus({ kind: "submitting", message: "Finishing up…" });
      const done = await completeSubmission(started.id);
      if (!done.ok) {
        return setStatus({ kind: "error", message: "We couldn't finish saving your form. Please try again." });
      }
      dirty.current = false;
      clearDraft();
      clearQuiz();
      setStatus({ kind: "done", firstName: String(answers.firstName ?? ""), photos: hadPhotos });
      requestAnimationFrame(scrollToTop);
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please check your connection and try again." });
    }
  }

  if (status.kind === "done") return <ThankYou ref={top} firstName={status.firstName} photos={status.photos} />;

  const submitting = status.kind === "submitting";
  const fields = visibleFields(step, answers);

  return (
    <div ref={top} className="mx-auto max-w-[705px] scroll-mt-[90px] px-5 pt-10 pb-16 lg:pt-[50px] lg:pb-[90px]">
      {TEST_PREFILL && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-dashed border-brand bg-[#fcede6] px-4 py-3 text-small">
          <span>
            <strong className="font-bold">Test mode:</strong> this form is pre-filled with dummy data. Add
            photos yourself if you want to test uploads.
          </span>
          <button type="button" onClick={clearAll} className="text-brand underline underline-offset-2">
            Clear test data
          </button>
        </div>
      )}

      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-h2 lg:text-h2-lg">Get started</h1>
        <span className="shrink-0 text-small text-black/60">About 3 minutes</span>
      </div>

      {/* Progress: one segment per step, with its name */}
      <p className="sr-only" aria-live="polite">
        Step {stepIndex + 1} of {steps.length}: {step.name}
      </p>
      <ol aria-hidden className="mt-5 grid grid-cols-5 gap-1.5">
        {steps.map((st, i) => (
          <li key={st.name}>
            <span className={`block h-[4px] rounded-full ${i <= stepIndex ? "bg-brand" : "bg-brand/20"}`} />
            <span
              className={`mt-1.5 hidden text-note sm:block ${i === stepIndex ? "text-brand" : "text-black/50"}`}
            >
              {i + 1} {st.name}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-note text-black/60">
        Only the <span className="text-brand">*</span> questions are needed. Skip anything you&apos;re
        unsure of: our nurse will go through it with you. Your progress saves automatically.
      </p>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="mt-6 rounded-2xl border border-brand/30 p-5 lg:p-8"
      >
        <h2 className="text-[24px] leading-[1.15] lg:text-[28px]">{step.heading}</h2>
        {step.intro && <p className="mt-3 text-body text-black">{step.intro}</p>}
        {/* Honeypot: hidden from people */}
        <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

        {stepIndex === STEP.photos && (
          <PhotoStep files={files} fileErrors={fileErrors} onFile={setFile} onBulk={addBulk} />
        )}

        {stepIndex === STEP.questionnaire ? (
          <QuestionnaireStep answers={answers} errors={errors} onChange={update} />
        ) : (
          <Sections stepIndex={stepIndex} answers={answers} errors={errors} fields={fields} onChange={update} />
        )}

        {stepIndex === STEP.about && (
          <section className="mt-10 rounded-2xl border border-brand bg-[#fcede6] p-5 lg:p-6">
            <h3 className="text-big">Do you have a GP referral to a dermatologist?</h3>
            <p className="mt-3 text-small text-black">
              A GP referral lets you claim a Medicare rebate on dermatologist consultations. Any GP
              referral to a dermatologist is accepted: it doesn&apos;t need to name a particular
              dermatologist. It&apos;s usually valid for 12 months from your first dermatologist
              consultation. No referral? That&apos;s fine: you can still book.
            </p>
            <ReferralUpload file={files.referral} error={fileErrors.referral} onFile={(f) => setFile("referral", f)} />
          </section>
        )}

        {isLast && isUnder18(answers) && (
          <p className="mt-4 text-small text-black">
            As the patient is under 18, a parent or guardian must sign and state their relationship.
          </p>
        )}

        {isLast && (
          <p className="mt-8 rounded-[10px] bg-cream p-4 text-small text-black">
            <strong className="font-bold">Your data is safe.</strong> Your answers and photos are
            encrypted, stored securely in Australia, and only seen by our clinical team. We never
            send your health information by email.
          </p>
        )}

        <div className="mt-10">
          {status.kind === "error" && (
            <p role="alert" className="mb-5 rounded-[10px] border border-red-700 p-3 text-small text-red-700">
              {status.message}
            </p>
          )}
          {submitting && (
            <p role="status" className="mb-5 text-center text-small">
              {status.message}
            </p>
          )}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <button
              type="button"
              disabled={stepIndex === 0 || submitting}
              onClick={() => goTo(stepIndex - 1)}
              className="h-[42px] w-full max-w-[145px] rounded-full border border-brand text-body transition-colors hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              ← Previous
            </button>
            <span className="text-small">
              {stepIndex + 1}/{steps.length}
            </span>
            <button
              type="submit"
              disabled={submitting}
              className={`ml-auto h-[42px] w-full max-w-[145px] rounded-full border border-brand text-body transition-colors disabled:opacity-60 ${
                isLast ? "bg-brand text-white hover:bg-brand-soft" : "hover:bg-brand hover:text-white"
              }`}
            >
              {isLast ? (submitting ? "Sending…" : "Submit") : "Next →"}
            </button>
          </div>
        </div>

        {!TEST_PREFILL && (
          <p className="mt-8 text-center text-note text-black/60">
            Your answers are saved on this device until you submit (photos aren&apos;t saved).{" "}
            <button type="button" onClick={clearAll} className="underline underline-offset-2 hover:text-brand">
              Clear and start again
            </button>
          </p>
        )}
      </form>
    </div>
  );
}

function Sections({
  stepIndex,
  answers,
  errors,
  fields,
  onChange,
}: {
  stepIndex: number;
  answers: Answers;
  errors: Record<string, string>;
  fields: ReturnType<typeof visibleFields>;
  onChange: (id: string, value: Answers[string]) => void;
}) {
  return (
    <>
      {steps[stepIndex].sections
        .filter((s) => !s.showIf || s.showIf(answers))
        .map((section) => {
          const sectionFields = section.fields.filter((f) => fields.includes(f));
          return (
            <section key={section.title} className="mt-10">
              <h3 className="border-b border-brand/40 pb-2 text-small">{section.title}</h3>
              <div className="mt-5 grid grid-cols-1 gap-x-[30px] gap-y-5 sm:grid-cols-12">
                {sectionFields.map((field) => (
                  <FormField
                    key={field.id}
                    field={field}
                    answers={answers}
                    error={errors[field.id]}
                    onChange={onChange}
                  />
                ))}
              </div>
            </section>
          );
        })}
    </>
  );
}

/** Step 4: the DLQI (16+) or CDLQI (4–15), collapsed and fully optional */
function QuestionnaireStep({
  answers,
  errors,
  onChange,
}: {
  answers: Answers;
  errors: Record<string, string>;
  onChange: (id: string, value: Answers[string]) => void;
}) {
  const which = questionnaireFor(answers);
  const started = Object.keys(answers).some((k) => /^c?dlqi\d/.test(k) && answers[k]);
  const [open, setOpen] = useState(started);

  if (!which) {
    return (
      <p className="mt-10 text-center text-body text-black">
        There are no extra questions for this age. Press Next to continue.
      </p>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-brand p-5 lg:p-7">
      <p className="text-body text-black">{QUESTIONNAIRE_INTRO}</p>
      {!open ? (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            className="h-[42px] rounded-full bg-brand px-8 text-body text-white transition-colors hover:bg-brand-soft"
          >
            Fill in now (2 minutes)
          </button>
          <span className="text-small text-black/60">or press Next to skip</span>
        </div>
      ) : (
        <Sections
          stepIndex={STEP.questionnaire}
          answers={answers}
          errors={errors}
          fields={visibleFields(steps[STEP.questionnaire], answers)}
          onChange={onChange}
        />
      )}
    </div>
  );
}

function ThankYou({
  ref,
  firstName,
  photos,
}: {
  ref: React.Ref<HTMLDivElement>;
  firstName: string;
  photos: boolean;
}) {
  return (
    <div ref={ref} className="mx-auto max-w-[705px] scroll-mt-[90px] px-5 py-16 text-center lg:py-24">
      <h1 className="text-h2 lg:text-h2-lg">Thank you{firstName ? `, ${firstName}` : ""}.</h1>
      <p className="mt-8 text-big text-black">
        We&apos;ve received your details securely. Next step: book a time for your free phone call
        with our acne nurse.
      </p>
      {!photos && (
        <p className="mt-4 text-body text-black">
          Haven&apos;t uploaded your photos yet? Our nurse will send you a private link to upload
          them before your call.
        </p>
      )}
      <PillLink href={BOOKING_URL} className="mt-10 w-full sm:w-auto">
        Book your free nurse consultation →
      </PillLink>
      <p className="mt-8 text-small text-black/70">
        Nurse consultation (phone): Free · Dermatologist consultation: $365 (Medicare rebate with a
        valid referral) · GP consultation: $99 (no Medicare rebate). Nurse consultations don&apos;t
        include prescribing.{" "}
        <Link href="/pricing" className="underline underline-offset-2">
          See Pricing
        </Link>
        .
      </p>
    </div>
  );
}

function PhotoStep({
  files,
  fileErrors,
  onFile,
  onBulk,
}: {
  files: Record<string, File | undefined>;
  fileErrors: Record<string, string>;
  onFile: (slot: string, file: File | undefined) => void;
  onBulk: (files: File[]) => void;
}) {
  const bulk = Object.entries(files).filter(
    (entry): entry is [string, File] => entry[0].startsWith("extra-") && Boolean(entry[1]),
  );
  return (
    <>
      <PhotoTips className="mt-6" />
      {photoGroups.map((group) => (
        <section key={group.title} className="mt-12">
          <h3 className="sr-only">{group.title}</h3>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-7">
            {group.slots.map((slot) => (
              <PhotoSlot
                key={slot.id}
                slot={slot}
                file={files[slot.id]}
                error={fileErrors[slot.id]}
                onChange={(f) => onFile(slot.id, f)}
              />
            ))}
          </ul>
        </section>
      ))}

      <div className="mt-8 text-center">
        <label className="cursor-pointer text-body text-brand underline underline-offset-2 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand">
          <input
            type="file"
            multiple
            accept="image/*,.heic,.heif"
            onChange={(e) => {
              onBulk(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
            className="sr-only"
          />
          Or upload all photos at once
        </label>
        {bulk.length > 0 && (
          <ul className="mx-auto mt-4 max-w-[420px] space-y-2 text-left text-small">
            {bulk.map(([slot, file]) => (
              <li key={slot} className="flex items-center justify-between gap-4 border-b border-brand/30 pb-2">
                <span className="truncate">✓ {file.name}</span>
                <button
                  type="button"
                  onClick={() => onFile(slot, undefined)}
                  className="shrink-0 text-black/60 underline underline-offset-2 hover:text-brand"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
        {fileErrors.bulk && <p className="mt-2 text-note text-red-700">{fileErrors.bulk}</p>}
      </div>

      <p className="mt-8 text-small text-black">
        Not ready? That&apos;s OK. Submit now and our nurse will email you a private link to upload
        them before your consultation.
      </p>
    </>
  );
}

function ReferralUpload({
  file,
  error,
  onFile,
}: {
  file?: File;
  error?: string;
  onFile: (file: File | undefined) => void;
}) {
  return (
    <div className="mt-5">
      {file ? (
        <div className={`${inputClass} flex h-auto items-center justify-between border-[#c4c4c4] py-3`}>
          <span className="truncate">✓ {file.name}</span>
          <button
            type="button"
            onClick={() => onFile(undefined)}
            className="ml-4 shrink-0 text-small text-brand underline underline-offset-2"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-brand bg-white p-4 transition-colors hover:bg-cream has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand">
          <input
            type="file"
            accept="application/pdf,image/*,.heic,.heif"
            onChange={(e) => {
              onFile(e.target.files?.[0]);
              e.target.value = "";
            }}
            className="sr-only"
          />
          <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 16V4M6.5 9.5 12 4l5.5 5.5M4 20h16" />
            </svg>
          </span>
          <span>
            <span className="block text-body">Upload referral (optional)</span>
            <span className="block text-note text-black/60">
              Photo or PDF. GPs can also fax 03 7074 0477 or email info@treatacne.com.au
            </span>
          </span>
        </label>
      )}
      {error && <p className="mt-2 text-note text-red-700">{error}</p>}
    </div>
  );
}
