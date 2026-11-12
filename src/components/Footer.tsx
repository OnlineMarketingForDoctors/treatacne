import Image from "next/image";
import Link from "next/link";
import {
  contact,
  crisisLines,
  footerLinks,
  footerSecondaryLinks,
  responseTime,
  socialLinks,
} from "@/lib/site";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Tagline } from "@/components/Tagline";

const heading = "mb-5 text-small tracking-[0.12em] text-white/85 uppercase";
const link = "hover:underline";

export function Footer() {
  const socials = socialLinks.filter((s) => s.href);
  return (
    <footer className="bg-brand text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-12 pb-8 lg:px-[60px] lg:pt-[60px]">
        <NewsletterForm />

        <div className="mt-10 grid gap-10 border-t border-white/50 pt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-[1fr_1fr_1.15fr] lg:pt-12">
          <nav aria-label="Treat:Acne">
            <h2 className={heading}>Treat:Acne</h2>
            <ul className="space-y-3 text-body">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Help and info">
            <h2 className={heading}>Help &amp; info</h2>
            <ul className="space-y-3 text-body">
              {footerSecondaryLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={heading}>Contact</h2>
            <ul className="space-y-3 text-body">
              <li>
                Text or call{" "}
                <a href={`tel:${contact.phoneTel}`} className={link}>
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className={link}>
                  {contact.email}
                </a>
              </li>
              <li>We reply {responseTime}</li>
            </ul>
            <p className="mt-6 text-body">
              <strong className="font-bold">Not an emergency service.</strong> In an emergency, call{" "}
              <a href="tel:000" className="underline underline-offset-2">
                000
              </a>
              .
              <br />
              {crisisLines.map((line, i) => (
                <span key={line.name}>
                  {i > 0 && " · "}
                  {line.name}{" "}
                  <a href={`tel:${line.tel}`} className="underline underline-offset-2">
                    {line.number}
                  </a>
                </span>
              ))}
            </p>
            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 items-center rounded-full border border-white/80 px-5 text-body transition-colors hover:bg-white hover:text-brand"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-10 space-y-3 border-t border-white/50 pt-8 text-small lg:mt-12">
          <p>
            Treat:Acne acknowledges the Traditional Custodians of the lands on which we work and pays
            respect to Elders past and present.
          </p>
          <p>
            Need an interpreter? Call TIS National on{" "}
            <a href="tel:131450" className="underline underline-offset-2">
              131 450
            </a>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-8">
            <Link href="/" aria-label="Treat:Acne home" className="block w-[170px]">
              <Image src="/images/logo-light.png" alt="Treat:Acne" width={364} height={54} className="h-auto w-full" />
              <Tagline className="mt-1 w-full" />
            </Link>
            <p className="text-small">
              © {new Date().getFullYear()} {contact.company} · ABN {contact.abn}
            </p>
          </div>
          <a
            href="https://onlinemarketingfordoctors.com/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1.5 text-small hover:underline"
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
