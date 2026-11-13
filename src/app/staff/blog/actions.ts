"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/staff";
import { blogCategories, slugify } from "@/lib/blog";

// TGA: no medicine names on public pages. Checked before a post can be published.
const MEDICINE_NAMES = [
  "isotretinoin", "roaccutane", "accutane", "oratane", "doxycycline", "minocycline", "spironolactone",
  "tretinoin", "adapalene", "differin", "epiduo", "clindamycin", "benzoyl peroxide", "azelaic acid",
  "trifarotene", "tazarotene", "yasmin", "yaz", "diane", "brenda", "erythromycin", "cyproterone",
];

const postInput = z.object({
  id: z.uuid().optional(),
  title: z.string().trim().min(1, "Add a title.").max(200),
  slug: z.string().trim().max(80).optional(),
  category: z.enum(blogCategories as [string, ...string[]]),
  excerpt: z.string().trim().min(1, "Add the opening line (used as the summary and meta description).").max(400),
  body: z.string().trim().min(1, "Add the article text."),
  nurseCta: z.string().trim().max(300).optional(),
  coverImage: z.string().trim().max(300).optional(),
  coverAlt: z.string().trim().max(300).optional(),
  status: z.enum(["draft", "published"]),
  publishDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a publish date."),
  lastReviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
});

export type SaveResult = { ok: true; id: string } | { ok: false; error: string };

export async function savePost(input: z.input<typeof postInput>): Promise<SaveResult> {
  const { supabase, userId } = await requireAdmin();
  const parsed = postInput.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const p = parsed.data;
  const slug = slugify(p.slug || p.title);
  if (!slug) return { ok: false, error: "Add a web address (slug)." };

  if (p.status === "published") {
    const text = `${p.title} ${p.excerpt} ${p.body} ${p.nurseCta ?? ""}`.toLowerCase();
    const found = MEDICINE_NAMES.filter((m) => new RegExp(`\\b${m}\\b`).test(text));
    if (found.length) {
      return { ok: false, error: `Remove medicine names before publishing (TGA): ${found.join(", ")}. You can still save it as a draft.` };
    }
    if (p.coverImage && !p.coverAlt) return { ok: false, error: "Add alt text for the cover image before publishing." };
  }

  const row = {
    slug,
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
    body: p.body,
    nurse_cta: p.nurseCta || null,
    cover_image: p.coverImage || null,
    cover_alt: p.coverAlt || null,
    status: p.status,
    publish_date: p.publishDate,
    last_reviewed: p.lastReviewed || null,
    updated_at: new Date().toISOString(),
    updated_by: userId,
  };
  const query = p.id
    ? supabase.from("blog_posts").update(row).eq("id", p.id).select("id").single()
    : supabase.from("blog_posts").insert(row).select("id").single();
  const { data, error } = await query;
  if (error) {
    if (error.code === "23505") return { ok: false, error: "Another post already uses that web address (slug)." };
    console.error("Failed to save post", error);
    return { ok: false, error: "The post couldn't be saved. Please try again." };
  }
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/learn");
  revalidatePath("/staff/blog");
  return { ok: true, id: data.id };
}

export async function deletePost(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = z.uuid().safeParse(formData.get("id"));
  if (!id.success) return;
  await supabase.from("blog_posts").delete().eq("id", id.data);
  revalidatePath("/blog");
  revalidatePath("/learn");
  revalidatePath("/staff/blog");
  redirect("/staff/blog");
}
