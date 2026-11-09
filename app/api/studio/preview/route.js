import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { createPreview } from "@/lib/preview";

// body: { kind: "post" | "project", data: { ...editor fields } }  ->  { url }
export async function POST(request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { kind, data } = await request.json();
    return NextResponse.json({ url: `/preview/${await createPreview(kind, data)}` });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
