import React, { useState } from "react";

import { Link } from "gatsby";

import { Image } from "@/components/Image";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useSiteMetadata } from "@/hooks";

import { Author } from "./Author";
import { Contacts } from "./Contacts";
import { Copyright } from "./Copyright";
import { Menu } from "./Menu";

import * as styles from "./Sidebar.module.scss";

type Props = {
  isIndex?: boolean;
};

const Sidebar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.sidebar}>
      <div className={styles.mobileHeader}>
        <button
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className={styles.hamburgerIcon}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.hamburgerLabel}>Menu</span>
        </button>
        <Link to="/" className={styles.mobileLogo}>
          <Image alt={author.name} path={author.photo} className={styles.mobileLogoImage} />
        </Link>
        <div className={styles.mobileTheme}>
          <ThemeSwitcher />
        </div>
      </div>
      <div className={`${styles.inner} ${isOpen ? styles.innerOpen : ""}`}>
        <Author author={author} isIndex={isIndex} />
        <Menu menu={menu} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
