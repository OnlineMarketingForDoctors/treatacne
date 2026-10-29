import "server-only";
import { Resend } from "resend";
import { contact } from "@/lib/site";

/** Public URL of this deployment (for links in emails) */
export function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

/**
 * Tells the team a new Get Started form has arrived. Per the build guide the email holds
 * only a secure link, never names, health details or photos.
 */
export async function notifyNewSubmission(submissionId: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const link = `${siteUrl()}/staff/submissions/${submissionId}`;
  if (!apiKey) {
    console.warn("RESEND_API_KEY not set: skipping new-submission email");
    return { sent: false };
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? "Treat:Acne <notifications@treatacne.com.au>",
    // NOTIFY_EMAIL can list several addresses, separated by commas
    to: (process.env.NOTIFY_EMAIL ?? contact.email).split(",").map((e) => e.trim()).filter(Boolean),
    subject: "New Get Started form submission",
    text: `A new Get Started form has been submitted.\n\nReview it securely (staff login required):\n${link}\n`,
    html: `<p>A new Get Started form has been submitted.</p><p><a href="${link}">Review it securely</a> (staff login required).</p>`,
  });
  if (error) {
    console.error("Failed to send new-submission email", error);
    return { sent: false };
  }
  return { sent: true };
}
