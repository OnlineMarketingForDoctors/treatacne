"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createSessionClient } from "@/lib/supabase/server";
import { requireStaff, statusLabels } from "@/lib/staff";

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/staff/login");
}

const statusInput = z.object({
  id: z.uuid(),
  status: z.enum(["new", "reviewed", "added_to_xestro"]),
});

export async function updateStatus(formData: FormData) {
  const parsed = statusInput.safeParse({ id: formData.get("id"), status: formData.get("status") });
  if (!parsed.success || !(parsed.data.status in statusLabels)) return;
  const { supabase, userId } = await requireStaff();
  const { id, status } = parsed.data;
  const { error } = await supabase
    .from("submissions")
    .update({ status, reviewed_by: userId, reviewed_at: new Date().toISOString() })
    .eq("id", id);
  if (!error) {
    await supabase
      .from("submission_access_log")
      .insert({ submission_id: id, user_id: userId, action: "status_changed" });
  }
  revalidatePath(`/staff/submissions/${id}`);
  revalidatePath("/staff");
}
