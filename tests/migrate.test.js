import { describe, expect, it } from "vitest";
import { splitStatements, migrationFiles } from "../lib/migrate.mjs";

describe("migrations", () => {
  it("splits statements and drops comments", () => {
    expect(splitStatements("-- hi; there\nCREATE TABLE a (x int);\n\n-- c\nSELECT 1;")).toEqual([
      "CREATE TABLE a (x int)",
      "SELECT 1",
    ]);
  });
  it("lists numbered files in order", () => {
    const files = migrationFiles();
    expect(files[0]).toBe("001_initial.sql");
    expect([...files].sort()).toEqual(files);
  });
});
