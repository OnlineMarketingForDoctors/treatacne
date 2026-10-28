import { OfferTermsText } from "@/components/OfferTermsText";
import { PillLink } from "@/components/Button";
import { GET_STARTED_URL } from "@/lib/site";

export function FinalCta({ tone = "cream" }: { tone?: "cream" | "white" }) {
  return (
    <section
      className={`px-5 py-[90px] text-center ${tone === "cream" ? "bg-cream lg:py-[85px]" : "bg-white lg:py-[110px]"}`}
    >
      <div data-reveal="up">
        <h2 className="text-h2 lg:text-h2-lg">Let&apos;s get started</h2>
        <p className="mt-5 text-body">Your first consultation is free.</p>
        <PillLink href={GET_STARTED_URL} className="mt-9 w-[230px]">
          Start My Journey →
        </PillLink>
        {/* Terms must accompany the free-consultation offer */}
        <p className="mx-auto mt-8 max-w-[560px] text-note text-brand/80">
          <OfferTermsText />
        </p>
      </div>
    </section>
  );
}
