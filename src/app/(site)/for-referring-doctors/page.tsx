import type { Metadata } from "next";
import { Block, PageLayout } from "@/components/PageLayout";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "For referring doctors",
  description:
    "How GPs can refer patients to Treat:Acne for dermatologist-led telehealth acne care, by fax or email, anywhere in Australia.",
  alternates: { canonical: "/for-referring-doctors" },
};

const link = "text-brand underline underline-offset-2";

// TODO: Niyati to review and add anything GPs need (referral template, provider details)
export default function ReferringDoctorsPage() {
  return (
    <PageLayout
      title="For referring doctors"
      intro={
        <p>
          Treat:Acne offers dermatologist-led acne care by telehealth, anywhere in Australia. Your
          patient starts with a free phone consultation with our acne nurse, then sees our
          dermatologist by secure video.
        </p>
      }
    >
      <Block heading="How to refer">
        <p>
          Address the referral to our dermatologist, Dr Niyati Sharma, and fax it to{" "}
          {contact.fax} or email it to{" "}
          <a href={`mailto:${contact.email}`} className={link}>
            {contact.email}
          </a>
          . Patients can also upload the referral themselves in our Get Started form.
        </p>
        <p>
          A valid referral lets your patient claim a Medicare rebate for their dermatologist
          consultation.
        </p>
      </Block>
      <Block heading="Questions">
        <p>
          Call or text{" "}
          <a href={`tel:${contact.phoneTel}`} className={link}>
            {contact.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${contact.email}`} className={link}>
            {contact.email}
          </a>
          . We respond within 2 working days.
        </p>
      </Block>
    </PageLayout>
  );
}
