import type { Metadata } from "next";
import { PillLink } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import { COURSE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learn: Mastering Acne online course",
  description:
    "Mastering Acne, our online acne course. Understand your skin, build a routine that works, and get the most from your treatment.",
};

const coursePrices = [
  { label: "Public", price: "$89" },
  { label: "After a GP consultation", price: "$19.99" },
  { label: "After a dermatologist consultation", price: "Free" },
];

export default function LearnPage() {
  return (
    <PageLayout
      title="Mastering Acne — our online acne course."
      intro={
        <p>
          Understand your skin, build a routine that works, and get the most from your treatment.
        </p>
      }
    >
      <div data-reveal="up" className="border-t border-brand py-[30px]">
        <table className="w-full text-left text-body">
          <caption className="sr-only">Course prices</caption>
          <tbody>
            {coursePrices.map((row) => (
              <tr key={row.label} className="border-b border-brand/40">
                <td className="py-4 pr-6 text-black">{row.label}</td>
                <td className="py-4 text-right lg:text-big">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-small text-black italic">
          Treat:Acne patients receive their personal discount code by email after their
          consultation.
        </p>
      </div>

      <div data-reveal="up" className="border-t border-brand pt-[30px]">
        {/* TODO: Kajabi checkout link; patients enter their discount code at checkout */}
        <PillLink href={COURSE_URL} className="w-full sm:w-auto">
          Enrol now →
        </PillLink>
      </div>
    </PageLayout>
  );
}

