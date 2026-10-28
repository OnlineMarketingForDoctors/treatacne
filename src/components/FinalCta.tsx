import { PillLink } from "@/components/Button";

export function FinalCta() {
  return (
    <section className="bg-cream px-5 py-[90px] text-center lg:py-[85px]">
      <div data-reveal="up">
        <h2 className="text-h2 lg:text-h2-lg">Lets Get Started</h2>
        <p className="mt-5 text-body">Discover a better way to manage your skin.</p>
        <PillLink href="/get-started" className="mt-9 w-[230px]">
          Start My Journey →
        </PillLink>
      </div>
    </section>
  );
}
