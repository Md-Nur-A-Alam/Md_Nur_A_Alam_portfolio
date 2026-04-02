import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorState, setCursorState] = useState('default');
  const requestRef = useRef(null);

  // Mouse coords
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const updateRing = () => {
      const lerp = 0.15;
      ring.current.x += (mouse.current.x - ring.current.x) * lerp;
      ring.current.y += (mouse.current.y - ring.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      requestRef.current = requestAnimationFrame(updateRing);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setCursorState(target.getAttribute('data-cursor'));
      } else if (e.target.closest('a') || e.target.closest('button')) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    requestRef.current = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  if (isTouch) return null;

  let dotSize = 8;
  let ringSize = 40;
  let ringStyle = {
    border: '1.5px solid var(--accent)',
    opacity: 0.7,
    backgroundColor: 'transparent',
    borderRadius: '50%',
    transition: 'width 0.3s, height 0.3s, background-color 0.3s, border-radius 0.3s',
  };
  let dotStyle = {
    backgroundColor: 'var(--accent)',
    transition: 'width 0.3s, height 0.3s, opacity 0.3s',
  };

  switch (cursorState) {
    case 'hover':
      dotSize = 4;
      ringSize = 64;
      ringStyle.backgroundColor = 'var(--accent-glow)';
      break;
    case 'text':
      dotSize = 2;
      dotStyle.opacity = 0;
      ringSize = 28;
      ringStyle = {
        ...ringStyle,
        width: '2px',
        borderRadius: '0',
        backgroundColor: 'var(--accent)',
        border: 'none',
        opacity: 1,
      };
      break;
    case 'view':
      dotSize = 0;
      ringSize = 72;
      ringStyle.backgroundColor = 'var(--accent-glow)';
      break;
    case 'drag':
      dotSize = 0;
      ringSize = 48;
      ringStyle.border = '1.5px dashed var(--accent)';
      ringStyle.opacity = 1;
      break;
  }

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9999] top-0 left-0 flex items-center justify-center overflow-hidden"
        style={{
          width: ringStyle.width || `${ringSize}px`,
          height: `${ringSize}px`,
          ...ringStyle,
        }}
      >
        {cursorState === 'view' && (
          <span className="text-[10px] font-bold text-[var(--accent)] tracking-widest absolute">
            VIEW
          </span>
        )}
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[10000] top-0 left-0 rounded-full"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          ...dotStyle,
        }}
      />
    </>
  );
}
