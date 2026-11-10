import { cache } from "react";
import readingTime from "reading-time";
import { getSql } from "./db";

// "date" is cast to text so it stays "2026-03-20" instead of becoming a Date object.
const COLUMNS = `slug, title, description, date::text AS date, tags, category, published, updated_at`;

function toPost(row) {
  return {
    slug: row.slug,
    title: row.title,
    date: row.date,
    description: row.description,
    tags: row.tags || [],
    category: row.category || "tech",
    published: row.published,
    updatedAt: row.updated_at,
  };
}

// All published posts, newest first
export async function getAllPosts() {
  const sql = getSql();
  const rows = await sql.query(
    `SELECT ${COLUMNS}, content FROM posts WHERE published = true ORDER BY date DESC`
  );
  return rows.map((row) => ({
    ...toPost(row),
    readingTime: readingTime(row.content).text,
  }));
}

// A single published post, including its MDX body
// Wrapped in cache(): metadata and the page share one query per request.
export const getPostBySlug = cache(async function getPostBySlug(slug) {
  const sql = getSql();
  const rows = await sql.query(
    `SELECT ${COLUMNS}, content FROM posts WHERE slug = $1 AND published = true`,
    [slug]
  );
  const row = rows[0];
  if (!row) return null;
  return {
    ...toPost(row),
    readingTime: readingTime(row.content).text,
    content: row.content,
  };
});
