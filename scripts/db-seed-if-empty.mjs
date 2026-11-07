// Runs automatically before `next build` (after db-setup).
// If the posts or projects table is completely empty, imports content/*.mdx into it,
// so a fresh database shows your work instead of an empty site.
// It never touches a table that already has rows, so Studio edits and deletions are safe.
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { neon } from "@neondatabase/serverless";

try { process.loadEnvFile(".env.local"); } catch {}

if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL not set, skipping content import.");
  process.exit(0);
}

const sql = neon(process.env.DATABASE_URL);

function readDir(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return { slug: data.slug || f.replace(".mdx", ""), data, content: content.trim() };
    });
}

const count = async (table) => Number((await sql.query(`SELECT count(*)::int AS n FROM ${table}`))[0].n);

try {
  if ((await count("posts")) === 0) {
    const posts = readDir("content/blog");
    for (const { slug, data, content } of posts) {
      await sql.query(
        `INSERT INTO posts (slug, title, description, date, tags, category, content, published)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (slug) DO NOTHING`,
        [slug, data.title, data.description || "", data.date, data.tags || [], data.category || "tech", content, data.published !== false]
      );
    }
    console.log(`Posts table was empty: imported ${posts.length} posts from content/blog.`);
  } else {
    console.log("Posts table has rows, leaving it alone.");
  }

  if ((await count("projects")) === 0) {
    const projects = readDir("content/projects");
    for (const { slug, data, content } of projects) {
      await sql.query(
        `INSERT INTO projects (slug, title, tagline, role, company, timeline, tags, type, status, content, published)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ON CONFLICT (slug) DO NOTHING`,
        [slug, data.title, data.tagline || "", data.role || "", data.company || "", data.timeline || "",
         data.tags || [], data.type || "case-study", data.status || null, content, data.published !== false]
      );
    }
    console.log(`Projects table was empty: imported ${projects.length} projects from content/projects.`);
  } else {
    console.log("Projects table has rows, leaving it alone.");
  }
} catch (e) {
  // Never fail the deploy over this; the site still builds with whatever is in the DB.
  console.warn("Content import skipped:", e.message);
}
