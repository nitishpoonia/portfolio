// Turns database rows back into the MDX files in content/, and builds the
// JSON backup Studio offers for download. Used by `npm run db:export`,
// the weekly backup workflow and /api/studio/export.
import matter from "gray-matter";

const OMIT = new Set(["id", "content", "created_at", "updated_at"]);
// false is the default for flags like `featured`, so it's left out to keep files short,
// except `published: false`, which marks a draft (a missing value means published).

const clean = (row) =>
  Object.fromEntries(
    Object.entries(row).filter(([k, v]) => !OMIT.has(k) && v !== null && v !== "" && (v !== false || k === "published") && !(Array.isArray(v) && !v.length))
  );

export function toMdx(row) {
  return matter.stringify(`\n${String(row.content || "").trim()}\n`, clean(row));
}

export async function readAll(sql, { media = false } = {}) {
  const [posts, projects, settings, mediaRows] = await Promise.all([
    sql.query(
      `SELECT id, slug, title, description, date::text AS date, tags, category, published, content, created_at, updated_at
       FROM posts ORDER BY posts.date DESC, id`
    ),
    sql.query(`SELECT * FROM projects ORDER BY id`),
    sql.query(`SELECT key, value FROM site_settings ORDER BY key`),
    sql.query(
      `SELECT id, name, mime, size, width, height, created_at${media ? ", encode(data, 'base64') AS data" : ""}
       FROM media ORDER BY created_at`
    ),
  ]);
  return { exportedAt: new Date().toISOString(), posts, projects, settings, media: mediaRows };
}
