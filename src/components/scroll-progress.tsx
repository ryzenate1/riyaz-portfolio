'use client';

import { memo, useEffect, useRef } from 'react';

// rAF-throttled native scroll progress bar.
// Previously used framer-motion's useScroll + useTransform + motion.div
// for a 1px bar; a single passive scroll listener driving a GPU-friendly
// scaleX transform removes that dependency from this chunk and avoids
// layout thrash (width changes -> transform changes).
const ScrollProgress = memo(function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const bar = barRef.current;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-10000 h-px bg-neutrals-600">
      <div
        ref={barRef}
        className="h-full origin-left bg-linear-to-r from-neutrals-100/30 via-neutrals-100 to-neutrals-100/30"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
});

export { ScrollProgress };
