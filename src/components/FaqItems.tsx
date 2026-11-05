"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { revealDelay } from "@/lib/reveal";

type Item = { question: string; answer: string; link?: { href: string; label: string } };

/** Accordion items as real buttons with aria-expanded (keyboard and screen-reader friendly). */
export function FaqItems({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div>
      {items.map((faq, i) => {
        const expanded = open === i;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={faq.question} data-reveal="up" style={revealDelay(Math.min(i, 4) * 90)} className="border-b border-brand">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex min-h-[72px] w-full items-center justify-between gap-6 px-5 py-4 text-left text-small lg:px-[28px] lg:text-body"
              >
                {faq.question}
                <span
                  aria-hidden
                  className={`text-[22px] leading-none transition-transform ${expanded ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div id={panelId} hidden={!expanded} className="max-w-[560px] px-5 pb-6 text-small text-black lg:px-[28px] lg:text-body">
              <p>{faq.answer}</p>
              {faq.link && (
                <Link href={faq.link.href} className="mt-3 inline-block text-brand underline underline-offset-2">
                  {faq.link.label}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
