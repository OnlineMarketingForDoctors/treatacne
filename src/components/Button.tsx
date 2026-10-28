import Link from "next/link";

type Tone = "brand" | "light";

// Pill button from Components/Button: outlined by default, filled on hover.
const pillTones: Record<Tone, string> = {
  brand:
    "border-brand text-brand hover:bg-brand hover:text-white focus-visible:bg-brand focus-visible:text-white",
  light:
    "border-white text-white hover:bg-white hover:text-brand focus-visible:bg-white focus-visible:text-brand",
};

export function PillLink({
  href,
  tone = "brand",
  className = "",
  children,
}: {
  href: string;
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex h-[42px] items-center justify-center gap-2 rounded-full border px-8 text-body transition-colors outline-none ${pillTones[tone]} ${className}`}
    >
      {children}
    </Link>
  );
}

// Full-width "Big Box Button" used at the bottom of grid sections.
type BoxTone = "soft" | "white" | "responsive";

const boxTones: Record<BoxTone, string> = {
  soft: "bg-brand-soft text-white hover:bg-white hover:text-brand",
  white: "bg-white text-brand hover:bg-brand-soft hover:text-white",
  // Soft orange on mobile, white on desktop (as in the home page designs)
  responsive:
    "bg-brand-soft text-white hover:bg-brand lg:bg-white lg:text-brand lg:hover:bg-brand-soft lg:hover:text-white",
};

export function BoxLink({
  href,
  tone = "white",
  className = "",
  children,
}: {
  href: string;
  tone?: BoxTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex h-[85px] items-center px-5 text-body transition-colors lg:px-[30px] ${boxTones[tone]} ${className}`}
    >
      {children}
    </Link>
  );
}
