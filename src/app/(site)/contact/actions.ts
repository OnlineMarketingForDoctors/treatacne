"use server";

import { z } from "zod";
import { notifyContactMessage } from "@/lib/notify";

const contactInput = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(1).max(5000),
  // Spam checks: a hidden field people leave empty, and how long the form was open
  website: z.string().optional(),
  openedAt: z.number(),
});

export type ContactResult = { ok: true } | { ok: false; error: string };

export async function sendContactMessage(input: z.input<typeof contactInput>): Promise<ContactResult> {
  const parsed = contactInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Please check the form and try again." };
  const { website, openedAt, ...msg } = parsed.data;
  // Bots: pretend it worked so they don't retry
  if (website || Date.now() - openedAt < 3000) return { ok: true };

  const { sent } = await notifyContactMessage(msg);
  if (!sent) {
    return {
      ok: false,
      error: "Sorry, your message didn't send. Please email info@treatacne.com.au or text 0485 816 400.",
    };
  }
  return { ok: true };
}
