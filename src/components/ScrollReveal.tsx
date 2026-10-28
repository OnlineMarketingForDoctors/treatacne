"use client";

import { useEffect } from "react";

/**
 * Adds `is-visible` to every `[data-reveal]` element as it scrolls into view.
 * Animation styles live in globals.css. Also picks up elements added later
 * (client-side navigation, filtered lists).
 */
export function ScrollReveal() {
  useEffect(() => {
    (window as Window & { __reveal?: boolean }).__reveal = true;
    const pending = () => document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)");

    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("reveal-ready");
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
    const observeAll = () => pending().forEach((el) => observer.observe(el));
    observeAll();

    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
