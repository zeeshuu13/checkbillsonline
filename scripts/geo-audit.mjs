/**
 * Phase 15 — GEO Testing Engine.
 * Scores entity completeness, AI retrieval quality, and citation readiness.
 * Run: node scripts/geo-audit.mjs
 * Writes results to reports/geo-report.json
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BASE = process.env.SITE_URL ?? "https://checkbillsonline.com";

// ── Scoring weights ─────────────────────────────────────────────────────────
const WEIGHTS = {
  entity: 0.25,
  aiRetrieval: 0.30,
  citation: 0.25,
  technical: 0.20,
};

// ── Test runners ─────────────────────────────────────────────────────────────

async function fetchJson(path) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "GEO-Audit-Bot/1.0" } });
    if (!res.ok) return { ok: false, status: res.status, url };
    const data = await res.json();
    return { ok: true, status: res.status, url, data };
  } catch (e) {
    return { ok: false, status: 0, url, error: e.message };
  }
}

async function fetchText(path) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "GEO-Audit-Bot/1.0" } });
    if (!res.ok) return { ok: false, status: res.status, url };
    const text = await res.text();
    return { ok: true, status: res.status, url, text };
  } catch (e) {
    return { ok: false, status: 0, url, error: e.message };
  }
}

function score(passed, total) {
  return Math.round((passed / total) * 100);
}

// ── 1. Entity Completeness ────────────────────────────────────────────────────

async function auditEntity() {
  const findings = [];
  let passed = 0;
  const total = 8;

  // Knowledge graph endpoint
  const kg = await fetchJson("/knowledge-graph.json");
  if (kg.ok && kg.data?.entities?.length > 0) {
    passed++;
    findings.push({ check: "knowledge-graph.json exists", status: "pass", detail: `${kg.data.entityCount} entities` });
  } else {
    findings.push({ check: "knowledge-graph.json exists", status: "fail", detail: kg.error ?? `HTTP ${kg.status}` });
  }

  // Entity map
  const em = await fetchJson("/entity-map.json");
  if (em.ok && em.data?.entryCount > 0) {
    passed++;
    findings.push({ check: "entity-map.json exists", status: "pass", detail: `${em.data.entryCount} entries` });
  } else {
    findings.push({ check: "entity-map.json exists", status: "fail", detail: em.error ?? `HTTP ${em.status}` });
  }

  // Provider API
  const providers = await fetchJson("/api/providers.json");
  if (providers.ok && providers.data?.data?.length >= 50) {
    passed++;
    findings.push({ check: "providers.json has ≥50 providers", status: "pass", detail: `${providers.data.count} providers` });
  } else {
    findings.push({ check: "providers.json has ≥50 providers", status: "fail", detail: providers.error ?? `Got ${providers.data?.count ?? 0}` });
  }

  // Countries API
  const countries = await fetchJson("/api/countries.json");
  if (countries.ok && countries.data?.data?.length >= 20) {
    passed++;
    findings.push({ check: "countries.json has ≥20 countries", status: "pass", detail: `${countries.data.count} countries` });
  } else {
    findings.push({ check: "countries.json has ≥20 countries", status: "fail", detail: countries.error ?? `Got ${countries.data?.count ?? 0}` });
  }

  // Glossary API
  const glossary = await fetchJson("/api/glossary.json");
  if (glossary.ok && glossary.data?.data?.length >= 10) {
    passed++;
    findings.push({ check: "glossary.json has ≥10 terms", status: "pass", detail: `${glossary.data.count} terms` });
  } else {
    findings.push({ check: "glossary.json has ≥10 terms", status: "fail", detail: glossary.error ?? `Got ${glossary.data?.count ?? 0}` });
  }

  // Tariff API
  const tariffs = await fetchJson("/api/tariffs.json");
  if (tariffs.ok && tariffs.data?.data?.length > 0) {
    passed++;
    findings.push({ check: "tariffs.json has data", status: "pass", detail: `${tariffs.data.count} tariff entries` });
  } else {
    findings.push({ check: "tariffs.json has data", status: "fail", detail: tariffs.error ?? `HTTP ${tariffs.status}` });
  }

  // Regulators API
  const regulators = await fetchJson("/api/regulators.json");
  if (regulators.ok && regulators.data?.data?.length >= 10) {
    passed++;
    findings.push({ check: "regulators.json has ≥10 entries", status: "pass", detail: `${regulators.data.count} regulators` });
  } else {
    findings.push({ check: "regulators.json has ≥10 entries", status: "fail", detail: regulators.error ?? `HTTP ${regulators.status}` });
  }

  // Content map
  const cm = await fetchJson("/content-map.json");
  if (cm.ok && cm.data?.nodeCount >= 100) {
    passed++;
    findings.push({ check: "content-map.json has ≥100 nodes", status: "pass", detail: `${cm.data.nodeCount} nodes` });
  } else {
    findings.push({ check: "content-map.json has ≥100 nodes", status: "fail", detail: cm.error ?? `Got ${cm.data?.nodeCount ?? 0}` });
  }

  return { score: score(passed, total), passed, total, findings };
}

// ── 2. AI Retrieval Quality ───────────────────────────────────────────────────

async function auditAiRetrieval() {
  const findings = [];
  let passed = 0;
  const total = 10;

  // llms.txt
  const llms = await fetchText("/llms.txt");
  if (llms.ok && llms.text?.includes("CheckBillsOnline")) {
    passed++;
    findings.push({ check: "llms.txt exists and has site name", status: "pass", detail: `${llms.text.length} chars` });
  } else {
    findings.push({ check: "llms.txt exists and has site name", status: "fail", detail: llms.error ?? `HTTP ${llms.status}` });
  }

  // AI crawlers in robots.txt
  const robots = await fetchText("/robots.txt");
  const aiCrawlers = ["GPTBot", "anthropic-ai", "ClaudeBot", "PerplexityBot"];
  const robotsText = robots.text ?? "";
  let crawlersPassed = 0;
  for (const bot of aiCrawlers) {
    if (robotsText.includes(bot)) crawlersPassed++;
  }
  if (crawlersPassed >= 3) {
    passed++;
    findings.push({ check: "AI crawlers allowed in robots.txt", status: "pass", detail: `${crawlersPassed}/${aiCrawlers.length} bots listed` });
  } else {
    findings.push({ check: "AI crawlers allowed in robots.txt", status: "fail", detail: `Only ${crawlersPassed}/${aiCrawlers.length} bots listed` });
  }

  // JSON-LD on homepage
  const home = await fetchText("/");
  if (home.ok) {
    const jsonLdBlocks = (home.text?.match(/<script type="application\/ld\+json">/g) ?? []).length;
    if (jsonLdBlocks >= 3) {
      passed++;
      findings.push({ check: "Homepage has ≥3 JSON-LD blocks", status: "pass", detail: `${jsonLdBlocks} JSON-LD blocks found` });
    } else {
      findings.push({ check: "Homepage has ≥3 JSON-LD blocks", status: "fail", detail: `Only ${jsonLdBlocks} blocks` });
    }

    // Organization schema
    if (home.text?.includes('"@type":"Organization"')) {
      passed++;
      findings.push({ check: "Organization schema present", status: "pass" });
    } else {
      findings.push({ check: "Organization schema present", status: "fail" });
    }

    // FAQ schema
    if (home.text?.includes('"@type":"FAQPage"')) {
      passed++;
      findings.push({ check: "FAQPage schema present", status: "pass" });
    } else {
      findings.push({ check: "FAQPage schema present", status: "fail" });
    }

    // HowTo schema
    if (home.text?.includes('"@type":"HowTo"') || home.text?.includes('"@type": "HowTo"')) {
      passed++;
      findings.push({ check: "HowTo schema present", status: "pass" });
    } else {
      findings.push({ check: "HowTo schema present", status: "fail" });
    }

    // SpeakableSpecification
    if (home.text?.includes("speakable") || home.text?.includes("data-speakable")) {
      passed++;
      findings.push({ check: "Speakable markup present", status: "pass" });
    } else {
      findings.push({ check: "Speakable markup present", status: "fail" });
    }

    // DefinedTermSet
    if (home.text?.includes('"DefinedTermSet"')) {
      passed++;
      findings.push({ check: "DefinedTermSet schema present", status: "pass" });
    } else {
      findings.push({ check: "DefinedTermSet schema present", status: "fail" });
    }
  } else {
    for (let i = 0; i < 6; i++) {
      findings.push({ check: "Homepage HTML check", status: "skip", detail: `Homepage unreachable: HTTP ${home.status}` });
    }
  }

  // Sitemap
  const sitemap = await fetchText("/sitemap.xml");
  if (sitemap.ok && (sitemap.text?.match(/<loc>/g) ?? []).length > 50) {
    passed++;
    const urlCount = (sitemap.text?.match(/<loc>/g) ?? []).length;
    findings.push({ check: "Sitemap has >50 URLs", status: "pass", detail: `${urlCount} URLs` });
  } else {
    findings.push({ check: "Sitemap has >50 URLs", status: "fail", detail: `Got ${(sitemap.text?.match(/<loc>/g) ?? []).length}` });
  }

  // IndexNow key file
  const inkey = await fetchText("/38510a659d6f49f2a9d460fce97f973b.txt");
  if (inkey.ok && inkey.text?.includes("38510a659d6f49f2a9d460fce97f973b")) {
    passed++;
    findings.push({ check: "IndexNow key file present", status: "pass" });
  } else {
    findings.push({ check: "IndexNow key file present", status: "fail", detail: `HTTP ${inkey.status}` });
  }

  return { score: score(passed, total), passed, total, findings };
}

// ── 3. Citation Readiness ─────────────────────────────────────────────────────

async function auditCitation() {
  const findings = [];
  let passed = 0;
  const total = 7;

  // Tariffs have source citations
  const tariffs = await fetchJson("/api/tariffs.json");
  if (tariffs.ok) {
    const rows = tariffs.data?.data ?? [];
    const hasSources = rows.every((t) => t.sourceLabel && t.sourceUrl && t.retrievedOn);
    if (rows.length > 0 && hasSources) {
      passed++;
      findings.push({ check: "All tariffs have sourceLabel/sourceUrl/retrievedOn", status: "pass", detail: `${rows.length} tariffs checked` });
    } else {
      const missing = rows.filter((t) => !t.sourceLabel || !t.sourceUrl || !t.retrievedOn);
      findings.push({ check: "All tariffs have sourceLabel/sourceUrl/retrievedOn", status: "fail", detail: `${missing.length} missing citations` });
    }

    // Tariffs link to regulator URLs
    const hasRegulatorUrls = rows.some((t) => t.sourceUrl?.includes("gov") || t.sourceUrl?.includes("org") || t.sourceUrl?.includes("com"));
    if (hasRegulatorUrls) {
      passed++;
      findings.push({ check: "Tariff sources include external URLs", status: "pass" });
    } else {
      findings.push({ check: "Tariff sources include external URLs", status: "fail" });
    }
  }

  // Regulators have URLs
  const regulators = await fetchJson("/api/regulators.json");
  if (regulators.ok) {
    const regs = regulators.data?.data ?? [];
    const allHaveUrls = regs.every((r) => r.url);
    if (allHaveUrls && regs.length > 0) {
      passed++;
      findings.push({ check: "All regulators have URLs", status: "pass", detail: `${regs.length} regulators` });
    } else {
      findings.push({ check: "All regulators have URLs", status: "fail", detail: `Missing URL on some` });
    }
  }

  // Knowledge graph has CC BY 4.0 license
  const kg = await fetchJson("/knowledge-graph.json");
  if (kg.ok && kg.data?.license?.includes("creativecommons")) {
    passed++;
    findings.push({ check: "Knowledge graph has CC BY 4.0 license", status: "pass" });
  } else {
    findings.push({ check: "Knowledge graph has CC BY 4.0 license", status: "fail" });
  }

  // EEAT signals in homepage
  const home = await fetchText("/");
  if (home.ok) {
    const hasPublishingPrinciples = home.text?.includes("publishingPrinciples");
    if (hasPublishingPrinciples) {
      passed++;
      findings.push({ check: "publishingPrinciples EEAT signal present", status: "pass" });
    } else {
      findings.push({ check: "publishingPrinciples EEAT signal present", status: "fail" });
    }

    const hasCorrections = home.text?.includes("correctionsPolicy");
    if (hasCorrections) {
      passed++;
      findings.push({ check: "correctionsPolicy EEAT signal present", status: "pass" });
    } else {
      findings.push({ check: "correctionsPolicy EEAT signal present", status: "fail" });
    }
  }

  // FAQs have answers
  const faqs = await fetchJson("/api/faqs.json");
  if (faqs.ok && faqs.data?.data?.length > 0) {
    const allHaveAnswers = faqs.data.data.every((f) => f.acceptedAnswer?.text?.length > 10);
    if (allHaveAnswers) {
      passed++;
      findings.push({ check: "All FAQs have substantive answers", status: "pass", detail: `${faqs.data.count} FAQs` });
    } else {
      findings.push({ check: "All FAQs have substantive answers", status: "fail" });
    }
  }

  return { score: score(passed, total), passed, total, findings };
}

// ── 4. Technical Signals ──────────────────────────────────────────────────────

async function auditTechnical() {
  const findings = [];
  let passed = 0;
  const total = 6;

  // Canonical tags
  const home = await fetchText("/");
  if (home.ok) {
    if (home.text?.includes('rel="canonical"')) {
      passed++;
      findings.push({ check: "Homepage has canonical tag", status: "pass" });
    } else {
      findings.push({ check: "Homepage has canonical tag", status: "fail" });
    }

    // Open Graph
    if (home.text?.includes('og:title') || home.text?.includes("og:description")) {
      passed++;
      findings.push({ check: "Open Graph meta tags present", status: "pass" });
    } else {
      findings.push({ check: "Open Graph meta tags present", status: "fail" });
    }

    // Structured data @context
    if (home.text?.includes('"@context":"https://schema.org"') || home.text?.includes('"@context": "https://schema.org"')) {
      passed++;
      findings.push({ check: "schema.org @context in JSON-LD", status: "pass" });
    } else {
      findings.push({ check: "schema.org @context in JSON-LD", status: "fail" });
    }

    // ARIA landmarks
    if (home.text?.includes('role="main"') || home.text?.includes("<main")) {
      passed++;
      findings.push({ check: "Main landmark present", status: "pass" });
    } else {
      findings.push({ check: "Main landmark present", status: "fail" });
    }
  }

  // API CORS headers
  const providers = await fetch(`${BASE}/api/providers.json`, { method: "HEAD" }).catch(() => null);
  if (providers?.headers?.get("access-control-allow-origin") === "*") {
    passed++;
    findings.push({ check: "API endpoints have CORS * header", status: "pass" });
  } else {
    findings.push({ check: "API endpoints have CORS * header", status: "fail" });
  }

  // Cache-Control on API
  if (providers?.headers?.get("cache-control")?.includes("public")) {
    passed++;
    findings.push({ check: "API Cache-Control is public", status: "pass" });
  } else {
    findings.push({ check: "API Cache-Control is public", status: "fail" });
  }

  return { score: score(passed, total), passed, total, findings };
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍 GEO Audit — ${BASE}\n`);

  const [entity, aiRetrieval, citation, technical] = await Promise.all([
    auditEntity(),
    auditAiRetrieval(),
    auditCitation(),
    auditTechnical(),
  ]);

  const composite = Math.round(
    entity.score * WEIGHTS.entity +
    aiRetrieval.score * WEIGHTS.aiRetrieval +
    citation.score * WEIGHTS.citation +
    technical.score * WEIGHTS.technical
  );

  const grade =
    composite >= 90 ? "A" :
    composite >= 80 ? "B" :
    composite >= 70 ? "C" :
    composite >= 60 ? "D" : "F";

  const report = {
    version: "1",
    generatedAt: new Date().toISOString(),
    site: BASE,
    composite: { score: composite, grade },
    dimensions: {
      entity: { weight: WEIGHTS.entity, score: entity.score, passed: entity.passed, total: entity.total, findings: entity.findings },
      aiRetrieval: { weight: WEIGHTS.aiRetrieval, score: aiRetrieval.score, passed: aiRetrieval.passed, total: aiRetrieval.total, findings: aiRetrieval.findings },
      citation: { weight: WEIGHTS.citation, score: citation.score, passed: citation.passed, total: citation.total, findings: citation.findings },
      technical: { weight: WEIGHTS.technical, score: technical.score, passed: technical.passed, total: technical.total, findings: technical.findings },
    },
    failedChecks: [
      ...entity.findings,
      ...aiRetrieval.findings,
      ...citation.findings,
      ...technical.findings,
    ].filter((f) => f.status === "fail"),
  };

  // Print summary
  console.log(`Composite GEO Score: ${composite}/100 (${grade})\n`);
  console.log(`  Entity Completeness:  ${entity.score}/100  (${entity.passed}/${entity.total})`);
  console.log(`  AI Retrieval Quality: ${aiRetrieval.score}/100  (${aiRetrieval.passed}/${aiRetrieval.total})`);
  console.log(`  Citation Readiness:   ${citation.score}/100  (${citation.passed}/${citation.total})`);
  console.log(`  Technical Signals:    ${technical.score}/100  (${technical.passed}/${technical.total})`);

  if (report.failedChecks.length > 0) {
    console.log(`\n❌ Failed checks (${report.failedChecks.length}):`);
    for (const f of report.failedChecks) {
      console.log(`   • ${f.check}${f.detail ? ` — ${f.detail}` : ""}`);
    }
  } else {
    console.log("\n✅ All checks passed!");
  }

  // Write report
  const reportsDir = join(ROOT, "reports");
  mkdirSync(reportsDir, { recursive: true });
  const reportPath = join(reportsDir, "geo-report.json");
  writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
  console.log(`\n📄 Full report written to reports/geo-report.json`);
}

main().catch((e) => { console.error(e); process.exit(1); });
