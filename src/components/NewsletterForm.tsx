"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: connect to the email platform once chosen.
// For now this only validates the address and shows a confirmation.
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "done">("idle");

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
      <div>
        <h2 className="text-[26px] leading-[1.15] lg:text-[32px]">Get our latest updates</h2>
        <p className="mt-3 max-w-[520px] text-small text-white/90">
          By joining you agree to receive emails from Treat:Acne. Unsubscribe anytime.{" "}
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
      {status === "done" ? (
        <p role="status" className="text-big">
          Thanks, you&apos;re subscribed.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("done");
          }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter email address"
            className="h-[52px] min-w-0 rounded-full bg-white px-6 text-body text-black outline-none placeholder:text-black/50 focus-visible:ring-2 focus-visible:ring-black sm:flex-1 lg:w-[380px] lg:flex-none"
          />
          <button
            type="submit"
            className="h-[52px] rounded-full bg-[#2a1d17] px-9 text-body text-white transition-colors hover:bg-black"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
