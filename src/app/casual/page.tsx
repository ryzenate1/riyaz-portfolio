'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { DeskScene } from '@/components/casual/desk-scene';
import { HandwrittenIntroStyled } from '@/components/casual/handwritten-intro';
import { AboutSection, CasualFooter } from '@/components/casual/about-section';

export default function CasualHomePage() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for mobile SVG section only
  const svgY = useTransform(scrollYProgress, [0, 1], [50, -30]);
  const svgScale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]);
  const svgOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <main id="main-content" className="min-h-screen" ref={containerRef}>
      {/* Hero Section - Split layout */}
      <section className="hero-section">
        {/* Left side - Desk illustration */}
        {/* Desktop: normal display, Mobile: scroll-triggered */}
        <motion.div 
          className="hero-illustration"
          style={isMobile ? {
            y: svgY,
            scale: svgScale,
            opacity: svgOpacity,
          } : undefined}
          initial={isMobile ? { opacity: 0 } : { opacity: 1 }}
          animate={isMobile ? undefined : { opacity: 1 }}
        >
          <DeskScene />
        </motion.div>

        {/* Right side - Teal with text */}
        <div className="hero-content">
          <motion.div
            className="hero-text-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Handwritten greeting */}
            <HandwrittenIntroStyled />

            {/* Main headline - bold with outlined & colored words */}
            <h1 className="hero-heading">
              I like making <Link href="/games" className="highlight-outline">fun</Link>,<br />
              interactive things<br />
              with <span className="highlight-outline">code</span>.<br />
              I also <span className="highlight-outline">talk</span> &<br />
              <span className="highlight-teal">write</span> about it.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Footer */}
      <CasualFooter />
    </main>
  );
}
