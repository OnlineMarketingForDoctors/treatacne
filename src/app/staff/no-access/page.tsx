import { signOut } from "../actions";

export default function NoAccessPage() {
  return (
    <div className="mx-auto max-w-[460px] rounded-2xl bg-white p-8">
      <h1 className="text-h2">No access</h1>
      <p className="mt-6 text-small">
        Your account isn&apos;t set up as Treat:Acne staff. Please contact the practice manager.
      </p>
      <form action={signOut} className="mt-6">
        <button type="submit" className="text-small text-brand underline underline-offset-2">
          Sign out
        </button>
      </form>
    </div>
  );
}
