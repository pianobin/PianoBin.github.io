import React, { useState } from "react";

import { graphql } from "gatsby";

import { AdSense } from "@/components/AdSense";
import { Layout } from "@/components/Layout";
import { Meta } from "@/components/Meta";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { Node } from "@/types";

import * as styles from "./PageTemplate.module.scss";

// Replace with your AdSense ad slot IDs from your AdSense dashboard
const AD_SLOT_TOP = "1957582132";
const AD_SLOT_1 = "8947311137";
const AD_SLOT_2 = "7634229463";
const AD_SLOT_BOTTOM = "1634148508";

interface Props {
  data: {
    markdownRemark: Node;
  };
}

const PageTemplate: React.FC<Props> = ({ data }: Props) => {
  const { html: body } = data.markdownRemark;
  const { frontmatter } = data.markdownRemark;
  const { title } = frontmatter;

  const parts = body.split(/<hr\s*\/?>/i);
  const hasAds = parts.length > 1;

  const [renderedAds, setRenderedAds] = useState<Set<string>>(new Set());

  const handleAdRender = (adSlot: string) => {
    setRenderedAds((prev) => new Set(prev).add(adSlot));
  };

  return (
    <Layout>
      <Sidebar />
      <Page title={title}>
        {renderedAds.has(AD_SLOT_TOP) && (
          <p className={styles.adMessage}>Ads help support me in creating more content - thank you for understanding!</p>
        )}
        <AdSense slot={AD_SLOT_TOP} format="horizontal" onRender={() => handleAdRender(AD_SLOT_TOP)} />
        {hasAds ? (
          parts.map((part, i) => (
            <React.Fragment key={i}>
              <div dangerouslySetInnerHTML={{ __html: part }} />
              {i < parts.length - 1 && <hr />}
              {i === 0 && (
                <AdSense slot={AD_SLOT_1} onRender={() => handleAdRender(AD_SLOT_1)} />
              )}
              {i === 2 && parts.length > 3 && (
                <AdSense slot={AD_SLOT_2} onRender={() => handleAdRender(AD_SLOT_2)} />
              )}
            </React.Fragment>
          ))
        ) : (
          <div dangerouslySetInnerHTML={{ __html: body }} />
        )}
        <AdSense slot={AD_SLOT_BOTTOM} onRender={() => handleAdRender(AD_SLOT_BOTTOM)} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query PageTemplate($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date
        description
        socialImage {
          publicURL
        }
      }
    }
  }
`;

export const Head: React.FC<Props> = ({ data }) => {
  const { title, subtitle, url } = useSiteMetadata();

  const {
    frontmatter: {
      title: pageTitle,
      description: pageDescription = "",
      socialImage,
    },
  } = data.markdownRemark;
  const description = pageDescription || subtitle;
  const image = socialImage?.publicURL && url.concat(socialImage.publicURL);


  return (
    <Meta
      title={`${pageTitle} - ${title}`}
      description={description}
      image={image}
    />
  );
};

export default PageTemplate;
