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
