import Link from "next/link";
import { freeConsultTerms } from "@/lib/site";

/** The free-consultation terms with a link to Pricing (inline, inherits colour). */
export function OfferTermsText() {
  return (
    <>
      {freeConsultTerms}{" "}
      <Link href="/pricing" className="underline underline-offset-2">
        See Pricing
      </Link>
      .
    </>
  );
}
