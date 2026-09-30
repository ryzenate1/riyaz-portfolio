'use client';

import { memo, useEffect, useRef, useState } from 'react';

const CURSOR_SIZE = 48;
const CURSOR_OFFSET = CURSOR_SIZE / 2;
// Lerp factor per frame (~60fps) — replaces the framer-motion spring so
// this decorative cursor ships zero animation-library JS.
const LERP = 0.2;

// Decorative cursor only: disabled on touch devices and for reduced motion.
// rAF-lerped plain-div implementation (GPU transform, single rAF loop,
// passive mousemove listener storing a target — no per-event style writes).
const CustomCursor = memo(function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- One-time capability gate for a decorative cursor
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = cursorRef.current;
    if (!el) return;

    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let rafId = 0;
    let visible = false;

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = '1';
      }
    };

    const loop = () => {
      current.x += (target.x - current.x) * LERP;
      current.y += (target.y - current.y) * LERP;
      el.style.transform = `translate3d(${current.x - CURSOR_OFFSET}px, ${current.y - CURSOR_OFFSET}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-12 w-12 mix-blend-difference"
      style={{ opacity: 0 }}
    >
      <div className="h-full w-full rounded-full border-2 border-white"></div>
      <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white"></div>
    </div>
  );
});

export { CustomCursor };
