import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
        setProgress(pct);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, zIndex: 999,
      width: `${progress}%`, height: 3,
      background: 'linear-gradient(to right, var(--accent), var(--accent-hover))',
      transition: 'width 0.1s linear',
      pointerEvents: 'none',
    }} />
  );
}
