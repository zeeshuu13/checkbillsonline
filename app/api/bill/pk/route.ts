import { NextRequest, NextResponse } from "next/server";
import { fetchPitcBill, isAllowedPitcBillPath } from "@/lib/bill/pitcBillFetch";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const path = (url.searchParams.get("path") ?? "").trim().toLowerCase();
  const refRaw = (url.searchParams.get("refno") ?? "").trim();
  const ref = refRaw.replace(/[^0-9]/g, "");

  if (!path || !isAllowedPitcBillPath(path)) {
    return NextResponse.json({ error: "Unsupported distribution company." }, { status: 400 });
  }
  if (!ref || ref.length < 10 || ref.length > 14) {
    return NextResponse.json({ error: "Reference number must be 10–14 digits." }, { status: 400 });
  }

  const result = await fetchPitcBill(ref, path);
  if (!result.ok) {
    const body: { error: string; preview?: string } = { error: result.error };
    if ("preview" in result && result.preview) body.preview = result.preview;
    return NextResponse.json(body, { status: result.status });
  }

  return NextResponse.json(
    { html: result.html, ref: result.ref },
    { headers: { "Cache-Control": "private, no-store", "X-Robots-Tag": "noindex" } }
  );
}
