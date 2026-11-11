import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import SplitWords from "@/components/motion/SplitWords";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="page-shell">
      <Navbar />
      <main id="main" className="page-main">
        <header className="page-head">
          <div className="rail"><p className="nf-num" aria-hidden="true">404</p></div>
          <div className="page-head-body">
            <h1 id="nf-h" className="split"><SplitWords text="This page wandered off." /></h1>
            <p className="page-lede">The link may be old, or the page moved. Everything else is still here.</p>
            <div className="btn-row">
              <Link href="/" className="pill-btn pill-btn-dark"><ArrowLeft size={17} strokeWidth={1.9} aria-hidden="true" />Back home</Link>
              <Link href="/projects" className="pill-btn pill-btn-line">See my work</Link>
            </div>
          </div>
        </header>
      </main>
      <SiteFooter />
    </div>
  );
}
