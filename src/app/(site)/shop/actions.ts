"use server";

import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";

const input = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  website: z.string().optional(), // honeypot
});

/** Adds an email to the Shop waitlist (its own table, separate from patient records). */
export async function joinWaitlist(raw: z.input<typeof input>): Promise<{ ok: boolean; error?: string }> {
  const parsed = input.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "Please enter a valid email address." };
  if (parsed.data.website) return { ok: true };
  const { error } = await createAdminClient()
    .from("shop_waitlist")
    .upsert({ email: parsed.data.email }, { onConflict: "email", ignoreDuplicates: true });
  if (error) {
    console.error("Failed to save waitlist email", error);
    return { ok: false, error: "Sorry, that didn't work. Please try again in a moment." };
  }
  return { ok: true };
}
