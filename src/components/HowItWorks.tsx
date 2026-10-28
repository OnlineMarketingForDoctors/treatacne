import Image from "next/image";
import { steps } from "@/lib/site";
import { revealDelay } from "@/lib/reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="grid border-b border-brand lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 pt-5 pb-5 max-lg:order-2 lg:p-[30px]">
        <div className="w-full overflow-hidden rounded-lg lg:max-w-[503px]">
          <Image
            data-reveal="zoom"
            src="/images/hands.jpg"
            alt="Laughing woman covering her face with her hands"
            width={962}
            height={983}
            sizes="(min-width: 1024px) 34vw, 100vw"
            className="w-full"
          />
        </div>
      </div>

      <div className="lg:border-l lg:border-brand">
        <div data-reveal="up" className="px-5 pt-10 pb-6 lg:px-[30px] lg:pt-[30px] lg:pb-10">
          <h2 className="text-h2 lg:text-h2-lg">How it works in 5 simple steps</h2>
          <p className="mt-6 max-w-[430px] text-body lg:mt-8">
            Skip the waiting room. Get affordable dermatologist-led care from the comfort of your
            home.
          </p>
        </div>

        <ol>
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal="up"
              style={revealDelay(i * 90)}
              className="grid grid-cols-[44px_1fr] gap-x-5 border-t border-brand px-5 pt-5 pb-6 lg:grid-cols-[110px_1fr] lg:pl-[28px] lg:pr-[30px]"
            >
              <span aria-hidden className="text-[32px] leading-none font-light lg:text-[44px]">
                {i + 1}.
              </span>
              <div>
                <h3 className="text-body font-bold">{step.title}</h3>
                <p className="mt-3 max-w-[460px] text-body">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
