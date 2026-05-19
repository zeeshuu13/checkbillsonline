import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  title: ReactNode;
  /** Visually hidden eyebrow text for above-heading context. */
  eyebrow?: string;
  children: ReactNode;
  /** When true, render heading at h3 level instead of h2 (for nested sections). */
  nested?: boolean;
  className?: string;
};

export function Section({ id, title, eyebrow, children, nested, className }: SectionProps) {
  const Heading = nested ? "h3" : "h2";
  return (
    <section id={id} className={`scroll-mt-24 ${className ?? ""}`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{eyebrow}</p>
      )}
      <Heading className={nested ? "text-xl font-semibold tracking-tight" : "text-2xl md:text-3xl font-bold tracking-tight"}>
        {title}
      </Heading>
      <div className="mt-4 prose-cb">
        {children}
      </div>
    </section>
  );
}
