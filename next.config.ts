import type { NextConfig } from "next";
import { SITE_INDEXABLE } from "./src/lib/site";

const nextConfig: NextConfig = {
  // Pre-launch: noindex on every response (pages, images, files)
  async headers() {
    if (SITE_INDEXABLE) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
