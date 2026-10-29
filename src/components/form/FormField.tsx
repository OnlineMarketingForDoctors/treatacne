"use client";

import Link from "next/link";
import type { Answers, Field } from "@/lib/intake";

const widthClass = {
  full: "sm:col-span-12",
  half: "sm:col-span-6",
  third: "sm:col-span-4",
  quarter: "sm:col-span-3",
} as const;

const columnsClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 md:grid-cols-4",
} as const;

export const inputClass =
  "h-10 w-full rounded-[10px] border bg-white px-3 text-body text-black outline-none transition-colors placeholder:text-black/35 focus:border-brand";

/** Consent wording links to the policy pages it mentions */
function linkify(text: string) {
  const links: Record<string, string> = {
    "Privacy Policy": "/privacy-policy",
    "Terms of Use": "/terms-of-use",
    "Pricing page": "/pricing",
  };
  const parts = text.split(/(Privacy Policy|Terms of Use|Pricing page)/);
  return parts.map((part, i) =>
    links[part] ? (
      <Link key={i} href={links[part]} target="_blank" className="underline underline-offset-2">
        {part}
      </Link>
    ) : (
      part
    ),
  );
}

export function FormField({
  field,
  answers,
  error,
  compact,
  onChange,
}: {
  field: Field;
  answers: Answers;
  error?: string;
  /** Step 1 style: placeholder-only text inputs (label kept for screen readers) */
  compact?: boolean;
  onChange: (id: string, value: Answers[string]) => void;
}) {
  if (field.type === "note") {
    return <p className="col-span-full text-small text-black/60">{field.text}</p>;
  }

  const errorId = `${field.id}-error`;
  const required = "required" in field && field.required;
  const star = required ? <span className="text-brand"> *</span> : null;
  const errorText = error ? (
    <p id={errorId} className="mt-1.5 text-note text-red-700">
      {error}
    </p>
  ) : null;
  const value = answers[field.id];
  const border = error ? "border-red-700" : "border-[#c4c4c4]";

  if (field.type === "checkbox") {
    return (
      <div className="col-span-full">
        <label className="flex cursor-pointer gap-3 text-small text-black">
          <input
            type="checkbox"
            checked={value === true}
            onChange={(e) => onChange(field.id, e.target.checked)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand"
          />
          <span>
            {field.title && <strong className="font-bold">{field.title} </strong>}
            {linkify(field.label)}
            {star}
          </span>
        </label>
        {errorText}
      </div>
    );
  }

  if (field.type === "choice") {
    const selected = Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
    const toggle = (option: string) => {
      if (!field.multiple) return onChange(field.id, selected[0] === option ? "" : option);
      // "None"-style options clear the others, and vice versa
      const exclusive = /^None|^Not sure/i;
      const next = selected.includes(option)
        ? selected.filter((o) => o !== option)
        : exclusive.test(option)
          ? [option]
          : [...selected.filter((o) => !exclusive.test(o)), option];
      onChange(field.id, next);
    };
    return (
      <fieldset className="col-span-full" aria-describedby={error ? errorId : undefined}>
        <legend className="mb-3 text-small text-black">
          {field.label}
          {star}
          {field.multiple && !/select all/i.test(field.label) && (
            <span className="text-black/50"> (select all that apply)</span>
          )}
        </legend>
        <div className={`grid grid-cols-1 gap-2.5 ${columnsClass[field.columns ?? 3]}`}>
          {field.options.map((option) => {
            const checked = selected.includes(option);
            return (
              <label
                key={option}
                className={`flex min-h-[34px] cursor-pointer items-center rounded-full border border-brand px-5 py-1.5 text-small transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand lg:text-body ${
                  checked ? "bg-brand text-white" : "text-brand hover:bg-brand/10"
                }`}
              >
                <input
                  type={field.multiple ? "checkbox" : "radio"}
                  name={field.id}
                  value={option}
                  checked={checked}
                  onChange={() => toggle(option)}
                  className="sr-only"
                />
                {option}
              </label>
            );
          })}
        </div>
        {errorText}
      </fieldset>
    );
  }

  const label = (
    <label
      htmlFor={field.id}
      className={
        compact && field.type !== "date"
          ? "sr-only"
          : "mb-2 block text-small text-black"
      }
    >
      {field.label}
      {star}
    </label>
  );
  const width = `${"width" in field && field.width ? widthClass[field.width] : widthClass.full}${
    // Step 1 shows most labels for screen readers only; keep inputs in a row level
    compact ? " sm:self-end" : ""
  }`;
  const describedBy = error ? errorId : undefined;

  if (field.type === "select") {
    return (
      <div className={`col-span-full ${width}`}>
        {label}
        <select
          id={field.id}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.id, e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${inputClass} ${border} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='14'%20height='9'%20fill='none'%3E%3Cpath%20d='m1%201%206%206%206-6'%20stroke='%23e54a08'%20stroke-width='1.6'/%3E%3C/svg%3E")] bg-[position:right_14px_center] bg-no-repeat pr-10 ${
            value ? "" : "text-black/35"
          }`}
        >
          <option value="">{compact ? `${field.label}${required ? " *" : ""}` : "Select…"}</option>
          {field.options.map((o) => (
            <option key={o} value={o} className="text-black">
              {o}
            </option>
          ))}
        </select>
        {errorText}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="col-span-full">
        {label}
        <textarea
          id={field.id}
          rows={3}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          onChange={(e) => onChange(field.id, e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`${inputClass} ${border} h-auto py-2.5`}
        />
        {errorText}
      </div>
    );
  }

  return (
    <div className={`col-span-full ${width}`}>
      {label}
      <input
        id={field.id}
        type={field.type}
        value={typeof value === "string" ? value : ""}
        placeholder={field.placeholder ? `${field.placeholder}${required ? " *" : ""}` : undefined}
        autoComplete={field.autoComplete ?? "off"}
        inputMode={field.inputMode}
        max={field.type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
        onChange={(e) => onChange(field.id, e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`${inputClass} ${border}`}
      />
      {errorText}
    </div>
  );
}
