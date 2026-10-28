import type { Metadata } from "next";
import { Block, PageLayout } from "@/components/PageLayout";
import { contact, crisisLines } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Treat:Acne by email. Crisis support lines and emergency information.",
};

export default function ContactPage() {
  return (
    <PageLayout title="Contact us">
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
