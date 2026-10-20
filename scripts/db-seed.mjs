// Usage: npm run db:seed
// Imports content/blog/*.mdx and content/projects/*.mdx into Postgres.
// Safe to re-run: existing slugs are updated, not duplicated.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

function readDir(dir) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return { slug: f.replace(".mdx", ""), data, content: content.trim() };
    });
}

const posts = readDir("content/blog");
for (const { slug, data, content } of posts) {
  await sql`
    INSERT INTO posts (slug, title, description, date, tags, category, content, published)
    VALUES (${slug}, ${data.title}, ${data.description || ""}, ${data.date},
            ${data.tags || []}, ${data.category || "tech"}, ${content},
            ${data.published !== false})
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title, description = EXCLUDED.description,
      date = EXCLUDED.date, tags = EXCLUDED.tags, category = EXCLUDED.category,
      content = EXCLUDED.content, published = EXCLUDED.published, updated_at = now()`;
}
console.log(`Imported ${posts.length} posts.`);

const projects = readDir("content/projects");
for (const { slug, data, content } of projects) {
  await sql`
    INSERT INTO projects (slug, title, tagline, role, company, timeline, tags, type, status, content, published)
    VALUES (${slug}, ${data.title}, ${data.tagline || ""}, ${data.role || ""},
            ${data.company || ""}, ${data.timeline || ""}, ${data.tags || []},
            ${data.type || "case-study"}, ${data.status || null}, ${content},
            ${data.published !== false})
    ON CONFLICT (slug) DO UPDATE SET
      title = EXCLUDED.title, tagline = EXCLUDED.tagline, role = EXCLUDED.role,
      company = EXCLUDED.company, timeline = EXCLUDED.timeline, tags = EXCLUDED.tags,
      type = EXCLUDED.type, status = EXCLUDED.status, content = EXCLUDED.content,
      published = EXCLUDED.published, updated_at = now()`;
}
console.log(`Imported ${projects.length} projects.`);
