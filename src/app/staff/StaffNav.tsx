import Link from "next/link";
import { signOut } from "./actions";

export function StaffNav({ name }: { name: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-small">
      <p>
        Signed in as <strong className="font-bold">{name}</strong>
      </p>
      <div className="flex items-center gap-5">
        <Link href="/staff" className="text-brand hover:underline">
          Submissions
        </Link>
        <Link href="/staff/account" className="text-brand hover:underline">
          Change password
        </Link>
        <form action={signOut}>
          <button type="submit" className="text-brand hover:underline">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
