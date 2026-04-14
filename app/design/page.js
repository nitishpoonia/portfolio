import Link from "next/link";
import Navbar from "@/components/NavBar";
import DesignGallery from "@/components/DesignGallery";

export const metadata = {
  title: "UI/UX Design Work — Nitish Poonia | Figma & AI-Assisted Design",
  description:
    "Screen designs and UI direction for mobile and web products by Nitish Poonia. Figma-based, AI-assisted for speed, human-directed for quality. Every project starts with design.",
  alternates: {
    canonical: "https://nitishpoonia.in/design",
  },
  openGraph: {
    title: "UI/UX Design Work — Nitish Poonia | Figma & AI-Assisted Design",
    description:
      "Screen designs and UI direction for mobile and web products by Nitish Poonia. Figma-based, AI-assisted for speed, human-directed for quality. Every project starts with design.",
    url: "https://nitishpoonia.in/design",
    type: "website",
    siteName: "Nitish Poonia",
  },
  twitter: {
    card: "summary_large_image",
    title: "UI/UX Design Work — Nitish Poonia | Figma & AI-Assisted Design",
    description:
      "Screen designs and UI direction for mobile and web products by Nitish Poonia. Figma-based, AI-assisted for speed, human-directed for quality. Every project starts with design.",
    creator: "@nitishpoonia",
  },
};

// Update this array when you add new mockup images.
// Place images in /public/assets/design/[project-slug]/
// Recommended: export at 390x844px (iPhone) or 1280x800 (web), PNG format.
const projects = [
  {
    slug: "study-center-management.mdx",
    title: "Library SaaS",
    description:
      "Mobile app for self-study center owners. Dashboard, membership management, payment tracking.",
    tags: ["React Native", "Figma", "Stitch AI"],
    caseStudyHref: "/projects/study-center-management",
    screens: [
      {
        src: "/assets/design/library-saas/dashboard.png",
        alt: "Dashboard screen",
      },
      { src: "/assets/design/library-saas/members.png", alt: "Members screen" },
      {
        src: "/assets/design/library-saas/payments.png",
        alt: "Payments screen",
      },
    ],
  },
];

export default function DesignPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: "1rem",
            }}
          >
            UI / UX
          </p>

          <h1
            style={{
              fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "var(--ink)",
              marginBottom: "1.5rem",
            }}
          >
            Design Work
          </h1>

          <p
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              color: "var(--mid)",
              lineHeight: 1.7,
              maxWidth: "52ch",
              marginBottom: "1rem",
            }}
          >
            Every project starts with design. I use Figma and AI design tools to
            produce screen direction fast — so clients see exactly what we are
            building before a line of code is written.
          </p>

          <p
            style={{
              fontSize: "0.78rem",
              color: "var(--mid)",
              lineHeight: 1.7,
              maxWidth: "52ch",
              fontStyle: "italic",
            }}
          >
            Screens below are design direction — AI-assisted, human-directed,
            and refined in Figma. Not screenshots of production apps.
          </p>
        </div>

        {/* Projects */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(4rem, 8vw, 7rem)",
          }}
        >
          <DesignGallery projects={projects} />
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: "clamp(4rem, 8vw, 7rem)",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--mid)",
                marginBottom: "0.5rem",
              }}
            >
              Want this for your product?
            </p>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.3rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              I design before I build. Always.
            </p>
          </div>
          <Link
            href="/"
            style={{
              padding: "0.85rem 2rem",
              background: "var(--ink)",
              color: "var(--bg)",
              fontSize: "0.68rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Work with me →
          </Link>
        </div>
      </main>
    </>
  );
}
