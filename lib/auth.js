import { SignJWT, jwtVerify } from "jose";
import { timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "studio_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secretKey() {
  const secret = process.env.STUDIO_SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("STUDIO_SESSION_SECRET must be set (32+ characters).");
  }
  return new TextEncoder().encode(secret);
}

// Constant-time password check against STUDIO_PASSWORD
export function checkPassword(input) {
  const expected = process.env.STUDIO_PASSWORD;
  if (!expected || typeof input !== "string") return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function createSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey());
  return { token, maxAge: MAX_AGE };
}

export async function verifyToken(token) {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}

// Use inside route handlers and server components
export async function isAdmin() {
  const store = await cookies();
  return verifyToken(store.get(SESSION_COOKIE)?.value);
}
