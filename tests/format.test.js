import { describe, expect, it } from "vitest";
import { slugify, tagsOf } from "../lib/format";

describe("slugify", () => {
  it("lowercases and joins words with dashes", () => {
    expect(slugify("How to Fix FlatList Performance")).toBe("how-to-fix-flatlist-performance");
  });
  it("drops punctuation and trims dashes", () => {
    expect(slugify("  Hello, world!  ")).toBe("hello-world");
    expect(slugify("--a--b--")).toBe("a-b");
  });
  it("handles empty input", () => {
    expect(slugify("")).toBe("");
    expect(slugify(null)).toBe("");
  });
});

describe("tagsOf", () => {
  it("splits a comma string and trims", () => {
    expect(tagsOf("React Native, NFC ,  ")).toEqual(["React Native", "NFC"]);
  });
  it("cleans an array", () => {
    expect(tagsOf([" a", "", "b "])).toEqual(["a", "b"]);
  });
});

describe("formatDate", async () => {
  const { formatDate } = await import("../lib/format");
  it("formats a calendar date the same in every time zone", () => {
    expect(formatDate("2026-03-20")).toBe("20 Mar 2026");
    expect(formatDate("2026-03-20", "long")).toBe("20 March 2026");
    expect(formatDate("2026-01-01")).toBe("1 Jan 2026");
  });
  it("returns empty for missing or bad input", () => {
    expect(formatDate("")).toBe("");
    expect(formatDate("nope")).toBe("");
  });
});
