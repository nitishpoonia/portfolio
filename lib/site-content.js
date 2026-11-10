import { cache } from "react";
import { CHAPTERS, NOW_BUILDING, SKILLS } from "./story";
import { getSetting } from "./admin";
import { ValidationError, text, links as parseLinks } from "./validate";

// Site content editable in Studio → Site content. What's saved in site_settings
// wins; lib/story.js is the fallback (and what a fresh database shows).
export const DEFAULTS = {
  availability: { open: true, label: "Open to full-time roles" },
  now_building: { ...NOW_BUILDING, diagram: true },
  chapters: CHAPTERS,
  skills: SKILLS,
};
export const CONTENT_KEYS = Object.keys(DEFAULTS);

export const getSiteContent = cache(async () => {
  const entries = await Promise.all(
    CONTENT_KEYS.map(async (key) => {
      try {
        const saved = await getSetting(key, null);
        return [key, saved ?? DEFAULTS[key]];
      } catch {
        return [key, DEFAULTS[key]]; // no database (local build) or a bad row: show the defaults
      }
    })
  );
  return Object.fromEntries(entries);
});

// ---- validation for Studio saves -------------------------------------------
const fail = (m) => {
  throw new ValidationError(m);
};
const list = (v, name, max = 12, each = 120) => {
  const arr = Array.isArray(v) ? v : String(v || "").split("\n");
  const out = arr.map((x) => String(x).trim()).filter(Boolean);
  if (out.length > max) fail(`${name}: up to ${max} items`);
  out.forEach((x) => x.length > each && fail(`${name}: "${x.slice(0, 30)}…" is too long (${each} max)`));
  return out;
};
const url = (v, name) => {
  const s = String(v || "").trim();
  if (s && !/^(https?:\/\/[^\s]+|\/[^\s]*)$/.test(s)) fail(`${name} must start with https:// or /`);
  return s || null;
};

export function validateContent(key, value, { checkKeyOnly = false } = {}) {
  if (!CONTENT_KEYS.includes(key)) fail(`Unknown setting "${key}"`);
  if (checkKeyOnly) return null;
  const v = value ?? {};
  switch (key) {
    case "availability":
      return { open: Boolean(v.open), label: text(v.label, "Label", { required: true, max: 60 }) };
    case "now_building":
      return {
        title: text(v.title, "Title", { required: true, max: 80 }),
        text: text(v.text, "Description", { required: true, max: 600 }),
        points: list(v.points, "Points", 6, 160),
        tags: list(typeof v.tags === "string" ? v.tags.split(",") : v.tags, "Tags", 10, 30),
        href: url(v.href, "Link"),
        diagram: Boolean(v.diagram),
      };
    case "chapters": {
      if (!Array.isArray(v) || !v.length) fail("Chapters must be a list with at least one chapter");
      if (v.length > 20) fail("Up to 20 chapters");
      return v.map((c, i) => {
        const n = `Chapter ${i + 1}`;
        if (typeof c !== "object" || !c) fail(`${n} must be an object`);
        return {
          big: text(c.big, `${n} big`, { required: true, max: 8 }),
          when: text(c.when, `${n} when`, { required: true, max: 30 }),
          title: text(c.title, `${n} title`, { required: true, max: 100 }),
          text: text(c.text, `${n} text`, { required: true, max: 600 }),
          built: list(c.built, `${n} built`, 10, 40),
          links: parseLinks(c.links || []),
          photo: url(c.photo, `${n} photo`),
          ...(c.alt && { alt: text(c.alt, `${n} alt`, { max: 200 }) }),
          ...(c.current && { current: true }),
        };
      });
    }
    case "skills": {
      if (!Array.isArray(v) || !v.length) fail("Skills must be a list of groups");
      return v.map((g, i) => ({
        label: text(g?.label, `Group ${i + 1} label`, { required: true, max: 30 }),
        items: list(g?.items, `Group ${i + 1} items`, 20, 60),
      }));
    }
  }
}
