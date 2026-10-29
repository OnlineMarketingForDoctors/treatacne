"use client";

import { useEffect, useMemo } from "react";
import { Silhouette } from "@/components/PhotoTips";
import type { FileSlot } from "@/lib/intake";

const buttonClass =
  "flex h-9 w-full cursor-pointer items-center justify-center rounded-full border border-brand px-3 text-small text-brand transition-colors hover:bg-brand hover:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand";

/** One photo slot: preview, "Use Built-in Camera" and "Upload From Computer". */
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
  // HEIC can't be previewed in most browsers; those show the file name instead
  const preview = useMemo(
    () => (file && /^image\/(jpeg|png|webp)$/.test(file.type) ? URL.createObjectURL(file) : undefined),
    [file],
  );
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0]);
    e.target.value = "";
  };
  const face = slot.id.startsWith("face");

  return (
    <li className="flex flex-col text-center">
      <p className="min-h-[2.4em] text-note text-black/60 sm:text-small">
        {slot.label}
        {slot.hint && (
          <>
            <br />
            {slot.hint}
          </>
        )}
      </p>
      <div className="mx-auto mt-3 w-full max-w-[200px]">
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element -- local object URL preview
          <img
            src={preview}
            alt={`${slot.label} photo preview`}
            className="aspect-square w-full rounded-full object-cover"
          />
        ) : file ? (
          <div className="flex aspect-square items-center justify-center rounded-full bg-[#fcede6] p-4 text-note break-all text-black">
            {file.name}
          </div>
        ) : (
          <Silhouette />
        )}
      </div>
      <div className="mt-4 space-y-2.5">
        <label className={buttonClass}>
          <input
            type="file"
            accept="image/*"
            capture={face ? "user" : "environment"}
            onChange={pick}
            className="sr-only"
          />
          {file ? "Retake" : "Use Built-in Camera"}
        </label>
        <label className={buttonClass}>
          <input
            type="file"
            accept="image/*,.heic,.heif"
            onChange={pick}
            className="sr-only"
          />
          {file ? "Choose another" : "Upload From Computer"}
        </label>
        {file && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-note text-black/60 underline underline-offset-2 hover:text-brand"
          >
            Remove photo
          </button>
        )}
        {error && <p className="text-note text-red-700">{error}</p>}
      </div>
    </li>
  );
}
