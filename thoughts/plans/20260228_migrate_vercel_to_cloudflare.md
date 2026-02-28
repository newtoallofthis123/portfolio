# Migrate from Vercel to Cloudflare Pages

## Overview

Migrate the Astro 5 SSR portfolio site from Vercel to Cloudflare Pages. This involves swapping the adapter, removing Vercel-specific features (analytics script, packages), removing MongoDB entirely (to be replaced with a different DB later), and adding Cloudflare Pages configuration.

The site will continue using SSR (`output: 'server'`) on Cloudflare Pages Functions. All content collections (blog, thinks, gsoc_log, ml_log) are unaffected — they're static MDX rendered at build time.

## Current State Analysis

- **Adapter**: `@astrojs/vercel` with `webAnalytics: { enabled: true }` (`astro.config.mjs:2,14-16`)
- **Vercel Insights**: Script tag in `src/layouts/base.astro:81`
- **Vercel Analytics package**: `@vercel/analytics` in `package.json:26`
- **MongoDB**: Used in 3 pages via `src/utils/db.ts`:
  - `src/pages/now.astro:6-12` — queries `specials` collection
  - `src/pages/quips/index.astro:4-8` — queries `page` collection
  - `src/pages/quips/[slug].astro:8-14` — queries `page` collection with `findOne`
- **OG images**: `src/pages/blog/[slug]/og.png.ts` uses Sharp + Satori, already has `prerender = true` — runs at build time only, no Cloudflare Workers concern
- **Redirects**: 3 redirects in `astro.config.mjs:50-54` — Astro auto-generates `_redirects` for Cloudflare
- **External redirects**: `src/pages/code/[...slug].astro` and `src/pages/go/[...slug].astro` redirect to `nutils.vercel.app` — unchanged

## Desired End State

- Site deploys to Cloudflare Pages via Git integration
- SSR works via Cloudflare Pages Functions
- Cloudflare Web Analytics replaces Vercel Analytics
- MongoDB-dependent pages show "coming soon" placeholder content
- All other pages (blog, thinks, gsoc_log, ml_log, projects, etc.) work identically
- `wrangler pages dev` works for local preview

**Verification**: `npm run build` succeeds, `wrangler pages dev ./dist` serves the site, all non-MongoDB routes render correctly.

## What We're NOT Doing

- Migrating data from MongoDB to a new database (deferred)
- Changing the site's domain or DNS (separate Cloudflare DNS setup)
- Modifying any content collections, blog posts, or static pages
- Changing the contact form behavior
- Updating the `nutils.vercel.app` external service

---

## Phase 1: Remove Vercel Dependencies

### Overview
Strip all Vercel-specific code and packages.

### Changes Required

#### 1. File: `astro.config.mjs` (Modify)
**Purpose**: Remove Vercel adapter import and usage
**Changes**:
- Remove line 2: `import vercel from "@astrojs/vercel";`
- Remove lines 14-16: `adapter: vercel({ webAnalytics: { enabled: true } }),`
- Will be replaced with Cloudflare adapter in Phase 3

#### 2. File: `src/layouts/base.astro` (Modify)
**Purpose**: Remove Vercel Insights script
**Changes**:
- Remove line 81: `<script defer is:inline src="/_vercel/insights/script.js"></script>`

#### 3. File: `package.json` (Modify)
**Purpose**: Remove Vercel packages
**Changes**:
- Remove `"@astrojs/vercel": "8.2.9"` (line 19)
- Remove `"@vercel/analytics": "^1.3.1"` (line 26)

#### 4. Directory: `.vercel/` (Delete)
**Purpose**: Remove cached Vercel build output

### Success Criteria
- [x] No references to `vercel` in `astro.config.mjs`
- [x] No Vercel script in `base.astro`
- [x] No Vercel packages in `package.json`
- [x] `.vercel/` directory deleted

---

## Phase 2: Remove MongoDB

### Overview
Remove all MongoDB code. Pages that depend on it get placeholder content indicating the feature is temporarily unavailable.

### Changes Required

#### 1. File: `src/utils/db.ts` (Delete)
**Purpose**: Entire file is MongoDB connection logic — no longer needed

#### 2. File: `src/pages/now.astro` (Modify)
**Purpose**: Replace DB query with placeholder
**Changes**:
```astro
---
import Base from "../layouts/base.astro";
import Char from "../spans/char.astro";
---

<Base title="Now! | NoobScience">
  <h1 class="text-2xl font-bold pb-4 pt-2">
    <Char char="$" /> git pull noob@latest
  </h1>
  <div>
    <p class="dark:text-rosePine-subtle text-rosePineDawn-subtle">
      This page is currently being migrated. Check back soon!
    </p>
  </div>
</Base>
```

#### 3. File: `src/pages/quips/index.astro` (Modify)
**Purpose**: Replace DB query with placeholder
**Changes**:
```astro
---
import Base from "../../layouts/base.astro";
import Char from "../../spans/char.astro";
---

<Base title="Noob's Quips">
  <h1 class="text-2xl pb-2">
    <Char char="^" /> Quips
  </h1>
  <div>
    Quips is my little corner on the internet where I share the most random
    things that come to my mind. So be prepared for a lot of thoughts lol.
  </div>
  <div>
    <p class="pt-4 dark:text-rosePine-subtle text-rosePineDawn-subtle">
      Quips are currently being migrated to a new platform. Check back soon!
    </p>
  </div>
</Base>
```

#### 4. File: `src/pages/quips/[slug].astro` (Modify)
**Purpose**: Redirect all quip slugs since data is unavailable
**Changes**:
```astro
---
return Astro.redirect("/quips");
---
```

#### 5. File: `package.json` (Modify)
**Purpose**: Remove MongoDB package
**Changes**:
- Remove `"mongodb": "^6.8.0"` (line 34)

### Success Criteria
- [x] `src/utils/db.ts` deleted
- [x] No imports of `db.ts` or `mongodb` anywhere in `src/`
- [x] `now.astro` renders placeholder without errors
- [x] `quips/index.astro` renders placeholder without errors
- [x] `quips/[slug].astro` redirects to `/quips`
- [x] `mongodb` removed from `package.json`

---

## Phase 3: Add Cloudflare Pages

### Overview
Install the Cloudflare adapter, configure wrangler, add Cloudflare Web Analytics, update types.

### Changes Required

#### 1. Install `@astrojs/cloudflare`
```bash
npm install @astrojs/cloudflare
```

#### 2. File: `astro.config.mjs` (Modify)
**Purpose**: Add Cloudflare adapter
**Changes**:
```js
import cloudflare from "@astrojs/cloudflare";

// In defineConfig:
adapter: cloudflare(),
```

Full file after all changes:
```js
import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  output: "server",
  prefetch: true,
  site: "https://www.noobscience.in",
  adapter: cloudflare(),
  integrations: [react(), tailwind(), mdx(), sitemap()],
  markdown: {
    // ... unchanged
  },
  redirects: {
    // ... unchanged
  },
  experimental: {
    // ... unchanged
  },
});
```

#### 3. File: `wrangler.jsonc` (Create)
**Purpose**: Cloudflare Pages configuration
```jsonc
{
  "name": "noobscience",
  "compatibility_date": "2025-12-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "./dist"
}
```

Note: `nodejs_compat` is needed because Sharp runs at build time for OG images, and some Astro SSR internals may need Node.js APIs.

#### 4. File: `src/env.d.ts` (Modify)
**Purpose**: Add Cloudflare runtime types
```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
```

#### 5. File: `src/layouts/base.astro` (Modify)
**Purpose**: Add Cloudflare Web Analytics
**Changes**: Where the Vercel script was (line 81), Cloudflare Web Analytics can be enabled via the Cloudflare Pages dashboard (Settings > Web Analytics) which auto-injects the script — no code change needed. Alternatively, add manually:
```html
<!-- Replace the removed Vercel line with nothing — enable via Cloudflare dashboard -->
```
**Decision**: Use Cloudflare dashboard to enable Web Analytics (zero code). No script tag needed.

#### 6. File: `.gitignore` (Modify)
**Purpose**: Add Cloudflare-specific ignores
**Changes**: Append:
```
# Cloudflare
.wrangler
.dev.vars
```

#### 7. File: `.dev.vars` (Create, gitignored)
**Purpose**: Local development secrets placeholder
```
# Add secrets here for local dev (picked up by wrangler)
# Example: MONGODB_URL=mongodb+srv://...
```

### Success Criteria
- [x] Automated: `npm run build` completes without errors
- [x] Automated: `npx wrangler pages dev ./dist` starts and serves the site
- [x] Manual: Blog posts render correctly at `/blog/[slug]`
- [x] Manual: OG images generate at `/blog/[slug]/og.png`
- [x] Manual: RSS feeds work at `/rss.xml` and `/rss_log.xml`
- [x] Manual: Redirects work (`/resume`, `/ml`, `/gsoc`)
- [x] Manual: `/now` shows placeholder
- [x] Manual: `/quips` shows placeholder
- [x] Manual: `/quips/anything` redirects to `/quips`

---

## Phase 4: Deployment Setup

### Overview
Connect the repo to Cloudflare Pages for automatic deployments.

### Steps (Manual, in Cloudflare Dashboard)

1. Go to Cloudflare Dashboard > Workers & Pages > Create
2. Connect Git repository
3. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: 20+ (set `NODE_VERSION=20` env var if needed)
4. Enable Web Analytics in Pages project settings
5. Set up custom domain (`noobscience.in`) if migrating DNS to Cloudflare
6. Verify deployment succeeds

### Success Criteria
- [x] Manual: Site is live on Cloudflare Pages URL (*.pages.dev)
- [x] Manual: All routes work in production
- [x] Manual: Web Analytics collecting data in dashboard

---

## References

- Astro Cloudflare adapter docs: https://docs.astro.build/en/guides/integrations-guide/cloudflare/
- Deploy Astro to Cloudflare: https://docs.astro.build/en/guides/deploy/cloudflare/
- Cloudflare Pages framework guide: https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/

## Files Summary

| File | Action | Phase |
|------|--------|-------|
| `astro.config.mjs` | Modify (swap adapter) | 1, 3 |
| `src/layouts/base.astro` | Modify (remove Vercel script) | 1 |
| `package.json` | Modify (swap deps) | 1, 2, 3 |
| `.vercel/` | Delete | 1 |
| `src/utils/db.ts` | Delete | 2 |
| `src/pages/now.astro` | Modify (placeholder) | 2 |
| `src/pages/quips/index.astro` | Modify (placeholder) | 2 |
| `src/pages/quips/[slug].astro` | Modify (redirect) | 2 |
| `wrangler.jsonc` | Create | 3 |
| `src/env.d.ts` | Modify (CF types) | 3 |
| `.gitignore` | Modify (CF ignores) | 3 |
| `.dev.vars` | Create | 3 |
