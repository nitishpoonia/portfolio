// Usage: npm run db:seed -- --force
// Upserts every file in content/ into the database. DANGER: any post or project
// with the same slug is OVERWRITTEN with the file, losing edits made in Studio.
// To fill an empty database you don't need this: the build does it safely.
import { createSql, closeDatabases } from "../lib/sql-client.mjs";
import { readContent, seedFromContent } from "../lib/seed.mjs";

try { process.loadEnvFile(".env.local"); } catch {}
const sql = createSql();

const slugs = [...readContent("blog"), ...readContent("projects")].map((i) => i.slug);
const [{ n }] = await sql.query(
  `SELECT (SELECT count(*) FROM posts WHERE slug = ANY($1)) + (SELECT count(*) FROM projects WHERE slug = ANY($1)) AS n`,
  [slugs]
);

if (!process.argv.includes("--force")) {
  console.error(
    `Refusing to run: ${Number(n)} posts/projects in the database would be overwritten by content/.\n` +
      `Run \`npm run db:export\` first to save current content, then \`npm run db:seed -- --force\`.`
  );
  process.exit(1);
}
await seedFromContent(sql, { onlyIfEmpty: false });
await closeDatabases();
