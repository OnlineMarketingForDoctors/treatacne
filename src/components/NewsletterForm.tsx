"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: connect to the email platform (e.g. Klaviyo) once chosen.
// For now this only validates the address and shows a confirmation.
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "done">("idle");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("done");
      }}
      className="flex h-full flex-col justify-between gap-12 lg:gap-0"
    >
      <label htmlFor="newsletter-email" className="text-body">
        Get Our Latest Updates
      </label>
      {status === "done" ? (
        <p role="status" className="pb-3 text-big lg:text-[28px]">
          Thanks, you&apos;re subscribed.
        </p>
      ) : (
        <div className="flex items-end gap-6 border-b border-white pb-2 lg:border-b-0 lg:pb-3">
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter Email Address"
            className="min-w-0 flex-1 bg-transparent text-big text-white outline-none placeholder:text-brand-muted lg:max-w-[300px] lg:flex-none lg:text-[24px]"
          />
          <button type="submit" className="text-small tracking-[0.06em] uppercase hover:underline">
            Submit
          </button>
        </div>
      )}
      {status !== "done" && (
        <p className="mt-3 text-note text-white/85 lg:mt-0 lg:pb-3">
          By joining you agree to receive emails from Treat:Acne. Unsubscribe anytime.{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      )}
    </form>
  );
}
