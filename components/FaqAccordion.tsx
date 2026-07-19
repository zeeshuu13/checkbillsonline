import { ChevronDown } from "lucide-react";
import { FaqJsonLd, type FaqItem } from "@/lib/seo/jsonLd";

export function FaqAccordion({ items, headingLevel = 2 }: { items: FaqItem[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 3 ? "h3" : "h2";
  return (
    <section aria-label="Frequently asked questions" className="not-prose">
      <FaqJsonLd items={items} />
      <H className={headingLevel === 3 ? "text-xl font-semibold tracking-tight" : "text-2xl md:text-3xl font-bold tracking-tight"}>
        Frequently asked questions
      </H>
      <div className="mt-4 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white">
        {items.map((it, i) => (
          <details key={i} className="group p-4 open:bg-slate-50">
            <summary className="cursor-pointer list-none font-medium text-slate-900 flex items-center justify-between gap-3">
              <span>{it.q}</span>
              <ChevronDown
                aria-hidden
                className="ml-3 h-5 w-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180"
              />
            </summary>
            <div className="mt-3 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {it.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
