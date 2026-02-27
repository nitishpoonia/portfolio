
import Hero        from '@/components/Hero';
import About       from '@/components/About';
import Skills      from '@/components/Skills';
import Projects    from '@/components/Projects';
import Experience  from '@/components/Experience';
import Testimonial from '@/components/Testimonial';
import Contact     from '@/components/Contact';
import Navbar from '@/components/NavBar';
import HireStrip from '@/components/HireStrip';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <HireStrip/>
        <Experience />
        <Testimonial />
        <Contact />
      </main>
    </>
  );
}
