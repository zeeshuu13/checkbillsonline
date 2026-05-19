import type { ContentSection } from "@/lib/content/types";
import { RemoteImage } from "@/components/RemoteImage";
import { Callout } from "@/components/Callout";

/** Default image used when a section has no imageQuery set. */
const FALLBACK_IMAGE = "electric power lines sunset";

type Props = {
  section: ContentSection;
  /**
   * Override the image query. If omitted, falls back to `section.imageQuery`
   * then to the global electricity fallback.
   */
  imageQuery?: string;
  /** Which image in the query array to use (0-based). Default 0. */
  imageIndex?: number;
  /**
   * When true the image renders on the RIGHT and the text on the LEFT.
   * When false (default) the image is on the LEFT.
   * Use `index % 2 === 1` at the call-site to alternate automatically.
   */
  flip?: boolean;
};

/**
 * Renders a ContentSection with an image on one side and the text content
 * on the other. The layout alternates when `flip` is toggled between calls.
 *
 * Desktop: two equal columns, image + content side-by-side.
 * Mobile: stacks vertically — image always on top.
 */
export function AlternatingSection({ section, imageQuery, imageIndex = 0, flip = false }: Props) {
  const query = imageQuery ?? section.imageQuery ?? FALLBACK_IMAGE;

  const imageEl = (
    <div className="w-full">
      <RemoteImage
        query={query}
        index={imageIndex}
        alt={`Illustration for the section: ${section.heading}`}
        className="aspect-[4/3] w-full rounded-xl shadow-md object-cover"
        sizes="(min-width: 1024px) 480px, 100vw"
      />
    </div>
  );

  const textEl = (
    <div className="flex flex-col justify-center gap-4">
      <h2
        id={section.id}
        className="scroll-mt-24 text-2xl md:text-3xl font-bold tracking-tight text-slate-900"
      >
        {section.heading}
      </h2>
      <div className="space-y-4 text-slate-700 leading-relaxed">
        {section.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {section.bullets && section.bullets.length > 0 && (
        <ul className="space-y-2 text-slate-700">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden className="mt-1 text-brand-600 shrink-0">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {section.callout && (
        <Callout title={section.callout.title} variant={section.callout.variant ?? "info"}>
          {section.callout.body}
        </Callout>
      )}
    </div>
  );

  return (
    <section
      aria-labelledby={section.id}
      className="grid md:grid-cols-2 gap-10 md:gap-16 items-center py-8 border-b border-slate-100 last:border-0"
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
