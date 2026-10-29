import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: { default: "Staff", template: "%s | Treat:Acne staff" },
  robots: { index: false, follow: false },
};

// Plain layout for the staff area: no public site header, footer, banners or tracking.
export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-black">
      <header className="flex h-[62px] items-center justify-between border-b border-brand bg-white px-5 lg:px-[30px]">
        <Link href="/staff" className="flex items-center gap-3">
          <Image src="/images/logo-dark.png" alt="Treat:Acne" width={364} height={56} className="h-auto w-[110px]" />
          <span className="text-small text-brand">Staff</span>
        </Link>
      </header>
      <main className="mx-auto max-w-[1100px] px-5 py-8 lg:px-[30px] lg:py-10">{children}</main>
    </div>
  );
}
