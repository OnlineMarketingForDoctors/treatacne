import Link from "next/link";
import { faqs } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

/**
 * FAQ accordion. The home page shows the first four with a link to the full FAQ page;
 * on the FAQ page itself (no limit) the heading is the page's h1.
 */
export function Faq({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;
  const Heading = limit ? "h2" : "h1";

  return (
    <section className="grid border-t border-brand lg:grid-cols-2">
      <div className="flex flex-col justify-between gap-10 bg-brand px-[30px] py-8 text-white lg:py-[30px]">
        <div data-reveal="up" className="lg:sticky lg:top-[92px]">
          <Heading className="text-h2 lg:text-h2-lg">
            Frequently Asked
            <br />
            Questions
          </Heading>
          <p className="mt-6 max-w-[260px] text-body lg:mt-8">
            We&apos;ve got answers brought to you by Treat:Acne dermatologists.
          </p>
          {limit && (
            <Link href="/faq" className="mt-6 inline-block text-body underline underline-offset-2">
              View all FAQs →
            </Link>
          )}
        </div>
        <p className="text-body">
          Need more support?{" "}
          <Link href="/contact" className="underline underline-offset-2">
            Contact Us
          </Link>
        </p>
      </div>

      <div>
        {items.map((faq, i) => (
          <details
            key={faq.question}
            data-reveal="up"
            style={revealDelay(Math.min(i, 4) * 90)}
            className="group border-b border-brand"
          >
            <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-small lg:px-[28px] lg:text-body [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span
                aria-hidden
                className="text-[22px] leading-none transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-[560px] px-5 pb-6 text-small text-black lg:px-[28px] lg:text-body">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
