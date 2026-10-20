import { getSql } from "./db";

// Admin-side queries: unlike lib/posts.js and lib/project.js these include drafts.

const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const tagsOf = (v) =>
  (Array.isArray(v) ? v : String(v || "").split(","))
    .map((t) => String(t).trim())
    .filter(Boolean);

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
  const sql = getSql();
  const title = String(d.title || "").trim();
  if (!title) throw new Error("Title is required");
  const slug = slugify(d.slug || title);
  const vals = [
    slug,
    title,
    String(d.description || ""),
    d.date || new Date().toISOString().slice(0, 10),
    tagsOf(d.tags),
    String(d.category || "tech"),
    String(d.content || ""),
    Boolean(d.published),
  ];
  const rows = id
    ? await sql.query(
        `UPDATE posts SET slug=$1, title=$2, description=$3, date=$4, tags=$5, category=$6, content=$7, published=$8, updated_at=now()
         WHERE id=$9 RETURNING id, slug`,
        [...vals, id]
      )
    : await sql.query(
        `INSERT INTO posts (slug, title, description, date, tags, category, content, published)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, slug`,
        vals
      );
  return rows[0];
}

export async function deletePost(id) {
  await getSql().query(`DELETE FROM posts WHERE id = $1`, [id]);
}

/* ---------- projects ---------- */
const PROJECT_COLS = `id, slug, title, tagline, role, company, timeline, tags, type, status, content, published, updated_at`;

export async function listProjectsAdmin() {
  return getSql().query(
    `SELECT id, slug, title, status, published, updated_at FROM projects ORDER BY id DESC`
  );
}

export async function getProjectAdmin(id) {
  const rows = await getSql().query(`SELECT ${PROJECT_COLS} FROM projects WHERE id = $1`, [id]);
  return rows[0] || null;
}

export async function saveProject(id, d) {
  const sql = getSql();
  const title = String(d.title || "").trim();
  if (!title) throw new Error("Title is required");
  const vals = [
    slugify(d.slug || title),
    title,
    String(d.tagline || ""),
    String(d.role || ""),
    String(d.company || ""),
    String(d.timeline || ""),
    tagsOf(d.tags),
    String(d.type || "case-study"),
    d.status ? String(d.status) : null,
    String(d.content || ""),
    Boolean(d.published),
  ];
  const rows = id
    ? await sql.query(
        `UPDATE projects SET slug=$1, title=$2, tagline=$3, role=$4, company=$5, timeline=$6, tags=$7, type=$8, status=$9, content=$10, published=$11, updated_at=now()
         WHERE id=$12 RETURNING id, slug`,
        [...vals, id]
      )
    : await sql.query(
        `INSERT INTO projects (slug, title, tagline, role, company, timeline, tags, type, status, content, published)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id, slug`,
        vals
      );
  return rows[0];
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
