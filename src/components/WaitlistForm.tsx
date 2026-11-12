"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { joinWaitlist } from "@/app/(site)/shop/actions";

// Shop waitlist: saved to its own list, separate from patient records.
export function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);

  if (status === "done") {
    return (
      <p role="status" className="text-big">
        Thanks! We&apos;ll email you as soon as the range is available.
      </p>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const email = String(new FormData(e.currentTarget).get("email") ?? "");
        setStatus("sending");
        setError("");
        try {
          const result = await joinWaitlist({ email, website: honeypot.current?.value });
          if (result.ok) return setStatus("done");
          setError(result.error ?? "Please try again.");
        } catch {
          setError("Something went wrong. Please check your connection and try again.");
        }
        setStatus("idle");
      }}
    >
      <input ref={honeypot} name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          maxLength={200}
          autoComplete="email"
          placeholder="Email address"
          className="h-[52px] min-w-0 rounded-full border border-[#c4c4c4] bg-white px-6 text-body text-black outline-none placeholder:text-black/45 focus:border-brand sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-[52px] rounded-full bg-brand px-8 text-body text-white transition-colors hover:bg-brand-soft disabled:opacity-60"
        >
          {status === "sending" ? "Joining…" : "Join the waitlist"}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-small text-red-700">
          {error}
        </p>
      )}
      <p className="mt-3 text-note text-black/70">
        By joining you agree to receive emails from Treat:Acne about the skincare range. Unsubscribe
        anytime.{" "}
        <Link href="/privacy-policy" className="text-brand underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
