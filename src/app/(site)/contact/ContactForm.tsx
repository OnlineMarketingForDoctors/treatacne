"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { inputClass } from "@/components/form/FormField";
import { sendContactMessage } from "./actions";

type Status = { kind: "editing" } | { kind: "sending" } | { kind: "error"; message: string } | { kind: "sent" };

const labelClass = "mb-2 block text-small text-black";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "editing" });
  const openedAt = useRef(0);
  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  if (status.kind === "sent") {
    return (
      <p role="status" className="text-big">
        Thanks, your message has been sent. We&apos;ll respond within 2 working days.
      </p>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "");
    setStatus({ kind: "sending" });
    try {
      const result = await sendContactMessage({
        name: get("name"),
        email: get("email"),
        phone: get("phone") || undefined,
        message: get("message"),
        website: get("website") || undefined,
        openedAt: openedAt.current,
      });
      setStatus(result.ok ? { kind: "sent" } : { kind: "error", message: result.error });
    } catch {
      setStatus({ kind: "error", message: "Something went wrong. Please check your connection and try again." });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
      <p className="text-small text-black/70 sm:col-span-2">
        Please don&apos;t include health details or photos here. To start treatment, use our{" "}
        <Link href="/get-started" className="text-brand underline underline-offset-2">
          Get Started form
        </Link>
        , which keeps your information secure.
      </p>
      {/* Honeypot: hidden from people */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          Name <span className="text-brand">*</span>
        </label>
        <input id="contact-name" name="name" required maxLength={100} autoComplete="name" className={`${inputClass} border-[#c4c4c4]`} />
      </div>
      <div>
        <label htmlFor="contact-email" className={labelClass}>
          Email <span className="text-brand">*</span>
        </label>
        <input id="contact-email" name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" className={`${inputClass} border-[#c4c4c4]`} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-phone" className={labelClass}>
          Phone (optional)
        </label>
        <input id="contact-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" inputMode="tel" className={`${inputClass} border-[#c4c4c4] sm:max-w-[calc(50%-10px)]`} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className={labelClass}>
          Message <span className="text-brand">*</span>
        </label>
        <textarea id="contact-message" name="message" required maxLength={5000} rows={6} className={`${inputClass} h-auto border-[#c4c4c4] py-2`} />
      </div>
      {status.kind === "error" && (
        <p role="alert" className="rounded-[10px] border border-red-700 p-3 text-small text-red-700 sm:col-span-2">
          {status.message}
        </p>
      )}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={sending}
          className="h-[42px] rounded-full bg-brand px-8 text-body text-white transition-colors hover:bg-brand-soft disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
