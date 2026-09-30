'use client';

import { siteConfig } from '@/lib/config/site';
import { useCallback, useEffect, useRef, type ComponentRef } from 'react';

const TEXT_COLOR = siteConfig.themeColor;
const BACKGROUND_COLOR = siteConfig.backgroundColor;
const ALPHA_BACKGROUND_COLOR = `${siteConfig.backgroundColor}20`;
const FONT = '15pt monospace';
const TEXT_COLUMN_WIDTH = 20;
const FPS = 20;
const FRAME_INTERVAL = 1000 / FPS;
const RESIZE_DEBOUNCE_MS = 150;

function getPseudoRandomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function MatrixBackground() {
  const matrixCanvasRef = useRef<ComponentRef<'canvas'>>(null);

  const initializeMatrixCanvas = useCallback(() => {
    if (!matrixCanvasRef.current) return undefined;

    // Find the closest section element to get full width
    const sectionElement = matrixCanvasRef.current.closest('section');
    const parentElement = sectionElement || matrixCanvasRef.current.parentElement;

    // Use the section's full width, or fallback to window width
    matrixCanvasRef.current.width = parentElement?.offsetWidth || window.innerWidth;
    matrixCanvasRef.current.height = parentElement?.offsetHeight || window.innerHeight;

    const canvasContext = matrixCanvasRef.current.getContext('2d');
    if (!canvasContext) return undefined;

    canvasContext.fillStyle = BACKGROUND_COLOR;
    canvasContext.fillRect(0, 0, matrixCanvasRef.current.width, matrixCanvasRef.current.height);

    const numberOfColumns = Math.floor(matrixCanvasRef.current.width / TEXT_COLUMN_WIDTH) + 1;
    const defaultYPositions = Array<number>(numberOfColumns).fill(0);

    return defaultYPositions;
  }, []);

  const drawMatrix = useCallback((yPositions: number[]) => {
    if (!matrixCanvasRef.current) return undefined;

    const canvasContext = matrixCanvasRef.current.getContext('2d');

    if (!canvasContext) return undefined;

    canvasContext.fillStyle = ALPHA_BACKGROUND_COLOR;
    canvasContext.fillRect(0, 0, matrixCanvasRef.current.width, matrixCanvasRef.current.height);

    canvasContext.fillStyle = TEXT_COLOR;
    canvasContext.font = FONT;

    const newYPositions = yPositions.map((y, index) => {
      const char = String.fromCharCode(getPseudoRandomInRange(33, 126));
      const x = index * TEXT_COLUMN_WIDTH;

      canvasContext.fillText(char, x, y);

      const shouldResetYPosition = y > 100 + Math.random() * 10000;
      return shouldResetYPosition ? 0 : y + 20;
    });

    return newYPositions;
  }, []);

  useEffect(() => {
    // Respect reduced-motion without pulling framer-motion into this chunk.
    if (prefersReducedMotion()) {
      initializeMatrixCanvas();
      return;
    }

    let yPositions = initializeMatrixCanvas();
    let rafId = 0;
    let lastFrameTime = 0;
    let isVisible = true;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        yPositions = initializeMatrixCanvas();
      }, RESIZE_DEBOUNCE_MS);
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
      if (isVisible) {
        lastFrameTime = performance.now();
        rafId = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(rafId);
      }
    };

    // Pause rendering while the canvas is offscreen.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const nowVisible = !!entry?.isIntersecting && document.visibilityState === 'visible';
        if (nowVisible && !isVisible) {
          isVisible = true;
          lastFrameTime = performance.now();
          rafId = requestAnimationFrame(loop);
        } else if (!nowVisible && isVisible) {
          isVisible = false;
          cancelAnimationFrame(rafId);
        }
      },
      { threshold: 0 },
    );

    // rAF loop gated to FPS via timestamps (no setTimeout chain, no leaks).
    const loop = (time: number) => {
      if (!isVisible) return;
      if (time - lastFrameTime >= FRAME_INTERVAL) {
        lastFrameTime = time;
        if (yPositions) {
          const next = drawMatrix(yPositions);
          if (next) yPositions = next;
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (matrixCanvasRef.current) observer.observe(matrixCanvasRef.current);

    if (yPositions) rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      if (resizeTimer) clearTimeout(resizeTimer);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [drawMatrix, initializeMatrixCanvas]);

  return (
    <canvas
      ref={matrixCanvasRef}
      aria-hidden
      className="absolute inset-0 -z-10 h-full w-full mask-radial-to-80% opacity-75"
    />
  );
}

export { MatrixBackground };
