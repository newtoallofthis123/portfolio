import { defineConfig, squooshImageService } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react(), tailwind(), mdx()],
  image: {
    service: squooshImageService(),
  },
  markdown: {
    gfm: true,
    shikiConfig: {
      theme: "rose-pine-moon",
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
});
