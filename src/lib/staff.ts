import "server-only";
import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/server";

export const statusLabels: Record<string, string> = {
  uploading: "Incomplete",
  new: "New",
  reviewed: "Reviewed",
  added_to_xestro: "Added to Xestro",
};

export const formatDateTime = (iso: string) =>
  new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));

/**
 * Every staff page calls this. Requires a signed-in user who has completed two-factor
 * (aal2) and is listed in staff_members; database row-level security enforces the same.
 */
export async function requireStaff() {
  const supabase = await createSessionClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims) redirect("/staff/login");
  if (claims.aal !== "aal2") redirect("/staff/mfa");
  const { data: member } = await supabase
    .from("staff_members")
    .select("name")
    .eq("user_id", claims.sub)
    .maybeSingle();
  if (!member) redirect("/staff/no-access");
  return { supabase, userId: claims.sub, name: member.name as string };
}
