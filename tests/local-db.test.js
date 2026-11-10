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
