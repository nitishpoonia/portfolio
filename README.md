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
cp .env.example .env.local   # then fill in the values below
npm run db:setup             # creates tables (safe to re-run)
npm run dev
```

Environment variables:

| Name | What it is |
| --- | --- |
| `DATABASE_URL` | Neon connection string |

## Studio login

The Studio password lives in the database (`studio_auth`), hashed with scrypt. No password or secret goes in env vars.

- Change it: Studio → Settings → Password. This logs out other devices.
- Locked out: run `npm run studio:set-password` locally (needs `DATABASE_URL` in `.env.local`).
- Sessions are random tokens; only their SHA-256 is stored in `studio_sessions`. "Log out everywhere" deletes them all.
- 5 wrong attempts from one IP (or 30 overall) in 15 minutes locks login for that window.

## Where things live

| Path | What |
| --- | --- |
| `lib/story.js` | Story chapters, "Now building" card, skills, photo collage, social links |
| `lib/contact.js` | Fallback contact details (Studio → Settings overrides these) |
| `lib/site.js` | `getContact()`: merges Studio settings over the fallback |
| `app/studio/*` | Admin: posts, projects, settings. Protected by `proxy.js` |
| `db/schema.sql` | Database tables |
| `content/` | Original MDX files, used only by `npm run db:seed` |
