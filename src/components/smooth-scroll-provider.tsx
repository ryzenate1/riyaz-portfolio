'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type Lenis from 'lenis';

interface SmoothScrollContextType {
  lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
  children: ReactNode;
}

function shouldEnableSmoothScroll() {
  if (typeof window === 'undefined') return false;
  // Native touch scrolling is already smooth; Lenis on touch adds jank.
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const contextValue = useMemo(() => ({ lenis }), [lenis]);

  useEffect(() => {
    if (!shouldEnableSmoothScroll()) return;

    let destroyed = false;
    let rafId = 0;
    let lenisInstance: Lenis | null = null;

    const handleVisibilityChange = () => {
      if (!lenisInstance) return;
      if (document.visibilityState === 'visible') {
        const loop = (time: number) => {
          lenisInstance?.raf(time);
          if (!destroyed) rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(rafId);
      }
    };

    // Dynamic import keeps lenis out of the initial bundle for users
    // who never scroll (and for touch / reduced-motion users entirely).
    import('lenis')
      .then(({ default: LenisConstructor }) => {
        if (destroyed) return;

        lenisInstance = new LenisConstructor({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          touchMultiplier: 2,
        });

        // Async callback (dynamic import), not a synchronous effect body.
        setLenis(lenisInstance);

        const loop = (time: number) => {
          lenisInstance?.raf(time);
          if (!destroyed) rafId = requestAnimationFrame(loop);
        };

        rafId = requestAnimationFrame(loop);
        document.addEventListener('visibilitychange', handleVisibilityChange);
      })
      .catch(() => {
        // Smooth scroll is progressive enhancement; ignore load failures.
      });

    return () => {
      destroyed = true;
      cancelAnimationFrame(rafId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      lenisInstance?.destroy();
      lenisInstance = null;
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
