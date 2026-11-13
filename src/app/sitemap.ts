import type { MetadataRoute } from "next";
import { listPublishedPosts } from "@/lib/blog";

export const SITE_URL = "https://treatacne.com.au";

const paths = [
  "",
  "/about",
  "/how-it-works",
  "/pricing",
  "/severe-persistent-acne",
  "/faq",
  "/learn",
  "/blog",
  "/photo-guide",
  "/quiz",
  "/shop",
  "/contact",
  "/referrals",
  "/feedback-and-complaints",
  "/accessibility",
  "/privacy-policy",
  "/terms-of-use",
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPublishedPosts();
  return [
    ...paths.map((path) => ({ url: `${SITE_URL}${path}` })),
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.updated_at })),
  ];
}
