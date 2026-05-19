"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

// ── Nav data ──────────────────────────────────────────────────────────────────

const PK_LINKS = [
  { label: "MEPCO", sub: "Multan · South Punjab", href: "/pakistan/mepco-bill-check" },
  { label: "LESCO", sub: "Lahore · Central Punjab", href: "/pakistan/lesco-bill-check" },
  { label: "IESCO", sub: "Islamabad · ICT", href: "/pakistan/iesco-bill-check" },
  { label: "FESCO", sub: "Faisalabad · North Punjab", href: "/pakistan/fesco-bill-check" },
  { label: "GEPCO", sub: "Gujranwala · North Punjab", href: "/pakistan/gepco-bill-check" },
  { label: "PESCO", sub: "Peshawar · KPK", href: "/pakistan/pesco-bill-check" },
  { label: "HAZECO", sub: "Hazara · KPK", href: "/pakistan/hazeco-bill-check" },
  { label: "HESCO", sub: "Hyderabad · Sindh", href: "/pakistan/hesco-bill-check" },
  { label: "SEPCO", sub: "Sukkur · Sindh", href: "/pakistan/sepco-bill-check" },
  { label: "QESCO", sub: "Quetta · Balochistan", href: "/pakistan/qesco-bill-check" },
  { label: "TESCO", sub: "Tribal · FATA", href: "/pakistan/tesco-bill-check" },
  { label: "K-Electric", sub: "Karachi", href: "/pakistan/k-electric-bill-check" },
];

const IN_LINKS = [
  { label: "Adani Electricity", sub: "Mumbai", href: "/india/adani-electricity-bill-check" },
  { label: "Tata Power", sub: "Mumbai", href: "/india/tata-power-mumbai-bill-check" },
  { label: "BSES Rajdhani", sub: "Delhi", href: "/india/bses-rajdhani-bill-check" },
];

const GULF_LINKS = [
  { label: "DEWA", sub: "Dubai, UAE", href: "/uae/dewa-bill-check" },
  { label: "ADDC", sub: "Abu Dhabi, UAE", href: "/uae/addc-bill-check" },
  { label: "SEWA", sub: "Sharjah, UAE", href: "/uae/sewa-bill-check" },
  { label: "SEC", sub: "Saudi Arabia", href: "/saudi-arabia/sec-bill-check" },
  { label: "Kahramaa", sub: "Qatar", href: "/qatar/kahramaa-bill-check" },
  { label: "MEW Kuwait", sub: "Kuwait", href: "/kuwait/mew-kuwait-bill-check" },
  { label: "Mazoon", sub: "Oman", href: "/oman/mazoon-electricity-bill-check" },
  { label: "EWA Bahrain", sub: "Bahrain", href: "/bahrain/ewa-bahrain-bill-check" },
];

const MORE_COLS = [
  {
    region: "South Asia",
    items: [
      { label: "Bangladesh · DESCO", href: "/bangladesh/desco-bill-check" },
      { label: "Sri Lanka · CEB", href: "/sri-lanka/ceb-bill-check" },
      { label: "Nepal · NEA", href: "/nepal/nea-bill-check" },
    ],
  },
  {
    region: "Southeast Asia",
    items: [
      { label: "Indonesia · PLN", href: "/indonesia/pln-bill-check" },
      { label: "Philippines · Meralco", href: "/philippines/meralco-bill-check" },
      { label: "Malaysia · TNB", href: "/malaysia/tnb-bill-check" },
      { label: "Vietnam · EVN HCMC", href: "/vietnam/evn-hcmc-bill-check" },
      { label: "Thailand · MEA", href: "/thailand/mea-bill-check" },
      { label: "Singapore · SP Group", href: "/singapore/sp-group-bill-check" },
    ],
  },
  {
    region: "Africa",
    items: [
      { label: "Nigeria · EKEDC", href: "/nigeria/ekedc-bill-check" },
      { label: "Kenya · Kenya Power", href: "/kenya/kenya-power-bill-check" },
      { label: "South Africa · Eskom", href: "/south-africa/eskom-bill-check" },
      { label: "Ghana · ECG", href: "/ghana/ecg-bill-check" },
      { label: "Tanzania · TANESCO", href: "/tanzania/tanesco-bill-check" },
    ],
  },
  {
    region: "Anglosphere",
    items: [
      { label: "USA · Con Edison", href: "/usa/con-edison-bill-check" },
      { label: "USA · PG&E", href: "/usa/pge-bill-check" },
      { label: "USA · Duke Energy", href: "/usa/duke-energy-bill-check" },
      { label: "UK · British Gas", href: "/uk/british-gas-bill-check" },
      { label: "UK · Octopus Energy", href: "/uk/octopus-energy-bill-check" },
      { label: "Canada · Hydro One", href: "/canada/hydro-one-bill-check" },
      { label: "Australia · AGL", href: "/australia/agl-bill-check" },
      { label: "New Zealand · Genesis", href: "/new-zealand/genesis-energy-bill-check" },
      { label: "Ireland · Electric Ireland", href: "/ireland/electric-ireland-bill-check" },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Mega-menu desktop dropdown ────────────────────────────────────────────────

function DesktopMenu({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 hover:text-brand-700 rounded-md no-underline"
      >
        {label}
        <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>
      {open && (
        <div className="absolute left-0 top-full pt-1 z-50">
          <div className="rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Mobile accordion section ──────────────────────────────────────────────────

function MobileSection({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0">
      <div className="flex items-center">
        <Link
          href={href}
          className="flex-1 py-3 pl-4 text-sm font-semibold text-slate-900 no-underline"
        >
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="px-4 py-3 text-slate-500"
          aria-expanded={open}
        >
          <ChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </button>
      </div>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

// ── Main header ───────────────────────────────────────────────────────────────

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => mq.matches && setMobileOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  return (
    <>
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 sticky top-0 z-40">
        <div className="container-wide flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" aria-label={`${SITE.name} home`} className="shrink-0 flex items-center no-underline">
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

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-0.5 flex-1">
            {/* Pakistan */}
            <DesktopMenu label="Pakistan" href="/pakistan">
              <div className="p-4 w-80">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3 px-1">All 12 DISCOs</p>
                <div className="grid grid-cols-2 gap-0.5">
                  {PK_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="rounded-lg px-2.5 py-2 hover:bg-brand-50 no-underline group">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700">{l.label}</p>
                      <p className="text-xs text-slate-500">{l.sub}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <Link href="/pakistan" className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-brand-700 hover:text-brand-800 no-underline">
                    All Pakistan pages →
                  </Link>
                </div>
              </div>
            </DesktopMenu>

            {/* India */}
            <DesktopMenu label="India" href="/india">
              <div className="p-4 w-64">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3 px-1">Providers</p>
                <div className="space-y-0.5">
                  {IN_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="flex items-center gap-3 rounded-lg px-2.5 py-2 hover:bg-brand-50 no-underline group">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700">{l.label}</p>
                        <p className="text-xs text-slate-500">{l.sub}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <Link href="/india" className="flex items-center gap-1 px-2.5 py-1.5 text-sm font-medium text-brand-700 hover:text-brand-800 no-underline">
                    All India pages →
                  </Link>
                </div>
              </div>
            </DesktopMenu>

            {/* Gulf */}
            <DesktopMenu label="UAE & Gulf" href="/uae">
              <div className="p-4 w-72">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3 px-1">GCC Providers</p>
                <div className="grid grid-cols-2 gap-0.5">
                  {GULF_LINKS.map((l) => (
                    <Link key={l.href} href={l.href} className="rounded-lg px-2.5 py-2 hover:bg-brand-50 no-underline group">
                      <p className="text-sm font-semibold text-slate-900 group-hover:text-brand-700">{l.label}</p>
                      <p className="text-xs text-slate-500">{l.sub}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-100 flex gap-4">
                  <Link href="/uae" className="text-sm font-medium text-brand-700 no-underline hover:text-brand-800">UAE →</Link>
                  <Link href="/saudi-arabia" className="text-sm font-medium text-brand-700 no-underline hover:text-brand-800">Saudi →</Link>
                  <Link href="/qatar" className="text-sm font-medium text-brand-700 no-underline hover:text-brand-800">Qatar →</Link>
                </div>
              </div>
            </DesktopMenu>

            {/* More */}
            <DesktopMenu label="More countries" href="/#countries">
              <div className="p-5 w-[680px]">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-4 px-1">All regions</p>
                <div className="grid grid-cols-4 gap-4">
                  {MORE_COLS.map((col) => (
                    <div key={col.region}>
                      <p className="text-xs font-bold text-slate-700 mb-2">{col.region}</p>
                      <div className="space-y-0.5">
                        {col.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block rounded px-1.5 py-1 text-xs text-slate-700 hover:text-brand-700 hover:bg-brand-50 no-underline"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <Link href="/#countries" className="text-sm font-medium text-brand-700 no-underline hover:text-brand-800">
                    Browse all 30 countries →
                  </Link>
                </div>
              </div>
            </DesktopMenu>
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/#bill-check"
            className="hidden md:inline-flex items-center rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 no-underline shrink-0"
          >
            Check a bill
          </Link>

          {/* Mobile: CTA + Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/#bill-check"
              className="rounded-md bg-brand-700 px-3 py-2 text-xs font-semibold text-white no-underline"
            >
              Check bill
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex items-center justify-center w-10 h-10 rounded-md border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            >
              {mobileOpen ? (
                /* X icon */
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu panel ── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-30 bg-white overflow-y-auto" onClick={(e) => { if (e.target === e.currentTarget) setMobileOpen(false); }}>
          <nav aria-label="Mobile navigation" className="divide-y divide-slate-100">

            <MobileSection label="Pakistan" href="/pakistan">
              <div className="grid grid-cols-2 gap-0.5 px-3">
                {PK_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 hover:bg-brand-50 no-underline">
                    <p className="text-sm font-semibold text-slate-900">{l.label}</p>
                    <p className="text-xs text-slate-500">{l.sub}</p>
                  </Link>
                ))}
              </div>
            </MobileSection>

            <MobileSection label="India" href="/india">
              <div className="space-y-0.5 px-3">
                {IN_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 hover:bg-brand-50 no-underline">
                    <p className="text-sm font-semibold text-slate-900">{l.label}</p>
                    <p className="text-xs text-slate-500">{l.sub}</p>
                  </Link>
                ))}
              </div>
            </MobileSection>

            <MobileSection label="UAE & Gulf" href="/uae">
              <div className="grid grid-cols-2 gap-0.5 px-3">
                {GULF_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-2.5 hover:bg-brand-50 no-underline">
                    <p className="text-sm font-semibold text-slate-900">{l.label}</p>
                    <p className="text-xs text-slate-500">{l.sub}</p>
                  </Link>
                ))}
              </div>
            </MobileSection>

            {MORE_COLS.map((col) => (
              <MobileSection key={col.region} label={col.region} href="/#countries">
                <div className="space-y-0.5 px-3">
                  {col.items.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-800 hover:bg-brand-50 no-underline">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </MobileSection>
            ))}

            <div className="p-4">
              <Link
                href="/#countries"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-md border border-brand-300 px-4 py-3 text-center text-sm font-semibold text-brand-700 no-underline hover:bg-brand-50"
              >
                Browse all 30 countries →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
