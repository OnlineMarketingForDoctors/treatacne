import type { Metadata } from "next";
import { Block, PageLayout } from "@/components/PageLayout";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Feedback and complaints",
  description:
    "How to give feedback or make a complaint about your care at Treat:Acne, and who else you can contact if you're not satisfied.",
  alternates: { canonical: "/feedback-and-complaints" },
};

const link = "text-brand underline underline-offset-2";

export default function FeedbackPage() {
  return (
    <PageLayout title="Feedback and complaints">
      <Block heading="We want to hear from you">
        <p>
          If you&apos;re unhappy with any part of your care, please tell us first: text or call{" "}
          <a href={`tel:${contact.phoneTel}`} className={link}>
            {contact.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${contact.email}`} className={link}>
            {contact.email}
          </a>
          . We&apos;ll acknowledge your complaint within 2 working days and aim to resolve it within
          30 days.
        </p>
      </Block>
      <Block heading="If you're not satisfied with our response">
        <p>
          You can contact the Victorian Health Complaints Commissioner (
          <a href="https://hcc.vic.gov.au" target="_blank" rel="noopener" className={link}>
            hcc.vic.gov.au
          </a>
          ,{" "}
          <a href="tel:1300582113" className={link}>
            1300 582 113
          </a>
          ).
        </p>
        <p>
          Concerns about a practitioner&apos;s conduct can be raised with AHPRA (
          <a href="https://www.ahpra.gov.au" target="_blank" rel="noopener" className={link}>
            ahpra.gov.au
          </a>
          ).
        </p>
        <p>
          Privacy complaints can also go to the Office of the Australian Information Commissioner (
          <a href="https://www.oaic.gov.au" target="_blank" rel="noopener" className={link}>
            oaic.gov.au
          </a>
          ,{" "}
          <a href="tel:1300363992" className={link}>
            1300 363 992
          </a>
          ).
        </p>
      </Block>
    </PageLayout>
  );
}
