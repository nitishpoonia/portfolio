import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdmin } from "./auth";
import { ValidationError } from "./validate";

// Wraps an admin handler: checks the session, parses JSON, maps errors, then
// refreshes the public pages so a publish shows up immediately.
export function guarded(fn) {
  return async (request, ctx) => {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
      const body = ["POST", "PUT"].includes(request.method)
        ? await request.json().catch(() => {
            throw new ValidationError("Request body must be JSON");
          })
        : null;
      const params = ctx?.params ? await ctx.params : {};
      const result = await fn({ body, params });
      revalidatePath("/", "layout");
      return NextResponse.json(result ?? { ok: true });
    } catch (e) {
      if (e instanceof ValidationError) return NextResponse.json({ error: e.message }, { status: 400 });
      if (/unique|duplicate/i.test(e.message)) {
        return NextResponse.json({ error: "That slug is already used" }, { status: 409 });
      }
      console.error("Studio API error:", e);
      return NextResponse.json({ error: "Couldn’t save: something went wrong on the server. Try again." }, { status: 500 });
    }
  };
}
