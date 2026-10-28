import type { Metadata } from "next";
import { PillLink } from "@/components/Button";
import { Block, OfferTerms, PageLayout } from "@/components/PageLayout";
import { BOOKING_URL, keyMessage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Book your free 30-minute consultation with our trained acne nurses.",
};

// TEMPORARY: replaced by the 3-step Get Started form (with secure storage) in the next phase.
export default function GetStartedPage() {
  return (
    <PageLayout
      title="Let's get started"
      intro={
        <>
          <p>{keyMessage}</p>
          <OfferTerms />
        </>
      }
    >
      <Block heading="Book your free nurse consultation">
        <p>
          Our acne nurse will call you by phone within 2 business days, review your history and
          guide you to the right doctor.
        </p>
      </Block>
      <div data-reveal="up" className="border-t border-brand pt-[30px]">
        <PillLink href={BOOKING_URL} className="w-full sm:w-auto">
          Book your free nurse consultation →
        </PillLink>
      </div>
    </PageLayout>
  );
}
