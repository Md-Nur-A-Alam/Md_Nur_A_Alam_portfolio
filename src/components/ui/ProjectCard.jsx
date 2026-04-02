import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectCard({ project, featured = false }) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl p-6 overflow-hidden
        transition-all duration-300 group ${hovered ? 'border-[var(--border-bright)]' : ''}`}
      style={{
        background: hovered
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, var(--accent-glow), var(--bg-elevated) 60%)`
          : 'var(--bg-elevated)'
      }}
      data-cursor="view"
    >
      {/* Background number */}
      <div className="absolute top-2 right-4 font-['Cormorant_Garamond'] text-[80px] leading-none text-[var(--text-base)] opacity-[0.04] select-none pointer-events-none font-bold">
        {String(project.order || 1).padStart(2, '0')}
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="font-['Bebas_Neue'] text-[11px] tracking-[0.3em] text-[var(--accent)] uppercase mt-1">
            {project.category}
          </span>
          {project.badge && (
            <span className="font-['DM_Mono'] text-[10px] border border-[var(--accent)] text-[var(--accent)] px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
              {project.badge}
            </span>
          )}
          {!project.badge && project.status === 'published' && (
            <span className="font-['DM_Mono'] text-[10px] border border-[var(--accent)] text-[var(--accent)] px-2.5 py-1 rounded-full">
              PUBLISHED
            </span>
          )}
        </div>

        {/* Status if featured with live */}
        {featured && project.current && (
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-['DM_Mono'] text-[11px] text-green-400">Live · In Progress</span>
          </div>
        )}

        {/* Title */}
        <h3 className="font-['Cormorant_Garamond'] font-semibold text-[22px] text-[var(--text-base)] mb-3 group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className={`font-['DM_Mono'] text-[13px] text-[var(--text-muted)] leading-[1.7] mb-5 flex-1 ${!featured ? 'line-clamp-3' : ''}`}>
          {project.description}
        </p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map(t => (
            <span key={t} className="font-['DM_Mono'] text-[10px] bg-[var(--bg-secondary)] border border-[var(--border)] text-[var(--text-muted)] px-2 py-0.5 rounded">
              {t}
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
          className="flex gap-3"
        >
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 font-['DM_Mono'] text-[12px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              data-cursor="hover">
              <FiGithub /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 font-['DM_Mono'] text-[12px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              data-cursor="hover">
              <FiExternalLink /> Live
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
