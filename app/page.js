import Navbar      from '@/components/Navbar';
import Hero        from '@/components/Hero';
import About       from '@/components/About';
import Skills      from '@/components/Skills';
import Projects    from '@/components/Projects';
import Experience  from '@/components/Experience';
import Testimonial from '@/components/Testimonial';
import Contact     from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonial />
        <Contact />
      </main>
    </>
  );
}
