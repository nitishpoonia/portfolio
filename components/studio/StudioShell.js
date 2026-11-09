"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./LogoutButton";
import { glass } from "./ui";

const tabs = [
  ["/studio", "Overview"],
  ["/studio/posts", "Posts"],
  ["/studio/projects", "Projects"],
  ["/studio/settings", "Settings"],
];

// Header + page width. Editor pages get a wide two-column layout; everything
// else stays a comfortable reading width.
export default function StudioShell({ authed, children }) {
  const path = usePathname();
  const wide = /^\/studio\/(posts|projects)\/[^/]+$/.test(path);
  const width = wide ? "md:max-w-6xl" : "md:max-w-3xl";
  const active = (href) => (href === "/studio" ? path === href : path.startsWith(href));

  return (
    <>
      {authed && (
        <header className={`${glass} sticky top-3 z-20 mx-3 mt-3 flex items-center justify-between gap-1 !rounded-full px-2 py-1.5 md:mx-auto md:px-3 ${width}`}>
          <nav aria-label="Studio" className="-mx-1 flex min-w-0 overflow-x-auto px-1 [scrollbar-width:none]">
            {tabs.map(([href, name]) => (
              <Link key={href} href={href} aria-current={active(href) ? "page" : undefined}
                className={`inline-flex min-h-[44px] shrink-0 items-center rounded-full px-2.5 text-[14px] transition-colors sm:px-3 md:px-4 ${active(href) ? "bg-[#0A0A0A] font-medium text-white" : "hover:bg-black/5"}`}>
                {name}
              </Link>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-1">
            <Link href="/" target="_blank" className="hidden min-h-[44px] items-center rounded-full px-3 text-[14px] text-[#55555A] hover:bg-black/5 hover:text-[#0A0A0A] sm:inline-flex">
              View site
            </Link>
            <LogoutButton />
          </div>
        </header>
      )}
      <main className={`mx-auto px-3 pb-10 pt-6 md:pt-8 ${width}`}>{children}</main>
    </>
  );
}
