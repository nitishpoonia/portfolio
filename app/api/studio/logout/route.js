import { NextResponse } from "next/server";
import { destroySession, destroyOtherSessions, SESSION_COOKIE } from "@/lib/auth";

// POST /api/studio/logout            -> this browser
// POST /api/studio/logout?all=1      -> every browser
export async function POST(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (new URL(request.url).searchParams.get("all")) await destroyOtherSessions(null);
  else await destroySession(token);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
