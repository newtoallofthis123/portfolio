import { defineConfig, squooshImageService } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    prefetch: true,
    site: 'https://www.noobscience.in',
    adapter: vercel({
        webAnalytics: { enabled: true },
    }),
    integrations: [react(), tailwind(), mdx(), sitemap()],
    image: {
        service: squooshImageService(),
    },
    markdown: {
        gfm: true,
        shikiConfig: {
            theme: 'catppuccin-mocha',
            langs: [
                'javascript',
                'html',
                'php',
                'css',
                'typescript',
                'tsx',
                'jsx',
                'json',
                'markdown',
                'mdx',
                'bash',
                'shell',
                'rust',
                'c',
                'cpp',
                'go',
                'java',
                'python',
                'ruby',
            ],
            wrap: false,
        },
        syntaxHighlight: 'shiki',
    },
    // redirects: {
    //     "/contact": "https://bento.me/noob",
    // },
});
