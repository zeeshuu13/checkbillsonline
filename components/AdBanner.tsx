'use client';
import { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

export function AdBanner({ adKey, width, height, className }: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    (window as Record<string, unknown>).atOptions = {
      key: adKey,
      format: 'iframe',
      height,
      width,
      params: {},
    };
    const script = document.createElement('script');
    script.src = `https://calculatepredestinationset.com/${adKey}/invoke.js`;
    script.async = true;
    ref.current.appendChild(script);
  }, [adKey, width, height]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', minHeight: height }}
    />
  );
}
