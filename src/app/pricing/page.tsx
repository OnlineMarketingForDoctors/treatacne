import type { Metadata } from "next";
import Link from "next/link";
import { Block, OfferTerms, PageLayout } from "@/components/PageLayout";
import { prices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Your first 30-minute consultation is free with our trained acne nurses. GP consultations $99. Dermatologist consultations $365 (first) and $280 (review).",
};

export default function PricingPage() {
  return (
    <PageLayout
      title="Simple, transparent pricing"
      intro={
        <>
          <p>
            Your first 30-minute consultation is FREE with our trained acne nurses, and GP
            consultations are $99. No subscriptions. No lock-in. You only pay for the care you need.
          </p>
          <OfferTerms />
        </>
      }
    >
      <div data-reveal="up" className="border-t border-brand py-[30px]">
        <table className="w-full text-left text-body">
          <caption className="sr-only">Consultation fees</caption>
          <thead>
            <tr className="border-b border-brand">
              <th scope="col" className="pb-3 font-normal">
                Service
              </th>
              <th scope="col" className="pb-3 text-right font-normal">
                Fee
              </th>
            </tr>
          </thead>
          <tbody>
            {prices.map((row) => (
              <tr key={row.service} className="border-b border-brand/40">
                <td className="py-4 pr-6 text-black">{row.service}</td>
                <td className="py-4 text-right whitespace-nowrap lg:text-big">{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Block heading="Medicare rebates">
        <p>
          Dermatologist consultations attract a Medicare rebate with a valid referral. Don&apos;t
          have one? Our GP can refer you, or you can see a dermatologist without a referral at the
          full private fee. GP consultations are a flat $99 with no Medicare rebate.
        </p>
      </Block>

      <Block heading="No Medicare or visiting from overseas?">
        <p>
          You&apos;re welcome to book. Fees are charged at the full private rate. Some overseas
          visitor and private health covers may reimburse part of the cost, so check with your
          provider. We include the item number on every dermatologist receipt so you can claim.
        </p>
      </Block>

      <Block heading="Severe or persistent acne">
        <p>
          If your acne needs longer-term care with a dermatologist, we&apos;ll explain your visit
          schedule and costs at your first consultation.{" "}
          <Link href="/severe-persistent-acne" className="text-brand underline underline-offset-2">
            Learn more
          </Link>
        </p>
      </Block>

      <Block heading="Medication">
        <p>
          Paid directly to the pharmacy. Have it posted to you, or collect it from your local
          pharmacy.
        </p>
      </Block>

      <Block heading="Blood tests">
        <p>
          If you need them, we email you a request form to use at any pathology collection centre.
          Results come straight to us, and we&apos;ll be in touch.
        </p>
      </Block>

      <Block heading="Payments and cancellations" id="payments">
        <p>
          All consultation fees are paid in advance through our secure payment system before your
          consultation goes ahead. Dermatologist bookings need a $100 deposit, credited to your
          consultation. Cancel more than 24 hours ahead for a full refund. Missed appointments, or
          cancellations within 24 hours, forfeit the payment or deposit.
        </p>
      </Block>
    </PageLayout>
  );
}
