import type { Metadata } from "next";
import { PillLink } from "@/components/Button";
import { Block, PageLayout } from "@/components/PageLayout";
import { COURSE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mastering Acne online course",
  description:
    "Mastering Acne, an online course by dermatologist Dr Niyati Sharma: how acne works, how to build a routine that suits your skin, and how to get the most from treatment.",
  alternates: { canonical: "/learn" },
};

// TODO: course outline (modules, length, access period) due from Niyati.
const outline = [
  { label: "Created by", value: "Dr Niyati Sharma, Dermatologist (FACD)" },
  { label: "Modules", value: "[Module list to come]" },
  { label: "Length", value: "[Course length to come]" },
  { label: "Access", value: "[How long access lasts to come]" },
];

export default function LearnPage() {
  return (
    <PageLayout
      title="Mastering Acne: our online acne course."
      intro={
        <p>
          Understand your skin, build a routine that works, and get the most from your treatment.
          Created by our dermatologist Dr Niyati Sharma, at your own pace.
        </p>
      }
    >
      <Block heading="Course outline">
        <dl className="divide-y divide-brand/40">
          {outline.map((row) => (
            <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[160px_1fr]">
              <dt className="text-brand">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <div data-reveal="up" className="border-t border-brand py-[30px]">
        <p className="text-h2 lg:text-h2-lg">$49</p>
        <p className="mt-3 text-body text-black">
          Already a Treat:Acne patient? Patient pricing is available after a completed
          consultation. Not redeemable for cash.
        </p>
        {/* TODO: Kajabi checkout link (due from Niyati) */}
        <PillLink href={COURSE_URL} className="mt-6 w-full sm:w-auto">
          Enrol now →
        </PillLink>
        <ul className="mt-6 space-y-2 text-small text-black/70">
          <li>
            The course is non-refundable once purchased, except where required by the Australian
            Consumer Law.
          </li>
          <li>
            Patient pricing is available after a completed consultation. Codes are single-use and
            not redeemable for cash.
          </li>
          <li>The course is general education only and is not medical advice.</li>
          <li>
            If your acne is painful, leaving marks or scars, or not improving, we recommend booking a
            consultation.
          </li>
        </ul>
      </div>
    </PageLayout>
  );
}
