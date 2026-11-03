import type { Metadata } from "next";
import { Block, PageLayout } from "@/components/PageLayout";
import { contact, crisisLines } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, text or email Treat:Acne. Crisis support lines and emergency information.",
};

export default function ContactPage() {
  return (
    <PageLayout title="Contact us">
      <Block heading="Phone">
        <p>
          <a
            href={`tel:${contact.phoneTel}`}
            className="text-big text-brand underline underline-offset-2"
          >
            {contact.phone}
          </a>
        </p>
        <p>
          You can call or{" "}
          <a href={`sms:${contact.phoneTel}`} className="text-brand underline underline-offset-2">
            text us
          </a>{" "}
          on this number.
        </p>
      </Block>

      <Block heading="Email">
        <p>
          <a
            href={`mailto:${contact.email}`}
            className="text-big text-brand underline underline-offset-2"
          >
            {contact.email}
          </a>
        </p>
      </Block>

      <Block heading="Address">
        <p>
          {contact.company}
          <br />
          {contact.address}
        </p>
      </Block>

      <Block heading="Crisis support">
        <ul className="space-y-2">
          {crisisLines.map((line) => (
            <li key={line.name}>
              {line.name} ({line.note}):{" "}
              <a href={`tel:${line.tel}`} className="text-brand underline underline-offset-2">
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
