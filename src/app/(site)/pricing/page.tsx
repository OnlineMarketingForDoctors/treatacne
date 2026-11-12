import type { Metadata } from "next";
import Link from "next/link";
import { Block, PageLayout } from "@/components/PageLayout";
import { CourseLine } from "@/components/CourseLine";
import { PillLink } from "@/components/Button";
import { contact, GET_STARTED_URL, gpReferralNote, prices } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Treat:Acne fees: free acne nurse consultation, GP consultations $99, dermatologist $365 (first) and $280 (review), with Medicare rebates and our cancellation policy.",
  alternates: { canonical: "/pricing" },
};

// Medicare figures from the MBS, 1 July 2026. Update every 1 July (checked each June).
const rebates = [
  { visit: "First consultation", item: "91822", fee: "$365.00", rebate: "$88.40", gap: "$276.60" },
  { visit: "Review", item: "91823", fee: "$280.00", rebate: "$44.45", gap: "$235.55" },
];

const cancellations = [
  { when: "More than 24 hours before", what: "Full refund of your payment or deposit." },
  {
    when: "Within 24 hours, or a missed appointment",
    what: "Your GP consultation payment or $100 dermatologist deposit is not refunded.",
  },
  { when: "Nurse consultation", what: "Free. If you can't make it, just text us to rebook." },
];

const th = "pb-3 pr-4 font-normal";
const td = "py-4 pr-4 text-black align-top";
const link = "text-brand underline underline-offset-2";

export default function PricingPage() {
  return (
    <PageLayout
      title="Simple, transparent pricing"
      pricingLink={false}
      intro={
        <p>
          Start with a free consultation with our acne nurse, then see our dermatologist for expert,
          specialist care. Prefer a lower-cost option? Our GP consultations are $99. No
          subscriptions. No lock-in. You only pay for the care you need.
        </p>
      }
    >
      <div data-reveal="up" className="border-t border-brand py-[30px]">
        <table className="w-full text-left text-body">
          <caption className="sr-only">Consultation fees</caption>
          <thead>
            <tr className="border-b border-brand">
              <th scope="col" className={th}>
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
                <td className={td}>{row.service}</td>
                <td className="py-4 text-right align-top sm:whitespace-nowrap">{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-body text-black">
          Fees are for a complete consultation. Your doctor will take the time you need.
          Consultations are GST-free.
        </p>
        <p className="mt-3 text-body text-black">
          <strong className="font-bold">Started with our GP?</strong> {gpReferralNote}
        </p>
      </div>

      <Block heading="Your dermatologist cost with a GP referral">
        {/* Scrolls sideways on narrow phones rather than squashing the columns */}
        <div className="-mx-5 overflow-x-auto px-5">
          <table className="w-full min-w-[520px] text-left text-small lg:text-body">
            <caption className="sr-only">Dermatologist fees and Medicare rebates</caption>
            <thead>
              <tr className="border-b border-brand">
                <th scope="col" className={th}>
                  Dermatologist consultation (video)
                </th>
                <th scope="col" className={th}>
                  MBS item
                </th>
                <th scope="col" className={th}>
                  Fee
                </th>
                <th scope="col" className={th}>
                  Medicare rebate (85%)
                </th>
                <th scope="col" className="pb-3 font-normal">
                  Estimated out-of-pocket
                </th>
              </tr>
            </thead>
            <tbody>
              {rebates.map((r) => (
                <tr key={r.item} className="border-b border-brand/40">
                  <td className={td}>{r.visit}</td>
                  <td className={td}>{r.item}</td>
                  <td className={td}>{r.fee}</td>
                  <td className={td}>{r.rebate}</td>
                  <td className="py-4 align-top text-black">{r.gap}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-note text-black/70">
          Medicare rebates are set by the government and may change each year (usually on 1 July).
          Figures shown are based on the Medicare Benefits Schedule from 1 July 2026. Rebates apply
          with a valid referral from your GP or our GP. Your rebate may be higher if you&apos;ve
          reached the Medicare Safety Net. Without a referral, the full fee applies.
        </p>
      </Block>

      <Block heading="Medicare rebates">
        <p>
          Dermatologist consultations attract a Medicare rebate with a valid referral from your GP
          or our GP. GP consultations are a flat $99 with no Medicare rebate.
        </p>
      </Block>

      <Block heading="Cancellations and refunds" id="cancellations">
        <table className="w-full text-left text-body">
          <caption className="sr-only">Cancellation policy</caption>
          <thead>
            <tr className="border-b border-brand">
              <th scope="col" className={th}>
                When
              </th>
              <th scope="col" className="pb-3 font-normal">
                What happens
              </th>
            </tr>
          </thead>
          <tbody>
            {cancellations.map((c) => (
              <tr key={c.when} className="border-b border-brand/40">
                <td className={`${td} w-[40%]`}>{c.when}</td>
                <td className="py-4 align-top text-black">{c.what}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          To cancel or change an appointment, text or call{" "}
          <a href={`tel:${contact.phoneTel}`} className={link}>
            {contact.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${contact.email}`} className={link}>
            {contact.email}
          </a>
          . Fees for consultations already provided are not refundable. Nothing in this policy
          limits your rights under the Australian Consumer Law. See our{" "}
          <Link href="/terms-of-use" className={link}>
            Terms of Use
          </Link>
          .
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
          <Link href="/severe-persistent-acne" className={link}>
            Learn more
          </Link>
        </p>
      </Block>

      <Block heading="Medicine">
        <p>
          Paid directly to the pharmacy. We&apos;ll send your script to you to use at any pharmacy,
          or you can choose to have it posted to you by Edge Compounding Pharmacy. This is optional,
          and we have no financial or business relationship with Edge.
        </p>
      </Block>

      <Block heading="Blood tests">
        <p>
          If you need them, we email you a request form to use at any pathology collection centre.
          They&apos;re bulk-billed with Medicare. Results come straight to us, and we&apos;ll be in
          touch.
        </p>
      </Block>

      <Block heading="How to pay" id="payments">
        <p>
          After your nurse consultation, our nurse will send you a secure Tyro payment link by text
          or email. You can also pay by bank transfer: our nurse will give you the details. Payment
          must be received before your consultation. If it isn&apos;t, your appointment will be
          moved to a later time. Dermatologist bookings need a $100 deposit to secure the time,
          with the balance paid before the consultation.
        </p>
      </Block>

      <div data-reveal="up" className="border-t border-brand py-[30px]">
        <PillLink href={GET_STARTED_URL} className="w-full sm:w-auto">
          Get Started →
        </PillLink>
        <CourseLine className="mt-4 text-black/70" />
      </div>
    </PageLayout>
  );
}
