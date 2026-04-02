import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';
import { fadeInUp } from '../../lib/animations';
import { FiMonitor, FiHash, FiUsers, FiGlobe } from 'react-icons/fi';

const leadership = [
  { role: "President", org: "BAUST Computer Club", period: "Feb 2025 – Dec 2025", icon: <FiMonitor />, desc: "Guided 200+ members, organized coding contests, mentored juniors in DSA." },
  { role: "President", org: "BAUST Mathematics Club", period: "2025 – Present", icon: <FiHash />, desc: "Driving mathematics culture and olympiad preparation across campus." },
  { role: "President", org: "CSE Society, BAUST", period: "2024 – 2025", icon: <FiUsers />, desc: "Led departmental events, workshops, and inter-university programming competitions." },
  { role: "Campus Coordinator", org: "YUNet — Youth Upskill Network", period: "2025 – Present", icon: <FiGlobe />, desc: "Official student-led representative; boosted skill development engagement." },
];

export default function Leadership() {
  return (
    <section id="leadership" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTag text="07 — LEADERSHIP" />

      <motion.h2
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="font-['Cormorant_Garamond'] font-semibold text-[clamp(36px,5vw,56px)] mb-16 text-[var(--text-base)]"
      >
        Roles &amp; Impact
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {leadership.map((item, i) => (
          <motion.div
            key={i}
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
            className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-7 hover:border-[var(--border-bright)] hover:-translate-y-2 transition-all duration-300 group flex flex-col gap-4"
          >
            <div className="text-3xl text-[var(--accent)] group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <div>
              <div className="font-['Bebas_Neue'] text-[16px] text-[var(--accent)] tracking-wider mb-0.5">{item.role}</div>
              <div className="font-['DM_Mono'] text-[14px] text-[var(--text-base)] font-medium mb-1">{item.org}</div>
              <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-3">{item.period}</div>
              <p className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] leading-[1.7]">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="inline-flex items-center gap-4 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-6 py-4 hover:border-[var(--border-bright)] transition-all duration-300"
      >
        <div className="text-2xl">🎖️</div>
        <div>
          <div className="font-['DM_Mono'] text-[13px] text-[var(--text-base)] font-medium">Bangladesh National Cadet Corps (BNCC)</div>
          <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mt-0.5">Army Wing · Sundarban Regiment · 2 Camps</div>
        </div>
      </motion.div>
    </section>
  );
}
