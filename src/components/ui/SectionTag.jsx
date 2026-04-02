import { motion } from 'framer-motion';

export default function SectionTag({ text }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="mb-4 inline-flex items-center gap-4"
    >
      <div className="h-[1px] w-12 bg-[var(--accent)]" />
      <span className="font-['DM_Mono'] text-[12px] tracking-[0.2em] text-[var(--accent)] uppercase">
        {text}
      </span>
    </motion.div>
  );
}
