import Link from "next/link";
import { Receipt, BarChart3, CreditCard, AlertCircle, PlusCircle, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Provider } from "@/lib/types";

const SPOKES: { slug: string; label: string; blurb: string; icon: LucideIcon }[] = [
  { slug: "",                label: "Bill check",      blurb: "Look up your latest bill amount and due date.",       icon: Receipt      },
  { slug: "tariff",          label: "Tariff & slabs",  blurb: "Per-unit rates, fixed charges, taxes.",               icon: BarChart3    },
  { slug: "payment-methods", label: "Payment methods", blurb: "Online, app, bank, wallet, and cash options.",        icon: CreditCard   },
  { slug: "complaints",      label: "Complaints",      blurb: "How to log issues and the escalation ladder.",        icon: AlertCircle  },
  { slug: "new-connection",  label: "New connection",  blurb: "Apply for a new meter or change of name.",            icon: PlusCircle   },
  { slug: "faq",             label: "FAQ",             blurb: "Frequently asked questions, answered.",               icon: HelpCircle   },
];

export function CrossClusterBand({
  provider, current,
}: {
  provider: Provider;
  current: typeof SPOKES[number]["slug"];
}) {
  const base = `/${provider.countrySlug}/${provider.routeSlug}`;
  return (
    <section aria-label={`${provider.name} cluster navigation`} className="bg-slate-50 border-y border-slate-200">
      <div className="container-wide py-8">
        <h2 className="sr-only">{provider.name} bill check sub-pages</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SPOKES.map((s) => {
            const href = s.slug ? `${base}/${s.slug}` : base;
            const isCurrent = s.slug === current;
            const Icon = s.icon;
            return (
              <li key={s.slug || "hub"}>
                <Link
                  href={href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`flex items-start gap-3 rounded-lg border px-4 py-3 no-underline transition-colors ${
                    isCurrent
                      ? "border-brand-300 bg-brand-50 text-brand-900"
                      : "border-slate-200 bg-white hover:border-brand-300 hover:bg-brand-50"
                  }`}
                >
                  <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${isCurrent ? "text-brand-600" : "text-slate-400"}`} aria-hidden />
                  <div>
                    <span className="block text-sm font-semibold text-slate-900">{s.label}</span>
                    <span className="block text-xs text-slate-600 mt-0.5">{s.blurb}</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export const CLUSTER_SPOKES = SPOKES;
