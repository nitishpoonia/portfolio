import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export const metadata = {
  title: "Nitish Poonia — React Native & Frontend Developer",
  description:
    "React Native and React developer with 1.5+ years shipping production mobile and web apps. Currently building on a healthcare records app. Open to full-time roles.",
  alternates: { canonical: "https://nitishpoonia.in" },
  openGraph: {
    title: "Nitish Poonia — React Native & Frontend Developer",
    description:
      "React Native and React developer with 1.5+ years shipping production mobile and web apps. Currently building on a healthcare records app. Open to full-time roles.",
    url: "https://nitishpoonia.in",
    type: "website",
    siteName: "Nitish Poonia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitish Poonia — React Native & Frontend Developer",
    description:
      "React Native and React developer with 1.5+ years shipping production mobile and web apps. Open to full-time roles.",
    creator: "@nitishpoonia",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
