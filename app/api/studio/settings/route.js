import { ValidationError } from "@/lib/validate";
import { guarded } from "@/lib/crud-routes";
import { setSetting } from "@/lib/admin";

// body: { key: "contact", value: { ... } }
export const PUT = guarded(async ({ body }) => {
  if (!body?.key || typeof body.value !== "object") throw new ValidationError("key and value required");
  await setSetting(body.key, body.value);
});
