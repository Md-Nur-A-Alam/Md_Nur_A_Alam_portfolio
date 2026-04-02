import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiBookOpen } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';
import { fadeInUp } from '../lib/animations';

const quickLinks = [
  { label: 'Home', id: 'hero' },
  { label: 'Projects', id: 'projects' },
  { label: 'Research', id: 'research' },
  { label: 'Contact', id: 'contact' },
];

const socials = [
  { icon: <FiGithub />, url: 'https://github.com/Md-Nur-A-Alam', label: 'GitHub' },
  { icon: <FiLinkedin />, url: 'https://www.linkedin.com/in/md-nur-a-alam13/', label: 'LinkedIn' },
  { icon: <FaTrophy />, url: 'https://codeforces.com/profile/Nur_Alam.2812', label: 'Codeforces' },
  { icon: <FiBookOpen />, url: 'https://scholar.google.com/citations?user=DYu7B_kAAAAJ', label: 'Scholar' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (id === 'hero') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10"
        >
          {/* Left */}
          <div>
            <div className="font-['Cormorant_Garamond'] italic text-[28px] text-[var(--accent)] mb-2">N·A</div>
            <p className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] leading-relaxed max-w-[200px]">
              Building the future, one component at a time.
            </p>
          </div>

          {/* Center */}
          <div>
            <div className="font-['Bebas_Neue'] text-[13px] text-[var(--accent)] tracking-[0.3em] mb-5">Quick Links</div>
            <div className="flex flex-col gap-3">
              {quickLinks.map(link => (
                <button key={link.label} onClick={() => scrollTo(link.id)}
                  className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] hover:text-[var(--accent)] text-left transition-colors w-fit"
                  data-cursor="hover">
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="font-['Bebas_Neue'] text-[13px] text-[var(--accent)] tracking-[0.3em] mb-5">Connect</div>
            <div className="flex gap-4">
              {socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} data-cursor="hover"
                  className="text-[var(--text-muted)] hover:text-[var(--accent)] hover:-translate-y-1 transition-all duration-250 text-xl">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="border-t border-[var(--border)] pt-6 text-center">
          <p className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)]">
            © 2025 Md. Nur A Alam · Built with React &amp; Firebase · Deployed on Vercel
          </p>
          <p className="font-['DM_Mono'] text-[11px] text-[var(--text-faint)] mt-1">🇧🇩 Made in Bangladesh</p>
        </div>
      </div>
    </footer>
  );
}
