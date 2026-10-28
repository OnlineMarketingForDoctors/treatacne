import Image from "next/image";
import Link from "next/link";
import { footerLinks, socialLinks } from "@/lib/site";
import { NewsletterForm } from "@/components/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-brand text-white">
      <div className="grid grid-cols-1 px-5 py-8 lg:min-h-[557px] lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:px-[30px] lg:py-[30px]">
        {/* Newsletter */}
        <div className="max-lg:order-2 max-lg:mt-[190px] lg:border-b lg:border-white lg:pr-5">
          <NewsletterForm />
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 max-lg:order-1 lg:gap-5 lg:pl-0">
          <ul className="space-y-2 border-y border-white py-5 pr-4 text-body max-lg:border-r lg:border-t-0 lg:border-l lg:pt-0 lg:pb-4 lg:pl-8">
            {footerLinks.map((link) => (
              // Shop moves to the second column on mobile
              <li key={link.href} className={link.href === "/shop" ? "max-lg:hidden" : undefined}>
                <Link href={link.href} className="hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 border-y border-white py-5 pl-4 text-body lg:border-t-0 lg:border-l lg:pt-0 lg:pb-4 lg:pl-8">
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
        <div className="flex items-end pt-8 max-lg:order-3 lg:pt-10 lg:pr-5">
          <Image
            src="/images/logo-light.png"
            alt="Treat:Acne"
            width={364}
            height={54}
            className="h-auto w-full max-w-[650px]"
          />
        </div>

        {/* Credits */}
        <div className="flex items-end justify-between pt-2 text-note text-brand-muted max-lg:order-4 lg:mt-2.5 lg:border-l lg:border-white lg:pt-0 lg:pl-4 lg:pr-[130px]">
          <span>©{new Date().getFullYear()}</span>
          <span>Designed by Pull &amp; Press</span>
        </div>
      </div>
    </footer>
  );
}
