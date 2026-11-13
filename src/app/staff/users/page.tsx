import { requireAdmin, roleLabels, type StaffRole } from "@/lib/staff";
import { createAdminClient } from "@/lib/supabase/admin";
import { StaffNav } from "../StaffNav";
import { AddUserForm } from "./AddUserForm";
import { changeRole, removeUser } from "./actions";

export const metadata = { title: "Users" };

export default async function UsersPage() {
  const { name, role, userId } = await requireAdmin();
  const admin = createAdminClient();
  const [{ data: members }, { data: authUsers }] = await Promise.all([
    admin.from("staff_members").select("user_id, name, role, created_at").order("created_at"),
    admin.auth.admin.listUsers({ perPage: 1000 }),
  ]);
  const emails = new Map(authUsers?.users.map((u) => [u.id, u.email]) ?? []);
  const admins = (members ?? []).filter((m) => m.role === "admin").length;

  return (
    <>
      <StaffNav name={name} role={role} />
      <h1 className="text-h2">Users</h1>
      <p className="mt-3 max-w-[720px] text-small text-black/70">
        <strong className="font-bold">Admins</strong> can see submissions, edit the blog and manage users.{" "}
        <strong className="font-bold">Nurses</strong> can only see submissions.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl bg-white">
        <table className="w-full min-w-[640px] text-left text-small">
          <thead>
            <tr className="border-b border-brand/30">
              <th className="px-4 py-3 font-normal">Name</th>
              <th className="px-4 py-3 font-normal">Email</th>
              <th className="px-4 py-3 font-normal">Role</th>
              <th className="px-4 py-3 font-normal"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {(members ?? []).map((m) => {
              const isSelf = m.user_id === userId;
              const lastAdmin = m.role === "admin" && admins <= 1;
              const r = (m.role === "admin" ? "admin" : "nurse") as StaffRole;
              return (
                <tr key={m.user_id} className="border-b border-brand/10 last:border-0">
                  <td className="px-4 py-3">{m.name}{isSelf && <span className="text-black/50"> (you)</span>}</td>
                  <td className="px-4 py-3">{emails.get(m.user_id) ?? "—"}</td>
                  <td className="px-4 py-3">
                    {isSelf || lastAdmin ? (
                      roleLabels[r]
                    ) : (
                      <form action={changeRole} className="flex items-center gap-2">
                        <input type="hidden" name="userId" value={m.user_id} />
                        <select name="role" defaultValue={r} aria-label={`Role for ${m.name}`} className="rounded-lg border border-brand/40 bg-white px-2 py-1">
                          <option value="nurse">Nurse</option>
                          <option value="admin">Admin</option>
                        </select>
                        <button type="submit" className="text-brand hover:underline">Save</button>
                      </form>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {!isSelf && !lastAdmin && (
                      <details className="inline-block text-left">
                        <summary className="cursor-pointer text-black/60 hover:text-brand">Remove</summary>
                        <form action={removeUser} className="mt-2 flex items-center gap-3">
                          <input type="hidden" name="userId" value={m.user_id} />
                          <span>Remove {m.name}&apos;s access?</span>
                          <button type="submit" className="rounded-full bg-red-700 px-4 py-1 text-white hover:bg-red-800">Remove</button>
                        </form>
                      </details>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-8">
        <AddUserForm />
      </div>
    </>
  );
}
