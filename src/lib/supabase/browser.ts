import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./env";

/** Staff session in the browser (used for two-factor enrolment and verification). */
export function createStaffBrowserClient() {
  return createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}

/**
 * Anonymous client for the Get Started form. It can only upload files to the one-time
 * signed upload URLs the server issues; it has no other access.
 */
export function createUploadClient() {
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
