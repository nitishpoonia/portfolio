import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "./auth";

// Wraps an admin handler: checks the session, parses JSON, maps errors, then
// refreshes the public pages so a publish shows up immediately.
export function guarded(fn) {
  return async (request, ctx) => {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const body = ["POST", "PUT"].includes(request.method)
        ? await request.json()
        : null;
      const params = ctx?.params ? await ctx.params : {};
      const result = await fn({ body, params });
      revalidatePath("/", "layout");
      return NextResponse.json(result ?? { ok: true });
    } catch (e) {
      const dup = /unique|duplicate/i.test(e.message);
      return NextResponse.json(
        { error: dup ? "That slug is already used" : e.message },
        { status: dup ? 409 : 400 }
      );
    }
  };
}
