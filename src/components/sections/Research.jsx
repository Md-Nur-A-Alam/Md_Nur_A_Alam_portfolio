import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';
import { useData } from '../../context/DataContext';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { FiExternalLink } from 'react-icons/fi';

const researchProfiles = [
  { platform: 'Google Scholar', url: 'https://scholar.google.com/citations?user=DYu7B_kAAAAJ', desc: 'Citations & Publications' },
  { platform: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/author/37089214086', desc: 'IEEE Author Profile' },
  { platform: 'ResearchGate', url: 'https://www.researchgate.net/publication/400072760', desc: 'Research Network' },
  { platform: 'ORCID', url: 'https://orcid.org/0009-0000-9043-4475', desc: '0009-0000-9043-4475' },
];

const interests = ['Artificial Intelligence', 'Machine Learning', 'Image Processing', 'Deep Learning', 'Bangla NLP', 'Lightweight CNN', 'Edge AI', 'Computer Vision'];
const rotations = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5];
const sizes = [16, 14, 15, 13, 16, 14, 15, 13];

export default function Research() {
  const { publications } = useData();

  return (
    <section id="research" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTag text="05 — RESEARCH & PUBLICATIONS" />

      <motion.h2
        variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="font-['Cormorant_Garamond'] font-semibold text-[clamp(36px,5vw,56px)] mb-16 text-[var(--text-base)]"
      >
        Published Work
      </motion.h2>

      {/* Publications */}
      <div className="space-y-6 mb-20">
        {publications.map((pub, i) => (
          <motion.div
            key={pub.id}
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
            className="bg-[var(--bg-elevated)] border border-[var(--border)] border-l-[3px] border-l-[var(--accent)] rounded-r-xl p-7 hover:border-[var(--border-bright)] hover:-translate-y-1 transition-all duration-300 group"
          >
            {/* Top row */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-['DM_Mono'] text-[10px] border border-[var(--accent)] text-[var(--accent)] px-2.5 py-1 rounded-full uppercase tracking-wider">
                {pub.type}
              </span>
              <span className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)]">{pub.year}</span>
              <span className="font-['DM_Mono'] text-[10px] bg-[var(--accent-glow)] border border-[var(--accent)] text-[var(--accent)] px-2.5 py-1 rounded-full">
                {pub.authorPosition}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-['Cormorant_Garamond'] font-semibold text-[22px] leading-[1.3] text-[var(--text-base)] mb-3 group-hover:text-[var(--accent)] transition-colors">
              {pub.title}
            </h3>

            {/* Conference */}
            <div className="font-['DM_Mono'] text-[12px] text-[var(--accent)] italic mb-3">{pub.conference}</div>

            {/* Authors */}
            <div className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)] mb-3">
              {pub.authors.map((author, ai) => (
                <span key={ai}>
                  {ai > 0 && ', '}
                  <span className={author === 'Md. Nur A Alam' ? 'text-[var(--accent)] underline underline-offset-2' : ''}>
                    {author}
                  </span>
                </span>
              ))}
            </div>

            {/* DOI */}
            <div className="font-['DM_Mono'] text-[10px] text-[var(--text-faint)] mb-4">
              DOI: {pub.doi}
            </div>

            {/* Abstract */}
            {pub.abstract && (
              <p className="font-['DM_Mono'] text-[13px] text-[var(--text-muted)] leading-[1.7] line-clamp-2 mb-5">
                {pub.abstract}
              </p>
            )}

            {/* Button */}
            <a
              href={pub.url} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 font-['DM_Mono'] text-[12px] px-5 py-2.5 border border-[var(--border-bright)] text-[var(--accent)] rounded hover:bg-[var(--accent)] hover:text-[var(--bg-base)] transition-all duration-300"
              data-cursor="hover"
            >
              View Publication <FiExternalLink />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Research Profiles */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-20">
        <div className="font-['Bebas_Neue'] text-[14px] text-[var(--accent)] tracking-[0.3em] mb-6">RESEARCH PROFILES</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {researchProfiles.map((profile, i) => (
            <motion.a
              key={i} href={profile.url} target="_blank" rel="noreferrer"
              variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
              className="bg-[var(--bg-elevated)] border border-[var(--border)] p-5 rounded-lg hover:border-[var(--border-bright)] hover:-translate-y-1 transition-all duration-300 group"
              data-cursor="hover"
            >
              <div className="font-['Cormorant_Garamond'] font-semibold text-[18px] text-[var(--text-base)] group-hover:text-[var(--accent)] transition-colors mb-1">{profile.platform}</div>
              <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-4">{profile.desc}</div>
              <div className="flex items-center gap-1 font-['DM_Mono'] text-[12px] text-[var(--accent)]">
                View Profile <FiExternalLink className="text-sm" />
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Research Interests Cloud */}
      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <div className="font-['Bebas_Neue'] text-[14px] text-[var(--accent)] tracking-[0.3em] mb-6">RESEARCH INTERESTS</div>
        <div className="flex flex-wrap gap-3">
          {interests.map((interest, i) => (
            <span
              key={i}
              style={{ rotate: `${rotations[i % rotations.length]}deg`, fontSize: `${sizes[i % sizes.length]}px` }}
              className="font-['DM_Mono'] border border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-2 rounded cursor-default hover:bg-[var(--accent-glow)] hover:border-[var(--border-bright)] hover:scale-105 transition-all duration-300 text-[var(--text-base)] inline-block"
            >
              {interest}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
