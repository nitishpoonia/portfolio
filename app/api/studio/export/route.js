import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { getSql } from "@/lib/db";
import { readAll } from "@/lib/export.mjs";

// GET /api/studio/export            -> JSON of every post, project and setting
// GET /api/studio/export?media=1    -> the same, plus every uploaded image (base64)
export async function GET(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const media = new URL(request.url).searchParams.get("media") === "1";
  const data = await readAll(getSql(), { media });
  const day = new Date().toISOString().slice(0, 10);
  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="nitishpoonia-backup-${day}${media ? "-with-images" : ""}.json"`,
      "Cache-Control": "no-store",
    },
  });
}
