import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import LogoutButton from "@/components/studio/LogoutButton";
import { glass } from "@/components/studio/ui";

export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const tabs = [
  ["/studio", "Overview"],
  ["/studio/posts", "Posts"],
  ["/studio/projects", "Projects"],
  ["/studio/content", "Content"],
  ["/studio/settings", "Settings"],
];

export default async function StudioLayout({ children }) {
  const authed = await isAdmin();
  return (
    <div className="studio-root min-h-screen bg-[#F2F2F2] text-[#0A0A0A]" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      {authed && (
        <header className={`${glass} sticky top-3 z-10 mx-3 mt-3 flex items-center justify-between gap-1 !rounded-full px-2 py-1.5 md:mx-auto md:max-w-3xl md:px-3`}>
          <nav aria-label="Studio" className="-mx-1 flex min-w-0 overflow-x-auto px-1 [scrollbar-width:none]">
            {tabs.map(([href, name]) => (
              <Link key={href} href={href} className="inline-flex min-h-[44px] shrink-0 items-center rounded-full px-3 text-[14px] hover:bg-black/5 md:px-4">
                {name}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 gap-1">
            <Link href="/" className="hidden min-h-[44px] items-center px-3 text-[14px] text-[#55555A] sm:inline-flex">
              View site
            </Link>
            <LogoutButton />
          </div>
        </header>
      )}
      <main id="main" className="mx-auto max-w-3xl px-3 py-8">{children}</main>
    </div>
  );
}
