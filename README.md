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
| `STUDIO_PASSWORD` | Password for `/studio/login` |
| `STUDIO_SESSION_SECRET` | 32+ random characters for signing the session cookie |

## Where things live

| Path | What |
| --- | --- |
| `lib/story.js` | Story chapters, "Now building" card, skills, photo collage, social links |
| `lib/contact.js` | Fallback contact details (Studio → Settings overrides these) |
| `lib/site.js` | `getContact()`: merges Studio settings over the fallback |
| `app/studio/*` | Admin: posts, projects, settings. Protected by `proxy.js` |
| `db/schema.sql` | Database tables |
| `content/` | Original MDX files, used only by `npm run db:seed` |
