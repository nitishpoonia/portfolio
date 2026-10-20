// Usage: npm run db:setup
import fs from "fs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);
const schema = fs.readFileSync("db/schema.sql", "utf8");

// The HTTP driver runs one statement per call, so split on ";"
const statements = schema
  .split(";")
  .map((s) => s.replace(/--.*$/gm, "").trim())
  .filter(Boolean);

for (const stmt of statements) {
  await sql.query(stmt);
}
console.log(`Schema ready (${statements.length} statements).`);
