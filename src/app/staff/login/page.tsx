"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { inputClass } from "@/components/form/FormField";
import { createStaffBrowserClient } from "@/lib/supabase/browser";

export default function StaffLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const { error } = await createStaffBrowserClient().auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    setBusy(false);
    if (error) return setError("Incorrect email or password.");
    router.replace("/staff/mfa");
  }

  return (
    <div className="mx-auto max-w-[420px] rounded-2xl bg-white p-8">
      <h1 className="text-h2">Staff sign in</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-small">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="username" className={`${inputClass} border-[#c4c4c4]`} />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-small">
            Password
          </label>
          <input id="password" name="password" type="password" required autoComplete="current-password" className={`${inputClass} border-[#c4c4c4]`} />
        </div>
        {error && (
          <p role="alert" className="text-small text-red-700">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="h-[42px] w-full rounded-full bg-brand text-body text-white transition-colors hover:bg-brand-soft disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
