import { PillLink } from "@/components/Button";
import { AustraliaMap } from "./AustraliaMap";

export function Convenience() {
  return (
    <section className="p-5 lg:p-[30px]">
      {/* One orange card: text on the left, the map on the right */}
      <div data-reveal="up" className="grid overflow-hidden rounded-2xl bg-brand text-white lg:min-h-[633px] lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-12 p-5 pb-6 lg:p-[36px]">
          <h2 className="text-h2 lg:text-h2-lg">
            Designed for
            <br />
            convenience -
            <br />
            anywhere in Australia
          </h2>
          <div>
            <p className="max-w-[380px] text-small lg:text-body">
              Treat:Acne was created with busy lives and remote locations in mind. Our fully online
              model means you can get expert acne care from anywhere in Australia: no clinic visits,
              no referral needed, no waiting rooms. Your nurse calls you, your doctor sees you by
              secure video, and your treatment can be posted to your door or collected from your
              local pharmacy.
            </p>
            <PillLink href="/how-it-works" tone="light" className="mt-6 w-full lg:mt-9 lg:w-auto">
              Learn More →
            </PillLink>
          </div>
        </div>
        {/* Map of Australia: telehealth in every state and territory */}
        <div className="flex flex-col justify-center gap-8 px-5 pt-4 pb-10 lg:px-[40px] lg:py-[60px]">
          <p className="flex items-center gap-2 self-start rounded-full bg-white px-4 py-1.5 text-small text-brand">
            <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <rect x="2.5" y="6" width="13" height="12" rx="2" />
              <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
            </svg>
            Telehealth in every state and territory
          </p>
          <AustraliaMap className="mx-auto w-full max-w-[600px]" />
        </div>
      </div>
    </section>
  );
}
