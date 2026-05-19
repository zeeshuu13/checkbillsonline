import Link from "next/link";
import type { Provider, Country } from "@/lib/types";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroBillCheck } from "@/components/HeroBillCheck";
import { FaqAccordion } from "@/components/FaqAccordion";
import { parseMonthYear, getAllMonthYearSlugs } from "@/lib/seo/months";
import { buildMonthlyContent } from "@/lib/content/monthly";
import { WebPageJsonLd, FaqJsonLd, BreadcrumbJsonLd } from "@/lib/seo/jsonLd";

type Props = {
  provider: Provider;
  country: Country;
  monthSlug: string;
};

export function MonthlyBillPage({ provider, country, monthSlug }: Props) {
  const parsed = parseMonthYear(monthSlug);
  if (!parsed) return null;

  const content = buildMonthlyContent(provider, country, monthSlug);
  const base = `/${country.slug}/${provider.routeSlug}`;
  const path = `${base}/${monthSlug}`;

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: country.name, href: `/${country.slug}` },
    { name: provider.name, href: base },
    { name: parsed.label, href: path },
  ];

  const spokes = [
    { label: "Tariff", href: `${base}/tariff` },
    { label: "Payment Methods", href: `${base}/payment-methods` },
    { label: "Complaints", href: `${base}/complaints` },
    { label: "FAQ", href: `${base}/faq` },
  ];

  return (
    <>
      <WebPageJsonLd
        url={path}
        name={content.metaTitle}
        description={content.metaDescription}
        breadcrumb={breadcrumb}
        datePublished={content.lastReviewed}
        dateModified={content.lastReviewed}
      />
      <FaqJsonLd items={content.faq} />
      <BreadcrumbJsonLd items={breadcrumb} />

      <div className="container-wide pt-6">
        <Breadcrumb items={breadcrumb} />
      </div>

      <HeroBillCheck country={country} provider={provider} />

      {/* Month navigator */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-wide py-3 flex items-center justify-between text-sm">
          {content.prevMonth ? (
            <Link
              href={`${base}/${content.prevMonth}`}
              className="flex items-center gap-1 text-brand-700 hover:text-brand-900 font-medium no-underline"
            >
              <span aria-hidden>&#8592;</span>
              {parseMonthYear(content.prevMonth)?.label}
            </Link>
          ) : <span />}
          <span className="font-semibold text-slate-700">{parsed.label}</span>
          {content.nextMonth ? (
            <Link
              href={`${base}/${content.nextMonth}`}
              className="flex items-center gap-1 text-brand-700 hover:text-brand-900 font-medium no-underline"
            >
              {parseMonthYear(content.nextMonth)?.label}
              <span aria-hidden>&#8594;</span>
            </Link>
          ) : <span />}
        </div>
      </div>

      {/* Spoke cluster links */}
      <div className="bg-white border-b border-slate-100">
        <div className="container-wide py-3 flex flex-wrap gap-2">
          <Link href={base} className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-brand-100 hover:text-brand-800 no-underline">
            Provider Hub
          </Link>
          {spokes.map((s) => (
            <Link key={s.href} href={s.href} className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 hover:bg-brand-100 hover:text-brand-800 no-underline">
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <article className="container-tight py-12 md:py-16 space-y-12">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            {content.h1}
          </h1>
          <p className="mt-4 text-lg text-slate-700 leading-relaxed">{content.intro}</p>
        </header>

        {content.sections.map((section) => (
          <section key={section.id} aria-labelledby={`sec-${section.id}`} className="space-y-4">
            <h2 id={`sec-${section.id}`} className="text-2xl font-bold tracking-tight text-slate-900">
              {section.heading}
            </h2>
            <div className="prose-cb">
              {section.body.split("\n\n").map((para, i) => {
                if (para.startsWith("- ") || para.includes("\n- ")) {
                  const items = para.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="list-disc pl-5 space-y-1 text-slate-700">
                      {items.map((item, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: mdInline(item.slice(2)) }} />
                      ))}
                    </ul>
                  );
                }
                if (para.startsWith("**Step ")) {
                  return (
                    <p key={i} className="text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: mdInline(para) }} />
                  );
                }
                return (
                  <p key={i} className="text-slate-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: mdInline(para) }} />
                );
              })}
            </div>
          </section>
        ))}

        <FaqAccordion items={content.faq} />

        {/* Other months for this provider */}
        <section aria-labelledby="other-months" className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 id="other-months" className="text-xl font-bold tracking-tight text-slate-900 mb-4">
            Other {provider.name} Monthly Bill Guides
          </h2>
          <OtherMonthsGrid base={base} currentSlug={monthSlug} />
        </section>

        <div className="text-xs text-slate-400 border-t border-slate-100 pt-4">
          Last reviewed: {content.lastReviewed} &middot; Information sourced from official provider portals and regulator publications.
        </div>
      </article>
    </>
  );
}

function OtherMonthsGrid({ base, currentSlug }: { base: string; currentSlug: string }) {
  const all = getAllMonthYearSlugs();
  const others = all.filter((s) => s !== currentSlug);
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {others.map((slug) => {
        const p = parseMonthYear(slug);
        return p ? (
          <li key={slug}>
            <Link
              href={`${base}/${slug}`}
              className="block text-sm text-brand-700 hover:text-brand-900 hover:underline no-underline"
            >
              {p.label}
            </Link>
          </li>
        ) : null;
      })}
    </ul>
  );
}

// Minimal inline markdown: **bold** and [text](href)
function mdInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-brand-700 underline">$1</a>');
}
