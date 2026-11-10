import { ValidationError } from "@/lib/validate";
import { validateContent } from "@/lib/site-content";
import { guarded } from "@/lib/crud-routes";
import { setSetting, deleteSetting } from "@/lib/admin";

function validContact(v) {
  const email = String(v.email || "").trim();
  const whatsapp = String(v.whatsapp || "").replace(/[\s+-]/g, "");
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new ValidationError("Email doesn’t look right");
  if (whatsapp && !/^\d{8,15}$/.test(whatsapp)) throw new ValidationError("WhatsApp number: digits with country code, e.g. 919876543210");
  return { email, whatsapp, whatsappMessage: String(v.whatsappMessage || "").trim().slice(0, 300) };
}

// PUT { key, value }: save. DELETE ?key=: go back to the default in code.
export const PUT = guarded(async ({ body }) => {
  if (!body?.key || typeof body.value !== "object") throw new ValidationError("key and value required");
  // Contact details keep their own simple form; site content is validated per key.
  const value = body.key === "contact" ? validContact(body.value) : validateContent(body.key, body.value);
  await setSetting(body.key, value);
  return { ok: true, value };
});

export const DELETE = guarded(async ({ request }) => {
  const key = new URL(request.url).searchParams.get("key");
  validateContent(key, null, { checkKeyOnly: true });
  await deleteSetting(key);
});
