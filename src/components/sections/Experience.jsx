import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTag from '../ui/SectionTag';
import { useData } from '../../context/DataContext';
import { fadeInUp } from '../../lib/animations';
import { FiChevronDown, FiExternalLink } from 'react-icons/fi';

const training = [
  { name: "Web Development", institute: "Programming Hero", from: "Dec 2025", to: "Present" },
  { name: "Competitive Programming", institute: "CPS Academy", from: "Jan 2025", to: "Jun 2025" },
  { name: "Networking — Telco", institute: "Fiber@Home", from: "Jan 2025", to: "Feb 2025" }
];

export default function Experience() {
  const { experience } = useData();
  const [openId, setOpenId] = useState(1);

  return (
    <section id="experience" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTag text="03 — EXPERIENCE" />

      <motion.h2
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="font-['Cormorant_Garamond'] font-semibold text-[clamp(36px,5vw,56px)] mb-16 text-[var(--text-base)]"
      >
        Where I've Built
      </motion.h2>

      {/* accordion timeline */}
      <div className="relative max-w-3xl">
        <div className="absolute left-3.5 top-0 bottom-0 w-[2px] bg-[var(--border)] pointer-events-none" />

        <div className="space-y-4">
          {experience.map((exp, i) => {
            const isOpen = openId === exp.id;
            return (
              <motion.div
                key={exp.id}
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} custom={i}
                className={`relative pl-12 transition-all duration-300`}
              >
                {/* connector dot */}
                <div className={`absolute left-0 top-6 w-7 h-7 flex items-center justify-center z-10`}>
                  <div className={`w-3.5 h-3.5 rounded-full border-2 transition-colors ${
                    exp.current
                      ? 'bg-[var(--accent)] border-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]'
                      : 'bg-[var(--bg-elevated)] border-[var(--border-bright)]'
                  }`} />
                </div>

                <button
                  onClick={() => setOpenId(isOpen ? null : exp.id)}
                  className={`w-full text-left bg-[var(--bg-elevated)] border rounded-lg p-5 transition-all duration-300 flex items-center justify-between gap-4 ${
                    isOpen
                      ? 'border-l-[3px] border-[var(--accent)] border-y-[var(--border)] border-r-[var(--border)]'
                      : 'border-[var(--border)] hover:border-[var(--border-bright)]'
                  }`}
                  data-cursor="hover"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-['Cormorant_Garamond'] font-semibold text-[20px] text-[var(--text-base)]">{exp.company}</span>
                      {exp.current && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-green-500/50 bg-green-500/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          <span className="font-['DM_Mono'] text-[10px] text-green-400">Current</span>
                        </span>
                      )}
                    </div>
                    <div className="font-['DM_Mono'] text-[13px] text-[var(--text-muted)] mt-1">
                      {exp.role} · {exp.from} – {exp.to}
                    </div>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <FiChevronDown className="text-[var(--accent)] text-lg flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="bg-[var(--bg-elevated)] border-x border-b border-[var(--border)] rounded-b-lg px-5 pb-5 pt-4 -mt-1">
                        <p className="font-['DM_Mono'] text-[13px] text-[var(--text-muted)] leading-[1.8] mb-5">
                          {exp.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {exp.tech.map(t => (
                            <span key={t} className="font-['DM_Mono'] text-[10px] px-2.5 py-1 rounded bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-muted)]">
                              {t}
                            </span>
                          ))}
                        </div>
                        {exp.companyUrl && (
                          <a href={exp.companyUrl} target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1.5 font-['DM_Mono'] text-[12px] text-[var(--accent)] hover:underline"
                            data-cursor="hover">
                            Visit Company <FiExternalLink />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Training cards */}
      <motion.div
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="mt-20"
      >
        <div className="font-['Bebas_Neue'] text-[14px] text-[var(--accent)] tracking-[0.3em] mb-6 uppercase">
          Training & Certifications
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {training.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-lg p-5 hover:border-[var(--border-bright)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-['Cormorant_Garamond'] font-semibold text-[18px] text-[var(--text-base)] mb-1">{t.name}</div>
              <div className="font-['DM_Mono'] text-[12px] text-[var(--accent)] mb-3">{t.institute}</div>
              <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)]">{t.from} → {t.to}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
