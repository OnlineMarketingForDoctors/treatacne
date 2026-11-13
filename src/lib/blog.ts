// Blog: shared types, slugs and the public queries. Posts live in Supabase (blog_posts);
// the public can only read published posts whose publish date has arrived (row-level security).
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "@/lib/supabase/env";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  cover_image: string | null;
  cover_alt: string | null;
  nurse_cta: string | null;
  status: "draft" | "published";
  publish_date: string;
  last_reviewed: string | null;
  updated_at: string;
};

export const BLOG_BUCKET = "blog-images";
export const blogCategories = ["Acne basics", "Life stages", "Skincare", "Lifestyle", "Treatment", "Wellbeing"];
export const REVIEWER = "Dr Niyati Sharma, FACD, dermatologist";
export const DEFAULT_NURSE_CTA = "Book your free nurse consultation";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-")
    .slice(0, 80)
    .replace(/-$/, "");

export const coverUrl = (path: string | null) =>
  path ? `${SUPABASE_URL}/storage/v1/object/public/${BLOG_BUCKET}/${path}` : null;

/** "Mon 23 Nov 2026" */
export const formatPostDate = (iso: string) =>
  new Intl.DateTimeFormat("en-AU", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    .format(new Date(`${iso}T00:00:00Z`))
    .replace(",", "");

// Public reads use the publishable key, so row-level security decides what's visible
const publicClient = () => createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { persistSession: false } });

const fields = "id, slug, title, excerpt, body, category, cover_image, cover_alt, nurse_cta, status, publish_date, last_reviewed, updated_at";

export async function listPublishedPosts(limit?: number): Promise<BlogPost[]> {
  let q = publicClient().from("blog_posts").select(fields).order("publish_date", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error) console.error("Failed to load blog posts", error);
  return (data as BlogPost[] | null) ?? [];
}

export async function getPublishedPost(slug: string): Promise<BlogPost | null> {
  const { data } = await publicClient().from("blog_posts").select(fields).eq("slug", slug).maybeSingle();
  return (data as BlogPost | null) ?? null;
}
