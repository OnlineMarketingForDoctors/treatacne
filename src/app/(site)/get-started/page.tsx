import type { Metadata } from "next";
import { GetStartedForm } from "./GetStartedForm";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "A 4-minute form about your skin and a few photos, then book your free phone consultation with our acne nurse.",
  // Patient intake form: keep out of search results
  robots: { index: false },
};

// No analytics or marketing pixels on this page (build guide: privacy)
export default function GetStartedPage() {
  return <GetStartedForm />;
}
