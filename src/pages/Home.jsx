import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import Research from '../components/sections/Research';
import Competitive from '../components/sections/Competitive';
import Leadership from '../components/sections/Leadership';
import Contact from '../components/sections/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Md. Nur A Alam — Frontend Engineer &amp; AI Researcher</title>
        <meta name="description" content="Portfolio of Md. Nur A Alam — Frontend Engineer, AI Researcher, IEEE-published author, ICPC competitor. AI Software Engineer Intern at Privacce Labs." />
        <meta property="og:title" content="Md. Nur A Alam" />
        <meta property="og:description" content="Frontend Engineer · AI Researcher · CGPA 3.96 · IEEE Published · ICPC Competitor" />
        <meta name="keywords" content="Nur Alam, Frontend Developer Bangladesh, React Developer, AI Researcher, BAUST CSE, Privacce Labs, ICPC" />
        <link rel="canonical" href="https://nuralam.dev" />
      </Helmet>
      <main style={{ background: 'var(--bg-base)', color: 'var(--text-base)' }}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Research />
        <Competitive />
        <Leadership />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
