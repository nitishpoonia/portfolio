import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import { Laptop, Terminal, Code2, NotebookPen } from "lucide-react";

export const metadata = {
  title: "Uses",
  description:
    "The editor, terminal, hardware and tools Nitish Poonia uses day to day for React Native and Next.js development.",
  alternates: { canonical: "https://nitishpoonia.in/uses" },
  openGraph: {
    title: "Uses | Nitish Poonia",
    description: "The editor, terminal, hardware and tools Nitish Poonia uses day to day.",
    url: "https://nitishpoonia.in/uses",
    type: "website",
    siteName: "Nitish Poonia",
    images: ["/opengraph-image"],
  },
};

const SECTIONS = [
  {
    label: "Editor & Terminal",
    icon: Terminal,
    items: [
      { name: "VS Code", note: "primary editor" },
      { name: "iTerm2", note: "terminal" },
      { name: "zsh", note: "shell" },
    ],
  },
  {
    label: "Hardware",
    icon: Laptop,
    items: [
      { name: "MacBook Air, M2", note: "daily driver" },
      { name: "Acer monitor", note: "external display" },
      { name: "Logitech keyboard & mouse", note: "desk setup" },
    ],
  },
  {
    label: "Dev Stack & Tools",
    icon: Code2,
    items: [
      { name: "React Native · Next.js", note: "frontend" },
      { name: "Node · PostgreSQL", note: "backend" },
      { name: "Postman", note: "API testing" },
      { name: "pgAdmin", note: "database browsing" },
    ],
  },
  {
    label: "Productivity",
    icon: NotebookPen,
    items: [
      { name: "Notion", note: "notes" },
      { name: "Todoist", note: "tasks" },
      { name: "Chrome", note: "browser" },
    ],
  },
];

export default function UsesPage() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main page-narrow">
        <PageHeader icon={Laptop} eyebrow="Uses" title="What I use" lede="The editor, hardware and tools behind the projects on this site." />
        {SECTIONS.map(({ label, icon: Icon, items }) => (
          <section key={label} className="section-block" aria-label={label}>
            <h2 className="h3 h-icon"><span className="icon-tile icon-tile-sm" aria-hidden="true"><Icon size={16} strokeWidth={1.8} /></span>{label}</h2>
            <div className="glass stat-list">
              {items.map(({ name, note }) => (
                <div key={name} className="stat-row">
                  <span className="stat-value">{name}</span>
                  <span className="mono">{note}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
