import Link from "next/link";
import { BreadcrumbJsonLd, type BreadcrumbItem } from "@/lib/seo/jsonLd";

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <>
      <BreadcrumbJsonLd items={items} />
      <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((it, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={it.href} className="flex items-center gap-1">
                {!isLast ? (
                  <Link href={it.href} className="hover:text-brand-700 no-underline">{it.name}</Link>
                ) : (
                  <span aria-current="page" className="text-slate-900 font-medium">{it.name}</span>
                )}
                {!isLast && <span aria-hidden className="text-slate-400">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
