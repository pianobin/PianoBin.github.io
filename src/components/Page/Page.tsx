import React, { useEffect, useRef } from "react";

import type { Nullable } from "@/types";

import * as styles from "./Page.module.scss";
import { Comments } from "../Post/Comments";

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ title, children }: Props) => {
  const pageRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView();
    }
  }, []);

  const titleString = title || ""
  console.log(titleString)
  const hideComments = ["", "Contact me"].includes(titleString)

  return (
    <div ref={pageRef} className={styles.page}>
      <div className={styles.inner}>
        {title && <h1 className={styles.title}>{title}</h1>}
        <div className={styles.body}>{children}</div>
      </div>
      {!hideComments && 
      <div className={styles.comments}>
        <Comments postSlug={titleString} postTitle={titleString} />
      </div>
      }
    </div>
  );
};

export default Page;
