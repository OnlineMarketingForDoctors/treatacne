import Image from "next/image";
import { PillLink } from "@/components/Button";

export function Convenience() {
  return (
    <section className="p-5 lg:p-[30px]">
      <div className="grid overflow-hidden rounded-2xl lg:min-h-[633px] lg:grid-cols-2">
        <div className="flex flex-col justify-between gap-12 bg-brand p-5 pb-6 text-white lg:p-[36px]">
          <h2 className="text-h2 lg:text-h2-lg">
            Designed for
            <br />
            Convenience -
            <br />
            Anywhere in Australia
          </h2>
          <div>
            <p className="max-w-[380px] text-small lg:text-body">
              Treat:Acne was created with busy lives and remote locations in mind. Our fully
              virtual model means you can access expert acne care from anywhere in Australia—no
              clinic visits, no referrals, no waiting rooms. From online bookings and telehealth
              consultations to having your treatments delivered to your door, we make it easy to
              get the care you need, wherever you are.
            </p>
            <PillLink href="/how-it-works" tone="light" className="mt-6 w-full lg:mt-9 lg:w-auto">
              Learn More →
            </PillLink>
          </div>
        </div>
        <div className="relative h-[260px] lg:h-auto">
          <Image
            src="/images/phone.jpg"
            alt="Person holding a phone showing the Treat:Acne app"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
