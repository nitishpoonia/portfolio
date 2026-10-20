import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/auth";

// Next 16 "proxy" (formerly middleware): gate everything under /studio and /api/studio.
export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const open = pathname === "/studio/login" || pathname === "/api/studio/login";
  if (open) return NextResponse.next();

  const ok = await verifyToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/studio/login", request.url));
}

export const config = { matcher: ["/studio/:path*", "/api/studio/:path*"] };
