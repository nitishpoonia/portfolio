import { randomBytes, createHash } from "crypto";
import { cookies } from "next/headers";
import { getSql } from "./db";
import { hashPassword, verifyPassword, MIN_PASSWORD_LENGTH } from "./password.mjs";

// Studio auth, fully database-backed: no password or secret in env vars.
// - studio_auth:      scrypt hash of the admin password
// - studio_sessions:  SHA-256 of each session cookie, with an expiry
// - studio_login_failures: recent failed attempts, for rate limiting

export const SESSION_COOKIE = "studio_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const WINDOW = "15 minutes";
const MAX_FAILS_PER_IP = 5;
const MAX_FAILS_TOTAL = 30; // across all IPs, in case someone rotates addresses

const sha256 = (s) => createHash("sha256").update(s).digest("hex");

export const cookieOptions = (maxAge) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge,
});

export function clientIp(request) {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : request.headers.get("x-real-ip") || "unknown").trim();
}

// Returns "ok" | "wrong" | "locked" | "no-password"
export async function attemptLogin(password, ip) {
  const sql = getSql();
  const [{ mine, total }] = await sql`
    SELECT count(*) FILTER (WHERE ip = ${ip})::int AS mine, count(*)::int AS total
    FROM studio_login_failures WHERE at > now() - ${WINDOW}::interval`;
  if (mine >= MAX_FAILS_PER_IP || total >= MAX_FAILS_TOTAL) return "locked";

  const rows = await sql`SELECT password_hash FROM studio_auth WHERE id = 1`;
  if (!rows.length) return "no-password";

  if (!(await verifyPassword(password, rows[0].password_hash))) {
    await sql`INSERT INTO studio_login_failures (ip) VALUES (${ip})`;
    return "wrong";
  }
  await sql`DELETE FROM studio_login_failures WHERE ip = ${ip} OR at < now() - ${WINDOW}::interval`;
  return "ok";
}

export async function createSession() {
  const token = randomBytes(32).toString("base64url");
  const sql = getSql();
  await sql`DELETE FROM studio_sessions WHERE expires_at < now()`;
  await sql`
    INSERT INTO studio_sessions (token_hash, expires_at)
    VALUES (${sha256(token)}, now() + ${MAX_AGE + " seconds"}::interval)`;
  return { token, maxAge: MAX_AGE };
}

export async function verifyToken(token) {
  if (!token || token.length > 200) return false;
  const rows = await getSql()`
    SELECT 1 FROM studio_sessions WHERE token_hash = ${sha256(token)} AND expires_at > now()`;
  return rows.length > 0;
}

export async function destroySession(token) {
  if (token) await getSql()`DELETE FROM studio_sessions WHERE token_hash = ${sha256(token)}`;
}

// Log out every browser except (optionally) the one holding keepToken
export async function destroyOtherSessions(keepToken) {
  const keep = keepToken ? sha256(keepToken) : "";
  await getSql()`DELETE FROM studio_sessions WHERE token_hash <> ${keep}`;
}

export async function changePassword(current, next) {
  if (typeof next !== "string" || next.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`New password must be at least ${MIN_PASSWORD_LENGTH} characters`);
  }
  const sql = getSql();
  const rows = await sql`SELECT password_hash FROM studio_auth WHERE id = 1`;
  if (!rows.length || !(await verifyPassword(current, rows[0].password_hash))) {
    throw new Error("Current password is wrong");
  }
  const hash = await hashPassword(next);
  await sql`UPDATE studio_auth SET password_hash = ${hash}, updated_at = now() WHERE id = 1`;
}

// Use inside route handlers and server components
export async function currentToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function isAdmin() {
  return verifyToken(await currentToken());
}
