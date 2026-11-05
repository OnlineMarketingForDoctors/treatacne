"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GET_STARTED_URL } from "@/lib/site";

/** Sticky "Get Started" bar on phones (hidden on the form itself). */
export function MobileGetStarted() {
  const pathname = usePathname();
  if (pathname.startsWith(GET_STARTED_URL)) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/40 bg-brand-soft lg:hidden">
      <Link
        href={GET_STARTED_URL}
        className="flex h-[52px] items-center justify-center text-body text-white transition-colors hover:bg-brand"
      >
        Get Started →
      </Link>
    </div>
  );
}
