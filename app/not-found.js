import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import SplitWords from "@/components/motion/SplitWords";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main page-narrow">
        <section className="hero" aria-labelledby="nf-h">
          <span className="nf-graphic" aria-hidden="true">
            <span className="nf-num">404</span>
            <span className="icon-tile icon-tile-lg"><Compass size={30} strokeWidth={1.6} /></span>
          </span>
          <h1 id="nf-h" className="split"><SplitWords text="This page wandered off." /></h1>
          <p>The link may be old, or the page moved. Everything else is still here.</p>
          <div className="btn-row">
            <Link href="/" className="pill-btn pill-btn-dark"><ArrowLeft size={17} strokeWidth={1.9} aria-hidden="true" />Back home</Link>
            <Link href="/projects" className="pill-btn pill-btn-line">See my work</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
