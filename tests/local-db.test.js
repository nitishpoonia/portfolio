import { describe, expect, it } from "vitest";
import { createSql, closeDatabases } from "../lib/sql-client.mjs";
import { readAll, toMdx } from "../lib/export.mjs";
import matter from "gray-matter";

describe("in-memory database", () => {
  it("migrates, fills from content/ and round-trips through export", async () => {
    const sql = createSql("pglite:memory");
    const [{ n }] = await sql`SELECT count(*)::int AS n FROM posts WHERE published = ${true}`;
    expect(n).toBeGreaterThan(0);
    const { posts } = await readAll(sql);
    const back = matter(toMdx(posts[0]));
    expect(back.data.slug).toBe(posts[0].slug);
    expect(back.content.trim()).toBe(posts[0].content.trim());
    expect(String(back.data.date)).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    await closeDatabases();
  }, 60000);
});

describe("drafts and new project fields survive export and re-import", () => {
  it("keeps published: false and links", async () => {
    const { seedFromContent } = await import("../lib/seed.mjs");
    const fs = await import("fs");
    const os = await import("os");
    const path = await import("path");
    const a = createSql("pglite:memory");
    await a.query(`UPDATE posts SET published = false WHERE slug = (SELECT slug FROM posts ORDER BY slug LIMIT 1)`);
    await a.query(`UPDATE projects SET links = $1, featured = true WHERE slug = 'nfc-time-tracking'`, [JSON.stringify([{ label: "Repo", href: "https://github.com/x" }])]);
    const { posts, projects } = await readAll(a);
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "exp-"));
    for (const [folder, rows] of [["blog", posts], ["projects", projects]]) {
      fs.mkdirSync(path.join(dir, folder));
      for (const r of rows) fs.writeFileSync(path.join(dir, folder, `${r.slug}.mdx`), toMdx(r));
    }
    await a.query(`DELETE FROM posts`);
    await a.query(`DELETE FROM projects`);
    await seedFromContent(a, { onlyIfEmpty: true, dir, quiet: true });
    const drafts = await a.query(`SELECT count(*)::int AS n FROM posts WHERE published = false`);
    expect(drafts[0].n).toBe(1);
    const [p] = await a.query(`SELECT links, featured FROM projects WHERE slug = 'nfc-time-tracking'`);
    expect(p.links).toEqual([{ label: "Repo", href: "https://github.com/x" }]);
    expect(p.featured).toBe(true);
    await closeDatabases();
  }, 60000);
});
