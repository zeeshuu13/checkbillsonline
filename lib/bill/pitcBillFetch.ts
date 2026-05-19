/**
 * Pakistan PITC bill fetcher — copied from the MEPCO project (lib/pitcBillFetch.ts) with the
 * only difference being that we accept the `pitcBillPath` (e.g. "mepcobill", "lescobill")
 * as a parameter instead of importing from a Pakistan-specific allow-list.
 *
 * Original implementation is on `M:\MepcoBill\mepco-web\lib\pitcBillFetch.ts`. Refer to that
 * file for the engineering rationale (IPv4-only undici, budget calculations, retry policy).
 *
 * Allow-list lives in lib/data/providers.ts as the set of providers with realApi === "pk-pitc".
 */

import { setDefaultResultOrder } from "node:dns";
import { Agent, fetch as undiciFetch } from "undici";
import { PROVIDERS } from "@/lib/data/providers";

const ORIGIN = "https://bill.pitc.com.pk";

setDefaultResultOrder("ipv4first");

const ALLOWED_PATHS: Set<string> = new Set(
  PROVIDERS
    .filter((p) => p.realApi === "pk-pitc" && p.pitcBillPath)
    .map((p) => p.pitcBillPath!.toLowerCase())
);

function invocationBudgetMs(): number {
  const override = process.env.PITC_INVOCATION_BUDGET_MS;
  if (override) {
    const ms = Number.parseInt(override, 10);
    if (Number.isFinite(ms) && ms >= 3000) return ms;
  }
  return process.env.VERCEL ? 8_500 : 30_000;
}

function perRequestBudgetMs(totalBudgetMs: number): number {
  return Math.max(2500, Math.min(6500, Math.floor(totalBudgetMs / 3)));
}

const pitcAgent = new Agent({
  connect: { family: 4, timeout: 4_000 },
  bodyTimeout: 6_000,
  headersTimeout: 6_000,
});

async function pitcFetch(
  input: string,
  init: RequestInit | undefined,
  perReqMs: number,
  parentSignal: AbortSignal
): Promise<Response> {
  if (parentSignal.aborted) throw new DOMException("Aborted", "AbortError");
  const controller = new AbortController();
  const onAbort = () => controller.abort(parentSignal.reason);
  parentSignal.addEventListener("abort", onAbort, { once: true });
  const t = setTimeout(() => controller.abort(new Error("PITC request timeout")), perReqMs);

  const merged: RequestInit = { ...(init ?? {}), signal: controller.signal, cache: "no-store" };
  try {
    try {
      return (await undiciFetch(input, { ...merged, dispatcher: pitcAgent } as Parameters<typeof undiciFetch>[1])) as unknown as Response;
    } catch (e) {
      if (controller.signal.aborted) throw e;
      try { return await fetch(input, merged); } catch { throw e; }
    }
  } finally {
    clearTimeout(t);
    parentSignal.removeEventListener("abort", onAbort);
  }
}

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const BROWSER_HEADERS: HeadersInit = {
  "User-Agent": UA,
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

function cookieHeaderFromResponse(res: Response): string {
  const getSetCookie = res.headers.getSetCookie?.();
  if (getSetCookie?.length) {
    const map = new Map<string, string>();
    for (const line of getSetCookie) {
      const part = line.split(";")[0]?.trim();
      if (!part?.includes("=")) continue;
      const i = part.indexOf("=");
      map.set(part.slice(0, i), part.slice(i + 1));
    }
    return [...map.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
  }
  const raw = res.headers.get("set-cookie");
  if (!raw) return "";
  const parts = raw.split(/,(?=\s*[A-Za-z_][A-Za-z0-9_-]*=)/);
  const map = new Map<string, string>();
  for (const p of parts) {
    const seg = p.trim().split(";")[0];
    if (!seg?.includes("=")) continue;
    const j = seg.indexOf("=");
    map.set(seg.slice(0, j), seg.slice(j + 1));
  }
  return [...map.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

function mergeCookies(a: string, b: string): string {
  const map = new Map<string, string>();
  for (const chunk of [a, b]) {
    for (const part of chunk.split(";")) {
      const p = part.trim();
      if (!p.includes("=")) continue;
      const i = p.indexOf("=");
      map.set(p.slice(0, i), p.slice(i + 1));
    }
  }
  return [...map.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

function extractHidden(html: string, name: string): string {
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`<input[^>]+name="${esc}"[^>]*value="([^"]*)"`, "i");
  let m = html.match(re);
  if (m) return m[1];
  m = html.match(new RegExp(`<input[^>]+value="([^"]*)"[^>]+name="${esc}"`, "i"));
  return m ? m[1] : "";
}

function formBody(html: string, ref: string): URLSearchParams {
  const body = new URLSearchParams();
  body.set("__EVENTTARGET", "");
  body.set("__EVENTARGUMENT", "");
  body.set("__LASTFOCUS", "");
  body.set("__VIEWSTATE", extractHidden(html, "__VIEWSTATE"));
  body.set("__VIEWSTATEGENERATOR", extractHidden(html, "__VIEWSTATEGENERATOR"));
  body.set("__EVENTVALIDATION", extractHidden(html, "__EVENTVALIDATION"));
  body.set("rbSearchByList", "refno");
  body.set("searchTextBox", ref);
  body.set("ruCodeTextBox", "");
  body.set("__RequestVerificationToken", extractHidden(html, "__RequestVerificationToken"));
  body.set("btnSearch", "Search");
  return body;
}

function hasPitcUserFeedback(html: string): boolean {
  const c = html.replace(/\s+/g, " ");
  if (/does not belongs? to\b/i.test(c)) return true;
  if (/the given input\b/i.test(c)) return true;
  if (/invalid\s+reference/i.test(c)) return true;
  if (/no\s+record\s+found/i.test(c)) return true;
  if (/<span[^>]*id="lblSnapError"[^>]*>[\s\S]*?\S[\s\S]*?<\/span>/i.test(html)) return true;
  return false;
}

function isLikelyBillHtml(html: string): boolean {
  if (/<title>[^<]*ONLINE BILL<\/title>/i.test(html) && html.includes("maincontent")) return true;
  if (html.includes("ONLINE BILL") && html.includes("fontsize")) return true;
  return false;
}

export type FetchPitcBillResult =
  | { ok: true; html: string; ref: string }
  | { ok: false; error: string; status: number };

export function isAllowedPitcBillPath(p: string): boolean {
  return ALLOWED_PATHS.has(p.trim().toLowerCase());
}

async function fetchOnce(ref: string, base: string, signal: AbortSignal, perReq: number): Promise<FetchPitcBillResult> {
  const sess = await pitcFetch(base, { headers: BROWSER_HEADERS }, perReq, signal);
  const cookies1 = cookieHeaderFromResponse(sess);
  const html = await sess.text();
  if (!sess.ok) return { ok: false, error: `PITC ${sess.status}`, status: 502 };
  if (!cookies1) return { ok: false, error: "No session cookies from PITC.", status: 502 };
  if (!extractHidden(html, "__VIEWSTATE")) return { ok: false, error: "PITC page missing __VIEWSTATE.", status: 502 };

  const post = await pitcFetch(
    base,
    {
      method: "POST",
      headers: {
        ...BROWSER_HEADERS,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Cookie: cookies1,
        Referer: base,
        Origin: ORIGIN,
      },
      body: formBody(html, ref).toString(),
      redirect: "manual",
    },
    perReq, signal
  );
  const cookies2 = mergeCookies(cookies1, cookieHeaderFromResponse(post));

  let body = "";
  if (post.status === 301 || post.status === 302) {
    const loc = post.headers.get("location");
    if (!loc) return { ok: false, error: "PITC redirect without Location.", status: 502 };
    const final = new URL(loc, ORIGIN).href;
    const getRes = await pitcFetch(final, { headers: { ...BROWSER_HEADERS, Cookie: cookies2, Referer: base } }, perReq, signal);
    body = await getRes.text();
    if (!getRes.ok) return { ok: false, error: `PITC ${getRes.status}`, status: 502 };
  } else if (post.ok) {
    body = await post.text();
  } else {
    return { ok: false, error: `PITC POST ${post.status}`, status: 502 };
  }

  if (hasPitcUserFeedback(body)) return { ok: true, html: body, ref };
  if (isLikelyBillHtml(body)) return { ok: true, html: body, ref };
  return { ok: false, error: "Unexpected response from PITC (not a bill page).", status: 502 };
}

export async function fetchPitcBill(ref: string, pitcBillPath: string): Promise<FetchPitcBillResult> {
  const path = pitcBillPath.trim().replace(/^\/+/, "").toLowerCase();
  if (!isAllowedPitcBillPath(path)) return { ok: false, error: "Unsupported distribution company.", status: 400 };
  const base = `${ORIGIN}/${path}`;
  const budget = invocationBudgetMs();
  const perReq = perRequestBudgetMs(budget);
  const signal = AbortSignal.timeout(budget);
  const maxAttempts = budget >= perReq * 1.7 ? 2 : 1;

  let lastErr: unknown;
  let lastResult: FetchPitcBillResult | null = null;
  for (let i = 0; i < maxAttempts; i++) {
    if (signal.aborted) break;
    try {
      const r = await fetchOnce(ref, base, signal, perReq);
      if (r.ok || r.status !== 502) return r;
      lastResult = r;
    } catch (e) {
      lastErr = e;
      if (signal.aborted) break;
    }
    if (i < maxAttempts - 1) await new Promise((r) => setTimeout(r, 250));
  }
  if (lastResult) return lastResult;
  return {
    ok: false,
    error: lastErr instanceof Error ? lastErr.message : "Network error reaching PITC.",
    status: signal.aborted ? 504 : 502,
  };
}
