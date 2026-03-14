import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const projectsDir = path.join(process.cwd(), "content/projects");

export function getAllProjects() {
  const files = fs.readdirSync(projectsDir);

  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(projectsDir, filename), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title,
        tagline: data.tagline,
        role: data.role,
        company: data.company,
        timeline: data.timeline,
        tags: data.tags || [],
        type: data.type || "case-study", // ← new
        status: data.status || null,
        published: data.published !== false,
      };
    })
    .filter((p) => p.published);
}

function isCurrentlyBuilding(status) {
  return (status || "").toLowerCase() === "currently building";
}

function extractLatestYear(timeline) {
  const years = String(timeline || "").match(/\b\d{4}\b/g);
  if (!years || years.length === 0) return 0;
  return Number(years[years.length - 1]);
}

export function getHomeProjects() {
  const projects = getAllProjects();

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
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    tagline: data.tagline,
    role: data.role,
    company: data.company,
    timeline: data.timeline,
    tags: data.tags || [],
    type: data.type || "case-study",
    status: data.status || null,
    content,
  };
}
