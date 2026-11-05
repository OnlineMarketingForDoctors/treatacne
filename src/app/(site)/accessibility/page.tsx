import type { Metadata } from "next";
import { Block, PageLayout } from "@/components/PageLayout";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Treat:Acne aims to meet the WCAG 2.1 AA accessibility standard. Tell us if you have trouble using any part of the site.",
  alternates: { canonical: "/accessibility" },
};

const link = "text-brand underline underline-offset-2";

export default function AccessibilityPage() {
  return (
    <PageLayout title="Accessibility">
      <Block heading="Accessibility statement">
        <p>
          We want everyone to be able to use our website. We aim to meet the WCAG 2.1 AA standard.
          If you have trouble using any part of the site, please text{" "}
          <a href={`sms:${contact.phoneTel}`} className={link}>
            {contact.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${contact.email}`} className={link}>
            {contact.email}
          </a>{" "}
          and we&apos;ll help.
        </p>
        <p>
          Need an interpreter? Call TIS National on{" "}
          <a href="tel:131450" className={link}>
            131 450
          </a>
          .
        </p>
      </Block>
    </PageLayout>
  );
}
