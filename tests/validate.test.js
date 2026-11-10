import { describe, expect, it } from "vitest";
import { ValidationError, text, oneOf, isoDate, slug } from "../lib/validate";

describe("validate", () => {
  it("trims text and enforces required and max length", () => {
    expect(text("  hi  ", "Title")).toBe("hi");
    expect(() => text("", "Title", { required: true })).toThrow(ValidationError);
    expect(() => text("x".repeat(11), "Title", { max: 10 })).toThrow(/too long/);
  });
  it("restricts to options with a fallback", () => {
    expect(oneOf("", "Category", ["tech", "personal"], "tech")).toBe("tech");
    expect(() => oneOf("life", "Category", ["tech", "personal"], "tech")).toThrow(/must be one of/);
  });
  it("accepts only real calendar dates", () => {
    expect(isoDate("2026-03-20", "Date")).toBe("2026-03-20");
    expect(() => isoDate("20/03/2026", "Date")).toThrow(ValidationError);
    expect(() => isoDate("2026-13-01", "Date")).toThrow(ValidationError);
    expect(() => isoDate("2026-02-30", "Date")).toThrow(ValidationError);
    expect(isoDate("", "Date")).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
  it("rejects an empty slug", () => {
    expect(() => slug("")).toThrow(/empty/);
  });
});
