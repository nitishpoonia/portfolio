// One way to get a SQL client, used by the app (lib/db.js) and by scripts.
//
//   DATABASE_URL=postgres://...@...neon.tech/...   -> Neon over HTTP (production)
//   DATABASE_URL=pglite:.data/pglite                -> a local Postgres in a folder (development)
//   DATABASE_URL=pglite:memory                      -> a throwaway in-memory Postgres, migrated and
//                                                      filled from content/ (CI builds, tests)
//
// Both return the same shape: a tagged template  sql`SELECT ... ${x}`  and
// sql.query(text, params), each resolving to an array of row objects.
import { neon } from "@neondatabase/serverless";

export function createSql(url = process.env.DATABASE_URL) {
  if (!url) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local (local) or Vercel env vars.");
  }
  return url.startsWith("pglite:") ? pgliteSql(url.slice("pglite:".length)) : neon(url);
}

export const isLocalDatabase = (url = process.env.DATABASE_URL) => Boolean(url?.startsWith("pglite:"));

// --- PGlite (local only) ---------------------------------------------------
// One database per folder per process. PGlite is a dev dependency and is never
// bundled for Vercel: the import below is hidden from the bundler and tracer.
const dbs = (globalThis.__pgliteDbs ??= new Map());

function pgliteSql(location) {
  if (!dbs.has(location)) dbs.set(location, openPglite(location));
  const ready = dbs.get(location);
  const query = async (text, params = []) => (await (await ready).query(text, params)).rows;
  const sql = (strings, ...values) =>
    query(strings.reduce((text, part, i) => text + `$${i}` + part), values);
  sql.query = query;
  return sql;
}

// Scripts call this when done; an open PGlite keeps Node from exiting.
export async function closeDatabases() {
  for (const ready of dbs.values()) await (await ready).close();
  dbs.clear();
}

async function openPglite(location) {
  const name = "@electric-sql/pglite";
  const { PGlite } = await import(/* webpackIgnore: true */ /* turbopackIgnore: true */ name);
  const db = location === "memory" ? new PGlite() : new PGlite(location);
  await db.waitReady;
  if (location === "memory") {
    const sql = {
      query: async (text, params = []) => (await db.query(text, params)).rows,
    };
    const { migrate } = await import("./migrate.mjs");
    const { seedFromContent } = await import("./seed.mjs");
    await migrate(sql, { quiet: true });
    await seedFromContent(sql, { onlyIfEmpty: true, quiet: true });
  }
  return db;
}
