import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTag from '../ui/SectionTag';
import { useData } from '../../context/DataContext';
import { FiMonitor, FiCode, FiBrain, FiTool } from 'react-icons/fi';
import { fadeInUp } from '../../lib/animations';

const iconMap = {
  FiMonitor: <FiMonitor />,
  FiCode: <FiCode />,
  FiBrain: <FiBrain />,
  FiTool: <FiTool />
};

export default function Skills() {
  const { skills } = useData(); 
  const [activeFilter, setActiveFilter] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = ['All', 'Frontend', 'Languages', 'AI/ML', 'Tools'];

  const filteredData = activeFilter === 'All' 
    ? skills 
    : skills.filter(cat => cat.category === activeFilter);

  const row1 = ['React', 'TypeScript', 'Python', 'Deep Learning', 'Firebase', 'MySQL', 'Tailwind', 'Git', 'Expo'];
  const row2 = ['Framer Motion', 'NLP', 'CNN', 'ICPC', 'RAG', 'FastAPI', 'Zustand', 'React Query', 'C++'];

  // Create doubled arrays for seamless infinite scroll
  const items1 = [...row1, ...row1, ...row1];
  const items2 = [...row2, ...row2, ...row2];

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-6 overflow-hidden">
      <SectionTag text="02 — SKILLS" />
      
      <motion.h2 
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="font-['Cormorant_Garamond'] font-semibold text-[clamp(36px,5vw,56px)] mb-12 text-[var(--text-base)]"
      >
        The Architect's Toolkit
      </motion.h2>

      <motion.div 
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="flex flex-wrap gap-2 mb-12"
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`font-['DM_Mono'] text-[12px] px-5 py-2.5 rounded transition-all duration-300 ${
              activeFilter === cat 
              ? 'bg-[var(--accent)] text-[var(--bg-base)] font-bold shadow-[0_0_15px_var(--accent-glow)]' 
              : 'bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-bright)] hover:text-[var(--accent)]'
            }`}
            data-cursor="hover"
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 min-h-[400px]">
        <AnimatePresence mode='popLayout'>
          {filteredData.map((category) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              key={category.category}
              className="bg-[var(--bg-elevated)] border border-[var(--border)] rounded-[8px] p-8 hover:border-[var(--border-bright)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[var(--accent)] text-2xl">{iconMap[category.icon]}</span>
                <h3 className="font-['DM_Mono'] text-[14px] font-bold uppercase tracking-widest text-[var(--accent)]">
                  {category.category}
                </h3>
              </div>

              <div className="space-y-6">
                {category.skills.map(skill => (
                  <div key={skill.name} className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <span className="font-['DM_Mono'] text-[13px] text-[var(--text-base)] flex-1">{skill.name}</span>
                      <span className="font-['DM_Mono'] text-[11px] font-semibold text-[var(--accent)]">{skill.proficiency}%</span>
                    </div>
                    <div className="h-[3px] bg-[var(--bg-secondary)] w-full rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                        className="h-full bg-[var(--accent)] rounded-full relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 bottom-0 top w-4 bg-white/30 blur-sm mix-blend-overlay"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <motion.div 
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="w-full relative overflow-hidden max-w-full"
        style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        <div className="flex w-max animate-[marquee_20s_linear_infinite] mb-5 gap-5 pr-5">
          {items1.map((tech, i) => (
             <span key={`r1-${i}`} className="font-['DM_Mono'] text-[12px] border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-2.5 rounded-md whitespace-nowrap text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-default">
               {tech}
             </span>
          ))}
        </div>
        <div className="flex w-max animate-[marqueeReverse_20s_linear_infinite] gap-5 pr-5">
          {items2.map((tech, i) => (
             <span key={`r2-${i}`} className="font-['DM_Mono'] text-[12px] border border-[var(--border)] bg-[var(--bg-elevated)] px-5 py-2.5 rounded-md whitespace-nowrap text-[var(--text-muted)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-default">
               {tech}
             </span>
          ))}
        </div>
      </motion.div>

    </section>
  );
}
