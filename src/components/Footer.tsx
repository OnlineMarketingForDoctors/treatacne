import Image from "next/image";
import Link from "next/link";
import {
  contact,
  crisisLines,
  footerLinks,
  footerSecondaryLinks,
  socialLinks,
} from "@/lib/site";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="grid grid-cols-1 px-5 pt-8 pb-[84px] lg:min-h-[557px] lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:px-[30px] lg:py-[30px]">
        {/* Newsletter */}
        <div className="max-lg:order-2 max-lg:mt-[190px] lg:rule-b lg:pr-5 lg:[--rule-color:white] lg:[--rule-x1:10px]">
          <NewsletterForm />
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 [--rule-color:white] max-lg:order-1 max-lg:rule-l max-lg:[--rule-y0:6px] max-lg:[--rule-y1:6px] max-lg:after:left-1/2">
          <ul className="space-y-2 py-5 pr-4 text-body max-lg:mr-[5px] max-lg:border-y max-lg:border-white lg:rule-b lg:rule-l lg:pt-0 lg:pb-4 lg:pl-8 lg:[--rule-x0:10px] lg:[--rule-x1:10px] lg:[--rule-y1:10px]">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 py-5 pl-4 text-body max-lg:ml-[5px] max-lg:border-y max-lg:border-white lg:rule-b lg:rule-l lg:pt-0 lg:pb-4 lg:pl-8 lg:[--rule-x0:10px] lg:[--rule-y1:10px]">
            {footerSecondaryLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} target="_blank" rel="noreferrer" className="hover:underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Wordmark */}
        <div
          data-reveal="group"
          className="flex items-end overflow-hidden pt-8 max-lg:order-3 lg:pt-10 lg:pr-5"
        >
          <Image
            src="/images/logo-light.png"
            alt="Treat:Acne"
            width={364}
            height={54}
            className="reveal-rise h-auto w-full max-w-[650px]"
          />
        </div>

        {/* Acknowledgement, support lines and credits */}
        <div className="flex flex-col justify-between gap-8 pt-8 max-lg:order-4 lg:rule-l lg:pt-10 lg:pl-8 lg:[--rule-color:white] lg:[--rule-y0:10px]">
          <div className="max-w-[560px] space-y-3 text-small">
            <p>
              Treat:Acne acknowledges the Traditional Custodians of the lands on which we work and
              pay our respects to Elders past and present.
            </p>
            <p>
              Need an interpreter? Call TIS National on{" "}
              <a href="tel:131450" className="underline underline-offset-2">
                131 450
              </a>
              .
            </p>
            <p>
              Need support now?{" "}
              {crisisLines.map((line, i) => (
                <span key={line.name}>
                  {i > 0 && " · "}
                  {line.name}{" "}
                  <a href={`tel:${line.tel}`} className="underline underline-offset-2">
                    {line.number}
                  </a>
                </span>
              ))}
              . In an emergency, call{" "}
              <a href="tel:000" className="underline underline-offset-2">
                000
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 text-note text-brand-muted lg:pr-[100px]">
          <span>
            ©{new Date().getFullYear()} {contact.company}
          </span>
          <a
            href="https://onlinemarketingfordoctors.com/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 hover:text-white hover:underline"
          >
            Powered by
            <Image src="/images/omfd-symbol.png" alt="" width={14} height={14} />
            Online Marketing For Doctors
          </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
