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
