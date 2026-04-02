import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParticleCanvas } from '../../hooks/useParticleCanvas';
import { useTypewriter } from '../../hooks/useTypewriter';
import { useData } from '../../context/DataContext';
import { staggerContainer, fadeInUp } from '../../lib/animations';
import { FiGithub, FiLinkedin, FiBookOpen } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';

const ROLES = [
  "AI Software Engineer Intern @ Privacce Labs",
  "Competitive Programmer — ICPC Regional 2025",
  "BSc CSE Graduate · CGPA 3.96 / 4.00",
  "React · Expo · Python · Deep Learning"
];

export default function Hero() {
  const canvasRef = useRef(null);
  useParticleCanvas(canvasRef, { count: 180, connectDistance: 130, mouseRepulse: 100 });

  const { displayText } = useTypewriter(ROLES, 55, 28, 2200);
  const { settings } = useData();

  const hexPathRef = useRef(null);
  useEffect(() => {
    if (hexPathRef.current) {
      hexPathRef.current.style.strokeDasharray = hexPathRef.current.getTotalLength();
      hexPathRef.current.style.strokeDashoffset = hexPathRef.current.getTotalLength();
      setTimeout(() => {
        if (hexPathRef.current) {
          hexPathRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out';
          hexPathRef.current.style.strokeDashoffset = 0;
        }
      }, 500);
    }
  }, []);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-[100svh] flex items-center overflow-hidden py-28 md:py-0">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 hidden md:block opacity-40 pointer-events-none" />

      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[var(--accent-glow)] rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-[55%_45%] gap-8 relative z-10 pt-8 md:pt-0">

        <motion.div
          className="flex flex-col justify-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 border border-[var(--border-bright)] rounded-full bg-[var(--bg-elevated)] backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-['DM_Mono'] text-[11px] font-medium text-[var(--text-base)]">
                {settings?.openToWork ? 'Open to Work · Available Now' : 'Not Currently Available'}
              </span>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-3">
            <h2 className="font-['Bebas_Neue'] text-[12px] tracking-[0.35em] text-[var(--accent)]">
              FRONTEND ENGINEER &nbsp;·&nbsp; AI RESEARCHER &nbsp;·&nbsp; PROBLEM SOLVER
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-4">
            <h1 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(52px,8vw,88px)] leading-[0.92] text-[var(--text-base)]">
              Md. Nur<br />A Alam<span className="text-[var(--accent)]">.</span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUp} className="h-6 mb-6">
            <p className="font-['DM_Mono'] text-[14px] text-[var(--accent)]">
              {displayText}
              <span className="animate-[pulse_1s_infinite]">|</span>
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-10 max-w-[420px]">
            <p className="font-['DM_Mono'] font-light text-[15px] leading-[1.75] text-[var(--text-muted)]">
              Building intelligent, elegant systems at the intersection of frontend craft and AI.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={scrollToProjects}
              className="bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[13px] px-7 py-3.5 rounded shadow-[0_0_20px_var(--accent-glow)] 
                         transition-transform duration-300 hover:scale-[1.03]"
              data-cursor="hover"
            >
              View My Work
            </button>
            <a
              href={settings?.cvUrl || '#'}
              target={settings?.cvUrl ? "_blank" : "_self"}
              className="border border-[var(--border-bright)] text-[var(--accent)] font-['DM_Mono'] text-[13px] px-7 py-3.5 rounded 
                         transition-colors duration-300 hover:bg-[var(--accent-glow)] hover:border-[var(--accent)]"
              data-cursor="hover"
            >
              Download CV
            </a>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-5 pt-2">
            {[
              { icon: <FiGithub />, url: "https://github.com/Md-Nur-A-Alam", label: "GitHub" },
              { icon: <FiLinkedin />, url: "https://www.linkedin.com/in/md-nur-a-alam13/", label: "LinkedIn" },
              { icon: <FaTrophy />, url: "https://codeforces.com/profile/Nur_Alam.2812", label: "Codeforces" },
              { icon: <FiBookOpen />, url: "https://scholar.google.com/citations?user=DYu7B_kAAAAJ", label: "Google Scholar" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="text-[20px] text-[var(--text-muted)] transition-all duration-250 hover:text-[var(--accent)] hover:-translate-y-0.5"
                aria-label={social.label}
                data-cursor="hover"
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        <div className="hidden md:flex relative items-center justify-center">
          <div className="relative w-[280px] h-[310px]">
            <svg className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_0_30px_var(--accent-glow)]" viewBox="0 0 100 115" preserveAspectRatio="none">
              <polygon
                ref={hexPathRef}
                points="50,2 93,27 93,88 50,113 7,88 7,27"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.8"
              />
            </svg>

            <div
              className="absolute inset-[4px] bg-[var(--bg-secondary)] pointer-events-none overflow-hidden"
              style={{ clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)' }}
            >
              <div className="w-full h-full flex items-center justify-center text-[var(--text-muted)] text-sm">
                <img src="./profile.jpg" alt="" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -right-12 bg-[var(--bg-elevated)] border border-[var(--border-bright)] backdrop-blur-[10px] rounded-lg px-3.5 py-2 flex items-center gap-2 animate-[subtleFloat_4s_ease-in-out_infinite]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
              <span className="font-['DM_Mono'] text-[11px] text-[var(--text-base)] whitespace-nowrap">CGPA 3.96 / 4.00</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              className="absolute -bottom-6 -left-8 bg-[var(--bg-elevated)] border border-[var(--border-bright)] backdrop-blur-[10px] rounded-lg px-3.5 py-2 flex items-center gap-2 animate-[subtleFloat_5s_ease-in-out_infinite_0.8s]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
              <span className="font-['DM_Mono'] text-[11px] text-[var(--text-base)] whitespace-nowrap">1500+ Problems Solved</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 }}
              className="absolute top-1/2 -ml-8 -left-16 bg-[var(--bg-elevated)] border border-[var(--border-bright)] backdrop-blur-[10px] rounded-lg px-3.5 py-2 flex items-center gap-2 animate-[subtleFloat_4.5s_ease-in-out_infinite_1.6s]"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
              <span className="font-['DM_Mono'] text-[11px] text-[var(--text-base)] whitespace-nowrap">IEEE Published</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-[1px] h-[56px] bg-[var(--border-bright)] overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[30%] bg-[var(--accent)] animate-[scrollDrop_1.5s_ease-in-out_infinite]"></div>
          </div>
          <span className="font-['Bebas_Neue'] text-[10px] tracking-[0.4em] text-[var(--text-muted)]">SCROLL</span>
        </motion.div>

      </div>
    </section>
  );
}
