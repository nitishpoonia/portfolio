// Usage: npm run db:setup   (also runs automatically before `next build`)
// Applies any new files in db/migrations to the database in DATABASE_URL.
import { createSql, closeDatabases } from "../lib/sql-client.mjs";
import { migrate } from "../lib/migrate.mjs";

// Locally the URL lives in .env.local; on Vercel it is already in the environment.
try { process.loadEnvFile(".env.local"); } catch {}

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL not set, skipping migrations.");
  process.exit(0);
}
if (process.env.DATABASE_URL === "pglite:memory") {
  console.log("In-memory database: each process migrates its own copy, nothing to do here.");
  process.exit(0);
}

await migrate(createSql());
await closeDatabases();
