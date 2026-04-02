import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import SectionTag from '../ui/SectionTag';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiBookOpen, FiCheck } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';
import { ThreeDots } from 'react-loader-spinner';

const socials = [
  { icon: <FiGithub />, label: 'GitHub', url: 'https://github.com/Md-Nur-A-Alam' },
  { icon: <FiLinkedin />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/md-nur-a-alam13/' },
  { icon: <FaTrophy />, label: 'Codeforces', url: 'https://codeforces.com/profile/Nur_Alam.2812' },
  { icon: <FiBookOpen />, label: 'Scholar', url: 'https://scholar.google.com/citations?user=DYu7B_kAAAAJ' },
];

const InputField = ({ id, label, error, register, ...props }) => (
  <div className="relative group">
    <label htmlFor={id} className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-2 group-focus-within:text-[var(--accent)] transition-colors uppercase tracking-widest">
      {label}
    </label>
    <input
      id={id}
      {...register}
      {...props}
      className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] outline-none text-[var(--text-base)] font-['DM_Mono'] text-[14px] py-2.5 transition-colors"
    />
    {error && <p className="font-['DM_Mono'] text-[11px] text-red-400 mt-1">{error.message}</p>}
  </div>
);

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const copyEmail = () => {
    navigator.clipboard.writeText('mdnuralam2812@gmail.com');
    toast.success('Email copied!', { style: { background: 'var(--bg-elevated)', color: 'var(--text-base)', border: '1px solid var(--border)' } });
  };

  const onSubmit = async (data) => {
    setSending(true);
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: data.name, from_email: data.email, subject: data.subject, message: data.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // Also save to Firestore
      if (import.meta.env.VITE_FB_API_KEY) {
        await addDoc(collection(db, 'messages'), {
          name: data.name, email: data.email, subject: data.subject,
          message: data.message, read: false, createdAt: serverTimestamp()
        });
      }

      setSent(true);
      reset();
      toast.success("Message sent! I'll reply within 24 hours.", { duration: 5000, style: { background: 'var(--bg-elevated)', color: 'var(--text-base)', border: '1px solid var(--border)' } });
      setTimeout(() => setSent(false), 4000);
    } catch {
      toast.error("Failed to send. Please email me directly.", { style: { background: 'var(--bg-elevated)', color: 'var(--text-base)', border: '1px solid var(--border)' } });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 max-w-7xl mx-auto px-6">
      <SectionTag text="08 — CONTACT" />

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <h2 className="font-['Cormorant_Garamond'] font-semibold text-[clamp(36px,5vw,56px)] text-[var(--text-base)]">
          Let's Build Something
        </h2>
        <p className="font-['Cormorant_Garamond'] italic font-light text-[clamp(24px,3vw,36px)] text-[var(--accent)] mb-16">
          Extraordinary Together.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <motion.button variants={fadeInUp} onClick={copyEmail}
              className="w-full flex items-center gap-4 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-5 py-4 hover:border-[var(--border-bright)] hover:-translate-y-1 transition-all duration-300 group text-left"
              data-cursor="hover">
              <FiMail className="text-[var(--accent)] text-xl flex-shrink-0" />
              <div>
                <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-0.5 uppercase tracking-wider">Email · Click to copy</div>
                <div className="font-['DM_Mono'] text-[13px] text-[var(--text-base)] group-hover:text-[var(--accent)] transition-colors">mdnuralam2812@gmail.com</div>
              </div>
            </motion.button>

            {[
              { icon: <FiPhone />, label: 'Phone', value: '+880 1307-631378' },
              { icon: <FiMapPin />, label: 'Location', value: 'Dhaka, Bangladesh' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInUp}
                className="flex items-center gap-4 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl px-5 py-4">
                <span className="text-[var(--accent)] text-xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-0.5 uppercase tracking-wider">{item.label}</div>
                  <div className="font-['DM_Mono'] text-[13px] text-[var(--text-base)]">{item.value}</div>
                </div>
              </motion.div>
            ))}

            <motion.div variants={fadeInUp} className="flex items-center gap-3 px-5 py-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
              <span className="font-['DM_Mono'] text-[12px] text-[var(--text-muted)]">Open to full-time roles &amp; freelance</span>
            </motion.div>
          </div>

          {/* Social links */}
          <motion.div variants={fadeInUp} className="flex gap-6">
            {socials.map((s, i) => (
              <a key={i} href={s.url} target="_blank" rel="noreferrer" data-cursor="hover"
                className="flex flex-col items-center gap-2 group">
                <span className="text-[24px] text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:-translate-y-1 transition-all duration-250">
                  {s.icon}
                </span>
                <span className="font-['DM_Mono'] text-[10px] text-[var(--text-faint)] group-hover:text-[var(--text-muted)] transition-colors">{s.label}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Form */}
        <motion.form
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-7"
        >
          <motion.div variants={fadeInUp}>
            <InputField id="name" label="Name" register={register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })} error={errors.name} placeholder="Your name" />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <InputField id="email" label="Email" type="email" register={register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} error={errors.email} placeholder="your@email.com" />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <InputField id="subject" label="Subject" register={register('subject', { required: 'Subject is required' })} error={errors.subject} placeholder="What's this about?" />
          </motion.div>
          <motion.div variants={fadeInUp} className="relative group">
            <label htmlFor="message" className="block font-['DM_Mono'] text-[11px] text-[var(--text-muted)] mb-2 group-focus-within:text-[var(--accent)] transition-colors uppercase tracking-widest">Message</label>
            <textarea
              id="message"
              rows={5}
              {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Min 10 characters' } })}
              placeholder="Tell me about your project..."
              className="w-full bg-transparent border-b border-[var(--border)] focus:border-[var(--accent)] outline-none text-[var(--text-base)] font-['DM_Mono'] text-[14px] py-2.5 transition-colors resize-none"
            />
            {errors.message && <p className="font-['DM_Mono'] text-[11px] text-red-400 mt-1">{errors.message.message}</p>}
          </motion.div>

          <motion.div variants={fadeInUp}>
            <button
              type="submit"
              disabled={sending || sent}
              className="w-full flex items-center justify-center gap-3 bg-[var(--accent)] text-[var(--bg-base)] font-['DM_Mono'] text-[14px] font-bold py-4 rounded transition-all duration-300 hover:opacity-90 disabled:opacity-70"
              data-cursor="hover"
            >
              {sending ? (
                <ThreeDots height="24" width="40" color="var(--bg-base)" />
              ) : sent ? (
                <><FiCheck className="text-lg" /> Message Sent!</>
              ) : (
                'SEND MESSAGE →'
              )}
            </button>
          </motion.div>
        </motion.form>
      </div>
    </section>
  );
}
