import { requireStaff } from "@/lib/staff";
import { StaffNav } from "../StaffNav";
import { ChangePasswordForm } from "./ChangePasswordForm";

export const metadata = { title: "Change password" };

export default async function AccountPage() {
  const { name } = await requireStaff();
  return (
    <>
      <StaffNav name={name} />
      <div className="max-w-[460px] rounded-2xl bg-white p-8">
        <h1 className="text-h2">Change password</h1>
        <ChangePasswordForm />
      </div>
    </>
  );
}
