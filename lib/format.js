// Small pure helpers shared by the public site, Studio and scripts.

export const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// "a, b" or ["a", " b "] -> ["a", "b"]
export const tagsOf = (v) =>
  (Array.isArray(v) ? v : String(v || "").split(","))
    .map((t) => String(t).trim())
    .filter(Boolean);

// "2026-03-20" -> "20 Mar 2026" (or "20 March 2026" with month: "long").
// Dates are calendar days with no time zone, so format them in UTC: otherwise a
// visitor west of UTC sees the day before, and the server and browser disagree.
export function formatDate(value, month = "short") {
  if (!value) return "";
  const d = value instanceof Date ? value : new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00Z` : value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", { day: "numeric", month, year: "numeric", timeZone: "UTC" });
}
