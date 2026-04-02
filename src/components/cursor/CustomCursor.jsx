import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [state, setState] = useState('default');
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
    };

    let raf;
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.10;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.10;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    // State detection via event delegation
    const onOver = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) setState(el.dataset.cursor);
      else if (e.target.closest('a, button')) setState('hover');
      else if (e.target.closest('p, h1, h2, h3, span')) setState('text');
      else setState('default');
    };

    const onClick = () => {
      setState('click');
      setTimeout(() => setState('default'), 150);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onClick);
    };
  }, []);

  // State-based styles
  const ringStyles = {
    default: { width: 40, height: 40, opacity: 0.7, background: 'transparent' },
    hover:   { width: 64, height: 64, opacity: 1,   background: 'var(--accent-glow)' },
    text:    { width: 3,  height: 28, opacity: 0.9, background: 'var(--accent)', borderRadius: 2 },
    click:   { width: 20, height: 20, opacity: 1,   background: 'var(--accent-glow)' },
    view:    { width: 72, height: 72, opacity: 1,   background: 'var(--accent-glow)' },
  };

  const s = ringStyles[state] || ringStyles.default;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', zIndex: 9999, pointerEvents: 'none',
          width: 8, height: 8, borderRadius: '50%',
          background: 'var(--accent)',
          transform: 'translate(-100px, -100px)',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', zIndex: 9998, pointerEvents: 'none',
          width: s.width, height: s.height,
          borderRadius: state === 'text' ? 2 : '50%',
          border: `1.5px solid var(--accent)`,
          background: s.background,
          opacity: s.opacity,
          transform: 'translate(-100px, -100px)',
          transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease, background 0.25s ease, border-radius 0.25s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {state === 'view' && (
          <span style={{ fontFamily: 'Bebas Neue', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em' }}>
            VIEW
          </span>
        )}
      </div>
    </>
  );
}
