import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";

// Shell for every public page: floating nav, the page's <main id="main">, footer.
// Studio and /preview have their own layouts.
export default function SiteLayout({ children }) {
  return (
    <div className="page-shell">
      <Navbar />
      {children}
      <SiteFooter />
    </div>
  );
}
