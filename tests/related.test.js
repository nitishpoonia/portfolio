import { describe, expect, it } from "vitest";
import { relatedPosts, moreProjects } from "../lib/related";

const post = (slug, date, tags) => ({ slug, date, tags });

describe("relatedPosts", () => {
  it("prefers shared tags, then newest, and excludes itself", () => {
    const all = [post("a", "2026-01-01", ["rn", "perf"]), post("b", "2025-01-01", ["rn"]), post("c", "2026-05-01", []), post("d", "2024-01-01", ["rn", "perf"])];
    expect(relatedPosts(all[0], all).map((p) => p.slug)).toEqual(["d", "b", "c"]);
  });
});

describe("moreProjects", () => {
  it("takes the next ones in order and wraps", () => {
    const all = ["a", "b", "c"].map((slug) => ({ slug }));
    expect(moreProjects({ slug: "c" }, all).map((p) => p.slug)).toEqual(["a", "b"]);
  });
});
