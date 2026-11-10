import { createSql } from "./sql-client.mjs";

// getSql() returns a tagged-template client:  await sql`SELECT ...`
// In production it talks to Neon over HTTP; locally it can be PGlite (see lib/sql-client.mjs).
export function getSql() {
  return createSql(process.env.DATABASE_URL);
}

// For public pages: with no DATABASE_URL at all (a local build with no
// database), show the empty state. With a database configured, a failed query
// is a real error: let it throw, so a production build fails instead of
// shipping a site with no work or writing on it, and a failed background
// refresh keeps serving the last good page.
export async function orEmpty(promise, fallback = []) {
  try {
    return await promise;
  } catch (e) {
    if (!process.env.DATABASE_URL) return fallback;
    throw e;
  }
}
