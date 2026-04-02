import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { FiGithub, FiLinkedin, FiBookOpen } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';

const NAV_LINKS = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Research', 'Competitive', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Simple intersection polling
      const sections = NAV_LINKS.map(link => ({ id: link, el: document.getElementById(link.toLowerCase()) }));
      for (let i = sections.length - 1; i >= 0; i--) {
        const { id, el } = sections[i];
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section) => {
    setMobileMenuOpen(false);
    setActiveSection(section);
    
    if (section === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(section.toLowerCase());
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-[var(--glass)] border-b border-[var(--border)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div 
          className="flex flex-col cursor-pointer"
          onClick={() => scrollToSection('Home')}
          data-cursor="hover"
        >
          <span className="font-['Cormorant_Garamond'] italic text-[26px] text-[var(--accent)] leading-none">
            N.A
          </span>
          <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase mt-1">
            Portfolio
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link;
            return (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className={`group relative font-['DM_Mono'] text-[12px] tracking-[0.15em] uppercase transition-colors ${
                  isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)] hover:text-[var(--accent)]'
                }`}
                data-cursor="hover"
              >
                {link}
                <span 
                  className={`absolute -bottom-1 left-0 h-[1px] bg-[var(--accent)] transition-all duration-300 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-50 group-hover:w-full'
                  }`} 
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToSection('Contact'); }}
            className="hidden md:inline-block px-5 py-2 border border-[var(--border-bright)] text-[var(--accent)] 
                       font-['DM_Mono'] text-[12px] tracking-wider rounded transition-all duration-300 
                       hover:bg-[var(--accent)] hover:text-[var(--bg-base)]"
            data-cursor="hover"
          >
            HIRE ME
          </a>
          
          <button 
            className="md:hidden relative z-[60] w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.span 
              animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-[var(--text-base)] block transition-transform" 
            />
            <motion.span 
              animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[2px] bg-[var(--text-base)] block transition-opacity" 
            />
            <motion.span 
              animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-[var(--text-base)] block transition-transform" 
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[var(--bg-base)]/98 flex flex-col justify-center px-8"
          >
            <div className="absolute top-6 right-16">
              <ThemeSwitcher />
            </div>
            
            <div className="flex flex-col gap-6 mt-12">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className={`text-left font-['Cormorant_Garamond'] text-4xl ${
                    activeSection === link ? 'text-[var(--accent)]' : 'text-[var(--text-base)]'
                  }`}
                >
                  {link}
                </motion.button>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="absolute bottom-12 left-8 flex gap-6"
            >
              <a href="https://github.com/Md-Nur-A-Alam" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] text-2xl"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/md-nur-a-alam13/" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] text-2xl"><FiLinkedin /></a>
              <a href="https://codeforces.com/profile/Nur_Alam.2812" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] text-2xl"><FaTrophy /></a>
              <a href="https://scholar.google.com/citations?user=DYu7B_kAAAAJ" target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] text-2xl"><FiBookOpen /></a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
