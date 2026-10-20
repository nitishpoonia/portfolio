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
  ["/studio/settings", "Settings"],
];

export default async function StudioLayout({ children }) {
  const authed = await isAdmin();
  return (
    <div className="min-h-screen bg-[#F2F2F2] text-[#0A0A0A]" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      {authed && (
        <header className={`${glass} sticky top-3 z-10 mx-3 mt-3 flex flex-wrap items-center justify-between gap-2 !rounded-full px-3 py-1.5 md:mx-auto md:max-w-3xl`}>
          <nav aria-label="Studio" className="flex flex-wrap">
            {tabs.map(([href, name]) => (
              <Link key={href} href={href} className="inline-flex min-h-[44px] items-center rounded-full px-4 text-[14px] hover:bg-black/5">
                {name}
              </Link>
            ))}
          </nav>
          <div className="flex gap-2">
            <Link href="/" className="inline-flex min-h-[44px] items-center px-3 text-[14px] text-[#55555A]">
              View site
            </Link>
            <LogoutButton />
          </div>
        </header>
      )}
      <main className="mx-auto max-w-3xl px-3 py-8">{children}</main>
    </div>
  );
}
