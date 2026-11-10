import { cache } from "react";
import { getSql } from "./db";

const COLUMNS = `slug, title, tagline, role, company, timeline, tags, type, status, published, updated_at,
  links, outcome, cover, featured, sort_order`;

function toProject(row) {
  return {
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    role: row.role,
    company: row.company,
    timeline: row.timeline,
    tags: row.tags || [],
    type: row.type || "case-study",
    status: row.status || null,
    published: row.published,
    updatedAt: row.updated_at,
    links: Array.isArray(row.links) ? row.links : [],
    outcome: row.outcome || "",
    cover: row.cover || "",
    featured: Boolean(row.featured),
    sortOrder: row.sort_order ?? null,
  };
}

// Published projects in display order (see sortHomeProjects).
export async function getAllProjects() {
  const sql = getSql();
  const rows = await sql.query(
    `SELECT ${COLUMNS} FROM projects WHERE published = true ORDER BY id`
  );
  return sortHomeProjects(rows.map(toProject));
}

function isCurrentlyBuilding(status) {
  return (status || "").toLowerCase() === "currently building";
}

function extractLatestYear(timeline) {
  const years = String(timeline || "").match(/\b\d{4}\b/g);
  if (!years || years.length === 0) return 0;
  return Number(years[years.length - 1]);
}

// Display order on the home and Work pages. Pure, so it can be unit-tested:
//   1. featured (set in Studio)
//   2. sort order (set in Studio, low first; projects without one come after)
//   3. "currently building"
//   4. newest by the last year in the timeline text, then title
export function sortHomeProjects(projects) {
  const order = (p) => (Number.isFinite(p.sortOrder) ? p.sortOrder : Infinity);
  return [...projects].sort((a, b) => {
    if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
    if (order(a) !== order(b)) return order(a) < order(b) ? -1 : 1;

    const aPriority = isCurrentlyBuilding(a.status) ? 0 : 1;
    const bPriority = isCurrentlyBuilding(b.status) ? 0 : 1;
    if (aPriority !== bPriority) return aPriority - bPriority;

    const byYear =
      extractLatestYear(b.timeline) - extractLatestYear(a.timeline);
    if (byYear !== 0) return byYear;

    return a.title.localeCompare(b.title);
  });
}

export async function getHomeProjects() {
  const sorted = await getAllProjects();

  return sorted.map((project, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: project.title,
    tagline: project.tagline,
    timeline: project.timeline,
    status: project.status,
    isBuilding: isCurrentlyBuilding(project.status),
    link: `/projects/${project.slug}`,
    tags: project.tags.slice(0, 4),
    cover: project.cover,
  }));
}

// Wrapped in cache(): metadata and the page share one query per request.
export const getProjectBySlug = cache(async function getProjectBySlug(slug) {
  const sql = getSql();
  const rows = await sql.query(
    `SELECT ${COLUMNS}, content FROM projects WHERE slug = $1 AND published = true`,
    [slug]
  );
  const row = rows[0];
  if (!row) return null;
  return { ...toProject(row), content: row.content };
});
