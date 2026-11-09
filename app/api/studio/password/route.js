import { NextResponse } from "next/server";
import { isAdmin, changePassword, destroyOtherSessions, currentToken } from "@/lib/auth";

// body: { current, next }. On success every other browser is logged out.
export async function POST(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { current, next } = await request.json().catch(() => ({}));
  try {
    await changePassword(current, next);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
  await destroyOtherSessions(await currentToken());
  return NextResponse.json({ ok: true });
}
