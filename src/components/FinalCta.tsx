import { CourseLine } from "@/components/CourseLine";
import { OfferTermsText } from "@/components/OfferTermsText";
import { PillLink } from "@/components/Button";
import { GET_STARTED_URL } from "@/lib/site";

// "Let's get started" band above the footer: cream with orange text and button.
export function FinalCta({ pricingLink = true }: { pricingLink?: boolean }) {
  return (
    <section className="bg-cream px-5 py-[90px] text-center lg:py-[85px]">
      <div data-reveal="up">
        <h2 className="text-h2 lg:text-h2-lg">Let&apos;s get started</h2>
        <p className="mt-5 text-body">Your first nurse consultation is free.</p>
        <PillLink href={GET_STARTED_URL} className="mt-9 w-[230px]">
          Start My Journey →
        </PillLink>
        {/* Terms must accompany the free-consultation offer */}
        <p className="mx-auto mt-8 max-w-[560px] text-note text-brand/80">
          <OfferTermsText full pricingLink={pricingLink} />
        </p>
        <CourseLine className="mx-auto mt-4 max-w-[560px] text-brand/80" />
      </div>
    </section>
  );
}
