import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const arrowRef = useRef(null);
  const ringRef = useRef(null);
  const [state, setState] = useState('default');
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) return;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (arrowRef.current) {
        // Arrow tip points precisely to mouse coordinates (0, 0 local offset)
        arrowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    let raf;
    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;
      if (ringRef.current) {
        // Offset by 20 to center the 40x40 ring on the mouse tip
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

  // Return nothing on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  // State-based styles
  const ringStyles = {
    default: { width: 40, height: 40, opacity: 0.7, background: 'transparent', border: '1.5px solid var(--accent)' },
    hover:   { width: 64, height: 64, opacity: 1,   background: 'var(--accent-glow)', border: '1.5px solid var(--accent)' },
    text:    { width: 3,  height: 28, opacity: 0.9, background: 'var(--accent)', border: 'none', borderRadius: 2 },
    click:   { width: 20, height: 20, opacity: 1,   background: 'var(--accent-glow)', border: '1.5px solid var(--accent)' },
    view:    { width: 72, height: 72, opacity: 1,   background: 'var(--accent-glow)', border: '1.5px solid var(--accent)' },
  };

  const s = ringStyles[state] || ringStyles.default;

  return (
    <>
      <div className="hidden md:block">
        <div
          ref={arrowRef}
          style={{
            position: 'fixed', zIndex: 9999, pointerEvents: 'none',
            transform: 'translate(-100px, -100px)',
            willChange: 'transform'
          }}
        >
          {/* Custom SVG Arrow pointing precisely to 0,0 */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '-2px', marginTop: '-2px' }}>
            <path 
              d="M4 0v20l5.8-5.3 3.6 8.5 3.3-1.4-3.6-8.6 7-.3L4 0z" 
              fill="var(--accent)" 
            />
          </svg>
        </div>
        <div
          ref={ringRef}
          style={{
            position: 'fixed', zIndex: 9998, pointerEvents: 'none',
            width: s.width, height: s.height,
            borderRadius: state === 'text' ? 2 : '50%',
            border: s.border,
            background: s.background,
            opacity: s.opacity,
            transform: 'translate(-100px, -100px)',
            transition: 'width 0.25s ease, height 0.25s ease, opacity 0.25s ease, background 0.25s ease, border-radius 0.25s ease, border 0.25s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            willChange: 'transform'
          }}
        >
          {state === 'view' && (
            <span style={{ fontFamily: 'Bebas Neue', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.1em' }}>
              VIEW
            </span>
          )}
        </div>
      </div>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}
