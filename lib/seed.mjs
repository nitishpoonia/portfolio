// Fills posts and projects from the MDX files in content/.
//  - onlyIfEmpty: true  -> only touches a table that has no rows (used before every build)
//  - onlyIfEmpty: false -> upserts every file, OVERWRITING Studio edits with the same slug
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT = path.join(process.cwd(), "content");

export function readContent(kind, dir = CONTENT) {
  const folder = path.join(dir, kind);
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(folder, f), "utf8"));
      return { slug: data.slug || f.replace(/\.mdx$/, ""), data, content: content.trim() };
    });
}

const dateOnly = (d) => (d instanceof Date ? d.toISOString().slice(0, 10) : d || null);

const POST = {
  table: "posts",
  folder: "blog",
  cols: ["slug", "title", "description", "date", "tags", "category", "content", "published"],
  values: ({ slug, data, content }) => [
    slug, data.title, data.description || "", dateOnly(data.date) || new Date().toISOString().slice(0, 10),
    data.tags || [], data.category || "tech", content, data.published !== false,
  ],
};

const PROJECT = {
  table: "projects",
  folder: "projects",
  cols: ["slug", "title", "tagline", "role", "company", "timeline", "tags", "type", "status", "content", "published"],
  values: ({ slug, data, content }) => [
    slug, data.title, data.tagline || "", data.role || "", data.company || "", data.timeline || "",
    data.tags || [], data.type || "case-study", data.status || null, content, data.published !== false,
  ],
};

async function seedTable(sql, spec, { onlyIfEmpty, dir, log }) {
  if (onlyIfEmpty) {
    const [{ n }] = await sql.query(`SELECT count(*)::int AS n FROM ${spec.table}`);
    if (n > 0) {
      log(`${spec.table}: has rows, leaving it alone.`);
      return 0;
    }
  }
  const items = readContent(spec.folder, dir);
  const ph = spec.cols.map((_, i) => `$${i + 1}`).join(",");
  const update = spec.cols.filter((c) => c !== "slug").map((c) => `${c} = EXCLUDED.${c}`).join(", ");
  const conflict = onlyIfEmpty ? "DO NOTHING" : `DO UPDATE SET ${update}, updated_at = now()`;
  for (const item of items) {
    await sql.query(
      `INSERT INTO ${spec.table} (${spec.cols.join(",")}) VALUES (${ph}) ON CONFLICT (slug) ${conflict}`,
      spec.values(item)
    );
  }
  log(`${spec.table}: ${onlyIfEmpty ? "imported" : "upserted"} ${items.length} from content/${spec.folder}.`);
  return items.length;
}

export async function seedFromContent(sql, { onlyIfEmpty = true, dir = CONTENT, quiet = false } = {}) {
  const log = quiet ? () => {} : console.log;
  const posts = await seedTable(sql, POST, { onlyIfEmpty, dir, log });
  const projects = await seedTable(sql, PROJECT, { onlyIfEmpty, dir, log });
  return { posts, projects };
}
