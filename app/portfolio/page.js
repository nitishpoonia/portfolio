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
    "React Native and full-stack developer with 1+ year building production apps. Case studies, skills, and experience from Vision Vivante and independent projects.",
  alternates: {
    canonical: "https://nitishpoonia.in/portfolio",
  },
  openGraph: {
    title: "Portfolio — Nitish Poonia",
    description:
      "React Native and full-stack developer. Case studies, skills, and experience.",
    url: "https://nitishpoonia.in/portfolio",
    type: "website",
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
