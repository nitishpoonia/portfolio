import { getSql } from "./db";

const COLUMNS = `slug, title, tagline, role, company, timeline, tags, type, status, published`;

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
  };
}

export async function getAllProjects() {
  const sql = getSql();
  const rows = await sql.query(
    `SELECT ${COLUMNS} FROM projects WHERE published = true`
  );
  return rows.map(toProject);
}

function isCurrentlyBuilding(status) {
  return (status || "").toLowerCase() === "currently building";
}

function extractLatestYear(timeline) {
  const years = String(timeline || "").match(/\b\d{4}\b/g);
  if (!years || years.length === 0) return 0;
  return Number(years[years.length - 1]);
}

export async function getHomeProjects() {
  const projects = await getAllProjects();

  const sorted = [...projects].sort((a, b) => {
    const aPriority = isCurrentlyBuilding(a.status) ? 0 : 1;
    const bPriority = isCurrentlyBuilding(b.status) ? 0 : 1;
    if (aPriority !== bPriority) return aPriority - bPriority;

    const byYear =
      extractLatestYear(b.timeline) - extractLatestYear(a.timeline);
    if (byYear !== 0) return byYear;

    return a.title.localeCompare(b.title);
  });

  return sorted.map((project, index) => ({
    number: String(index + 1).padStart(2, "0"),
    title: project.title,
    tagline: project.tagline,
    timeline: project.timeline,
    status: project.status,
    isBuilding: isCurrentlyBuilding(project.status),
    link: `/projects/${project.slug}`,
    tags: project.tags.slice(0, 4),
  }));
}

export async function getProjectBySlug(slug) {
  const sql = getSql();
  const rows = await sql.query(
    `SELECT ${COLUMNS}, content FROM projects WHERE slug = $1 AND published = true`,
    [slug]
  );
  const row = rows[0];
  if (!row) return null;
  return { ...toProject(row), content: row.content };
}
