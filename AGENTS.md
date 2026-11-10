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
| `npm run db:setup` | Applies database schema. Also runs automatically before `next build`. |

Node 22 (`.nvmrc`). CI (`.github/workflows/ci.yml`) runs `check` on every pull request.

## Hard rules

- `main` deploys straight to production on Vercel, and preview deploys are off. Work on a branch, open a PR,
  and only merge when CI is green.
- Never run `npm run db:seed` against production: it overwrites Studio edits with the old MDX in `content/`.
- Schema changes are additive only: new tables, new columns that are nullable or have a default. No drops,
  no renames. The build applies them to production before the new code goes live, so the old code must keep
  working against the new schema.
- Design: black and white only, frosted glass surfaces, pill-shaped controls. Public pages use plain CSS in
  `app/globals.css`; Tailwind is only for `/studio` (preflight is off). All motion must switch off under
  `prefers-reduced-motion`.
- Don't rewrite site copy, invent facts about Nitish, or add placeholder content to public pages.
- Name a new dependency and the reason for it in the PR description.

## Where things live

| Path | What |
| --- | --- |
| `app/` | Routes. Public pages, `/studio` (admin), `/api/studio/*` (admin API), `/preview/[token]`, `/media/[id]` |
| `components/` | Shared UI. `components/studio/*` is Studio-only (Tailwind) |
| `lib/posts.js`, `lib/project.js` | Public, published-only queries |
| `lib/admin.js` | Studio queries (include drafts) and saves |
| `lib/auth.js`, `proxy.js` | Studio login and the gate on `/studio`, `/api/studio`, `/preview` |
| `lib/story.js`, `lib/contact.js` | Content kept in code: story chapters, skills, socials, fallback contact |
| `lib/format.js` | Pure helpers (slugify, tags) |
| `db/schema.sql` | Database tables |
| `content/` | Original MDX, used only to fill an empty database |
| `scripts/` | Database setup, seeding, password reset |

## Conventions

- Branch names: `feat/`, `fix/`, `chore/`, `refactor/` + kebab-case (see `.claude/skills/branching-strategy`).
- Commits: Conventional Commits (see `.claude/skills/commit-message-write`).
- Server components by default; add `"use client"` only where a component needs state or browser APIs.
- Post and project bodies are Markdown/MDX stored in the database and rendered with `next-mdx-remote`.
  Studio and `/preview` render through the same `components/ArticleViews.js` and `lib/mdx.js`, so a
  change to article rendering must work in both.
