import type { Metadata } from "next";
import Link from "next/link";
import { AustraliaOutline } from "@/components/AustraliaOutline";
import { FinalCta } from "@/components/FinalCta";
import { contact, crisisLines, responseTime } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, text, email or message Treat:Acne, a telehealth acne service available Australia-wide. We respond within 2 working days.",
  alternates: { canonical: "/contact" },
};

const label = "text-small text-black/70";
const pill =
  "inline-flex h-[42px] items-center justify-center rounded-full border border-brand px-7 text-body transition-colors";

export default function ContactPage() {
  return (
    <>
      <div className="mx-auto max-w-[1100px] px-5 pt-10 pb-12 lg:px-[30px] lg:pt-[60px] lg:pb-[80px]">
        <h1 data-reveal="up" className="text-h2 lg:text-h2-lg">
          Contact us
        </h1>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:mt-10 lg:gap-[30px]">
          <section data-reveal="up" aria-labelledby="contact-mobile" className="rounded-2xl bg-[#fcede6] p-6 lg:p-8">
            <h2 id="contact-mobile" className="text-small">
              Mobile
            </h2>
            <p className="mt-3 text-[32px] leading-none text-black lg:text-[40px]">
              <a href={`tel:${contact.phoneTel}`} className="hover:text-brand">
                {contact.phone}
              </a>
            </p>
            <p className="mt-4 text-body text-black">You can call or text us on this number.</p>
            <div className="mt-6 flex gap-3">
              <a href={`tel:${contact.phoneTel}`} className={`${pill} bg-brand text-white hover:bg-brand-soft`}>
                Call
              </a>
              <a href={`sms:${contact.phoneTel}`} className={`${pill} bg-white hover:bg-brand hover:text-white`}>
                Text
              </a>
            </div>
          </section>

          <section data-reveal="up" style={revealDelay(100)} className="space-y-5 rounded-2xl bg-cream p-6 lg:p-8">
            <div>
              <h2 className={label}>Email</h2>
              <a
                href={`mailto:${contact.email}`}
                className="mt-1 inline-block text-big text-black underline underline-offset-2 hover:text-brand"
              >
                {contact.email}
              </a>
            </div>
            <div>
              <h2 className={label}>Fax (GP referrals)</h2>
              <p className="mt-1 text-big text-black">{contact.fax}</p>
              <Link href="/for-referring-doctors" className="mt-1 inline-block text-small underline underline-offset-2">
                Information for referring doctors →
              </Link>
            </div>
            <div>
              <h2 className={label}>Response time</h2>
              <p className="mt-1 text-big text-black">We&apos;ll respond {responseTime}.</p>
            </div>
          </section>
        </div>

        <p data-reveal="up" className="mt-8 border-y border-brand/40 py-4 text-body text-black">
          {contact.company} · ABN {contact.abn} · Telehealth service, Australia-wide
        </p>

        <section
          data-reveal="up"
          aria-labelledby="contact-telehealth"
          className="mt-8 grid items-center gap-6 rounded-2xl bg-[#fcede6] p-6 sm:grid-cols-[200px_1fr] lg:gap-10 lg:p-8"
        >
          <AustraliaOutline className="w-[180px] sm:w-full" />
          <div>
            <h2 id="contact-telehealth" className="text-[22px] leading-[1.2] lg:text-[26px]">
              Australia-wide telehealth
            </h2>
            <p className="mt-3 max-w-[520px] text-body text-black">
              Wherever you live, from the city to the bush, you can see our team by phone and secure
              video. No clinic visit needed.
            </p>
          </div>
        </section>

        <section data-reveal="up" aria-labelledby="contact-form" className="mt-12">
          <h2 id="contact-form" className="text-[22px] leading-[1.2] lg:text-[26px]">
            Send us a message
          </h2>
          <div className="mt-5">
            <ContactForm />
          </div>
        </section>

        <section
          data-reveal="up"
          aria-labelledby="contact-crisis"
          className="mt-12 rounded-2xl bg-[#2a1d17] p-6 text-white lg:p-8"
        >
          <h2 id="contact-crisis" className="text-big font-bold">
            Need to talk now? Free 24/7 support
          </h2>
          <p className="mt-3 text-body">
            {crisisLines.map((line, i) => (
              <span key={line.name}>
                {i > 0 && " · "}
                {line.name}
                {line.name === "Kids Helpline" ? " (ages 5–25)" : ""}:{" "}
                <a href={`tel:${line.tel}`} className="font-bold underline underline-offset-2">
                  {line.number}
                </a>
              </span>
            ))}
          </p>
          <p className="mt-3 text-small text-white/85">
            Treat:Acne is not an emergency service. If you need urgent help, call{" "}
            <a href="tel:000" className="underline underline-offset-2">
              000
            </a>
            .
          </p>
        </section>
      </div>
      <FinalCta />
    </>
  );
}
