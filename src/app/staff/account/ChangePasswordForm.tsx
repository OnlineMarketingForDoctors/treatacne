"use client";

import { useState } from "react";
import { inputClass } from "@/components/form/FormField";
import { createStaffBrowserClient } from "@/lib/supabase/browser";

export function ChangePasswordForm() {
  const [message, setMessage] = useState<{ ok: boolean; text: string }>();
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const password = String(form.get("password"));
    if (password.length < 12) return setMessage({ ok: false, text: "Use at least 12 characters." });
    if (password !== String(form.get("confirm"))) return setMessage({ ok: false, text: "The passwords don't match." });
    setBusy(true);
    const { error } = await createStaffBrowserClient().auth.updateUser({ password });
    setBusy(false);
    if (error) return setMessage({ ok: false, text: "Couldn't change your password. Please try again." });
    formEl.reset();
    setMessage({ ok: true, text: "Password changed." });
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      {[
        ["password", "New password"],
        ["confirm", "Confirm new password"],
      ].map(([id, label]) => (
        <div key={id}>
          <label htmlFor={id} className="mb-2 block text-small">
            {label}
          </label>
          <input id={id} name={id} type="password" required minLength={12} autoComplete="new-password" className={`${inputClass} border-[#c4c4c4]`} />
        </div>
      ))}
      {message && (
        <p role="status" className={`text-small ${message.ok ? "text-black" : "text-red-700"}`}>
          {message.text}
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="h-[42px] w-full rounded-full bg-brand text-body text-white transition-colors hover:bg-brand-soft disabled:opacity-60"
      >
        {busy ? "Saving…" : "Change password"}
      </button>
    </form>
  );
}
