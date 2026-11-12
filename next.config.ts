import type { NextConfig } from "next";
import { SITE_INDEXABLE } from "./src/lib/site";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/for-referring-doctors", destination: "/referrals", permanent: true }];
  },
  // Pre-launch: noindex on every response (pages, images, files)
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    if (!SITE_INDEXABLE) return [{ source: "/:path*", headers: noindex }];
    // After launch: index treatacne.com.au only, never the vercel.app addresses
    return [
      { source: "/:path*", has: [{ type: "host", value: "(?<host>.*\\.vercel\\.app)" }], headers: noindex },
    ];
  },
};

export default nextConfig;
