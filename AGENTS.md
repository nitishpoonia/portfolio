# AGENTS.md

Instructions for coding agents (and humans) working in this repo. Read this before changing anything.

## What this is

nitishpoonia.in: a personal site (story, work, writing) plus a small admin called **Studio** at `/studio`
for publishing posts and case studies. Next.js 16 App Router, React 19, Neon Postgres.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on http://localhost:3000 |
| `npm run lint` | ESLint |
| `npm run test` | Unit tests (Vitest, `tests/`) |
| `npm run check` | lint + test + production build. Run before every PR. |
| `npm run test:e2e` | Browser smoke test (Playwright, `e2e/`) against the built site; build with `DATABASE_URL=pglite:memory` first |
| `npm run db:local` | Creates a local database in `.data/` (PGlite) and points `.env.local` at it |
| `npm run db:setup` | Applies new migrations. Also runs automatically before `next build`. |
| `npm run db:export` | Writes the database to `content/` as MDX |

Node 22 (`.nvmrc`). CI (`.github/workflows/ci.yml`) runs lint, unit tests, a build on an in-memory
database filled from `content/`, and the browser smoke test on every pull request. Add a smoke test when you add a page.

## Hard rules

- `main` deploys straight to production on Vercel, and preview deploys are off. Work on a branch, open a PR,
  and only merge when CI is green.
- Develop against the local database (`npm run db:local`), not production.
- Never run `npm run db:seed -- --force` against production: it overwrites Studio edits with the MDX in `content/`.
- Schema changes go in a new `db/migrations/NNN_name.sql` file. Never edit an applied migration.
  Additive only: new tables, new columns that are nullable or have a default; no drops, no renames. Every
  statement must be safe to run twice (`IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`). The build applies them
  to production before the new code goes live, so the old code must keep working against the new schema.
- Public pages load data through `orEmpty(...)` from `lib/db.js`, never `.catch(() => [])`: with a database
  configured, a failed query must fail the build rather than ship an empty page.
- Design: black and white only, frosted glass surfaces, pill-shaped controls. Public pages use plain CSS:
  `app/globals.css` (reset, colour tokens, prose) then `app/styles/*.css` by area, imported in order from
  `app/layout.js`. Use the colour tokens (`var(--ink)`, `var(--muted)`…), not hex values. For text on a light
  background, `--muted` is the lightest grey allowed. Tailwind is only for `/studio` (preflight is off). All motion must switch off under
  `prefers-reduced-motion`.
- Don't rewrite site copy, invent facts about Nitish, or add placeholder content to public pages.
- Name a new dependency and the reason for it in the PR description.

## Where things live

| Path | What |
| --- | --- |
| `app/(site)/` | Public pages. `layout.js` adds the nav and footer; each page renders only its `<main id="main">` |
| `app/studio`, `app/api/studio` | Studio admin and its API |
| `app/preview/[token]`, `app/media/[id]` | Studio preview, uploaded images |
| `components/` | Shared UI. `components/studio/*` is Studio-only (Tailwind) |
| `lib/posts.js`, `lib/project.js` | Public, published-only queries |
| `lib/admin.js` | Studio queries (include drafts) and saves |
| `lib/auth.js`, `proxy.js` | Studio login and the gate on `/studio`, `/api/studio`, `/preview` |
| `lib/story.js`, `lib/contact.js` | Defaults for content: story chapters, skills, now-building, socials, contact |
| `lib/site-content.js` | `getSiteContent()`: Studio → Content overrides (site_settings) over `lib/story.js`. Read site content through this, not `lib/story.js` |
| `lib/format.js` | Pure helpers (slugify, tags, `formatDate`) |
| `lib/meta.js` | `SITE_URL` and `pageMeta()`: use it for every public page's metadata |
| `lib/validate.js` | Studio input checks; throw `ValidationError` for messages the user should see |
| `db/migrations/` | Database schema, one numbered file per change |
| `lib/sql-client.mjs` | Neon or PGlite client, shared by the app and scripts |
| `lib/migrate.mjs`, `lib/seed.mjs`, `lib/export.mjs` | Migrations, filling from `content/`, exporting back to it |
| `content/` | Original MDX, used only to fill an empty database |
| `scripts/` | Database setup, seeding, password reset |

## Conventions

- Branch names: `feat/`, `fix/`, `chore/`, `refactor/` + kebab-case (see `.claude/skills/branching-strategy`).
- Commits: Conventional Commits (see `.claude/skills/commit-message-write`).
- Server components by default; add `"use client"` only where a component needs state or browser APIs.
- Post and project bodies are Markdown/MDX stored in the database and rendered with `next-mdx-remote`.
  Studio and `/preview` render through the same `components/ArticleViews.js` and `lib/mdx.js`
  (`articleOptions()`, `mdxComponents`, `tableOfContents()`), so a change to article rendering must work in both.
