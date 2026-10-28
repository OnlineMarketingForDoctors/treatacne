import Link from "next/link";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section className="grid border-t border-brand lg:grid-cols-2">
      <div className="flex flex-col justify-between gap-10 bg-brand px-[30px] py-8 text-white lg:py-[30px]">
        <div>
          <h2 className="text-h2 lg:text-h2-lg">
            Frequently Asked
            <br />
            Questions
          </h2>
          <p className="mt-6 max-w-[260px] text-body lg:mt-8">
            We&apos;ve got answers brought to you by Treat:Acne dermatologists.
          </p>
        </div>
        <p className="text-body">
          Need more support?{" "}
          <Link href="/contact" className="underline underline-offset-2">
            Contact Us
          </Link>
        </p>
      </div>

      <div>
        {faqs.map((faq) => (
          <details key={faq.question} className="group border-b border-brand">
            <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 px-5 py-4 text-small lg:px-[28px] lg:text-body [&::-webkit-details-marker]:hidden">
              {faq.question}
              <span
                aria-hidden
                className="text-[22px] leading-none transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="max-w-[560px] px-5 pb-6 text-small text-brand/80 lg:px-[28px] lg:text-body">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
