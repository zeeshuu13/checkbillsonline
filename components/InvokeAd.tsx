'use client';
import Script from 'next/script';

const INVOKE_KEY = '5f422c744496d129c349933b70c8922c';

export function InvokeAd({ className }: { className?: string }) {
  return (
    <div className={className} style={{ textAlign: 'center' }}>
      <div id={`container-${INVOKE_KEY}`} />
      <Script
        data-cfasync="false"
        src={`https://calculatepredestinationset.com/${INVOKE_KEY}/invoke.js`}
        strategy="lazyOnload"
      />
    </div>
  );
}
