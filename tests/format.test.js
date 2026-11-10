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
