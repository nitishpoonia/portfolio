import { describe, expect, it, vi } from "vitest";
vi.mock("@/components/NfcTimerDemo", () => ({ default: () => null }));
vi.mock("@/components/CodeBlock", () => ({ default: () => null }));
const { tableOfContents, mediaIdsIn } = await import("../lib/mdx");

describe("tableOfContents", () => {
  it("lists h2 and h3 with GitHub-style ids, skipping code", () => {
    const md = "# Title\n## What `FlatList` Does\n```js\n## not a heading\n```\n### 1. The JS Thread\n## What FlatList Does";
    expect(tableOfContents(md)).toEqual([
      { depth: 2, text: "What FlatList Does", id: "what-flatlist-does" },
      { depth: 3, text: "1. The JS Thread", id: "1-the-js-thread" },
      { depth: 2, text: "What FlatList Does", id: "what-flatlist-does-1" },
    ]);
  });
  it("strips links and emphasis", () => {
    expect(tableOfContents("## Use [memo](https://x) **wisely**")[0].text).toBe("Use memo wisely");
  });
});

describe("mediaIdsIn", () => {
  it("finds uploaded image ids once each", () => {
    expect(mediaIdsIn("![a](/media/abcdef12) ![b](/media/abcdef12) ![c](https://x.com/y.png)")).toEqual(["abcdef12"]);
  });
});
