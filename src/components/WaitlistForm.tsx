"use client";

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
          className="min-w-0 flex-1 bg-transparent text-big text-black outline-none placeholder:text-brand-muted lg:text-[28px]"
        />
        <button type="submit" className="text-small tracking-[0.06em] uppercase hover:underline">
          Notify me
        </button>
      </div>
    </form>
  );
}
