import type { Metadata } from "next";
import { contact, INTAKE_FORM_ONLINE } from "@/lib/site";
import { GetStartedForm } from "./GetStartedForm";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "A short form about your skin and a few photos, then book your free phone consultation with our acne nurse.",
  // Patient intake form: keep out of search results
  robots: { index: false },
};

// No analytics or marketing pixels on this page (build guide: privacy)
export default async function GetStartedPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const { preview } = await searchParams;
  // Can be taken offline until the Privacy Policy and Terms of Use are published
  if (!INTAKE_FORM_ONLINE && preview !== "1") {
    return (
      <div className="mx-auto max-w-[705px] px-5 py-16 text-center lg:py-24">
        <h1 className="text-h2 lg:text-h2-lg">Our online form is opening soon</h1>
        <p className="mt-6 text-body text-black lg:text-big">
          In the meantime, call or text us on{" "}
          <a href={`tel:${contact.phoneTel}`} className="text-brand underline underline-offset-2">
            {contact.phone}
          </a>{" "}
          or email{" "}
          <a href={`mailto:${contact.email}`} className="text-brand underline underline-offset-2">
            {contact.email}
          </a>
          .
        </p>
      </div>
    );
  }
  return <GetStartedForm />;
}
