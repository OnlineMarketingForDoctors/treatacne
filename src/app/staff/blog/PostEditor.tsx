"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { wordCount } from "@/components/blog/BlogBody";
import { BLOG_BUCKET, blogCategories, coverUrl, slugify, type BlogPost } from "@/lib/blog";
import { createStaffBrowserClient } from "@/lib/supabase/browser";
import { savePost } from "./actions";

const input = "w-full rounded-lg border border-brand/40 bg-white px-3 py-2 text-body text-black focus:border-brand focus:outline-none";
const label = "block text-small text-black";
const hint = "mt-1 text-note text-black/60";

type Draft = Partial<BlogPost>;

export function PostEditor({ post }: { post?: Draft }) {
  const router = useRouter();
  const [p, setP] = useState<Draft>(
    post ?? { category: blogCategories[0], status: "draft", publish_date: "", body: "", title: "", excerpt: "" },
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(post?.slug));
  const [error, setError] = useState("");
  const [saved, setSaved] = useState("");
  const [uploading, setUploading] = useState(false);
  const [pending, start] = useTransition();
  const set = (k: keyof Draft, v: string) => {
    setSaved("");
    setP((prev) => ({ ...prev, [k]: v, ...(k === "title" && !slugTouched ? { slug: slugify(v) } : {}) }));
  };

  const upload = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) return setError("Use a JPG, PNG or WebP image.");
    if (file.size > 5 * 1024 * 1024) return setError("The image must be under 5 MB.");
    setUploading(true);
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const path = `${slugify(p.slug || p.title || "post") || "post"}-${Date.now().toString(36)}.${ext}`;
    const { error: upErr } = await createStaffBrowserClient().storage.from(BLOG_BUCKET).upload(path, file, {
      contentType: file.type,
      cacheControl: "31536000",
    });
    setUploading(false);
    if (upErr) return setError("The image couldn't be uploaded. Please try again.");
    set("cover_image", path);
  };

  const save = (status: "draft" | "published") =>
    start(async () => {
      setError("");
      const res = await savePost({
        id: p.id,
        title: p.title ?? "",
        slug: p.slug ?? "",
        category: p.category ?? blogCategories[0],
        excerpt: p.excerpt ?? "",
        body: p.body ?? "",
        nurseCta: p.nurse_cta ?? "",
        coverImage: p.cover_image ?? "",
        coverAlt: p.cover_alt ?? "",
        status,
        publishDate: p.publish_date ?? "",
        lastReviewed: p.last_reviewed ?? "",
      });
      if (!res.ok) return setError(res.error);
      setP((prev) => ({ ...prev, id: res.id, status }));
      setSaved(status === "published" ? "Saved and set to Published." : "Saved as a draft.");
      if (!p.id) router.replace(`/staff/blog/${res.id}`);
      else router.refresh();
    });

  const cover = coverUrl(p.cover_image ?? null);
  const words = wordCount(p.body ?? "");

  return (
    <form onSubmit={(e) => e.preventDefault()} className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className="space-y-5 rounded-2xl bg-white p-5 lg:p-6">
        <div>
          <label htmlFor="title" className={label}>Title</label>
          <input id="title" className={`${input} mt-1 text-big`} value={p.title ?? ""} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <label htmlFor="slug" className={label}>Web address</label>
          <div className="mt-1 flex items-center gap-1 text-small text-black/60">
            <span>/blog/</span>
            <input
              id="slug"
              className={input}
              value={p.slug ?? ""}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value);
              }}
              onBlur={(e) => set("slug", slugify(e.target.value))}
            />
          </div>
        </div>
        <div>
          <label htmlFor="excerpt" className={label}>Opening line / summary</label>
          <textarea id="excerpt" rows={3} className={`${input} mt-1`} value={p.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)} />
          <p className={hint}>Shown on the blog cards and used as the meta description for Google. {(p.excerpt ?? "").length}/400</p>
        </div>
        <div>
          <label htmlFor="body" className={label}>Article</label>
          <textarea id="body" rows={22} className={`${input} mt-1 font-mono text-small`} value={p.body ?? ""} onChange={(e) => set("body", e.target.value)} />
          <p className={hint}>
            {words} words (aim for about 400). Formatting: start a line with <code>## </code> for a heading,{" "}
            <code>- </code> for a bullet point; <code>**bold**</code>; <code>[link text](https://…)</code>. Leave a blank line between paragraphs.
          </p>
        </div>
        <div>
          <label htmlFor="nurse_cta" className={label}>Lead-in to the buttons (optional)</label>
          <textarea id="nurse_cta" rows={2} className={`${input} mt-1`} value={p.nurse_cta ?? ""} onChange={(e) => set("nurse_cta", e.target.value)} />
          <p className={hint}>One sentence shown above the course and nurse consultation buttons at the end of the article.</p>
        </div>
      </div>

      <aside className="space-y-5">
        <div className="space-y-4 rounded-2xl bg-white p-5">
          <p className="text-small">
            Status: <strong className="font-bold">{p.status === "published" ? "Published" : "Draft"}</strong>
          </p>
          <div>
            <label htmlFor="publish_date" className={label}>Publish date</label>
            <input id="publish_date" type="date" className={`${input} mt-1`} value={p.publish_date ?? ""} onChange={(e) => set("publish_date", e.target.value)} />
            <p className={hint}>A published post appears on the site on this date.</p>
          </div>
          <div>
            <label htmlFor="last_reviewed" className={label}>Last reviewed (optional)</label>
            <input id="last_reviewed" type="date" className={`${input} mt-1`} value={p.last_reviewed ?? ""} onChange={(e) => set("last_reviewed", e.target.value)} />
          </div>
          <div>
            <label htmlFor="category" className={label}>Category</label>
            <select id="category" className={`${input} mt-1`} value={p.category ?? blogCategories[0]} onChange={(e) => set("category", e.target.value)}>
              {blogCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          {error && <p role="alert" className="text-small text-red-700">{error}</p>}
          {saved && <p role="status" className="text-small text-[#1f8a4c]">{saved}</p>}
          <div className="flex flex-col gap-2">
            <button type="button" disabled={pending || uploading} onClick={() => save("draft")} className="rounded-full border border-brand bg-white px-5 py-2.5 text-small hover:bg-[#fcede6] disabled:opacity-50">
              {pending ? "Saving…" : "Save draft"}
            </button>
            <button type="button" disabled={pending || uploading} onClick={() => save("published")} className="rounded-full bg-brand px-5 py-2.5 text-small text-white hover:bg-brand-soft disabled:opacity-50">
              {p.status === "published" ? "Update published post" : "Publish"}
            </button>
            {p.id && (
              <Link href={`/staff/blog/${p.id}/preview`} target="_blank" className="text-center text-small text-brand underline underline-offset-2">
                Preview (saved version) ↗
              </Link>
            )}
          </div>
          <p className={hint}>Only publish after Dr Sharma has reviewed the article.</p>
        </div>

        <div className="space-y-3 rounded-2xl bg-white p-5">
          <p className={label}>Image</p>
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element -- Supabase public image
            <img src={cover} alt={p.cover_alt ?? ""} className="aspect-[16/9] w-full rounded-lg object-cover" />
          ) : (
            <div className="flex aspect-[16/9] items-center justify-center rounded-lg border border-dashed border-brand bg-cream text-note text-black/60">No image yet</div>
          )}
          <label className="block cursor-pointer text-small text-brand underline underline-offset-2">
            {uploading ? "Uploading…" : cover ? "Replace image" : "Upload image"}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(e) => upload(e.target.files?.[0])} />
          </label>
          {cover && (
            <button type="button" onClick={() => set("cover_image", "")} className="block text-note text-black/60 underline underline-offset-2">
              Remove image
            </button>
          )}
          <div>
            <label htmlFor="cover_alt" className={label}>Alt text</label>
            <textarea id="cover_alt" rows={2} className={`${input} mt-1`} value={p.cover_alt ?? ""} onChange={(e) => set("cover_alt", e.target.value)} />
            <p className={hint}>Describe the image for people using screen readers.</p>
          </div>
        </div>
      </aside>
    </form>
  );
}
