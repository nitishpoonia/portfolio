// Applies db/migrations/NNN_name.sql in order, once each, recording them in
// schema_migrations. Runs before every production build (scripts/db-setup.mjs).
//
// Rules for a migration (see AGENTS.md): additive only, and safe to run twice
// (IF NOT EXISTS / ADD COLUMN IF NOT EXISTS), because the HTTP driver can't wrap
// several statements in one transaction.
import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "db", "migrations");

// Split a file into statements: drop -- comments, then split on ";".
export function splitStatements(text) {
  return text
    .replace(/--.*$/gm, "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function migrationFiles(dir = DIR) {
  return fs
    .readdirSync(dir)
    .filter((f) => /^\d{3}_[\w-]+\.sql$/.test(f))
    .sort();
}

export async function migrate(sql, { dir = DIR, quiet = false } = {}) {
  const log = quiet ? () => {} : console.log;
  await sql.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    name        TEXT PRIMARY KEY,
    applied_at  TIMESTAMPTZ NOT NULL DEFAULT now()
  )`);
  const done = new Set((await sql.query(`SELECT name FROM schema_migrations`)).map((r) => r.name));
  const pending = migrationFiles(dir).filter((f) => !done.has(f));
  for (const file of pending) {
    const statements = splitStatements(fs.readFileSync(path.join(dir, file), "utf8"));
    for (const stmt of statements) await sql.query(stmt);
    await sql.query(`INSERT INTO schema_migrations (name) VALUES ($1) ON CONFLICT DO NOTHING`, [file]);
    log(`Applied ${file} (${statements.length} statements).`);
  }
  if (!pending.length) log("Database schema is up to date.");
  return pending;
}
