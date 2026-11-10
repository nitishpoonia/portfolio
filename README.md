# nitishpoonia.in

Personal site: story, work, writing, and a small admin ("Studio") for publishing posts and case studies.

## Stack

- Next.js 16 (App Router), React 19
- Plain CSS in `app/globals.css` for the public site (black-and-white glass design)
- Tailwind CSS for the `/studio` admin only (preflight disabled)
- Neon Postgres for posts, projects and site settings
- Tiptap rich-text editor in Studio; content rendered with `next-mdx-remote`

## Run locally

```bash
npm install
npm run db:local   # local Postgres in .data/, filled from content/, Studio password "local-studio"
npm run dev
```

That never touches production. To work against Neon instead, put its connection string in
`.env.local` as `DATABASE_URL`.

| `DATABASE_URL` | Database |
| --- | --- |
| `postgres://…neon.tech/…` | Neon (production) |
| `pglite:.data/pglite` | Local database made by `npm run db:local` |
| `pglite:memory` | Throwaway in-memory database filled from `content/` (CI builds) |

## Database changes

Schema lives in numbered files in `db/migrations/`. Each runs once, recorded in `schema_migrations`, and
new ones are applied automatically before every build (`npm run db:setup` runs them by hand). Migrations
must be additive and safe to run twice; see AGENTS.md.

## Backups

- Studio → Settings → Backup downloads every post, project and setting as JSON (optionally with images).
- `npm run db:export` writes the database back to `content/` as MDX.
- `.github/workflows/backup.yml` does the export weekly and keeps it for 90 days once you add a
  `BACKUP_DATABASE_URL` repository secret.
- `npm run db:seed -- --force` overwrites the database from `content/`. It refuses to run without `--force`.

## Studio login

The Studio password lives in the database (`studio_auth`), hashed with scrypt. No password or secret goes in env vars.

- Change it: Studio → Settings → Password. This logs out other devices.
- Locked out: run `npm run studio:set-password` locally (needs `DATABASE_URL` in `.env.local`).
- Sessions are random tokens; only their SHA-256 is stored in `studio_sessions`. "Log out everywhere" deletes them all.
- 5 wrong attempts from one IP (or 30 overall) in 15 minutes locks login for that window.

## Where things live

| Path | What |
| --- | --- |
| `lib/story.js` | Defaults for story chapters, "Now building", skills (editable in Studio → Content), photo collage, social links |
| `lib/contact.js` | Fallback contact details (Studio → Settings overrides these) |
| `lib/site.js` | `getContact()`: merges Studio settings over the fallback |
| `app/studio/*` | Admin: posts, projects, settings. Protected by `proxy.js` |
| `db/migrations/` | Database schema, one numbered file per change |
| `content/` | Original MDX files, used only by `npm run db:seed` |
