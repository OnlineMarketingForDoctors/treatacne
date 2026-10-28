import Image from "next/image";
import { PillLink } from "@/components/Button";

export function Convenience() {
  return (
    <section className="p-5 lg:p-[30px]">
      <div data-reveal="up" className="grid overflow-hidden rounded-2xl lg:min-h-[633px] lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-12 bg-brand p-5 pb-6 text-white lg:p-[36px]">
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
        <div className="relative h-[260px] overflow-hidden lg:h-auto">
          <Image
            src="/images/phone.jpg"
            alt="Person holding a phone showing the Treat:Acne app"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            data-reveal="zoom"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
