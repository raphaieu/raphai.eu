import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Skills from '@/components/home/Skills';
import ProjectsShowcase from '@/components/home/ProjectsShowcase';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ProjectsShowcase />
      <Skills />
      <Contact />
    </>
  );
}
