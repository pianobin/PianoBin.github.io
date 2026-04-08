import React, { useEffect } from "react";

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
}

const AdSense: React.FC<Props> = ({ slot, format = "auto" }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }, []);

  return (
    <ins
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
