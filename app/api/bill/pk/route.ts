import type { NextRequest } from "next/server";
import { fetchPitcBill, isAllowedPitcBillPath } from "@/lib/bill/pitcBillFetch";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 30;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = (url.searchParams.get("path") ?? "").trim().toLowerCase();
  const refRaw = (url.searchParams.get("refno") ?? "").trim();
  const ref = refRaw.replace(/[^0-9]/g, "");

  if (!path || !isAllowedPitcBillPath(path)) {
    return Response.json({ error: "Unsupported distribution company." }, { status: 400 });
  }
  if (!ref || ref.length < 10 || ref.length > 14) {
    return Response.json({ error: "Reference number should be 10-14 digits." }, { status: 400 });
  }

  const result = await fetchPitcBill(ref, path);
  if (!result.ok) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return new Response(result.html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
