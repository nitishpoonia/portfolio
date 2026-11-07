import { cache } from "react";
import { CONTACT } from "./contact";
import { getSetting } from "./admin";

// Contact details for the public site. Studio → Settings saves overrides to the
// database; the values in lib/contact.js are the fallback when the DB has none
// or can't be reached (e.g. a local build without DATABASE_URL).
export const getContact = cache(async () => {
  try {
    const saved = await getSetting("contact", {});
    const clean = Object.fromEntries(
      Object.entries(saved || {}).filter(([, v]) => typeof v === "string" && v.trim())
    );
    return { ...CONTACT, ...clean };
  } catch {
    return CONTACT;
  }
});

export const whatsappHref = (contact, message) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message || contact.whatsappMessage)}`;
