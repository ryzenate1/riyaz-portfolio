'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Animation Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: i * 0.15 },
  }),
};

const letterVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, damping: 10, stiffness: 100 },
  },
};

// GPU-accelerated letter component to reduce lag
const AnimatedLetter = ({ letter, variants }: { letter: string; variants: typeof letterVariant }) => (
  <motion.span 
    variants={variants} 
    className="inline-block will-change-transform"
    style={{ transform: 'translateZ(0)' }}
  >
    {letter === ' ' ? '\u00A0' : letter}
  </motion.span>
);

const AnimatedText = () => {
  const targetText = "Hello, I'm Riyaz";
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  // Typewriter effect (completes instantly when the user prefers reduced motion)
  useEffect(() => {
    if (currentIndex >= targetText.length) return;
    if (shouldReduceMotion) {
      const timeoutId = setTimeout(() => {
        setDisplayText(targetText);
        setCurrentIndex(targetText.length);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
    const timeoutId = setTimeout(() => {
      setDisplayText(targetText.substring(0, currentIndex + 1));
      setCurrentIndex((prev) => prev + 1);
    }, 80);
    return () => clearTimeout(timeoutId);
  }, [currentIndex, targetText, shouldReduceMotion]);

  const titleH1Class =
    'font-extrabold tracking-tight uppercase leading-tight text-white';

  const poppinsStyle = { fontFamily: 'Poppins, sans-serif' };

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      {/* Typing Animation */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        aria-hidden="true"
        className="text-[clamp(1.5rem,6vw,3.7rem)] font-mono text-[#39FF14] mb-4 sm:mb-6 md:mb-8 lg:mb-10 leading-tight"
        style={{
          textShadow: '0 0 8px rgba(57, 255, 20, 0.6)',
          fontFamily: 'JetBrains Mono, monospace'
        }}
      >
        <div className="inline-flex items-center">
          {displayText}
          <motion.span
            initial={{ opacity: 0 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0, 1, 0] }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, repeat: Infinity, repeatType: 'loop' }}
            className="ml-1 inline-block align-middle w-[8px] sm:w-[10px] h-[1.2em] ml-[2px]"
            style={{
              backgroundColor: '#79c0ff',
              color: '#79c0ff'
            }}
          >
            &nbsp;
          </motion.span>
        </div>
      </motion.div>
      <p className="sr-only">Hello, I&apos;m Riyaz — Full-Stack Developer</p>

      {/* Single h1 for SEO: one top-level heading with stacked lines */}
      <motion.h1
        id="hero-heading"
        variants={containerVariant}
        initial={shouldReduceMotion ? false : "hidden"}
        animate="visible"
        custom={0}
        className={`${titleH1Class} text-center mb-2`}
        style={{
          textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
          ...poppinsStyle,
        }}
      >
        {/* FULL-STACK */}
        <span className="block text-[clamp(2rem,11vw,7.9rem)] leading-[1.05]">
          {Array.from('FULL-STACK').map((letter, index) => (
            <AnimatedLetter key={index} letter={letter} variants={letterVariant} />
          ))}
        </span>

        {/* DEVELOPER */}
        <span className="mt-2 block text-[clamp(2rem,11vw,7.9rem)] leading-[1.05]">
          <span className="inline">
            {Array.from('DEVELOPER').map((letter, index) => (
              <AnimatedLetter key={`developer-${index}`} letter={letter} variants={letterVariant} />
            ))}
          </span>
        </span>
      </motion.h1>
    </div>
  );
};

export { AnimatedText };
