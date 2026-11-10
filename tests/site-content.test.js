import { describe, expect, it, vi } from "vitest";
vi.mock("../lib/db", () => ({ getSql: () => { throw new Error("no db"); } }));
const { validateContent, DEFAULTS } = await import("../lib/site-content");

describe("site content validation", () => {
  it("accepts the defaults from lib/story.js unchanged in meaning", () => {
    const chapters = validateContent("chapters", DEFAULTS.chapters);
    expect(chapters.length).toBe(DEFAULTS.chapters.length);
    expect(chapters.at(-1).current).toBe(true);
    expect(validateContent("skills", DEFAULTS.skills)).toEqual(DEFAULTS.skills);
    expect(validateContent("now_building", DEFAULTS.now_building).title).toBe(DEFAULTS.now_building.title);
  });
  it("rejects unknown keys and bad shapes", () => {
    expect(() => validateContent("hero", {})).toThrow(/Unknown/);
    expect(() => validateContent("chapters", [])).toThrow();
    expect(() => validateContent("chapters", [{ when: "2020" }])).toThrow(/big/);
    expect(() => validateContent("now_building", { title: "x", text: "y", href: "javascript:1" })).toThrow(/https/);
  });
  it("accepts points as lines and tags as a comma string", () => {
    const v = validateContent("now_building", { title: "T", text: "D", points: "a\n\nb", tags: "x, y" });
    expect(v.points).toEqual(["a", "b"]);
    expect(v.tags).toEqual(["x", "y"]);
  });
});
