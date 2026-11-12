import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { revealDelay } from "@/lib/reveal";
import { contact, responseTime } from "@/lib/site";

export const metadata: Metadata = {
  title: "For referring doctors",
  description:
    "How GPs and other doctors can refer patients with acne to Treat:Acne: fax, secure messaging or email. Dermatologist Dr Niyati Sharma sees patients by secure video, Australia-wide.",
  alternates: { canonical: "/referrals" },
};

// Aimed at GPs and other doctors: factual, no outcome claims (AHPRA). Not in the main nav.
const card = "rounded-2xl p-5 lg:p-6";
const link = "text-brand underline underline-offset-2";

const whoWeSee = [
  "Moderate or severe acne",
  "Acne with scarring or post-inflammatory pigmentation",
  "Acne not responding to first-line treatment",
  // Public page: no prescription medicine names (TGA)
  "Patients who may need specialist-only oral treatment",
  "Hormonal acne, including suspected PCOS",
  "Acne in skin of colour",
  "All ages; under 18s with a parent or guardian present",
];

const next = [
  { title: "Send the referral", body: "Fax, secure message or email. We confirm receipt." },
  { title: "We contact your patient", body: `Usually ${responseTime}, for a free phone call with our acne nurse.` },
  { title: "Dermatologist consultation", body: "By secure video with Dr Niyati Sharma." },
  { title: "We write back to you", body: "A letter with the diagnosis and plan after the first consultation, and at key changes." },
];

const fees = [
  "Acne nurse phone consultation: free",
  "Dermatologist first consultation: $365 (Medicare rebate with your referral)",
  "Dermatologist review: $280 (Medicare rebate with your referral)",
];

export default function ReferralsPage() {
  return (
    <>
      <section className="border-b border-brand bg-cream px-5 py-10 lg:px-[30px] lg:py-[60px]">
        <p data-reveal="up" className="text-small tracking-[0.12em] uppercase">
          For GPs and referring doctors
        </p>
        <h1 data-reveal="up" className="mt-4 text-h2 lg:text-h2-lg">
          Refer a patient with acne
        </h1>
        <p data-reveal="up" style={revealDelay(100)} className="mt-6 max-w-[760px] text-body text-black lg:text-big">
          Treat:Acne is a dermatologist-led acne telehealth service, available anywhere in Australia.
          Your patient sees dermatologist Dr Niyati Sharma (MBBS, FACD, MPH) by secure video, and we
          keep you informed.
        </p>
      </section>

      <div className="px-5 py-12 lg:px-[30px] lg:py-[60px]">
        <section>
          <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
            How to refer
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3 lg:gap-[30px]">
            <div data-reveal="up" className={`${card} bg-[#fcede6]`}>
              <h3 className="text-body">Fax</h3>
              <p className="mt-3 text-big text-black">{contact.fax}</p>
            </div>
            <div data-reveal="up" style={revealDelay(80)} className={`${card} bg-cream`}>
              <h3 className="text-body">Secure messaging</h3>
              {/* TODO: confirm the provider and ID with Xestro */}
              <p className="mt-3 text-body text-black/60">[HealthLink / Medical Objects ID to come]</p>
            </div>
            <div data-reveal="up" style={revealDelay(160)} className={`${card} bg-cream`}>
              <h3 className="text-body">Email</h3>
              <a href={`mailto:${contact.email}`} className="mt-3 inline-block text-big text-black hover:text-brand">
                {contact.email}
              </a>
              <p className="mt-2 text-small text-black/70">
                Patients can also upload your referral on our{" "}
                <Link href="/get-started" className={link}>
                  Get Started form
                </Link>
                .
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-[860px] text-body text-black">
            Address your referral to <span className="text-brand">Dr Niyati Sharma, Dermatologist, Treat:Acne</span>.
            A standard GP referral is valid for 12 months from the first dermatologist consultation,
            which lets your patient claim the Medicare rebate.
          </p>
          {/* TODO: "Download referral form (PDF)" button once Niyati sends the form */}
        </section>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-[30px]">
          <section data-reveal="up" className={`${card} border border-brand bg-[#fcede6]`}>
            <h2 className="text-[24px] leading-[1.15] lg:text-[28px]">All we need</h2>
            <p className="mt-4 text-body text-black">
              Your patient&apos;s name and contact details (mobile and email). Our acne nurse will call
              them and take the full history.
            </p>
            <p className="mt-3 text-small text-black/70">
              Any extra information, such as treatments tried or recent results, is welcome but not
              required.
            </p>
          </section>
          <section data-reveal="up" style={revealDelay(100)} className={`${card} border border-brand/40`}>
            <h2 className="text-[24px] leading-[1.15] lg:text-[28px]">Who we see</h2>
            <ul className="mt-4 space-y-1.5 text-body text-black">
              {whoWeSee.map((w) => (
                <li key={w} className="flex gap-3">
                  <span aria-hidden className="text-brand">
                    +
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-12">
          <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
            What happens next
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[30px]">
            {next.map((n, i) => (
              <li key={n.title} data-reveal="up" style={revealDelay(i * 80)} className={`${card} bg-[#fcede6]`}>
                <span aria-hidden className="text-[36px] leading-none font-light text-brand">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-body">{n.title}</h3>
                <p className="mt-2 text-small text-black">{n.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-[30px]">
          <section data-reveal="up" className={`${card} bg-cream`}>
            <h2 className="text-big">Fees for your patient</h2>
            <ul className="mt-4 space-y-1.5 text-body text-black">
              {fees.map((f) => (
                <li key={f} className="flex gap-3">
                  <span aria-hidden className="text-brand">
                    +
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/pricing" className={`mt-4 inline-block text-small ${link}`}>
              See Pricing
            </Link>
          </section>
          <section data-reveal="up" style={revealDelay(100)} className={`${card} bg-cream`}>
            <h2 className="text-big">Specialist-only treatment</h2>
            <p className="mt-4 text-body text-black">
              Where a dermatologist-only oral medicine is appropriate, it is prescribed and monitored by
              our dermatologist only, including blood tests and pregnancy prevention. We&apos;ll let you
              know when treatment starts and finishes.
            </p>
          </section>
        </div>

        <section data-reveal="up" className="mt-12 rounded-2xl bg-[#2a1d17] p-6 text-white lg:p-8">
          <h2 className="text-big font-bold">Not suitable for telehealth</h2>
          <p className="mt-3 max-w-[860px] text-body">
            Acne fulminans or acne with systemic symptoms (fever, joint pain), or any patient needing
            urgent in-person review, should be referred to an in-person dermatologist or emergency
            department.
          </p>
        </section>

        <section className="mt-12">
          <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
            Questions about a referral?
          </h2>
          <p className="mt-4 text-body text-black">
            Call or text{" "}
            <a href={`tel:${contact.phoneTel}`} className={link}>
              {contact.phone}
            </a>
            , or email{" "}
            <a href={`mailto:${contact.email}`} className={link}>
              {contact.email}
            </a>
            . We reply {responseTime}.
          </p>
        </section>
      </div>

      <FinalCta />
    </>
  );
}
