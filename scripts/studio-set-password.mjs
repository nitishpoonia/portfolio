// Usage: npm run studio:set-password
// Sets (or resets) the Studio password directly in the database. Use it if you
// are ever locked out. Needs DATABASE_URL in .env.local. Logs out every browser.
import readline from "readline";
import { createSql, closeDatabases } from "../lib/sql-client.mjs";
import { hashPassword, MIN_PASSWORD_LENGTH } from "../lib/password.mjs";

try { process.loadEnvFile(".env.local"); } catch {}
if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set (add it to .env.local).");
  process.exit(1);
}

// One readline for both prompts; typed characters are not echoed.
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
let prompt = "";
rl._writeToOutput = (s) => rl.output.write(s.includes(prompt) ? prompt : "");
const ask = (q) => new Promise((resolve) => { prompt = q; rl.question(q, (a) => { process.stdout.write("\n"); resolve(a); }); });

const pw = await ask("New Studio password: ");
const again = await ask("Repeat it: ");
rl.close();
if (pw.length < MIN_PASSWORD_LENGTH) {
  console.error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  process.exit(1);
}
if (again !== pw) {
  console.error("Passwords don't match.");
  process.exit(1);
}

const sql = createSql();
const hash = await hashPassword(pw);
await sql`
  INSERT INTO studio_auth (id, password_hash) VALUES (1, ${hash})
  ON CONFLICT (id) DO UPDATE SET password_hash = EXCLUDED.password_hash, updated_at = now()`;
await sql`DELETE FROM studio_sessions`;
console.log("Studio password saved. All sessions logged out.");
await closeDatabases();
