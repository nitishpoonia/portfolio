"use client";
import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

const LABELS = { js: "JavaScript", jsx: "JSX", ts: "TypeScript", tsx: "TSX", bash: "Shell", sh: "Shell", sql: "SQL", json: "JSON", py: "Python", python: "Python", css: "CSS", html: "HTML", diff: "Diff", yaml: "YAML", swift: "Swift", kotlin: "Kotlin", java: "Java" };

// Replaces <pre> in article bodies: language label and a copy button over the
// highlighted code. The highlighting itself is done on the server.
export default function CodeBlock({ children, ...props }) {
  const ref = useRef(null);
  const [copied, setCopied] = useState(false);
  const lang = props["data-language"];
  const label = lang && lang !== "plaintext" && lang !== "text" ? LABELS[lang] || lang : null;

  async function copy() {
    const text = ref.current?.querySelector("code")?.innerText ?? ref.current?.innerText ?? "";
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div className="code-block">
      <div className="code-bar">
        <span className="code-lang">{label}</span>
        <button type="button" className="code-copy" onClick={copy} aria-label={copied ? "Copied" : "Copy code"}>
          {copied ? <Check size={14} strokeWidth={2} aria-hidden="true" /> : <Copy size={14} strokeWidth={2} aria-hidden="true" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre ref={ref} {...props}>{children}</pre>
    </div>
  );
}
