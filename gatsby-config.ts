import path from "path";

import config from "./content/config.json";
import * as types from "./internal/gatsby/types";

export default {
  pathPrefix: config.pathPrefix,
  siteMetadata: {
    url: config.url,
    menu: config.menu,
    title: config.title,
    author: config.author,
    subtitle: config.subtitle,
    copyright: config.copyright,
    postsLimit: config.postsLimit,
    disqusShortname: config.disqusShortname,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: path.resolve("content"),
      },
    },
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                url
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({
              query: { site, allMarkdownRemark },
            }: {
              query: {
                site: {
                  siteMetadata: {
                    url: string;
                  };
                };
                allMarkdownRemark: {
                  edges: Array<types.Edge>;
                };
              };
            }) =>
              allMarkdownRemark.edges.map(({ node }) => ({
                ...node.frontmatter,
                date: node?.frontmatter?.date,
                description: node?.frontmatter?.description,
                url:
                  site.siteMetadata.url +
                  (node.frontmatter?.slug || node.fields?.slug),
                guid:
                  site.siteMetadata.url +
                  (node.frontmatter?.slug || node.fields?.slug),
                custom_elements: [{ "content:encoded": node.html }],
              })),
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
                ) {
                  edges {
                    node {
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        date
                        title
                        slug
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: config.title,
          },
        ],
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 960,
              withWebp: true,
            },
          },
          {
            resolve: "gatsby-remark-responsive-iframe",
            options: { wrapperStyle: "margin-bottom: 1.0725rem" },
          },
          "gatsby-remark-autolink-headers",
          "gatsby-remark-prismjs",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          "gatsby-remark-external-links",
        ],
      },
    },
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl: url
              }
            }
            allSitePage(
              filter: {
                path: { regex: "/^(?!/404/|/404.html|/dev-404-page/)/" }
              }
            ) {
              nodes {
                path
              }
            }
          }
        `,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: config.title,
        short_name: config.title,
        theme_color: "hsl(31, 92%, 62%)",
        background_color: "hsl(0, 0%, 100%)",
        icon: "content/photo.png",
        display: "standalone",
        start_url: "/",
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          runtimeCaching: [
            {
              urlPattern: /(\.js$|\.css$|[^:]static\/)/,
              handler: "CacheFirst",
            },
            {
              urlPattern: /^https?:.*\/page-data\/.*\.json/,
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern:
                /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
              handler: "StaleWhileRevalidate",
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: "StaleWhileRevalidate",
            },
          ],
        },
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-optimize-svgs",
    "gatsby-plugin-webpack-bundle-analyser-v2",
    "gatsby-plugin-preact",
    "gatsby-plugin-sass",
    {
      resolve: 'gatsby-plugin-scroll-indicator',
      options: {
        // Configure color of the scroll indicator
        color: '#F7A046',
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
          shortname: ``
      }
    },
    // Add after these plugins if used
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
        purgeCSSOptions: {
          // https://purgecss.com/configuration.html#options
          // safelist: ['safelist'], // Don't remove this selector
        },
        // More options defined here https://purgecss.com/configuration.html#options
      },
    },
  ],
};