import type { MetadataRoute } from "next";

export const SITE_URL = "https://treatacne.com.au";

const paths = [
  "",
  "/about",
  "/how-it-works",
  "/pricing",
  "/severe-persistent-acne",
  "/faq",
  "/learn",
  "/photo-guide",
  "/quiz",
  "/shop",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${SITE_URL}${path}` }));
}
