import { neon } from "@neondatabase/serverless";

// neon() returns a tagged-template function:  await sql`SELECT ...`
// It talks to Neon over HTTP, so it works on Vercel's serverless runtime.
export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env.local (local) or Vercel env vars."
    );
  }
  return neon(url);
}
