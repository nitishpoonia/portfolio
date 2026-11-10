import { getSql } from "./db";

// Where an old slug moved to, or null. kind: "posts" | "projects".
export async function findRedirect(kind, slug) {
  try {
    const rows = await getSql().query(`SELECT to_slug FROM slug_redirects WHERE kind = $1 AND from_slug = $2`, [kind, slug]);
    return rows[0]?.to_slug || null;
  } catch {
    return null; // e.g. before migration 002 has run
  }
}
