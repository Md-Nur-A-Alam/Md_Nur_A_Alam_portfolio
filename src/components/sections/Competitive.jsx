import { motion } from 'framer-motion';
import CountUpPkg from 'react-countup';
const CountUp = CountUpPkg.default || CountUpPkg;
import { useInView } from 'react-intersection-observer';
import SectionTag from '../ui/SectionTag';
import { fadeInUp } from '../../lib/animations';
import { FiExternalLink } from 'react-icons/fi';

const achievements = [
  { contest: "ICPC Preliminary 2025",        rank: "41",   total: 1700, pct: "Top 2.4%", team: "BAUSTian Inventors", highlight: true },
  { contest: "ICPC Dhaka Regional 2025",      rank: "135",  total: 313,  pct: "Top 43%",  team: "BAUSTian Inventors", highlight: true },
  { contest: "Math Olympiad 2023 (Rangpur)",  rank: "2nd",  total: null, pct: "1st Runner-up", note: "National Level" },
  { contest: "Math Olympiad 2024 (Rangpur)",  rank: "3rd",  total: null, pct: "2nd Runner-up", note: "National Level" },
  { contest: "DUET IUPC 2025",               rank: "90",   total: 130,  pct: "Top 67%",  team: "BAUSTian Inventors" },
  { contest: "Intra University Champion",     rank: "3×",   total: null, pct: "Champion", note: "BAUST — Three Times" },
];

const platforms = [
  { name: "Codeforces", username: "Nur_Alam.2812",  stat: "Rating: 1089", url: "https://codeforces.com/profile/Nur_Alam.2812" },
  { name: "Beecrowd",   username: "Md.NurAAlam",    stat: "Top 1% · 900K+ users · 1023 solved", url: "https://judge.beecrowd.com/en/profile/630077" },
  { name: "HackerRank", username: "md_nuralam2812",  stat: "Problem Solver", url: "https://www.hackerrank.com/profile/md_nuralam2812" },
];

export default function Competitive() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const heroStats = [
    { end: 1500, suffix: '+', label: 'Problems Solved' },
    { end: 70,   suffix: '+', label: 'Contests' },
    { end: 1089, suffix: '',  label: 'CF Rating' },
    { end: 1,    suffix: '%', label: 'Beecrowd Top', prefix: 'Top ' },
  ];

  return (
    <section id="competitive" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTag text="06 — COMPETITIVE PROGRAMMING" />

      <motion.h2
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="font-['Cormorant_Garamond'] font-semibold text-[clamp(36px,5vw,56px)] mb-16 text-[var(--text-base)]"
      >
        In The Arena
      </motion.h2>

      {/* Hero stats bar */}
      <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 mb-16 border border-[var(--border)] rounded-xl overflow-hidden">
        {heroStats.map((stat, i) => (
          <div key={i} className={`p-8 text-center ${i < heroStats.length - 1 ? 'border-r border-[var(--border)]' : ''} bg-[var(--bg-elevated)]`}>
            <div className="font-['Cormorant_Garamond'] font-semibold text-[56px] text-[var(--accent)] leading-none mb-2">
              {stat.prefix || ''}
              {inView ? <CountUp end={stat.end} duration={2.5} /> : 0}
              {stat.suffix}
            </div>
            <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] uppercase tracking-[0.15em]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Achievements grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {achievements.map((ach, i) => (
          <motion.div
            key={i}
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
            className={`bg-[var(--bg-elevated)] border rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 ${
              ach.highlight
                ? 'border-l-[3px] border-l-[var(--accent)] border-[var(--border-bright)]'
                : 'border-[var(--border)] hover:border-[var(--border-bright)]'
            }`}
          >
            <div className="font-['DM_Mono'] text-[13px] text-[var(--text-base)] mb-3">{ach.contest}</div>
            <div className="font-['Cormorant_Garamond'] font-semibold text-[48px] text-[var(--accent)] leading-none mb-2">
              {ach.rank}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-['Bebas_Neue'] text-[12px] border border-[var(--accent)] text-[var(--accent)] px-2.5 py-0.5 rounded-full tracking-wider">
                {ach.pct}
              </span>
              {ach.team && (
                <span className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)]">{ach.team}</span>
              )}
              {ach.note && (
                <span className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)]">{ach.note}</span>
              )}
              {ach.total && (
                <span className="font-['DM_Mono'] text-[11px] text-[var(--text-faint)]">of {ach.total}</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Platform cards */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="font-['Bebas_Neue'] text-[14px] text-[var(--accent)] tracking-[0.3em] mb-6">CODING PROFILES</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {platforms.map((pl, i) => (
            <motion.a
              key={i} href={pl.url} target="_blank" rel="noreferrer"
              variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className="bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-xl hover:border-[var(--border-bright)] hover:-translate-y-1 transition-all duration-300 group flex items-center gap-5"
              data-cursor="hover"
            >
              <div className="flex-1">
                <div className="font-['Cormorant_Garamond'] font-semibold text-[20px] text-[var(--text-base)] group-hover:text-[var(--accent)] transition-colors mb-1">{pl.name}</div>
                <div className="font-['DM_Mono'] text-[11px] text-[var(--accent)] mb-2">@{pl.username}</div>
                <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)]">{pl.stat}</div>
              </div>
              <FiExternalLink className="text-[var(--text-faint)] group-hover:text-[var(--accent)] transition-colors text-xl flex-shrink-0" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
