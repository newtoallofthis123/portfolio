import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  prefetch: true,
  site: "https://www.noobscience.in",
  integrations: [react(), tailwind(), mdx(), sitemap()],
  markdown: {
    gfm: true,
    shikiConfig: {
      themes: {
        light: "light-plus",
        dark: "dark-plus",
      },
      langs: [
        "javascript",
        "html",
        "php",
        "css",
        "typescript",
        "tsx",
        "jsx",
        "json",
        "markdown",
        "mdx",
        "bash",
        "shell",
        "rust",
        "c",
        "cpp",
        "go",
        "java",
        "python",
        "ruby",
      ],
      wrap: false,
    },
    syntaxHighlight: "shiki",
  },
  redirects: {
    "/resume": "/Ishan_Joshi_Resume_2.pdf",
    "/ml": "/ml/logs",
    "/gsoc": "/gsoc/logs",
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Geist",
        cssVariable: "--font-geist",
      },
      {
        provider: fontProviders.google(),
        name: "Geist Mono",
        cssVariable: "--font-geist-mono",
      },
    ],
  },
});
