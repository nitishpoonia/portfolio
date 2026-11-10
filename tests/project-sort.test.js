import { describe, expect, it, vi } from "vitest";

vi.mock("../lib/db", () => ({ getSql: () => { throw new Error("no db in unit tests"); } }));
const { sortHomeProjects } = await import("../lib/project");

const p = (title, timeline, status = null) => ({ title, timeline, status });

describe("sortHomeProjects", () => {
  it("puts 'currently building' first", () => {
    const out = sortHomeProjects([p("Old", "2023"), p("Now", "2022", "Currently building")]);
    expect(out.map((x) => x.title)).toEqual(["Now", "Old"]);
  });
  it("orders by the last year in the timeline, newest first", () => {
    const out = sortHomeProjects([p("A", "2023"), p("B", "Dec 2024 – Feb 2026"), p("C", "2025")]);
    expect(out.map((x) => x.title)).toEqual(["B", "C", "A"]);
  });
  it("breaks ties by title and is stable across calls", () => {
    const input = [p("Zeta", "2025"), p("Alpha", "2025"), p("Mid", "no year")];
    const once = sortHomeProjects(input).map((x) => x.title);
    expect(once).toEqual(["Alpha", "Zeta", "Mid"]);
    expect(sortHomeProjects([...input].reverse()).map((x) => x.title)).toEqual(once);
  });
});
