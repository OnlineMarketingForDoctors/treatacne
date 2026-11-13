"use client";

import { useActionState } from "react";
import { addUser, type UserResult } from "./actions";

const input = "w-full rounded-lg border border-brand/40 bg-white px-3 py-2 text-body text-black focus:border-brand focus:outline-none";

export function AddUserForm() {
  const [state, action, pending] = useActionState<UserResult | null, FormData>(addUser, null);
  return (
    <div className="rounded-2xl bg-white p-5 lg:p-6">
      <h2 className="text-big">Add a user</h2>
      <form action={action} className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_160px_auto] sm:items-end">
        <label className="block text-small">
          Name
          <input name="name" required className={`${input} mt-1`} />
        </label>
        <label className="block text-small">
          Email
          <input name="email" type="email" required className={`${input} mt-1`} />
        </label>
        <label className="block text-small">
          Role
          <select name="role" defaultValue="nurse" className={`${input} mt-1`}>
            <option value="nurse">Nurse</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <button type="submit" disabled={pending} className="rounded-full bg-brand px-6 py-2.5 text-small text-white hover:bg-brand-soft disabled:opacity-50">
          {pending ? "Adding…" : "Add user"}
        </button>
      </form>
      {state && !state.ok && <p role="alert" className="mt-3 text-small text-red-700">{state.error}</p>}
      {state?.ok && (
        <div role="status" className="mt-4 rounded-xl bg-[#fcede6] p-4 text-small">
          <p>{state.message}</p>
          {state.password && (
            <>
              <p className="mt-2">
                Temporary password: <code className="rounded bg-white px-2 py-1 text-body select-all">{state.password}</code>
              </p>
              <p className="mt-2 text-black/70">
                This is shown only once. Send it to them separately from the email address (for example by
                text). When they first sign in at /staff/login they&apos;ll set up two-factor authentication,
                and they should then change the password under Change password.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
