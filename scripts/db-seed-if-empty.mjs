// Runs automatically before `next build` (after db-setup).
// If the posts or projects table is completely empty, imports content/*.mdx into it,
// so a fresh database shows your work instead of an empty site.
// It never touches a table that already has rows, so Studio edits and deletions are safe.
import { createSql, closeDatabases } from "../lib/sql-client.mjs";
import { seedFromContent } from "../lib/seed.mjs";

try { process.loadEnvFile(".env.local"); } catch {}

const url = process.env.DATABASE_URL;
if (!url || url === "pglite:memory") process.exit(0);

try {
  await seedFromContent(createSql(url), { onlyIfEmpty: true });
} catch (e) {
  // Never fail the deploy over this; the site still builds with whatever is in the DB.
  console.warn("Content import skipped:", e.message);
}
await closeDatabases();
