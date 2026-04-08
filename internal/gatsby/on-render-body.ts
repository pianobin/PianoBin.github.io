import React from "react";

import { RenderBodyArgs } from "gatsby";

import { themeAtomKey } from "@/hooks";

// Replace with your AdSense publisher ID (e.g. "ca-pub-1234567890123456")
const ADSENSE_CLIENT = "ca-pub-2056168497841803";

const onRenderBody = ({
  setHtmlAttributes,
  setHeadComponents,
  setPreBodyComponents,
}: RenderBodyArgs) => {
  setHeadComponents([
    React.createElement("script", {
      key: "adsense",
      async: true,
      src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`,
      crossOrigin: "anonymous",
    }),
  ]);
  setPreBodyComponents([
    React.createElement("script", {
      key: "theme",
      dangerouslySetInnerHTML: {
        __html: `
          void function() {
            var cachedMode;

            try {
              var preferredTheme = JSON.parse(localStorage.getItem('${themeAtomKey}'));

              if (preferredTheme && preferredTheme.mode) {
                cachedMode = preferredTheme.mode;
              }
            } catch (err) { }

            function setTheme(newTheme) {
              document.documentElement.className = newTheme;
            }

            var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

            setTheme(cachedMode || (darkQuery.matches ? 'dark' : 'light'));
          }()
        `,
      },
    }),
  ]);

  setHtmlAttributes({ lang: "en" });
};

export { onRenderBody };
