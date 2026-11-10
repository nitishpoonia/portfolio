// Checks for Studio input. A ValidationError's message is safe to show the user;
// any other error is logged and reported as a generic failure (lib/crud-routes.js).
export class ValidationError extends Error {}

const fail = (msg) => {
  throw new ValidationError(msg);
};

export const POST_CATEGORIES = ["tech", "personal"];

export function text(value, name, { max = 300, required = false } = {}) {
  const s = String(value ?? "").trim();
  if (required && !s) fail(`${name} is required`);
  if (s.length > max) fail(`${name} is too long (${s.length}/${max} characters)`);
  return s;
}

export function oneOf(value, name, options, fallback) {
  const v = value === undefined || value === null || value === "" ? fallback : String(value);
  if (v === null) return null;
  if (!options.includes(v)) fail(`${name} must be one of: ${options.join(", ")}`);
  return v;
}

export function isoDate(value, name) {
  const s = String(value || "").trim();
  if (!s) return new Date().toISOString().slice(0, 10);
  const d = new Date(`${s}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s) || Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== s) {
    fail(`${name} must be a real date like 2026-03-20`);
  }
  return s;
}

export function slug(value, name = "Slug") {
  const s = String(value || "");
  if (!s) fail(`${name} is empty: add a title or slug with letters or numbers`);
  if (s.length > 120) fail(`${name} is too long`);
  return s;
}

export const MAX_CONTENT = 500_000;

// Project links: an array of { label, href }, or text with one "Label | URL" per line.
export function links(value) {
  const items = Array.isArray(value)
    ? value
    : String(value || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const i = line.lastIndexOf("|");
          return i < 0 ? { label: "", href: line } : { label: line.slice(0, i), href: line.slice(i + 1) };
        });
  if (items.length > 6) fail("Up to 6 links");
  return items.map(({ label, href }) => {
    const h = String(href || "").trim();
    if (!/^(https?:\/\/[^\s]+|\/[^\s]*)$/.test(h)) fail(`Link "${h || label}" must start with https:// or /`);
    let l = String(label || "").trim();
    if (!l) l = h.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
    if (l.length > 40) fail(`Link label "${l}" is too long (40 max)`);
    return { label: l, href: h };
  });
}

export function sortOrder(value) {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number(value);
  if (!Number.isInteger(n) || n < 0 || n > 9999) fail("Order must be a whole number from 0 to 9999");
  return n;
}

export function imageUrl(value, name = "Cover") {
  const s = String(value || "").trim();
  if (s && !/^(\/[^\s]*|https:\/\/[^\s]+)$/.test(s)) fail(`${name} must be an uploaded image or an https:// URL`);
  return s;
}
