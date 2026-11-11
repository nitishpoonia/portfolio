"use client";
import Link from "next/link";
import { RotateCw, ArrowLeft } from "lucide-react";

// Shown if a page fails while rendering (for example the database is briefly unreachable).
export default function SiteError({ reset }) {
  return (
    <main id="main" className="page-main">
      <header className="page-head">
        <div className="rail"><p className="rail-label">Error</p></div>
        <div className="page-head-body">
          <h1 id="err-h">Something went wrong.</h1>
          <p className="page-lede">This page couldn’t load just now. Trying again usually fixes it.</p>
          <div className="btn-row">
            <button type="button" onClick={reset} className="pill-btn pill-btn-dark copy-btn"><RotateCw size={17} strokeWidth={1.9} aria-hidden="true" />Try again</button>
            <Link href="/" className="pill-btn pill-btn-line"><ArrowLeft size={17} strokeWidth={1.9} aria-hidden="true" />Back home</Link>
          </div>
        </div>
      </header>
    </main>
  );
}
