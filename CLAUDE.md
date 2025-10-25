# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Astro 5 and deployed on Vercel. The site features a blog, project showcases, GSoC logs, ML logs, and various content collections. The site is hosted at https://noobscience.in.

## Development Commands

```bash
# Start development server
npm run dev

# Build the project (includes type checking)
npm run build

# Preview production build
npm run preview

# Run Astro commands directly
npm run astro
```

## Architecture

### Tech Stack
- **Framework**: Astro 5 (SSR mode with Vercel adapter)
- **UI Libraries**: React (for interactive components), Tailwind CSS
- **Database**: MongoDB (for dynamic content)
- **Content Management**: Astro Content Collections with MDX
- **Styling**: Tailwind CSS with dark mode support, Catppuccin theme
- **Fonts**: Geist (via Google Fonts experimental provider), Inter, JetBrains Mono

### Project Structure

**Content Collections** (defined in src/content/config.ts):
- `blog`: Main blog posts with frontmatter (title, date, description, emoji, color, tags, draft status, optional image)
- `thinks`: Short-form thinking/notes
- `gsoc_log`: GSoC project logs with work type tracking (Study/Code/Mixed/Meeting/Other)
- `ml_log`: Machine learning logs with tags and summaries

**Key Directories**:
- `src/pages/`: File-based routing for all pages
  - Dynamic routes use `[...slug].astro` pattern for content collections
  - Special routes: `/ml` → `/ml/logs`, `/gsoc` → `/gsoc/logs`, `/resume` → PDF
- `src/layouts/`: Reusable layout components
  - `base.astro`: Primary layout with nav, footer, theme toggle, SEO meta tags
  - `blog_post.astro`: Blog post layout wrapper
- `src/components/`: React and Astro components (nav, tooltip, video, etc.)
- `src/spans/`: Small reusable text components (bold, highlight, char, link)
- `src/utils/`: Utility functions
  - `db.ts`: MongoDB connection utility with connection caching
- `src/styles/`: Global CSS and article-specific styles

### Important Configuration

**Astro Config** (astro.config.mjs):
- Output mode: `server` (SSR)
- Syntax highlighting: Shiki with light-plus/dark-plus themes
- Prefetch enabled for faster navigation
- Integrations: React, Tailwind, MDX, Sitemap
- Vercel adapter with web analytics enabled

**Path Aliases**:
- `@/*` maps to `./src/*` (defined in tsconfig.json)

**Theme System**:
- Dark mode class-based (`darkMode: "class"` in Tailwind config)
- Theme toggle managed by inline script in base.astro
- Persists theme preference to localStorage
- Uses Tailwind's dark: prefix for dark mode styles

### Database Architecture

MongoDB connection is handled through `src/utils/db.ts`:
- Connection pooling with global cache to prevent multiple connections
- Database name: "updates"
- Environment variable required: `MONGODB_URL` (in .env file)
- Connection is lazily initialized on first use

### Content Rendering

Blog posts and content collections:
1. Use Astro's `getEntry()` to fetch content by slug
2. Call `.render()` on the entry to get the Content component
3. Render within appropriate layout with metadata
4. MDX files support custom components and JSX

## Development Workflow

When adding new blog posts:
- Create MDX file in `src/content/blog/`
- Include required frontmatter: title, author, date, description
- Optional fields: emoji, color (default: "pine"), tags, draft, img
- Draft posts (draft: true) should be filtered in production

When modifying content schemas:
- Edit schema definitions in `src/content/config.ts`
- Schemas use Zod for validation
- Run type checking with `npm run build` to validate

When working with MongoDB:
- Never modify `src/utils/db.ts` unless absolutely necessary (see file warnings)
- Ensure MONGODB_URL environment variable is set in .env
- Database connections are cached globally

## Deployment

The project is configured for Vercel deployment:
- Adapter: `@astrojs/vercel` with web analytics
- Build command: `npm run build` (includes `astro check`)
- Output: Server-side rendering
- Environment variables needed: MONGODB_URL
