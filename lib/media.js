import { randomBytes } from "crypto";
import { getSql } from "./db";

// SVG is excluded on purpose: served from our own domain it could run scripts.
export const ALLOWED_MIME = ["image/webp", "image/jpeg", "image/png", "image/gif", "image/avif"];
export const MAX_BYTES = 3 * 1024 * 1024;

export async function saveMedia({ name, type, width, height, data }) {
  if (!ALLOWED_MIME.includes(type)) throw new Error("Only JPG, PNG, WebP, GIF or AVIF images");
  if (typeof data !== "string" || !data) throw new Error("No image data");
  const size = Math.floor((data.length * 3) / 4);
  if (size > MAX_BYTES) throw new Error("Image is over 3 MB after resizing");
  const id = randomBytes(9).toString("base64url");
  const int = (v) => (Number.isFinite(+v) && +v > 0 ? Math.round(+v) : null);
  await getSql().query(
    `INSERT INTO media (id, name, mime, size, width, height, data)
     VALUES ($1, $2, $3, $4, $5, $6, decode($7, 'base64'))`,
    [id, String(name || "").slice(0, 200), type, size, int(width), int(height), data]
  );
  return { id, url: `/media/${id}` };
}

export async function getMedia(id) {
  if (!/^[A-Za-z0-9_-]{6,32}$/.test(id)) return null;
  const rows = await getSql().query(
    `SELECT mime, encode(data, 'base64') AS b64 FROM media WHERE id = $1`,
    [id]
  );
  return rows[0] ? { mime: rows[0].mime, bytes: Buffer.from(rows[0].b64, "base64") } : null;
}
