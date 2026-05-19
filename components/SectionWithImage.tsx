import type { ReactNode } from "react";
import { RemoteImage } from "@/components/RemoteImage";

/**
 * A two-column section: image on one side, arbitrary content on the other.
 * Intended for static pages (About, Contact, Country hub editorial) where the
 * content is JSX rather than a ContentSection data object.
 *
 * Use AlternatingSection for data-driven ContentSection objects.
 */
export function SectionWithImage({
  id,
  heading,
  imageQuery,
  flip = false,
  imageIndex = 0,
  children,
}: {
  id: string;
  heading: string;
  imageQuery: string;
  flip?: boolean;
  imageIndex?: number;
  children: ReactNode;
}) {
  const imageEl = (
    <div className="w-full">
      <RemoteImage
        query={imageQuery}
        index={imageIndex}
        alt={`Illustration for section: ${heading}`}
        className="aspect-[4/3] w-full rounded-xl shadow-md object-cover"
        sizes="(min-width: 1024px) 480px, 100vw"
      />
    </div>
  );

  const textEl = (
    <div className="flex flex-col justify-center gap-4">
      <h2
        id={id}
        className="scroll-mt-24 text-2xl md:text-3xl font-bold tracking-tight text-slate-900"
      >
        {heading}
      </h2>
      <div className="space-y-4 text-slate-700 leading-relaxed">{children}</div>
    </div>
  );

  return (
    <section
      aria-labelledby={id}
      className="grid md:grid-cols-2 gap-10 md:gap-16 items-center py-10 border-b border-slate-100 last:border-0"
    >
      {flip ? (
        <>
          {textEl}
          {imageEl}
        </>
      ) : (
        <>
          {imageEl}
          {textEl}
        </>
      )}
    </section>
  );
}
