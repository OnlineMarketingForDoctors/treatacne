"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds `is-visible` to every `[data-reveal]` element as it scrolls into view.
 * Animation styles live in globals.css. Re-scans on route change.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    (window as Window & { __reveal?: boolean }).__reveal = true;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px", threshold: 0.1 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
