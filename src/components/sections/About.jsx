import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import SectionTag from '../ui/SectionTag';
import { fadeInUp, staggerContainer, slideInLeft } from '../../lib/animations';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const stats = [
    { num: 1500, suffix: '+', label: 'Problems Solved' },
    { num: 3.96, decimals: 2, label: 'CGPA' },
    { num: 2, label: 'IEEE Papers' },
    { num: 70, suffix: '+', label: 'Contests' }
  ];

  const timeline = [
    { year: '2014', text: 'Started teaching math & competitive programming' },
    { year: '2017', text: 'SSC · GPA 4.82 | Satkhira Govt. High School' },
    { year: '2019', text: 'HSC · GPA 4.25 | Started freelancing (Fiverr)' },
    { year: '2021', text: 'Joined BAUST CSE — Bangladesh Army University' },
    { year: '2023', text: '1st Runner-up · National Math Olympiad, Rangpur Region' },
    { year: '2025 Jan', text: 'ICPC Regional Top 2.4% (Preliminary) | Top 43% (Regional)' },
    { year: '2025 Feb', text: 'Graduated · CGPA 3.96/4.00' },
    { year: '2025 Apr', text: 'IEEE Publication: CornNetLite' },
    { year: '2025 Present', text: 'AI Software Engineer Intern · Privacce Labs 🚀', highlight: true }
  ];

  const interests = ['AI', 'Machine Learning', 'Deep Learning', 'Image Processing', 'Bangla NLP', 'Lightweight CNN', 'Edge AI', 'Frontend Architecture'];

  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTag text="01 — ABOUT ME" />
      
      <motion.h2 
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="font-['Cormorant_Garamond'] font-semibold text-[clamp(36px,5vw,56px)] mb-16 text-[var(--text-base)]"
      >
        The Story Behind the Code
      </motion.h2>

      {/* STAT CARDS ROW */}
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="bg-[var(--bg-elevated)] border border-[var(--border)] p-6 rounded-lg transition-all hover:border-[var(--border-bright)] hover:-translate-y-1"
          >
            <div className="font-['Cormorant_Garamond'] font-semibold text-[44px] md:text-[52px] text-[var(--accent)] leading-none mb-2">
              {inView ? <CountUp end={stat.num} decimals={stat.decimals || 0} duration={2.5} /> : '0'}
              {stat.suffix}
            </div>
            <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] tracking-[0.1em] uppercase">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT — TIMELINE */}
        <div className="relative border-l-2 border-[var(--border-bright)] pl-8 space-y-8 py-4 ml-2 max-w-lg">
          {timeline.map((item, i) => (
            <motion.div 
              key={i}
              variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} custom={i}
              className="relative"
            >
              <div className={`absolute -left-[41px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[var(--bg-base)] shadow-sm ${item.highlight ? 'bg-amber-400 border-amber-400' : 'bg-[var(--accent)]'}`} />
              <div className="font-['DM_Mono'] text-[11px] text-[var(--accent)] mb-1 font-medium tracking-wide">{item.year}</div>
              <div className="font-['DM_Mono'] text-[13px] text-[var(--text-muted)] leading-relaxed">
                {item.text}
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT — BIO + CURRENT ROLE CARD */}
        <motion.div 
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="flex flex-col gap-10"
        >
          <motion.p variants={fadeInUp} className="font-['Cormorant_Garamond'] font-light text-[18px] leading-[1.85] text-[var(--text-base)]">
            I am a Computer Science graduate from BAUST — Bangladesh Army University of Science and Technology — 
            with a near-perfect CGPA of 3.96. My journey started not in a classroom but at a chalkboard at age 12, 
            teaching mathematics. Since then I have competed internationally in programming, published in IEEE, 
            built full-stack systems, and am now building AI-powered mobile applications at Privacce Labs.
          </motion.p>

          <motion.div variants={fadeInUp} className="bg-[var(--bg-elevated)] border-l-[3px] border-[var(--accent)] rounded-r-lg p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--accent-glow)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="font-['Bebas_Neue'] text-[12px] text-[var(--accent)] tracking-[0.3em] mb-3">CURRENTLY BUILDING</div>
              
              <a href="https://www.privaccelabs.com/" target="_blank" rel="noreferrer" 
                 className="inline-block font-['Cormorant_Garamond'] font-semibold text-[26px] text-[var(--text-base)] hover:text-[var(--accent)] transition-colors mb-2"
                 data-cursor="hover">
                Privacce Labs
              </a>
              <div className="font-['DM_Mono'] text-[14px] font-medium text-[var(--text-base)] mb-3">AI Software Engineer Intern</div>
              <div className="font-['DM_Mono'] text-[13px] text-[var(--text-muted)] mb-5">
                CueKeep — Caregiver-facing RAG mobile application
              </div>
              
              <div className="flex flex-wrap gap-2 mb-5">
                {['React Native', 'Expo SDK 54', 'Zustand', 'React Query', 'FastAPI', 'RAG'].map(tech => (
                   <span key={tech} className="bg-[var(--bg-secondary)] border border-[var(--border)] font-['DM_Mono'] text-[10px] px-2.5 py-1 rounded text-[var(--text-muted)]">
                     {tech}
                   </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                <span className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] uppercase tracking-wide">In Progress</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <div className="font-['Bebas_Neue'] text-[13px] text-[var(--accent)] tracking-widest mb-4">Research Interests</div>
            <div className="flex flex-wrap gap-2.5">
              {interests.map(interest => (
                <span key={interest} className="font-['DM_Mono'] text-[12px] border border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 rounded hover:border-[var(--border-bright)] transition-colors cursor-default text-[var(--text-base)]">
                  {interest}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
