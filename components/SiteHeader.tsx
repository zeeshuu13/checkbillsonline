import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/india", label: "India" },
  { href: "/pakistan", label: "Pakistan" },
  { href: "/uae", label: "UAE" },
  { href: "/usa", label: "USA" },
  { href: "/uk", label: "UK" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-30">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" aria-label={`${SITE.name} home`} className="flex items-center no-underline">
          <Image
            src={SITE.logo}
            alt={SITE.name}
            width={SITE.logoWidth}
            height={SITE.logoHeight}
            priority
            sizes="(min-width: 768px) 180px, 150px"
            className="h-9 md:h-10 w-auto"
          />
        </Link>
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-700 hover:bg-brand-50 rounded-md no-underline"
            >
              {n.label}
            </Link>
          ))}
          <Link
            href="/#countries"
            className="ml-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-700 rounded-md no-underline"
          >
            All countries
          </Link>
        </nav>
        <Link
          href="/#bill-check"
          className="hidden sm:inline-flex items-center rounded-md bg-brand-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 no-underline"
        >
          Check a bill
        </Link>
      </div>
    </header>
  );
}
