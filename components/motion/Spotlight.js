"use client";
import { useEffect } from "react";

// A soft light that follows the cursor across cards. Mouse/trackpad only;
// touch screens and reduced-motion users don't get it.
const SELECTOR = ".card, .reason, .tl-card, .site-footer-inner";

export default function Spotlight() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;
    let frame = 0;
    const onMove = (e) => {
      const el = e.target instanceof Element ? e.target.closest(SELECTOR) : null;
      if (!el) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
  }, []);
  return null;
}
