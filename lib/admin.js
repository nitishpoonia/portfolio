import { getSql } from "./db";
import { slugify, tagsOf } from "./format";
import { ValidationError, text, oneOf, isoDate, slug as checkSlug, links, sortOrder, imageUrl, MAX_CONTENT, POST_CATEGORIES } from "./validate";

// Admin-side queries: unlike lib/posts.js and lib/project.js these include drafts.

// INSERT (id null) or UPDATE one row from a { column: value } object. Column
// names come from our own code above, never from the request.
async function upsert(table, id, values) {
  const cols = Object.keys(values);
  const vals = Object.values(values);
  const sql = getSql();
  const before = id ? (await sql.query(`SELECT slug, published FROM ${table} WHERE id = $1`, [id]))[0] : null;
  const rows = id
    ? await sql.query(
        `UPDATE ${table} SET ${cols.map((c, i) => `${c}=$${i + 1}`).join(", ")}, updated_at=now()
         WHERE id=$${cols.length + 1} RETURNING id, slug`,
        [...vals, id]
      )
    : await sql.query(
        `INSERT INTO ${table} (${cols.join(", ")}) VALUES (${cols.map((_, i) => `$${i + 1}`).join(", ")}) RETURNING id, slug`,
        vals
      );
  if (!rows[0]) throw new ValidationError("Not found: it may have been deleted");
  // A live page changed address: keep the old link working.
  if (before?.published && before.slug !== rows[0].slug) await recordSlugChange(table, before.slug, rows[0].slug);
  return rows[0];
}

// slug_redirects: old slug -> new slug, per kind ("posts" | "projects").
async function recordSlugChange(kind, from, to) {
  const sql = getSql();
  await sql.query(`DELETE FROM slug_redirects WHERE kind = $1 AND from_slug = $2`, [kind, to]);
  await sql.query(`UPDATE slug_redirects SET to_slug = $3 WHERE kind = $1 AND to_slug = $2`, [kind, from, to]);
  await sql.query(
    `INSERT INTO slug_redirects (kind, from_slug, to_slug) VALUES ($1, $2, $3)
     ON CONFLICT (kind, from_slug) DO UPDATE SET to_slug = EXCLUDED.to_slug, created_at = now()`,
    [kind, from, to]
  );
}

/* ---------- posts ---------- */
const POST_COLS = `id, slug, title, description, date::text AS date, tags, category, content, published, updated_at`;

export async function listPostsAdmin() {
  return getSql().query(
    `SELECT id, slug, title, date::text AS date, published, updated_at FROM posts ORDER BY date DESC, id DESC`
  );
}

export async function getPostAdmin(id) {
  const rows = await getSql().query(`SELECT ${POST_COLS} FROM posts WHERE id = $1`, [id]);
  return rows[0] || null;
}

export async function savePost(id, d) {
  const title = text(d.title, "Title", { required: true, max: 200 });
  return upsert("posts", id, {
    slug: checkSlug(slugify(d.slug || title)),
    title,
    description: text(d.description, "Description", { max: 400 }),
    date: isoDate(d.date, "Date"),
    tags: tagsOf(d.tags).slice(0, 20),
    category: oneOf(d.category, "Category", POST_CATEGORIES, "tech"),
    content: text(d.content, "Content", { max: MAX_CONTENT }),
    published: Boolean(d.published),
  });
}

export async function deletePost(id) {
  await getSql().query(`DELETE FROM posts WHERE id = $1`, [id]);
}

/* ---------- projects ---------- */
const PROJECT_COLS = `id, slug, title, tagline, role, company, timeline, tags, type, status, content, published, updated_at,
  links, outcome, cover, featured, sort_order`;

export async function listProjectsAdmin() {
  return getSql().query(
    `SELECT id, slug, title, status, published, featured, sort_order, updated_at FROM projects
     ORDER BY featured DESC, sort_order ASC NULLS LAST, id DESC`
  );
}

export async function getProjectAdmin(id) {
  const rows = await getSql().query(`SELECT ${PROJECT_COLS} FROM projects WHERE id = $1`, [id]);
  return rows[0] || null;
}

export async function saveProject(id, d) {
  const title = text(d.title, "Title", { required: true, max: 200 });
  return upsert("projects", id, {
    slug: checkSlug(slugify(d.slug || title)),
    title,
    tagline: text(d.tagline, "Tagline", { max: 300 }),
    role: text(d.role, "Role", { max: 120 }),
    company: text(d.company, "Company", { max: 120 }),
    timeline: text(d.timeline, "Timeline", { max: 80 }),
    tags: tagsOf(d.tags).slice(0, 20),
    type: text(d.type, "Type", { max: 40 }) || "case-study",
    status: text(d.status, "Status", { max: 40 }) || null,
    outcome: text(d.outcome, "Outcome", { max: 240 }),
    links: JSON.stringify(links(d.links)),
    cover: imageUrl(d.cover),
    featured: Boolean(d.featured),
    sort_order: sortOrder(d.sort_order),
    content: text(d.content, "Content", { max: MAX_CONTENT }),
    published: Boolean(d.published),
  });
}

export async function deleteProject(id) {
  await getSql().query(`DELETE FROM projects WHERE id = $1`, [id]);
}

/* ---------- site settings ---------- */
export async function getSettings() {
  const rows = await getSql().query(`SELECT key, value FROM site_settings`);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function getSetting(key, fallback = {}) {
  const rows = await getSql().query(`SELECT value FROM site_settings WHERE key = $1`, [key]);
  return rows[0]?.value ?? fallback;
}

export async function setSetting(key, value) {
  await getSql().query(
    `INSERT INTO site_settings (key, value) VALUES ($1, $2::jsonb)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()`,
    [key, JSON.stringify(value)]
  );
}

export async function deleteSetting(key) {
  await getSql().query(`DELETE FROM site_settings WHERE key = $1`, [key]);
}
