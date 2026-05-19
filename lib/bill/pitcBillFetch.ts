/**
 * Pakistan PITC bill fetcher — identical logic to checkbills.pk/lib/pitcBillFetch.ts.
 *
 * PITC (bill.pitc.com.pk) is only reachable from IP ranges that Pakistan's network permits.
 * When deployed on a US-region VPS, requests time out. Set HTTPS_PROXY to route through
 * a proxy in a Pakistan-accessible region (India, Singapore, Pakistan):
 *   HTTPS_PROXY=http://your-proxy-host:port
 *
 * Vercel: use preferredRegion bom1/sin1/hkg1 (closer to PK) and no proxy needed.
 * VPS: set HTTPS_PROXY in the PM2 env or ecosystem config.
 */

import { setDefaultResultOrder } from "node:dns";
import { Agent, fetch as undiciFetch, ProxyAgent } from "undici";
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
  const raw = process.env.VERCEL_FUNCTION_MAX_DURATION;
  if (raw) {
    const sec = Number.parseInt(raw, 10);
    if (Number.isFinite(sec) && sec > 0) return Math.max(4000, sec * 1000 - 1500);
  }
  if (process.env.VERCEL) return 8_500;
  return 30_000;
}

function perRequestBudgetMs(totalBudgetMs: number): number {
  return Math.max(2500, Math.min(6500, Math.floor(totalBudgetMs / 3)));
}

// If HTTPS_PROXY is set, route all PITC traffic through it so US/EU VPS can reach PK networks.
function makePitcAgent() {
  const proxy = process.env.HTTPS_PROXY ?? process.env.https_proxy;
  if (proxy) {
    return new ProxyAgent({
      uri: proxy,
      connect: { family: 4, timeout: 8_000 },
    });
  }
  return new Agent({
    connect: { family: 4, timeout: 4_000 },
    bodyTimeout: 10_000,
    headersTimeout: 10_000,
  });
}

const pitcAgent = makePitcAgent();

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
      return (await undiciFetch(input, {
        ...merged,
        dispatcher: pitcAgent,
      } as Parameters<typeof undiciFetch>[1])) as unknown as Response;
    } catch (undiciErr) {
      if (controller.signal.aborted) throw undiciErr;
      try { return await fetch(input, merged); } catch { throw undiciErr; }
    }
  } finally {
    clearTimeout(t);
    parentSignal.removeEventListener("abort", onAbort);
  }
}

function formatPitcNetworkError(e: unknown): string {
  if (!(e instanceof Error)) return "Could not reach the electricity bill portal. Please try again.";
  const cause = "cause" in e && e.cause instanceof Error ? e.cause.message : "";
  const combined = cause ? `${e.message} ${cause}` : e.message;
  const low = combined.toLowerCase();
  if (e.name === "TimeoutError" || low.includes("timeout") || low.includes("aborted")) {
    return "The bill portal did not finish in time. Please try again in a minute, or open your bill on the official PITC website using the link below.";
  }
  if (low.includes("fetch failed") || low.includes("econnreset") || low.includes("etimedout") ||
      low.includes("enotfound") || low.includes("certificate") || low.includes("ssl")) {
    return "Could not reach the electricity bill portal (connection issue). Please try again in a minute.";
  }
  return e.message;
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
  if (/does not belong\b/i.test(c)) return true;
  if (/invalid\s+reference/i.test(c)) return true;
  if (/reference\s+number.*invalid/i.test(c)) return true;
  if (/consumer\s+id.*invalid/i.test(c)) return true;
  if (/no\s+record\s+found/i.test(c)) return true;
  if (/could\s+not\s+be\s+found/i.test(c)) return true;
  if (/<span[^>]*id="lblSnapError"[^>]*>[\s\S]*?\S[\s\S]*?<\/span>/i.test(html)) return true;
  return false;
}

function isLikelyBillHtml(html: string): boolean {
  if (/<title>[^<]*ONLINE BILL<\/title>/i.test(html) && html.includes("maincontent") && html.includes("fontsize")) return true;
  if (html.includes("MEPCO ONLINE BILL")) return true;
  if (html.includes("MULTAN ELECTRIC POWER COMPANY") && (html.includes("maincontent") || html.includes("fontsize"))) return true;
  if (html.includes("LESCO ONLINE BILL")) return true;
  if (html.includes("LAHORE ELECTRIC SUPPLY COMPANY") && (html.includes("maincontent") || html.includes("fontsize"))) return true;
  // Generic fallback for other DISCOs (IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, HAZECO)
  if (html.includes("ONLINE BILL") && (html.includes("fontsize") || html.includes("maincontent"))) return true;
  return false;
}

function isSearchFormHtml(html: string): boolean {
  if (!html.includes("Search Your Electricity Bill")) return false;
  if (hasPitcUserFeedback(html)) return false;
  if (html.includes("maincontent") && html.includes("fontsize")) return false;
  if (/<title>[^<]*ONLINE BILL<\/title>/i.test(html)) return false;
  return true;
}

export type FetchPitcBillResult =
  | { ok: true; html: string; ref: string }
  | { ok: false; error: string; status: number; preview?: string };

export function isAllowedPitcBillPath(p: string): boolean {
  return ALLOWED_PATHS.has(p.trim().toLowerCase());
}

async function fetchOnce(
  ref: string, base: string, signal: AbortSignal, perReq: number
): Promise<FetchPitcBillResult> {
  const sessRes = await pitcFetch(base, { headers: BROWSER_HEADERS }, perReq, signal);
  const cookies1 = cookieHeaderFromResponse(sessRes);
  const sessHtml = await sessRes.text();

  if (!sessRes.ok) return { ok: false, error: `PITC session page returned ${sessRes.status}`, status: 502 };
  if (!cookies1) return { ok: false, error: "Could not read session cookies from PITC.", status: 502 };
  const vs = extractHidden(sessHtml, "__VIEWSTATE");
  if (!vs) return { ok: false, error: "Could not parse PITC search form (missing __VIEWSTATE). The portal layout may have changed.", status: 502 };

  const postRes = await pitcFetch(
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
      body: formBody(sessHtml, ref).toString(),
      redirect: "manual",
    },
    perReq, signal
  );
  const cookies2 = mergeCookies(cookies1, cookieHeaderFromResponse(postRes));

  let html = "";
  if (postRes.status === 301 || postRes.status === 302) {
    const loc = postRes.headers.get("location");
    if (!loc) return { ok: false, error: "PITC POST returned redirect without Location.", status: 502 };
    const finalUrl = new URL(loc, ORIGIN).href;
    const getRes = await pitcFetch(
      finalUrl,
      { headers: { ...BROWSER_HEADERS, Cookie: cookies2, Referer: base } },
      perReq, signal
    );
    html = await getRes.text();
    if (!getRes.ok) return { ok: false, error: `PITC bill page returned ${getRes.status}`, status: 502 };
  } else if (postRes.ok) {
    html = await postRes.text();
  } else {
    return { ok: false, error: `PITC search POST returned ${postRes.status}`, status: 502 };
  }

  if (hasPitcUserFeedback(html)) return { ok: true, html, ref };
  if (isLikelyBillHtml(html)) return { ok: true, html, ref };
  if (isSearchFormHtml(html)) return { ok: false, error: "PITC still showed the search form. Check the reference number or try again.", status: 502 };

  return { ok: false, error: "Unexpected response from PITC (not a recognized bill page).", status: 502, preview: html.slice(0, 280) };
}

export async function fetchPitcBill(ref: string, pitcBillPath: string): Promise<FetchPitcBillResult> {
  const path = pitcBillPath.trim().replace(/^\/+/, "").toLowerCase();
  if (!isAllowedPitcBillPath(path)) return { ok: false, error: "Unsupported distribution company.", status: 400 };

  const base = `${ORIGIN}/${path}`;
  const budget = invocationBudgetMs();
  const perReq = perRequestBudgetMs(budget);
  const signal = AbortSignal.timeout(budget);
  const maxAttempts = budget >= perReq * 1.7 ? 2 : 1;

  const isRetryable = (r: FetchPitcBillResult) =>
    !r.ok &&
    r.status === 502 &&
    typeof r.error === "string" &&
    (r.error.includes("session cookies") ||
      r.error.includes("__VIEWSTATE") ||
      r.error.includes("still showed the search form") ||
      r.error.startsWith("PITC session page returned"));

  let lastErr: unknown;
  let lastResult: FetchPitcBillResult | null = null;

  for (let i = 0; i < maxAttempts; i++) {
    if (signal.aborted) break;
    try {
      const r = await fetchOnce(ref, base, signal, perReq);
      if (r.ok || !isRetryable(r)) return r;
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
    error: formatPitcNetworkError(lastErr),
    status: signal.aborted ? 504 : 502,
  };
}
