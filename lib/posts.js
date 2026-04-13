import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDir = path.join(process.cwd(), "content/blog");

// Get all published posts sorted by date
export function getAllPosts() {
  const files = fs.readdirSync(postsDir);

  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(".mdx", "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags || [],
        category: data.category || "tech",
        readingTime: readingTime(raw).text,
        published: data.published !== false, // default true
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Get a single post by slug
export async function getPostBySlug(slug) {
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    tags: data.tags || [],
    readingTime: readingTime(raw).text,
    content,
  };
}
