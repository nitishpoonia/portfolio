"use client";
import { useLayoutEffect, useRef } from "react";

// A textarea that grows with its content (no inner scrollbar).
export default function AutoTextarea({ value, className = "", ...props }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);
  return <textarea ref={ref} rows={1} value={value} className={`resize-none overflow-hidden ${className}`} {...props} />;
}
