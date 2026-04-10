import React, { useState } from "react";

import { AdSense } from "@/components/AdSense";

import * as styles from "./Content.module.scss";

// Replace with your AdSense ad slot IDs from your AdSense dashboard
const AD_SLOT_TOP = "1957582132";
const AD_SLOT_1 = "8947311137";
const AD_SLOT_2 = "7634229463";
const AD_SLOT_BOTTOM = "1634148508";

interface Props {
  title: string;
  body: string;
}

const Content: React.FC<Props> = ({ body, title }: Props) => {
  const parts = body.split(/<hr\s*\/?>/i);
  const hasAds = parts.length > 1;

  const [renderedAds, setRenderedAds] = useState<Set<string>>(new Set());

  const handleAdRender = (adSlot: string) => {
    setRenderedAds((prev) => new Set(prev).add(adSlot));
  };

  return (
    <div className={styles.content}>
      {renderedAds.has(AD_SLOT_TOP) && (
        <p className={styles.adMessage}>Ads help support me in creating more content — thank you!</p>
      )}
      <AdSense slot={AD_SLOT_TOP} format="horizontal" onRender={() => handleAdRender(AD_SLOT_TOP)} />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.body}>
        {hasAds ? (
          parts.map((part, i) => (
            <React.Fragment key={i}>
              <div dangerouslySetInnerHTML={{ __html: part }} />
              {i < parts.length - 1 && <hr />}
              {i === 0 && (
                <>
                  {renderedAds.has(AD_SLOT_1) && (
                    <p className={styles.adMessage}>Ads help support me in creating more content — thank you!</p>
                  )}
                  <AdSense slot={AD_SLOT_1} onRender={() => handleAdRender(AD_SLOT_1)} />
                </>
              )}
              {i === 2 && parts.length > 3 && (
                <>
                  {renderedAds.has(AD_SLOT_2) && (
                    <p className={styles.adMessage}>Ads help support me in creating more content — thank you!</p>
                  )}
                  <AdSense slot={AD_SLOT_2} onRender={() => handleAdRender(AD_SLOT_2)} />
                </>
              )}
            </React.Fragment>
          ))
        ) : (
          <div dangerouslySetInnerHTML={{ __html: body }} />
        )}
      </div>
      {renderedAds.has(AD_SLOT_BOTTOM) && (
        <p className={styles.adMessage}>Ads help support me in creating more content — thank you!</p>
      )}
      <AdSense slot={AD_SLOT_BOTTOM} onRender={() => handleAdRender(AD_SLOT_BOTTOM)} />
    </div>
  );
};

export default Content;
