import { isAdmin } from "@/lib/auth";
import StudioShell from "@/components/studio/StudioShell";

export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function StudioLayout({ children }) {
  const authed = await isAdmin();
  return (
    <div className="studio-root min-h-screen bg-[#F2F2F2] text-[#0A0A0A]" style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <StudioShell authed={authed}>{children}</StudioShell>
    </div>
  );
}
