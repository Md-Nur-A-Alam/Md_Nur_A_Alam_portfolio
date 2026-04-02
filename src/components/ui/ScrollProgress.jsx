import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    let frameId;
    const handleScroll = () => {
      frameId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight || document.documentElement.clientHeight;
        const scrollPercent = scrollTop / (docHeight - winHeight);
        setWidth(`${Math.min(scrollPercent * 100, 100)}%`);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[999] pointer-events-none"
      style={{
        width,
        background: 'linear-gradient(to right, var(--accent), var(--accent-hover))',
        transition: 'width 0.1s ease-out'
      }}
    />
  );
}
