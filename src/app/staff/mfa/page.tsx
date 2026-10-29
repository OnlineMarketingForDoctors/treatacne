"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { inputClass } from "@/components/form/FormField";
import { createStaffBrowserClient } from "@/lib/supabase/browser";

type State =
  | { kind: "loading" }
  | { kind: "enrol"; factorId: string; qr: string; secret: string }
  | { kind: "verify"; factorId: string };

/** Two-factor step: first-time set-up with an authenticator app, then a 6-digit code each sign-in. */
export default function StaffMfaPage() {
  const router = useRouter();
  const [state, setState] = useState<State>({ kind: "loading" });
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createStaffBrowserClient();
    (async () => {
      const { data: claimsData } = await supabase.auth.getClaims();
      if (!claimsData?.claims) return router.replace("/staff/login");
      if (claimsData.claims.aal === "aal2") return router.replace("/staff");
      const { data: factors } = await supabase.auth.mfa.listFactors();
      const verified = factors?.totp.find((f) => f.status === "verified");
      if (verified) return setState({ kind: "verify", factorId: verified.id });
      // Clear any half-finished set-up, then start a new one
      for (const f of factors?.all ?? []) {
        if (f.status === "unverified") await supabase.auth.mfa.unenroll({ factorId: f.id });
      }
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: `Authenticator ${new Date().toISOString().slice(0, 10)}`,
      });
      if (error || !data) return setError("Couldn't start two-factor set-up. Please refresh and try again.");
      setState({ kind: "enrol", factorId: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
    })();
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === "loading") return;
    setBusy(true);
    setError("");
    const { error } = await createStaffBrowserClient().auth.mfa.challengeAndVerify({
      factorId: state.factorId,
      code: code.replace(/\s/g, ""),
    });
    setBusy(false);
    if (error) return setError("That code didn't work. Check the time on your phone and try the latest code.");
    router.replace("/staff");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-[460px] rounded-2xl bg-white p-8">
      <h1 className="text-h2">Two-factor authentication</h1>
      {state.kind === "loading" && !error && <p className="mt-6 text-small">Loading…</p>}
      {state.kind === "enrol" && (
        <div className="mt-6 space-y-4 text-small">
          <p>
            Scan this QR code with an authenticator app (such as Google Authenticator, Microsoft
            Authenticator or 1Password), then enter the 6-digit code it shows.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element -- QR code is an inline SVG data URL */}
          <img src={state.qr} alt="QR code for your authenticator app" className="mx-auto size-48" />
          <p className="text-note text-black/60">
            Can&apos;t scan? Enter this key instead: <code className="break-all">{state.secret}</code>
          </p>
        </div>
      )}
      {state.kind === "verify" && (
        <p className="mt-6 text-small">Enter the 6-digit code from your authenticator app.</p>
      )}
      {state.kind !== "loading" && (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label htmlFor="code" className="sr-only">
            6-digit code
          </label>
          <input
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="123456"
            maxLength={7}
            required
            autoFocus
            className={`${inputClass} border-[#c4c4c4] text-center tracking-[0.3em]`}
          />
          <button
            type="submit"
            disabled={busy}
            className="h-[42px] w-full rounded-full bg-brand text-body text-white transition-colors hover:bg-brand-soft disabled:opacity-60"
          >
            {busy ? "Checking…" : "Verify"}
          </button>
        </form>
      )}
      {error && (
        <p role="alert" className="mt-4 text-small text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
