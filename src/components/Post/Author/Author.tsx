import React from "react";

import { useSiteMetadata } from "@/hooks";
import { getContactHref } from "@/utils";

import * as styles from "./Author.module.scss";

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles.author}>
      <p className={styles.bio}>
        {author.bio}
        <br />
        <i>Find Pianobin on <a
          className={styles.twitter}
          href={getContactHref("youtube", author.contacts.youtube)}
          rel="noopener noreferrer"
          target="_blank"
        ><strong>YouTube</strong></a>.</i>
      </p>
    </div>
  );
};

export default Author;
