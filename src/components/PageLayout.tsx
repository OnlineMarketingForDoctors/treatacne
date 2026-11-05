import { FinalCta } from "@/components/FinalCta";
import { revealDelay } from "@/lib/reveal";

/**
 * Layout for pages not in the Figma design (Pricing, Contact, FAQ text pages…), built from
 * the About page: sticky heading on the left, content blocks on the right, then the
 * "Let's get started" banner.
 */
export function PageLayout({
  title,
  intro,
  pricingLink = true,
  children,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** false on /pricing, so the band doesn't link to the page it's on */
  pricingLink?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="grid grid-cols-1 border-b border-brand px-5 pb-10 lg:grid-cols-[34.7%_1fr] lg:px-[30px] lg:pb-[30px]">
        <div className="pt-8 pb-6 lg:pt-[28px] lg:pr-10 lg:pb-0">
          <h1
            data-reveal="up"
            className="text-h2 lg:sticky lg:top-[92px] lg:max-w-[440px] lg:text-h2-lg"
          >
            {title}
          </h1>
        </div>
        <div>
          {intro && (
            <div
              data-reveal="up"
              style={revealDelay(100)}
              className="space-y-5 pb-8 text-[18px] leading-[1.2] text-black lg:pt-[30px] lg:text-big"
            >
              {intro}
            </div>
          )}
          {children}
        </div>
      </section>
      <FinalCta pricingLink={pricingLink} />
    </>
  );
}

/** A content block with a divider above it. */
export function Block({
  heading,
  id,
  children,
}: {
  heading?: React.ReactNode;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} data-reveal="up" className="scroll-mt-[80px] border-t border-brand py-[30px]">
      {heading && <h2 className="mb-4 text-[22px] leading-[1.2] lg:text-[26px]">{heading}</h2>}
      <div className="max-w-[680px] space-y-3 text-body text-black">{children}</div>
    </div>
  );
}
