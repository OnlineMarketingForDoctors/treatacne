"use client";

import { useEffect, useRef, useState } from "react";
import { PillLink } from "@/components/Button";
import { FormField, inputClass } from "@/components/form/FormField";
import { PhotoSlot } from "@/components/form/PhotoSlot";
import { PhotoTips } from "@/components/PhotoTips";
import { createUploadClient } from "@/lib/supabase/browser";
import { SUBMISSIONS_BUCKET } from "@/lib/supabase/env";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_BYTES,
  isUnder18,
  photoGroups,
  steps,
  validateStep,
  visibleFields,
  type Answers,
} from "@/lib/intake";
import { BOOKING_URL, keyMessage } from "@/lib/site";
import { TEST_PREFILL, testAnswers, testFiles } from "@/lib/testPrefill";
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

type Status =
  | { kind: "editing" }
  | { kind: "submitting"; message: string }
  | { kind: "error"; message: string }
  | { kind: "done"; firstName: string };

export function GetStartedForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const emptyAnswers = (): Answers => ({ signatureDate: new Date().toISOString().slice(0, 10) });
  const [answers, setAnswers] = useState<Answers>(() => (TEST_PREFILL ? testAnswers() : emptyAnswers()));
  const [files, setFiles] = useState<Record<string, File | undefined>>({});
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "editing" });
  const honeypot = useRef<HTMLInputElement>(null);
  const top = useRef<HTMLDivElement>(null);
  const dirty = useRef(false);

  // Test mode: placeholder photos (made in the browser, so after the first render)
  useEffect(() => {
    if (TEST_PREFILL) void testFiles().then(setFiles);
  }, []);

  const clearTestData = () => {
    setAnswers(emptyAnswers());
    setFiles({});
    setErrors({});
    setFileErrors({});
  };

  // Warn before leaving with unsent answers (nothing is saved in the browser)
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty.current) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

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

  const setFile = (slot: string, file: File | undefined) => {
    dirty.current = true;
    let problem = "";
    if (file && !ALLOWED_FILE_TYPES.includes(fileType(file))) problem = "Please choose a JPG, PNG, HEIC or PDF file.";
    else if (file && file.size > MAX_FILE_BYTES) problem = "This file is over 15MB. Please choose a smaller one.";
    setFileErrors((prev) => ({ ...prev, [slot]: problem }));
    setFiles((prev) => ({ ...prev, [slot]: problem ? undefined : file }));
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
    try {
      const started = await startSubmission({
        answers,
        files: chosen.map(([slot, file]) => ({ slot, type: fileType(file), size: file.size })),
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
      setStatus({ kind: "done", firstName: String(answers.firstName ?? "") });
      requestAnimationFrame(scrollToTop);
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please check your connection and try again." });
    }
  }

  if (status.kind === "done") {
    return (
      <div ref={top} className="mx-auto max-w-[705px] scroll-mt-[90px] px-5 py-16 text-center lg:py-24">
        <h1 className="text-h2 lg:text-h2-lg">Thank you{status.firstName ? `, ${status.firstName}` : ""}.</h1>
        <p className="mt-8 text-big text-black">
          We&apos;ve received your details and photos securely. Next, book a time for your free
          30-minute phone consultation with our acne nurse.
        </p>
        <PillLink href={BOOKING_URL} className="mt-10 w-full sm:w-auto">
          Book your free nurse consultation →
        </PillLink>
        <p className="mt-8 text-small text-black/70">{keyMessage}</p>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const fields = visibleFields(step, answers);
  const progress = ((stepIndex + 1) / steps.length) * 100;

  return (
    <div ref={top} className="mx-auto max-w-[705px] scroll-mt-[90px] px-5 pt-10 pb-16 lg:pt-[50px] lg:pb-[90px]">
      {TEST_PREFILL && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-dashed border-brand bg-[#fcede6] px-4 py-3 text-small">
          <span>
            <strong className="font-bold">Test mode:</strong> this form is pre-filled with dummy data and
            placeholder photos.
          </span>
          <button type="button" onClick={clearTestData} className="text-brand underline underline-offset-2">
            Clear test data
          </button>
        </div>
      )}
      <h1 className="text-center text-h2 lg:text-h2-lg">{step.heading}</h1>
      {step.intro && (
        <p className="mx-auto mt-8 max-w-[560px] text-center text-[18px] leading-[1.2] text-black lg:mt-[55px] lg:text-big">
          {step.intro}
        </p>
      )}
      <p className="mt-6 text-center text-note text-black/60">
        Only fields marked <span className="text-brand">*</span> are required. Our nurse can collect
        anything else on the call.
      </p>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
        className="mt-6"
      >
        {/* Honeypot: hidden from people */}
        <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

        {stepIndex === 2 && <PhotoStep files={files} fileErrors={fileErrors} onFile={setFile} />}

        {step.sections
          .filter((s) => !s.showIf || s.showIf(answers))
          .map((section) => {
            const sectionFields = section.fields.filter((f) => fields.includes(f));
            return (
              <section key={section.title} className="mt-10">
                <h2 className="border-b border-brand pb-2 text-small">{section.title}</h2>
                <div className="mt-5 grid grid-cols-1 gap-x-[30px] gap-y-5 sm:grid-cols-12">
                  {sectionFields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      answers={answers}
                      error={errors[field.id]}
                      compact={stepIndex === 0}
                      onChange={update}
                    />
                  ))}
                </div>
              </section>
            );
          })}

        {stepIndex === 0 && (
          <section className="mt-10">
            <h2 className="border-b border-brand pb-2 text-small">GP Referral (optional)</h2>
            <p className="mt-4 text-small text-black">
              Have a GP referral? Upload it here to claim a Medicare rebate on your dermatologist
              consult. No referral? Our doctor can refer you.
            </p>
            <ReferralUpload file={files.referral} error={fileErrors.referral} onFile={(f) => setFile("referral", f)} />
          </section>
        )}

        {isLast && isUnder18(answers) && (
          <p className="mt-4 text-small text-black">
            As the patient is under 18, a parent or guardian must sign and state their relationship.
          </p>
        )}

        <div className="mt-14">
          <div className="h-[4px] overflow-hidden rounded-full border border-brand" aria-hidden>
            <div className="h-full bg-brand transition-[width] duration-500" style={{ width: `${progress}%` }} />
          </div>
          {status.kind === "error" && (
            <p role="alert" className="mt-5 rounded-[10px] border border-red-700 p-3 text-small text-red-700">
              {status.message}
            </p>
          )}
          {submitting && (
            <p role="status" className="mt-5 text-center text-small">
              {status.message}
            </p>
          )}
          <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <button
              type="button"
              disabled={stepIndex === 0 || submitting}
              onClick={() => goTo(stepIndex - 1)}
              className="h-[42px] w-full max-w-[145px] rounded-full border border-brand text-body transition-colors hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              ← Previous
            </button>
            <span className="text-small" aria-live="polite">
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
      </form>
    </div>
  );
}

function PhotoStep({
  files,
  fileErrors,
  onFile,
}: {
  files: Record<string, File | undefined>;
  fileErrors: Record<string, string>;
  onFile: (slot: string, file: File | undefined) => void;
}) {
  return (
    <>
      <PhotoTips className="mt-6" />
      {photoGroups.map((group) => (
        <section key={group.title} className="mt-12">
          <h2 className="border-b border-brand pb-2 text-small">{group.title}</h2>
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
      <p className="mt-8 text-small text-black">
        For follow-up visits, we&apos;ll send you a private link to upload new photos securely.
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
    <div className="mt-4">
      {file ? (
        <div className={`${inputClass} flex items-center justify-between border-[#c4c4c4]`}>
          <span className="truncate">{file.name}</span>
          <button
            type="button"
            onClick={() => onFile(undefined)}
            className="ml-4 shrink-0 text-small text-brand underline underline-offset-2"
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="inline-flex h-[42px] cursor-pointer items-center rounded-full border border-brand px-8 text-body transition-colors hover:bg-brand hover:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand">
          <input
            type="file"
            accept="application/pdf,image/*,.heic,.heif"
            onChange={(e) => {
              onFile(e.target.files?.[0]);
              e.target.value = "";
            }}
            className="sr-only"
          />
          Upload referral
        </label>
      )}
      {error && <p className="mt-2 text-note text-red-700">{error}</p>}
    </div>
  );
}
