import React from "react";

import { AdSense } from "@/components/AdSense";

import * as styles from "./Content.module.scss";

// Replace with your AdSense ad slot IDs from your AdSense dashboard
const AD_SLOT_TOP = "1957582132";
const AD_SLOT_2 = "7634229463";
const AD_SLOT_BOTTOM = "1634148508";

interface Props {
  title: string;
  body: string;
}

const Content: React.FC<Props> = ({ body, title }: Props) => {
  const parts = body.split(/<hr\s*\/?>/i);
  const hasAds = parts.length > 1;

  return (
    <div className={styles.content}>
      <p className={styles.adMessage}>Website ads are kept minimal and help support site costs - thank you for understanding!</p>
      <AdSense slot={AD_SLOT_TOP} format="horizontal" />
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.body}>
        {hasAds ? (
          parts.map((part, i) => (
            <React.Fragment key={i}>
              <div dangerouslySetInnerHTML={{ __html: part }} />
              {i < parts.length - 1 && <hr />}
              {i === 2 && parts.length > 3 && <AdSense slot={AD_SLOT_2} />}
            </React.Fragment>
          ))
        ) : (
          <div dangerouslySetInnerHTML={{ __html: body }} />
        )}
      </div>
      <AdSense slot={AD_SLOT_BOTTOM} />
    </div>
  );
};

export default Content;
