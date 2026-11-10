"use client";
import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";

// Counts the clicks that matter for a portfolio as Google Analytics events:
// résumé downloads, email and WhatsApp. One listener for the whole site, so no
// link needs extra markup. Does nothing when GA isn't loaded (local, previews).
const EVENTS = [
  [(href) => href.startsWith("mailto:"), "email_click"],
  [(href) => href.includes("wa.me/"), "whatsapp_click"],
  [(href) => /\/resume\.pdf($|\?)/.test(href), "resume_download"],
];

export default function ContactEvents() {
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!a || !window.dataLayer) return;
      const href = a.getAttribute("href") || "";
      const hit = EVENTS.find(([test]) => test(href));
      if (hit) sendGAEvent("event", hit[1], { page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
