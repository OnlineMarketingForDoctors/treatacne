import type { Metadata } from "next";
import { Block, PageLayout } from "@/components/PageLayout";
import { contact, crisisLines, responseTime } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, text, email or message Treat:Acne, a telehealth acne service available Australia-wide. We respond within 2 working days.",
  alternates: { canonical: "/contact" },
};

const link = "text-brand underline underline-offset-2";

export default function ContactPage() {
  return (
    <PageLayout title="Contact us">
      <Block heading="Mobile">
        <p>
          <a href={`tel:${contact.phoneTel}`} className={`text-big ${link}`}>
            {contact.phone}
          </a>
        </p>
        <p>
          You can call or{" "}
          <a href={`sms:${contact.phoneTel}`} className={link}>
            text us
          </a>{" "}
          on this number.
        </p>
      </Block>

      <Block heading="Email">
        <p>
          <a href={`mailto:${contact.email}`} className={`text-big ${link}`}>
            {contact.email}
          </a>
        </p>
        <p>We&apos;ll respond {responseTime}.</p>
      </Block>

      <Block heading="Fax">
        <p>{contact.fax}</p>
      </Block>

      <Block heading="Send us a message">
        <ContactForm />
      </Block>

      <Block heading="Business">
        <p>
          {contact.company} · ABN {contact.abn} · Telehealth service, Australia-wide
        </p>
      </Block>

      <Block heading="Crisis support">
        <ul className="space-y-2">
          {crisisLines.map((line) => (
            <li key={line.name}>
              {line.name} ({line.note}):{" "}
              <a href={`tel:${line.tel}`} className={link}>
                {line.number}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-bold">
          Treat:Acne is not an emergency service. If you need urgent help, call{" "}
          <a href="tel:000" className="underline underline-offset-2">
            000
          </a>
          .
        </p>
      </Block>
    </PageLayout>
  );
}
