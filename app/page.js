import Navbar from "@/components/NavBar";
import DepthRail from "@/components/DepthRail";
import Hero from "@/components/Hero";
import Stratum from "@/components/Stratum";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Nitish Poonia — Software Developer",
  description:
    "Software developer building mobile and web products end to end — React Native and Next.js on the front, Node and PostgreSQL behind. Open to full-time roles.",
  alternates: { canonical: "https://nitishpoonia.in" },
  openGraph: {
    title: "Nitish Poonia — Software Developer",
    description:
      "Software developer building mobile and web products end to end — React Native and Next.js on the front, Node and PostgreSQL behind. Open to full-time roles.",
    url: "https://nitishpoonia.in",
    type: "website",
    siteName: "Nitish Poonia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Poonia — Software Developer",
    description:
      "Software developer — React Native, Next.js, Node and PostgreSQL. Open to full-time roles.",
    creator: "@nitishpoonia",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <DepthRail />
      <main>
        {/* Surface — the hero paints its own band-0 */}
        <Hero />

        {/* Descend through the profile, darkening band by band */}
        <Stratum depth={1} id="experience">
          <Experience />
        </Stratum>

        <Stratum depth={2} id="projects">
          <Projects />
        </Stratum>

        <Stratum depth={3} id="skills">
          <Skills />
        </Stratum>

        <Stratum depth={4} id="about">
          <About />
        </Stratum>

        <Stratum depth={5} id="contact">
          <Contact />
        </Stratum>
      </main>
    </>
  );
}
