import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { saveMedia } from "@/lib/media";

// body: { name, type, width, height, data (base64) }  ->  { id, url }
export async function POST(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await saveMedia(await request.json()));
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
