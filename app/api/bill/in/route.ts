import type { NextRequest } from "next/server";
import { PROVIDERS } from "@/lib/data/providers";

/**
 * India BBPS bill lookup via Razorpay BBPS API.
 *
 * SETUP (post-launch):
 *   1. Complete Razorpay KYB (Know Your Business). Razorpay will whitelist your account for BBPS.
 *      https://razorpay.com/docs/payments/payment-methods/bbps/integration/
 *   2. Add RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET to .env.
 *   3. Each provider's bbpsBillerId is in lib/data/providers.ts.
 *
 * Until keys are provisioned, this endpoint returns a clear 503 telling the user to use the
 * official portal in the meantime — the UI's Tier-A flow falls back to the linkout.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

type BbpsFetchBillRequest = {
  bill: {
    biller_id: string;
    customer: { mobile_number?: string; identifier: Record<string, string> };
  };
};

type BbpsFetchBillResponse = {
  bill?: {
    amount?: number;
    due_date?: string;
    customer_name?: string;
    bill_number?: string;
    bill_date?: string;
    bill_period?: string;
  };
  error?: { code?: string; description?: string };
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const biller = (url.searchParams.get("biller") ?? "").trim();
  const consumerId = (url.searchParams.get("consumerId") ?? "").trim();

  if (!biller || !consumerId) {
    return Response.json({ error: "biller and consumerId are required." }, { status: 400 });
  }

  // Validate consumerId: alphanumeric/dash/slash, 4–20 chars
  if (!/^[A-Za-z0-9_\-/]{4,20}$/.test(consumerId)) {
    return Response.json({ error: "Invalid consumer ID format." }, { status: 400 });
  }

  const provider = PROVIDERS.find((p) => p.bbpsBillerId === biller);
  if (!provider) {
    return Response.json({ error: "Unknown biller." }, { status: 400 });
  }

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const base = process.env.RAZORPAY_BBPS_BASE_URL ?? "https://api.razorpay.com/v1";

  if (!keyId || !keySecret) {
    return Response.json(
      {
        error:
          "Live bill lookup for India is not yet activated on this server. Use the official provider portal — the link is on the page.",
      },
      { status: 503, headers: { "X-Robots-Tag": "noindex" } }
    );
  }

  const payload: BbpsFetchBillRequest = {
    bill: {
      biller_id: biller,
      customer: {
        identifier: { reference: consumerId },
      },
    },
  };

  const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(new Error("BBPS timeout")), 12_000);

    let res: Response;
    try {
      res = await fetch(`${base}/bbps/bill/fetch`, {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }
    const data = (await res.json()) as BbpsFetchBillResponse;

    if (!res.ok || data.error) {
      return Response.json(
        { error: data.error?.description ?? "Bill lookup failed at upstream." },
        { status: res.status }
      );
    }

    const bill = data.bill ?? {};
    const html = renderBillHtml(provider.name, consumerId, bill);
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Network error reaching BBPS." },
      { status: 502 }
    );
  }
}

function renderBillHtml(
  providerName: string,
  consumerId: string,
  bill: NonNullable<BbpsFetchBillResponse["bill"]>
): string {
  const amount = typeof bill.amount === "number" ? (bill.amount / 100).toFixed(2) : "—";
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(providerName)} bill</title>
<style>
  body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #0f172a; }
  h1 { margin: 0 0 12px; font-size: 22px; }
  table { width: 100%; border-collapse: collapse; }
  td { padding: 8px 10px; border-bottom: 1px solid #e5e7eb; vertical-align: top; }
  td:first-child { color: #475569; width: 40%; }
  .amount { font-size: 28px; font-weight: 700; color: #1c40ad; }
</style></head>
<body>
  <h1>${escapeHtml(providerName)} — Latest Bill</h1>
  <p class="amount">₹${escapeHtml(amount)}</p>
  <table>
    <tr><td>Consumer ID</td><td>${escapeHtml(consumerId)}</td></tr>
    <tr><td>Customer name</td><td>${escapeHtml(bill.customer_name ?? "—")}</td></tr>
    <tr><td>Bill number</td><td>${escapeHtml(bill.bill_number ?? "—")}</td></tr>
    <tr><td>Bill date</td><td>${escapeHtml(bill.bill_date ?? "—")}</td></tr>
    <tr><td>Due date</td><td>${escapeHtml(bill.due_date ?? "—")}</td></tr>
    <tr><td>Bill period</td><td>${escapeHtml(bill.bill_period ?? "—")}</td></tr>
  </table>
  <p style="margin-top:16px;font-size:12px;color:#64748b">Data fetched via NPCI BBPS through Razorpay. We do not store this bill.</p>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
