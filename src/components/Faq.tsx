import Link from "next/link";
import { faqs } from "@/lib/site";
import { FaqItems } from "@/components/FaqItems";

/**
 * FAQ accordion. The home page shows a short list (the first `limit`, plus any questions named
 * in `include`) with a link to the full FAQ page; on the FAQ page itself the heading is the h1.
 */
export function Faq({ limit, include = [] }: { limit?: number; include?: string[] }) {
  const items = limit
    ? [...faqs.slice(0, limit), ...faqs.filter((f, i) => i >= limit && include.includes(f.question))]
    : faqs;
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
            Answers reviewed by our dermatologist.
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

      <FaqItems items={items} fill={Boolean(limit)} />
    </section>
  );
}
