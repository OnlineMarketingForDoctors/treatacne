import type { Metadata } from "next";
import { GetStartedForm } from "./GetStartedForm";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Tell us about your skin and upload your photos, then book your free 30-minute consultation with our trained acne nurses.",
  // Patient intake form: keep out of search results
  robots: { index: false },
};

// No analytics or marketing pixels on this page (build guide: privacy)
export default function GetStartedPage() {
  return <GetStartedForm />;
}
