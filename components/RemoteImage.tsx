import Image from "next/image";
import imagesData from "@/lib/data/images.json" assert { type: "json" };

type ImageRecord = {
  id: string | number;
  width: number;
  height: number;
  src: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  pageUrl: string;
};

type ImagesIndex = Record<string, ImageRecord[]>;

const INDEX = imagesData as unknown as ImagesIndex;

/**
 * Deterministic 32-bit hash so each query string maps to a stable picsum seed.
 * Same query always shows the same fallback photo, so layout stays consistent
 * across renders and across build deploys.
 */
function hashSeed(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  // Picsum seeds are URL path segments; keep it short + safe.
  return Math.abs(h).toString(36);
}

/** Fallback CDN — Picsum returns a real photo at the requested size for any seed. */
function picsumFallback(query: string, width = 1200, height = 800): ImageRecord {
  const seed = hashSeed(query);
  return {
    id: `picsum-${seed}`,
    width,
    height,
    src: `https://picsum.photos/seed/${seed}/${width}/${height}`,
    alt: "",
    photographer: "",
    photographerUrl: "",
    pageUrl: "https://picsum.photos",
  };
}

type Props = {
  /** Search query key matching one in `lib/data/images.json`. */
  query: string;
  /** Fallback alt text shown when the record has no own description. */
  alt: string;
  className?: string;
  /** Pick the Nth image (0 = first). */
  index?: number;
  /**
   * Mark as the LCP candidate — renders eagerly with high fetchpriority.
   * Set this on the first image visible without scrolling on each page.
   */
  priority?: boolean;
  /** Sizes hint for responsive images. */
  sizes?: string;
  /** Image quality 1–100. Default 85. Only applies when Next.js optimizes the image. */
  quality?: number;
};

/**
 * Renders an image fetched at build time from Unsplash, falling back to a
 * deterministic Picsum photo when no entry exists yet. This guarantees every
 * image slot loads a real photograph even before `npm run fetch:images` runs.
 *
 * Per Unsplash API terms, photographer credit + link are rendered when the
 * record carries that data. Picsum has no attribution requirement, so the
 * caption is omitted for fallback images.
 */
export function RemoteImage({ query, alt, className, index = 0, priority, sizes, quality = 85 }: Props) {
  const bucket = INDEX[query];
  const record = bucket?.[index] ?? picsumFallback(query);
  const isPicsum = record.id.toString().startsWith("picsum-");
  // Unsplash serves size-optimised JPEGs via their own CDN URL params.
  // Letting Next.js re-encode them would add latency without quality gain.
  const isUnsplash = record.src.includes("images.unsplash.com");
  const skipOptimization = isPicsum || isUnsplash;

  return (
    <figure className="not-prose">
      <Image
        src={record.src}
        alt={record.alt || alt}
        width={record.width}
        height={record.height}
        sizes={sizes ?? "(min-width: 1024px) 720px, 100vw"}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        quality={skipOptimization ? undefined : quality}
        unoptimized={skipOptimization}
        className={`rounded-lg ${className ?? "h-auto w-full"}`}
      />
      {!isPicsum && record.photographer && (
        <figcaption className="mt-1 text-xs text-slate-500">
          Photo by{" "}
          <a
            href={`${record.photographerUrl}?utm_source=checkbillsonline&utm_medium=referral`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline"
          >
            {record.photographer}
          </a>{" "}
          on{" "}
          <a
            href="https://unsplash.com/?utm_source=checkbillsonline&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="underline"
          >
            Unsplash
          </a>
          .
        </figcaption>
      )}
    </figure>
  );
}
