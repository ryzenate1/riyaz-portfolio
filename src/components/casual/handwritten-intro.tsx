'use client';

import { motion } from 'framer-motion';

// SVG underline draw animation
const drawUnderline = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { delay: 0.8, duration: 0.6, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] }
  }
};

// Handwritten style intro with Caveat font and draw animation
export function HandwrittenIntro() {
  return (
    <motion.div 
      className="flex items-center gap-3 mb-6 relative z-10"
      style={{ marginLeft: '-2px' }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Waving hand emoji (decorative) */}
      <motion.span
        aria-hidden="true"
        className="text-4xl sm:text-5xl inline-block"
        animate={{ 
          rotate: [0, 14, -8, 14, -4, 10, 0],
        }}
        transition={{
          duration: 2.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 1,
        }}
        style={{ transformOrigin: '70% 70%' }}
      >
        👋
      </motion.span>

      {/* Handwritten text with SVG underline */}
      <div className="relative inline-block">
        <span 
          className="text-3xl sm:text-4xl md:text-5xl"
          style={{
            fontFamily: "'Caveat', cursive",
            color: '#404040',
            fontWeight: 700,
          }}
        >
          Hi, I&apos;m <span style={{ color: '#404040', fontWeight: 700 }}>Riyaz</span>
        </span>
        
        {/* Handwritten SVG underline */}
        <motion.svg
          aria-hidden="true"
          className="absolute -bottom-1 left-0 w-full"
          height="12"
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          initial="hidden"
          animate="visible"
          style={{ zIndex: 50 }}
        >
          <motion.path
            d="M2 8 Q40 2 80 7 T160 5 T198 8"
            stroke="#404040"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            variants={drawUnderline}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}

// Alternative styled version - same as above
export function HandwrittenIntroStyled() {
  return (
    <motion.div 
      className="flex items-start md:items-center gap-3 mb-6 relative z-10 justify-start"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Handwritten text with SVG underline */}
      <div className="relative inline-block">
        <span 
          className="text-5xl sm:text-5xl md:text-5xl"
          style={{
            fontFamily: "'Caveat', cursive",
            color: '#404040',
            fontWeight: 700,
          }}
        >
          Hi, I&apos;m <span style={{ color: '#404040', fontWeight: 700 }}>Riyaz</span>
        </span>
        
        {/* Handwritten SVG underline that draws in */}
        <motion.svg
          aria-hidden="true"
          className="absolute -bottom-1 left-0 w-full"
          height="12"
          viewBox="0 0 200 12"
          preserveAspectRatio="none"
          initial="hidden"
          animate="visible"
          style={{ zIndex: 50 }}
        >
          <motion.path
            d="M2 8 Q40 2 80 7 T160 5 T198 8"
            stroke="#404040"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            variants={drawUnderline}
          />
        </motion.svg>
      </div>

      {/* Waving hand with animation - after Riyaz (decorative) */}
      <motion.span
        aria-hidden="true"
        className="text-4xl sm:text-5xl inline-block"
        animate={{ 
          rotate: [0, 14, -8, 14, -4, 10, 0],
        }}
        transition={{
          duration: 2.5,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatDelay: 1,
        }}
        style={{ transformOrigin: '70% 70%' }}
      >
        👋
      </motion.span>
    </motion.div>
  );
}

