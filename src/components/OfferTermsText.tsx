import Link from "next/link";
import { footerCtaTerms, freeConsultTerms } from "@/lib/site";

/**
 * The free-consultation terms with a link to Pricing (inline, inherits colour).
 * `full` is the longer wording used in the "Let's get started" band.
 */
export function OfferTermsText({
  full = false,
  pricingLink = true,
}: {
  full?: boolean;
  pricingLink?: boolean;
}) {
  return (
    <>
      {full ? footerCtaTerms : freeConsultTerms}
      {pricingLink && (
        <>
          {" "}
          <Link href="/pricing" className="underline underline-offset-2">
            See Pricing
          </Link>
          .
        </>
      )}
    </>
  );
}
