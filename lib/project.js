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
