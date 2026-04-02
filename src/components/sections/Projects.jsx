import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTag from '../ui/SectionTag';
import ProjectCard from '../ui/ProjectCard';
import { useData } from '../../context/DataContext';
import { fadeInUp } from '../../lib/animations';

const FILTERS = ['All', 'React Native', 'Full Stack', 'AI/ML', 'Frontend', 'AI/Systems'];

export default function Projects() {
  const { projects } = useData();
  const [activeFilter, setActiveFilter] = useState('All');

  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  const filtered = activeFilter === 'All'
    ? rest
    : rest.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTag text="04 — PROJECTS" />

      <motion.h2
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="font-['Cormorant_Garamond'] font-semibold text-[clamp(36px,5vw,56px)] mb-10 text-[var(--text-base)]"
      >
        Things I've Built
      </motion.h2>

      {/* Filter tabs */}
      <motion.div
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="flex flex-wrap gap-2 mb-10"
      >
        {FILTERS.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`font-['DM_Mono'] text-[12px] px-4 py-2 rounded transition-all duration-300 ${
              activeFilter === filter
                ? 'bg-[var(--accent)] text-[var(--bg-base)] font-bold shadow-[0_0_15px_var(--accent-glow)]'
                : 'bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--border-bright)] hover:text-[var(--accent)]'
            }`}
            data-cursor="hover"
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* Featured card */}
      {featured && (activeFilter === 'All' || featured.category === activeFilter) && (
        <motion.div
          variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mb-8"
        >
          <ProjectCard project={featured} featured />
        </motion.div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
