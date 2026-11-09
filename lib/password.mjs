// scrypt password hashing (Node's built-in crypto, no extra dependency).
// Stored format: scrypt$N$r$p$<salt base64>$<hash base64>
import { scrypt, randomBytes, timingSafeEqual } from "crypto";

const N = 32768, R = 8, P = 1, KEYLEN = 64;
const MAXMEM = 64 * 1024 * 1024;

const derive = (password, salt, n, r, p, len) =>
  new Promise((resolve, reject) =>
    scrypt(password, salt, len, { N: n, r, p, maxmem: MAXMEM }, (err, key) =>
      err ? reject(err) : resolve(key)
    )
  );

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await derive(password, salt, N, R, P, KEYLEN);
  return `scrypt$${N}$${R}$${P}$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password, stored) {
  if (typeof password !== "string" || typeof stored !== "string") return false;
  const [algo, n, r, p, saltB64, hashB64] = stored.split("$");
  if (algo !== "scrypt" || !hashB64) return false;
  const expected = Buffer.from(hashB64, "base64");
  const key = await derive(password, Buffer.from(saltB64, "base64"), +n, +r, +p, expected.length);
  return timingSafeEqual(key, expected);
}

export const MIN_PASSWORD_LENGTH = 10;
