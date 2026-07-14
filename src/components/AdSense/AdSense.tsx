import React, { useEffect, useRef, useState } from "react";

import * as styles from "./AdSense.module.scss";

// Replace with your AdSense publisher ID (must match on-render-body.ts)
const ADSENSE_CLIENT = "ca-pub-2056168497841803";

// How long to wait for AdSense to report a fill status before giving up
// (covers ad blockers, which prevent the script from ever setting it).
const FILL_TIMEOUT_MS = 4000;

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface Props {
  slot: string;
  format?: string;
}

const MIN_HEIGHTS: Record<string, number> = {
  horizontal: 100,
  auto: 300,
};

type AdStatus = "loading" | "filled" | "unfilled";

const AdSense: React.FC<Props> = ({ slot, format = "auto" }) => {
  const insRef = useRef<HTMLModElement>(null);
  const [status, setStatus] = useState<AdStatus>("loading");

  useEffect(() => {
    const el = insRef.current;
    if (!el) return;

    const readStatus = () => {
      const adStatus = el.getAttribute("data-ad-status");
      if (adStatus === "filled" || adStatus === "unfilled") {
        setStatus(adStatus);
      }
    };

    const observer = new MutationObserver(readStatus);
    observer.observe(el, { attributes: true, attributeFilter: ["data-ad-status"] });

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}

    const timeout = window.setTimeout(() => {
      setStatus((current) => (current === "loading" ? "unfilled" : current));
    }, FILL_TIMEOUT_MS);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
  }, []);

  if (status === "unfilled") return null;

  // Only reserve space while we don't yet know the ad's real size, so the
  // page doesn't jump around while loading. Once AdSense fills the slot, it
  // sets the ins element's own size - drop our guess so the box doesn't
  // reserve more room than the actual ad needs.
  const minHeight = status === "loading" ? MIN_HEIGHTS[format] ?? 280 : undefined;

  return (
    <div className={status === "filled" ? styles.wrapper : undefined}>
      {status === "filled" && <p className={styles.label}>Advertisement</p>}
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSense;
