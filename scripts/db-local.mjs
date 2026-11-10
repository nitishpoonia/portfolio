// Usage: npm run db:local
// Creates a local development database in .data/pglite (Postgres running inside
// Node via PGlite, no account or server needed), applies migrations, fills it
// from content/, and sets the Studio password to "local-studio" so you can log in.
// Then point the app at it with DATABASE_URL=pglite:.data/pglite in .env.local.
import fs from "fs";
import { createSql, closeDatabases } from "../lib/sql-client.mjs";
import { migrate } from "../lib/migrate.mjs";
import { seedFromContent } from "../lib/seed.mjs";
import { hashPassword } from "../lib/password.mjs";

const URL = "pglite:.data/pglite";
const PASSWORD = "local-studio";

fs.mkdirSync(".data", { recursive: true });
const sql = createSql(URL);
await migrate(sql);
await seedFromContent(sql, { onlyIfEmpty: true });
await sql.query(
  `INSERT INTO studio_auth (id, password_hash) VALUES (1, $1) ON CONFLICT (id) DO NOTHING`,
  [await hashPassword(PASSWORD)]
);

let env = "";
try { env = fs.readFileSync(".env.local", "utf8"); } catch {}
if (!/^DATABASE_URL=/m.test(env)) {
  fs.writeFileSync(".env.local", `${env}${env && !env.endsWith("\n") ? "\n" : ""}DATABASE_URL=${URL}\n`);
  console.log(`Wrote DATABASE_URL=${URL} to .env.local.`);
} else if (!env.includes(URL)) {
  console.log(`.env.local already has a DATABASE_URL. To use the local database, change it to:\n  DATABASE_URL=${URL}`);
}
console.log(`Local database ready. Studio password: ${PASSWORD} (only if it wasn't set already).`);
await closeDatabases();
