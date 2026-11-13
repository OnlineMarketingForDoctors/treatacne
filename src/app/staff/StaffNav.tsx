import Link from "next/link";
import { roleLabels, type StaffRole } from "@/lib/staff";
import { signOut } from "./actions";

export function StaffNav({ name, role }: { name: string; role: StaffRole }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 text-small">
      <p>
        Signed in as <strong className="font-bold">{name}</strong> ({roleLabels[role]})
      </p>
      <div className="flex flex-wrap items-center gap-5">
        <Link href="/staff" className="text-brand hover:underline">
          Submissions
        </Link>
        {role === "admin" && (
          <>
            <Link href="/staff/blog" className="text-brand hover:underline">
              Blog
            </Link>
            <Link href="/staff/users" className="text-brand hover:underline">
              Users
            </Link>
          </>
        )}
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
