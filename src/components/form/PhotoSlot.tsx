"use client";

import { useEffect, useMemo, useState } from "react";
import type { FileSlot } from "@/lib/intake";

/**
 * One photo box: the example photo faded behind a camera button. Tapping opens the camera or
 * photo library (phones offer both when no `capture` is forced); the patient's photo then
 * fills the box with a green tick.
 */
export function PhotoSlot({
  slot,
  file,
  error,
  onChange,
}: {
  slot: FileSlot;
  file?: File;
  error?: string;
  onChange: (file: File | undefined) => void;
}) {
  const [picking, setPicking] = useState(false);
  // HEIC can't be previewed in most browsers; those show the file name instead
  const preview = useMemo(
    () => (file && /^image\/(jpeg|png|webp)$/.test(file.type) ? URL.createObjectURL(file) : undefined),
    [file],
  );
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  // The example fades out while the camera or library is open; bring it back if they cancel
  useEffect(() => {
    if (!picking) return;
    const onFocus = () => setTimeout(() => setPicking(false), 400);
    window.addEventListener("focus", onFocus, { once: true });
    return () => window.removeEventListener("focus", onFocus);
  }, [picking]);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPicking(false);
    onChange(e.target.files?.[0]);
    e.target.value = "";
  };
  const inputId = `photo-${slot.id}`;

  return (
    <li className="flex flex-col text-center">
      <p className="text-small text-black">{slot.label}</p>
      {slot.hint && <p className="text-note text-black/60">{slot.hint}</p>}

      <label
        htmlFor={inputId}
        className="group relative mx-auto mt-3 block aspect-square w-full max-w-[220px] cursor-pointer overflow-hidden rounded-2xl border border-brand/40 bg-cream has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand"
      >
        <input
          id={inputId}
          type="file"
          accept="image/*,.heic,.heif"
          onClick={() => setPicking(true)}
          onChange={pick}
          className="sr-only"
        />
        {slot.example && (
          // eslint-disable-next-line @next/next/no-img-element -- small static example
          <img
            src={slot.example}
            alt=""
            className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
              file || picking ? "opacity-0" : "opacity-35"
            }`}
          />
        )}
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
          <img
            src={preview}
            alt={`Your ${slot.label.toLowerCase()} photo`}
            className="absolute inset-0 size-full object-cover"
          />
        ) : file ? (
          <span className="absolute inset-0 flex items-center justify-center p-4 text-note break-all text-black">
            {file.name}
          </span>
        ) : (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-md transition-transform group-hover:scale-105">
              <svg aria-hidden width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 8h3l2-2.5h6L17 8h3v11H4z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
            </span>
            <span className="rounded-full bg-white/85 px-3 py-0.5 text-note text-brand">Add photo</span>
          </span>
        )}
        {file && (
          <span
            aria-label="Photo added"
            className="absolute top-2 right-2 flex size-8 items-center justify-center rounded-full bg-[#1f8a4c] text-white shadow"
          >
            <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="m3 8.5 3.2 3L13 4.5" />
            </svg>
          </span>
        )}
      </label>

      {file && (
        <div className="mt-2 flex justify-center gap-4 text-note">
          <label htmlFor={inputId} className="cursor-pointer text-brand underline underline-offset-2">
            Change
          </label>
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-black/60 underline underline-offset-2 hover:text-brand"
          >
            Remove
          </button>
        </div>
      )}
      {error && <p className="mt-1 text-note text-red-700">{error}</p>}
    </li>
  );
}
