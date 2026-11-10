"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

// For visitors whose browser has no mail app set up, where "Email me" does nothing.
export default function CopyEmail({ email, className = "pill-btn pill-btn-line" }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.prompt("Copy my email address:", email);
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button type="button" onClick={copy} className={`copy-btn ${className}`} data-copied={copied}
      aria-label={copied ? "Email address copied" : `Copy email address ${email}`}>
      {copied ? <Check size={17} strokeWidth={1.9} aria-hidden="true" /> : <Copy size={17} strokeWidth={1.9} aria-hidden="true" />}
      {copied ? "Copied" : "Copy email"}
      <span className="sr-only" role="status" aria-live="polite">{copied ? "Copied" : ""}</span>
    </button>
  );
}
