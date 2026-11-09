import { randomBytes } from "crypto";
import { getSql } from "./db";

// Snapshots of unsaved editor content, so Preview shows exactly what's in the
// editor without saving or publishing it. Kept for a day.
export async function createPreview(kind, data) {
  if (!["post", "project"].includes(kind)) throw new Error("Unknown kind");
  const sql = getSql();
  await sql`DELETE FROM studio_previews WHERE created_at < now() - interval '1 day'`;
  const token = randomBytes(12).toString("base64url");
  await sql.query(`INSERT INTO studio_previews (token, kind, data) VALUES ($1, $2, $3::jsonb)`, [
    token, kind, JSON.stringify(data || {}),
  ]);
  return token;
}

export async function getPreview(token) {
  if (!/^[A-Za-z0-9_-]{8,40}$/.test(token)) return null;
  const rows = await getSql().query(`SELECT kind, data FROM studio_previews WHERE token = $1`, [token]);
  return rows[0] || null;
}
