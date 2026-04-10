import React, { useEffect, useRef } from "react";

// Replace with your AdSense publisher ID (must match on-render-body.ts)
const ADSENSE_CLIENT = "ca-pub-2056168497841803";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface Props {
  slot: string;
  format?: string;
  onRender?: () => void;
}

const AdSense: React.FC<Props> = ({ slot, format = "auto", onRender }) => {
  const insRef = useRef<any>(null);

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (!insRef.current || !onRender) return;

    const observer = new ResizeObserver(() => {
      if (insRef.current && insRef.current.offsetHeight > 0) {
        onRender();
        observer.disconnect();
      }
    });

    observer.observe(insRef.current);
    return () => observer.disconnect();
  }, [onRender]);

  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={{ display: "block", margin: "1rem 0" }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};

export default AdSense;
