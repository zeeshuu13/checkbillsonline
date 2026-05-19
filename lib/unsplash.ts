/**
 * Build-time helper that talks to https://api.unsplash.com/search/photos.
 *
 * Provision a free API key at https://unsplash.com/developers (create an app,
 * copy the "Access Key") and set UNSPLASH_ACCESS_KEY in `.env`.
 *
 * Server-only; never invoked from the browser. Results are committed to
 * `lib/data/images.json` so the client just reads cached URLs.
 *
 * Per Unsplash API guidelines we MUST display photographer credit + a link
 * to the photo on unsplash.com. The `RemoteImage` component does this.
 */

export type UnsplashPhoto = {
  id: string;
  width: number;
  height: number;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: { html: string };
  user: {
    name: string;
    username: string;
    links: { html: string };
  };
};

type SearchResult = {
  total: number;
  total_pages: number;
  results: UnsplashPhoto[];
};

const ENDPOINT = "https://api.unsplash.com/search/photos";

export async function searchUnsplash(
  query: string,
  opts: {
    perPage?: number;
    accessKey?: string;
    orientation?: "landscape" | "portrait" | "squarish";
  } = {}
): Promise<UnsplashPhoto[]> {
  const accessKey = opts.accessKey ?? process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("UNSPLASH_ACCESS_KEY is not set. Add it to .env to fetch images.");
  }

  const url = new URL(ENDPOINT);
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", String(opts.perPage ?? 5));
  if (opts.orientation) url.searchParams.set("orientation", opts.orientation);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Accept-Version": "v1",
    },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Unsplash search failed: ${res.status} ${res.statusText}`);
  }
  const data = (await res.json()) as SearchResult;
  return data.results ?? [];
}

export type CachedImage = {
  id: string;
  width: number;
  height: number;
  src: string;
  alt: string;
  photographer: string;
  photographerUrl: string;
  pageUrl: string;
};

export function toCached(photo: UnsplashPhoto): CachedImage {
  return {
    id: photo.id,
    width: photo.width,
    height: photo.height,
    src: photo.urls.regular,
    alt: photo.alt_description ?? photo.description ?? "",
    photographer: photo.user.name,
    photographerUrl: photo.user.links.html,
    pageUrl: photo.links.html,
  };
}
