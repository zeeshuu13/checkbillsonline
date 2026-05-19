import type { ReactNode } from "react";

type Variant = "info" | "warning" | "tip";

const STYLES: Record<Variant, string> = {
  info:    "border-brand-200 bg-brand-50 text-brand-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  tip:     "border-emerald-200 bg-emerald-50 text-emerald-900",
};

export function Callout({
  title, children, variant = "info",
}: {
  title: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <aside className={`not-prose my-6 rounded-lg border px-4 py-3 ${STYLES[variant]}`}>
      <p className="font-semibold text-sm">{title}</p>
      <div className="mt-1 text-sm leading-relaxed">{children}</div>
    </aside>
  );
}
