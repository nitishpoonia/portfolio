// Usage: npm run db:export [-- --out <folder>]
// Writes every post and project in the database to <folder>/blog/*.mdx and
// <folder>/projects/*.mdx (default: content/), plus site settings to
// <folder>/settings.json. Drafts are included with `published: false`.
// content/ is what fills an empty database, so keeping it exported makes it a real backup.
import fs from "fs";
import path from "path";
import { createSql, closeDatabases } from "../lib/sql-client.mjs";
import { readAll, toMdx } from "../lib/export.mjs";

try { process.loadEnvFile(".env.local"); } catch {}

const i = process.argv.indexOf("--out");
const out = i > -1 ? process.argv[i + 1] : "content";
const { posts, projects, settings } = await readAll(createSql());

for (const [folder, rows] of [["blog", posts], ["projects", projects]]) {
  const dir = path.join(out, folder);
  fs.mkdirSync(dir, { recursive: true });
  for (const row of rows) fs.writeFileSync(path.join(dir, `${row.slug}.mdx`), toMdx(row));
}
fs.writeFileSync(
  path.join(out, "settings.json"),
  JSON.stringify(Object.fromEntries(settings.map((s) => [s.key, s.value])), null, 2) + "\n"
);
console.log(`Exported ${posts.length} posts and ${projects.length} projects to ${out}/.`);
await closeDatabases();
