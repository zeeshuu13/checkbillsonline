import Link from "next/link";
import { CSS_CLUSTER_LINKS } from "@/lib/content/pakistan/cross-subsidy";

type Props = {
  /** Path of the current page so it's omitted (link weight goes to the others). */
  currentPath: string;
  title?: string;
};

/**
 * Renders the 4 sibling links of the current CSS page as a horizontal band —
 * every page outbound-links to every other page in the cluster (Koray-style
 * cluster page strategy). Mirrors checkbills.pk's `CrossSubsidyClusterBand`.
 */
export function CrossSubsidyClusterBand({ currentPath, title }: Props) {
  const items = CSS_CLUSTER_LINKS.filter((l) => l.href !== currentPath);
  return (
    <aside aria-labelledby="css-cluster-title" className="not-prose my-12 rounded-xl border border-brand-200 bg-brand-50 p-5">
      <h2 id="css-cluster-title" className="text-lg font-semibold text-brand-900">
        {title ?? "Explore the Cross Subsidy Program"}
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="flex items-start gap-3 rounded-lg border border-brand-200 bg-white px-4 py-3 no-underline hover:border-brand-400 hover:bg-brand-100"
            >
              <span className="flex-1">
                <span className="block text-sm font-semibold text-slate-900">{l.label}</span>
                <span className="block text-xs text-slate-600 mt-0.5">{l.hint}</span>
              </span>
              <span aria-hidden className="text-brand-700">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
