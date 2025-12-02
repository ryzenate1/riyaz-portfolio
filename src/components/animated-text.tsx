'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < targetText.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(targetText.substring(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, 80);
      return () => clearTimeout(timeoutId);
    }
    // Return void for consistency
    return;
  }, [currentIndex, targetText]);

  const titleH1Class =
    'font-extrabold tracking-tight uppercase leading-tight text-white';

  const poppinsStyle = { fontFamily: 'Poppins, sans-serif' };

  return (
    <div className="flex flex-col items-center justify-center text-center px-4">
      {/* Typing Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-[35px] sm:text-[47px] md:text-[47px] lg:text-[59px] font-mono text-[#39FF14] mb-4 sm:mb-6 md:mb-8 lg:mb-10 whitespace-nowrap leading-tight"
        style={{
          textShadow: '0 0 8px rgba(57, 255, 20, 0.6)',
          fontFamily: 'JetBrains Mono, monospace'
        }}
      >
        <div className="inline-flex items-center">
          {displayText}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, repeatType: 'loop' }}
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

      {/* FULL-STACK */}
      <div className="relative self-center mt-2 will-change-transform" style={{ transform: 'translateZ(0)' }}>
        <motion.h1
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          custom={0}
          className={`${titleH1Class} text-[59px] sm:text-[71px] md:text-[71px] lg:text-[95px] xl:text-[127px] text-center mb-2 whitespace-nowrap`}
          style={{
            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
            ...poppinsStyle,
          }}
        >
          {Array.from('FULL-STACK').map((letter, index) => (
            <AnimatedLetter key={index} letter={letter} variants={letterVariant} />
          ))}
        </motion.h1>
      </div>

      {/* DEVELOPER & */}
      <div className="relative self-center mt-2 will-change-transform" style={{ transform: 'translateZ(0)' }}>
        <motion.h1
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          custom={1}
          className={`${titleH1Class} text-[59px] sm:text-[71px] md:text-[71px] lg:text-[95px] xl:text-[127px] text-center mb-2`}
          style={{
            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
            ...poppinsStyle,
          }}
        >
          <div className="inline">
            {Array.from('DEVELOPER').map((letter, index) => (
              <AnimatedLetter key={`developer-${index}`} letter={letter} variants={letterVariant} />
            ))}
          </div>
          <span className="text-[#39FF14] ml-2 sm:ml-4" style={{ textShadow: '0 0 8px rgba(57, 255, 20, 0.6)' }}>
            &amp;
          </span>
        </motion.h1>
      </div>

      {/* KINESIOLOGY ENTHUSIAST */}
      <div className="relative self-center mt-2 will-change-transform" style={{ transform: 'translateZ(0)' }}>
        <motion.h1
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          custom={2}
          className={`${titleH1Class} text-[47px] sm:text-[59px] md:text-[59px] lg:text-[71px] xl:text-[95px] text-center`}
          style={{
            textShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
            ...poppinsStyle,
          }}
        >
          <div className="block sm:inline">
            {Array.from('KINESIOLOGY').map((letter, index) => (
              <AnimatedLetter key={`kinesiology-${index}`} letter={letter} variants={letterVariant} />
            ))}
          </div>
          <div className="block sm:inline sm:ml-4 md:ml-6 mt-1 sm:mt-0">
            {Array.from('ENTHUSIAST').map((letter, index) => (
              <AnimatedLetter key={`enthusiast-${index}`} letter={letter} variants={letterVariant} />
            ))}
          </div>
        </motion.h1>
      </div>
    </div>
  );
};

export { AnimatedText };
