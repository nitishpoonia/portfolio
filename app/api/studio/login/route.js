import { NextResponse } from "next/server";
import { attemptLogin, createSession, clientIp, cookieOptions, SESSION_COOKIE } from "@/lib/auth";

const MESSAGES = {
  wrong: ["Wrong password", 401],
  locked: ["Too many attempts. Try again in 15 minutes.", 429],
  "no-password": ["Studio password has not been set up yet", 503],
};

export async function POST(request) {
  const { password } = await request.json().catch(() => ({}));
  if (typeof password !== "string" || !password || password.length > 200) {
    return NextResponse.json({ error: "Enter your password" }, { status: 400 });
  }
  const result = await attemptLogin(password, clientIp(request));
  if (result !== "ok") {
    await new Promise((r) => setTimeout(r, 600)); // slow down guessing
    const [error, status] = MESSAGES[result];
    return NextResponse.json({ error }, { status });
  }
  const { token, maxAge } = await createSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, cookieOptions(maxAge));
  return res;
}
