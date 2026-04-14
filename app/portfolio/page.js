import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonial from "@/components/Testimonial";
import Contact from "@/components/Contact";
import Navbar from "@/components/NavBar";
import HireStrip from "@/components/HireStrip";

export const metadata = {
  title: "Portfolio — Nitish Poonia | React Native & Full-Stack Developer",
  description:
    "Case studies, projects, and experience from Nitish Poonia — a React Native and full-stack developer who has shipped production apps across attendance, hospitality, and social platforms.",
  alternates: {
    canonical: "https://nitishpoonia.in/portfolio",
  },
  openGraph: {
    title: "Portfolio — Nitish Poonia | React Native & Full-Stack Developer",
    description:
      "Case studies, projects, and experience from Nitish Poonia — a React Native and full-stack developer who has shipped production apps across attendance, hospitality, and social platforms.",
    url: "https://nitishpoonia.in/portfolio",
    type: "website",
    siteName: "Nitish Poonia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio — Nitish Poonia | React Native & Full-Stack Developer",
    description:
      "Case studies, projects, and experience from Nitish Poonia — a React Native and full-stack developer who has shipped production apps across attendance, hospitality, and social platforms.",
    creator: "@nitishpoonia",
  },
};

export default function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <HireStrip />
        <Experience />
        <Testimonial />
        <Contact />
      </main>
    </>
  );
}
