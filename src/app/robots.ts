import type { MetadataRoute } from "next";
import { SITE_INDEXABLE } from "@/lib/site";
import { SITE_URL } from "./sitemap";

export default function robots(): MetadataRoute.Robots {
  // Crawling stays allowed while hidden, so search engines can see the noindex and drop the pages
  if (!SITE_INDEXABLE) return { rules: { userAgent: "*", allow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
