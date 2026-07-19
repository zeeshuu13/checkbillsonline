const HOST = 'checkbillsonline.com';
const KEY = '38510a659d6f49f2a9d460fce97f973b';
const SITE_URL = `https://${HOST}`;
const INDEXNOW_API = 'https://api.indexnow.org/indexnow';
const BATCH_SIZE = 10_000;

async function getSitemapUrls() {
  console.log(`Fetching sitemap from ${SITE_URL}/sitemap.xml …`);
  const res = await fetch(`${SITE_URL}/sitemap.xml`);
  if (!res.ok) throw new Error(`Sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  const matches = xml.match(/<loc>(.*?)<\/loc>/g) ?? [];
  return matches.map((m) => m.replace(/<\/?loc>/g, '').trim());
}

async function submitBatch(urls, batchNum) {
  const res = await fetch(INDEXNOW_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `${SITE_URL}/${KEY}.txt`,
      urlList: urls,
    }),
  });
  const status = res.status;
  const label = status === 200 ? 'OK' : status === 202 ? 'Accepted' : `HTTP ${status}`;
  console.log(`Batch ${batchNum} (${urls.length} URLs): ${label}`);
  return status;
}

async function main() {
  const urls = await getSitemapUrls();
  console.log(`Found ${urls.length} URLs to submit.`);

  if (urls.length === 0) {
    console.error('No URLs found — is the site live and the sitemap reachable?');
    process.exit(1);
  }

  let batch = 1;
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    await submitBatch(urls.slice(i, i + BATCH_SIZE), batch++);
  }

  console.log('IndexNow submission complete.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
