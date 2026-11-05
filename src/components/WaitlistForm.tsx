"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: connect to Niyati's email platform (same as the footer sign-up).
// For now this only validates the address and shows a confirmation.
export function WaitlistForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p role="status" className="text-big">
        Thanks! We&apos;ll let you know as soon as it&apos;s available.
      </p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor="waitlist-email" className="text-body">
        Join the waitlist
      </label>
      <div className="mt-4 flex items-end gap-6 border-b border-brand pb-2">
        <input
          id="waitlist-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter Email Address"
          className="min-w-0 flex-1 bg-transparent text-big text-black outline-none placeholder:text-brand-muted placeholder:text-body sm:placeholder:text-big lg:text-[28px]"
        />
        <button type="submit" className="text-small tracking-[0.06em] uppercase hover:underline">
          Notify me
        </button>
      </div>
      <p className="mt-3 text-note text-black/70">
        By joining you agree to receive emails from Treat:Acne. Unsubscribe anytime.{" "}
        <Link href="/privacy-policy" className="text-brand underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
