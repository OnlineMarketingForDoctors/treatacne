import Image from "next/image";
import Link from "next/link";
import { footerLinks, socialLinks } from "@/lib/site";
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
        <div className="grid grid-cols-2 max-lg:order-1 lg:[--rule-color:white]">
          <ul className="space-y-2 py-5 pr-4 text-body max-lg:border-y max-lg:border-r max-lg:border-white lg:rule-b lg:rule-l lg:pt-0 lg:pb-4 lg:pl-8 lg:[--rule-x0:10px] lg:[--rule-x1:10px] lg:[--rule-y1:10px]">
            {footerLinks.map((link) => (
              // Shop moves to the second column on mobile
              <li key={link.href} className={link.href === "/shop" ? "max-lg:hidden" : undefined}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 py-5 pl-4 text-body max-lg:border-y max-lg:border-white lg:rule-b lg:rule-l lg:pt-0 lg:pb-4 lg:pl-8 lg:[--rule-x0:10px] lg:[--rule-y1:10px]">
            <li className="lg:hidden">
              <Link href="/shop" className="hover:underline">
                Shop
              </Link>
            </li>
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

        {/* Credits */}
        <div className="flex items-end justify-between pt-2 text-note text-brand-muted max-lg:order-4 lg:rule-l lg:pt-0 lg:pl-4 lg:pr-[130px] lg:[--rule-color:white] lg:[--rule-y0:10px]">
          <span>©{new Date().getFullYear()}</span>
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
    </footer>
  );
}
