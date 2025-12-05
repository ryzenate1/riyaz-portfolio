'use client';

import { motion, useInView, Transition } from 'framer-motion';
import { useRef } from 'react';

// SVG draw animation variants
const drawPath = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 0.8, ease: [0.65, 0, 0.35, 1] as [number, number, number, number] },
      opacity: { delay, duration: 0.2 }
    }
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { delay, duration: 0.4 }
  })
};

// Continuous animations
const lampSwingAnimation = {
  rotate: [-0.5, 0.5, -0.5],
};

const lampSwingTransition: Transition = {
  duration: 4,
  repeat: Infinity,
  ease: 'easeInOut'
};

export function DeskScene() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <div ref={ref} className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <motion.svg
        viewBox="0 0 600 550"
        className="w-full max-w-3xl h-auto relative z-10"
        aria-hidden="true"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Definitions for gradients */}
        <defs>
          <linearGradient id="plantGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5ebd8a" />
            <stop offset="100%" stopColor="#3d9970" />
          </linearGradient>
          <linearGradient id="plantGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7dd3a8" />
            <stop offset="100%" stopColor="#4eba7d" />
          </linearGradient>
          <linearGradient id="potGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#c9956c" />
            <stop offset="50%" stopColor="#d4a574" />
            <stop offset="100%" stopColor="#b8845c" />
          </linearGradient>
          <linearGradient id="monitorFrame" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e8e8e8" />
            <stop offset="100%" stopColor="#d0d0d0" />
          </linearGradient>
          <linearGradient id="shelfGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5a5a6a" />
            <stop offset="100%" stopColor="#3a3a4a" />
          </linearGradient>
        </defs>

        {/* ===== HANGING LAMP ===== */}
        <motion.g
          animate={lampSwingAnimation}
          transition={lampSwingTransition}
          style={{ transformOrigin: '350px 0px' }}
        >
          {/* Lamp cord */}
          <motion.line
            x1="350" y1="0" x2="350" y2="60"
            stroke="#b8a5d4"
            strokeWidth="3"
            strokeLinecap="round"
            variants={drawPath}
            custom={0}
          />
          {/* Lamp shade - trapezoid */}
          <motion.path
            d="M320 60 L380 60 L370 100 L330 100 Z"
            fill="#9d8ec9"
            stroke="#8b7cb8"
            strokeWidth="2"
            variants={fadeIn}
            custom={0.4}
          />
          {/* Lamp inner rim */}
          <motion.ellipse 
            cx="350" cy="100" rx="20" ry="5" 
            fill="#8b7cb8"
            variants={fadeIn}
            custom={0.5}
          />
          {/* Light bulb */}
          <motion.ellipse
            cx="350" cy="95" rx="10" ry="6"
            fill="#fef9c3"
            variants={fadeIn}
            custom={0.6}
          />
        </motion.g>

        {/* ===== TOP SHELF ===== */}
        <motion.g>
          {/* Shelf board */}
          <motion.rect 
            x="70" y="220" width="200" height="10" 
            fill="url(#shelfGradient)"
            rx="2"
            variants={fadeIn}
            custom={0.5}
          />
          {/* Shelf shadow */}
          <motion.rect 
            x="75" y="230" width="195" height="3" 
            fill="rgba(0,0,0,0.1)"
            variants={fadeIn}
            custom={0.5}
          />

          {/* ===== DETAILED PLANT IN POT ===== */}
          <motion.g
            animate={{ rotate: [-1, 1, -1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '115px 200px' }}
          >
            {/* Pot */}
            <motion.path
              d="M95 220 L90 180 L140 180 L135 220 Z"
              fill="url(#potGradient)"
              variants={fadeIn}
              custom={0.8}
            />
            {/* Pot rim */}
            <motion.rect 
              x="85" y="175" width="60" height="8" 
              fill="#c9956c"
              rx="2"
              variants={fadeIn}
              custom={0.8}
            />
            {/* Pot highlight */}
            <motion.path
              d="M100 185 L98 210"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="3"
              strokeLinecap="round"
              variants={fadeIn}
              custom={0.9}
            />
            {/* Soil */}
            <motion.ellipse 
              cx="115" cy="178" rx="25" ry="6" 
              fill="#8b6f5c"
              variants={fadeIn}
              custom={0.9}
            />

            {/* Plant leaves - detailed snake plant style */}
            {/* Main tall leaf */}
            <motion.path
              d="M115 175 Q118 130 115 100 Q112 130 115 175"
              fill="url(#plantGradient)"
              stroke="#3d9970"
              strokeWidth="1"
              variants={fadeIn}
              custom={1.0}
            />
            {/* Leaf stripes */}
            <motion.path
              d="M113 160 Q115 155 117 160"
              stroke="#7dd3a8"
              strokeWidth="2"
              fill="none"
              variants={fadeIn}
              custom={1.1}
            />
            <motion.path
              d="M113 140 Q115 135 117 140"
              stroke="#7dd3a8"
              strokeWidth="2"
              fill="none"
              variants={fadeIn}
              custom={1.1}
            />
            <motion.path
              d="M113 120 Q115 115 117 120"
              stroke="#7dd3a8"
              strokeWidth="2"
              fill="none"
              variants={fadeIn}
              custom={1.1}
            />

            {/* Left leaf */}
            <motion.path
              d="M110 175 Q95 140 90 110 Q100 145 110 175"
              fill="url(#plantGradient2)"
              stroke="#4eba7d"
              strokeWidth="1"
              variants={fadeIn}
              custom={1.1}
            />
            {/* Left leaf stripes */}
            <motion.path
              d="M98 145 Q95 140 98 135"
              stroke="#a7e8c5"
              strokeWidth="1.5"
              fill="none"
              variants={fadeIn}
              custom={1.2}
            />

            {/* Right leaf */}
            <motion.path
              d="M120 175 Q135 145 140 115 Q130 150 120 175"
              fill="url(#plantGradient)"
              stroke="#3d9970"
              strokeWidth="1"
              variants={fadeIn}
              custom={1.2}
            />
            {/* Right leaf stripes */}
            <motion.path
              d="M133 148 Q136 143 133 138"
              stroke="#7dd3a8"
              strokeWidth="1.5"
              fill="none"
              variants={fadeIn}
              custom={1.3}
            />

            {/* Far left small leaf */}
            <motion.path
              d="M105 175 Q85 155 80 135 Q90 160 105 175"
              fill="url(#plantGradient2)"
              stroke="#4eba7d"
              strokeWidth="1"
              variants={fadeIn}
              custom={1.3}
            />

            {/* Far right small leaf */}
            <motion.path
              d="M125 175 Q145 158 148 140 Q140 162 125 175"
              fill="url(#plantGradient2)"
              stroke="#4eba7d"
              strokeWidth="1"
              variants={fadeIn}
              custom={1.3}
            />
          </motion.g>

          {/* ===== DETAILED BOOKS ===== */}
          {/* Book 1 - Pink/Magenta with details */}
          <motion.g
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.rect 
              x="165" y="170" width="20" height="50" 
              fill="#d946a8"
              rx="2"
              variants={fadeIn}
              custom={1.0}
            />
            {/* Book spine lines */}
            <motion.line x1="170" y1="175" x2="170" y2="215" stroke="#c026a3" strokeWidth="1" />
            <motion.line x1="180" y1="175" x2="180" y2="215" stroke="#c026a3" strokeWidth="1" />
            {/* Book label */}
            <motion.rect x="168" y="185" width="14" height="8" fill="#f9a8d4" rx="1" />
            <motion.rect x="168" y="200" width="14" height="3" fill="#f472b6" rx="0.5" />
          </motion.g>

          {/* Book 2 - Purple with spine detail */}
          <motion.g
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          >
            <motion.rect 
              x="188" y="178" width="15" height="42" 
              fill="#a78bfa"
              rx="2"
              variants={fadeIn}
              custom={1.1}
            />
            {/* Spine decorations */}
            <motion.rect x="190" y="182" width="11" height="2" fill="#8b5cf6" rx="0.5" />
            <motion.rect x="190" y="188" width="11" height="10" fill="#c4b5fd" rx="1" />
            <motion.rect x="190" y="206" width="11" height="2" fill="#8b5cf6" rx="0.5" />
          </motion.g>

          {/* Book 3 - Blue/Cyan thicker */}
          <motion.g
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          >
            <motion.rect 
              x="206" y="165" width="25" height="55" 
              fill="#38bdf8"
              rx="2"
              variants={fadeIn}
              custom={1.2}
            />
            {/* Book spine design */}
            <motion.rect x="209" y="170" width="19" height="3" fill="#0ea5e9" rx="0.5" />
            <motion.rect x="209" y="178" width="19" height="20" fill="#7dd3fc" rx="1" />
            {/* Book title lines */}
            <motion.line x1="212" y1="183" x2="225" y2="183" stroke="#0284c7" strokeWidth="1.5" />
            <motion.line x1="214" y1="188" x2="223" y2="188" stroke="#0284c7" strokeWidth="1" />
            <motion.rect x="209" y="208" width="19" height="3" fill="#0ea5e9" rx="0.5" />
          </motion.g>

          {/* Book 4 - Pink slim */}
          <motion.g
            animate={{ y: [0, -1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          >
            <motion.rect 
              x="234" y="180" width="12" height="40" 
              fill="#fb7185"
              rx="2"
              variants={fadeIn}
              custom={1.3}
            />
            {/* Spine line */}
            <motion.line x1="240" y1="185" x2="240" y2="215" stroke="#f43f5e" strokeWidth="1" />
          </motion.g>
        </motion.g>

        {/* ===== BOTTOM DESK/SHELF ===== */}
        <motion.g>
          {/* Main desk surface */}
          <motion.rect 
            x="50" y="430" width="500" height="12" 
            fill="url(#shelfGradient)"
            rx="2"
            variants={fadeIn}
            custom={0.6}
          />
          {/* Desk shadow */}
          <motion.rect 
            x="55" y="442" width="495" height="4" 
            fill="rgba(0,0,0,0.15)"
            variants={fadeIn}
            custom={0.6}
          />

          {/* ===== PINK MUG WITH STEAM ===== */}
          <motion.g>
            {/* Mug body */}
            <motion.path
              d="M85 430 L82 385 L128 385 L125 430 Z"
              fill="#f9a8d4"
              stroke="#f472b6"
              strokeWidth="2"
              variants={fadeIn}
              custom={1.4}
            />
            {/* Mug rim */}
            <motion.ellipse 
              cx="105" cy="385" rx="24" ry="6" 
              fill="#f472b6"
              variants={fadeIn}
              custom={1.5}
            />
            {/* Mug inner */}
            <motion.ellipse 
              cx="105" cy="385" rx="18" ry="4" 
              fill="#a8445c"
              variants={fadeIn}
              custom={1.5}
            />
            {/* Mug handle */}
            <motion.path
              d="M128 395 Q148 395 148 408 Q148 422 128 422"
              fill="none"
              stroke="#f9a8d4"
              strokeWidth="8"
              strokeLinecap="round"
              variants={drawPath}
              custom={1.6}
            />
            {/* Handle inner */}
            <motion.path
              d="M128 400 Q142 400 142 408 Q142 418 128 418"
              fill="none"
              stroke="#f472b6"
              strokeWidth="3"
              strokeLinecap="round"
              variants={drawPath}
              custom={1.7}
            />

            {/* Steam wisps */}
            <motion.path
              d="M95 382 Q90 370 95 358"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              animate={{ 
                y: [0, -15, -30],
                opacity: [0, 0.6, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: 2 }}
            />
            <motion.path
              d="M105 380 Q110 365 105 350"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              animate={{ 
                y: [0, -18, -35],
                opacity: [0, 0.5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeOut', delay: 2.3 }}
            />
            <motion.path
              d="M115 382 Q120 368 115 355"
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              animate={{ 
                y: [0, -12, -25],
                opacity: [0, 0.55, 0],
              }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: 2.6 }}
            />
          </motion.g>

          {/* ===== DETAILED MONITOR - MATCHING SCREENSHOT ===== */}
          <motion.g>
            {/* Monitor stand base */}
            <motion.ellipse 
              cx="320" cy="428" rx="35" ry="8" 
              fill="#c0c0c0"
              variants={fadeIn}
              custom={1.3}
            />
            {/* Monitor stand neck */}
            <motion.rect 
              x="305" y="400" width="30" height="30" 
              fill="#d4d4d4"
              variants={fadeIn}
              custom={1.4}
            />
            
            {/* Monitor outer frame */}
            <motion.rect 
              x="170" y="245" width="300" height="160" 
              fill="url(#monitorFrame)"
              stroke="#c0c0c0"
              strokeWidth="3"
              rx="8"
              variants={fadeIn}
              custom={1.5}
            />
            
            {/* Monitor screen bezel */}
            <motion.rect 
              x="180" y="255" width="280" height="140" 
              fill="#2d2d3a"
              rx="4"
              variants={fadeIn}
              custom={1.6}
            />

            {/* ===== SCREEN CONTENT - CODE EDITOR STYLE ===== */}
            <motion.g variants={fadeIn} custom={1.8}>
              
              {/* Left panel - Preview/Design panel */}
              <rect x="185" y="260" width="115" height="130" fill="#3d3d4a" />
              
              {/* Preview card - like a component preview */}
              <rect x="195" y="275" width="95" height="65" fill="#d8b4d8" rx="4" />
              {/* Card header stripe */}
              <rect x="195" y="275" width="95" height="15" fill="#c9a0c9" rx="4" />
              <rect x="195" y="286" width="95" height="4" fill="#c9a0c9" />
              {/* Card content lines */}
              <rect x="202" y="298" width="60" height="4" fill="rgba(255,255,255,0.7)" rx="1" />
              <rect x="202" y="308" width="50" height="3" fill="rgba(255,255,255,0.5)" rx="1" />
              <rect x="202" y="316" width="55" height="3" fill="rgba(255,255,255,0.5)" rx="1" />
              <rect x="202" y="324" width="40" height="3" fill="rgba(255,255,255,0.5)" rx="1" />
              
              {/* Preview controls */}
              <rect x="195" y="350" width="95" height="30" fill="#4a4a5a" rx="2" />
              <circle cx="210" cy="365" r="5" fill="#6b7280" />
              <circle cx="230" cy="365" r="5" fill="#6b7280" />
              <rect x="250" y="360" width="30" height="10" fill="#6b7280" rx="2" />

              {/* Right panel - Code editor */}
              <rect x="305" y="260" width="150" height="130" fill="#1e1e2e" />
              
              {/* Editor tabs */}
              <rect x="305" y="260" width="150" height="18" fill="#2a2a3a" />
              <rect x="308" y="263" width="45" height="12" fill="#1e1e2e" rx="2" />
              <text x="315" y="273" fill="#9ca3af" fontSize="7" fontFamily="monospace">index.tsx</text>
              
              {/* Line numbers */}
              <rect x="305" y="278" width="18" height="112" fill="#252535" />
              <text x="310" y="292" fill="#5a5a7a" fontSize="7" fontFamily="monospace">1</text>
              <text x="310" y="304" fill="#5a5a7a" fontSize="7" fontFamily="monospace">2</text>
              <text x="310" y="316" fill="#5a5a7a" fontSize="7" fontFamily="monospace">3</text>
              <text x="310" y="328" fill="#5a5a7a" fontSize="7" fontFamily="monospace">4</text>
              <text x="310" y="340" fill="#5a5a7a" fontSize="7" fontFamily="monospace">5</text>
              <text x="310" y="352" fill="#5a5a7a" fontSize="7" fontFamily="monospace">6</text>
              <text x="310" y="364" fill="#5a5a7a" fontSize="7" fontFamily="monospace">7</text>
              <text x="310" y="376" fill="#5a5a7a" fontSize="7" fontFamily="monospace">8</text>

              {/* Code lines with syntax highlighting */}
              <motion.rect 
                x="328" y="285" width="35" height="4" fill="#c792ea" 
                initial={{ width: 0 }} animate={{ width: 35 }}
                transition={{ delay: 2.2, duration: 0.15 }}
              />
              <motion.rect 
                x="368" y="285" width="25" height="4" fill="#82aaff" 
                initial={{ width: 0 }} animate={{ width: 25 }}
                transition={{ delay: 2.3, duration: 0.15 }}
              />
              
              <motion.rect 
                x="333" y="297" width="45" height="4" fill="#f78c6c" 
                initial={{ width: 0 }} animate={{ width: 45 }}
                transition={{ delay: 2.4, duration: 0.15 }}
              />
              <motion.rect 
                x="383" y="297" width="30" height="4" fill="#c3e88d" 
                initial={{ width: 0 }} animate={{ width: 30 }}
                transition={{ delay: 2.5, duration: 0.15 }}
              />
              
              <motion.rect 
                x="338" y="309" width="55" height="4" fill="#89ddff" 
                initial={{ width: 0 }} animate={{ width: 55 }}
                transition={{ delay: 2.6, duration: 0.15 }}
              />
              
              <motion.rect 
                x="338" y="321" width="40" height="4" fill="#ffcb6b" 
                initial={{ width: 0 }} animate={{ width: 40 }}
                transition={{ delay: 2.7, duration: 0.15 }}
              />
              <motion.rect 
                x="383" y="321" width="50" height="4" fill="#c792ea" 
                initial={{ width: 0 }} animate={{ width: 50 }}
                transition={{ delay: 2.8, duration: 0.15 }}
              />
              
              <motion.rect 
                x="338" y="333" width="60" height="4" fill="#82aaff" 
                initial={{ width: 0 }} animate={{ width: 60 }}
                transition={{ delay: 2.9, duration: 0.15 }}
              />
              
              <motion.rect 
                x="333" y="345" width="30" height="4" fill="#f78c6c" 
                initial={{ width: 0 }} animate={{ width: 30 }}
                transition={{ delay: 3.0, duration: 0.15 }}
              />
              
              <motion.rect 
                x="328" y="357" width="25" height="4" fill="#c792ea" 
                initial={{ width: 0 }} animate={{ width: 25 }}
                transition={{ delay: 3.1, duration: 0.15 }}
              />

              {/* Terminal panel at bottom right */}
              <rect x="385" y="320" width="65" height="65" fill="#1a1a2a" rx="3" />
              {/* Terminal header */}
              <rect x="385" y="320" width="65" height="12" fill="#2d2d3d" rx="3" />
              <rect x="385" y="329" width="65" height="3" fill="#2d2d3d" />
              {/* Terminal dots */}
              <circle cx="393" cy="326" r="2.5" fill="#ff5f56" />
              <circle cx="401" cy="326" r="2.5" fill="#ffbd2e" />
              <circle cx="409" cy="326" r="2.5" fill="#27ca40" />
              {/* Terminal prompt */}
              <text x="390" y="345" fill="#4ecdc4" fontSize="6" fontFamily="monospace">❯</text>
              <rect x="400" y="340" width="35" height="4" fill="#c3e88d" />
              {/* Terminal cursor */}
              <motion.rect
                x="438" y="339"
                width="6" height="8"
                fill="#4ecdc4"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              {/* Terminal output */}
              <rect x="390" y="355" width="50" height="3" fill="#6b7280" />
              <rect x="390" y="362" width="40" height="3" fill="#6b7280" />
              <rect x="390" y="369" width="55" height="3" fill="#c3e88d" />
              
            </motion.g>

            {/* Monitor webcam */}
            <motion.circle 
              cx="320" cy="250" r="3" 
              fill="#4b5563"
              variants={fadeIn}
              custom={2.0}
            />
          </motion.g>

          {/* ===== MOUSE ===== */}
          <motion.g>
            <motion.ellipse 
              cx="480" cy="420" rx="18" ry="10" 
              fill="#e5e7eb"
              stroke="#d1d5db"
              strokeWidth="2"
              variants={fadeIn}
              custom={2.2}
            />
            {/* Mouse scroll wheel */}
            <motion.rect 
              x="477" y="412" width="6" height="8" 
              fill="#9ca3af"
              rx="2"
              variants={fadeIn}
              custom={2.3}
            />
            {/* Mouse cable */}
            <motion.path
              d="M480 410 Q480 395 495 390 Q520 380 530 400"
              stroke="#d1d5db"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              variants={drawPath}
              custom={2.4}
            />
          </motion.g>
        </motion.g>

        {/* ===== FLOATING DECORATIVE ELEMENTS ===== */}
        
        {/* Subtle floating particles */}
        <motion.circle
          cx="100" cy="300"
          r="2"
          fill="#4ecdc4"
          animate={{ 
            y: [0, -40, -80],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 3 }}
        />
        <motion.circle
          cx="500" cy="350"
          r="2.5"
          fill="#f9a8d4"
          animate={{ 
            y: [0, -50, -100],
            opacity: [0, 0.5, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 4 }}
        />
        <motion.circle
          cx="250" cy="420"
          r="2"
          fill="#a78bfa"
          animate={{ 
            y: [0, -35, -70],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: 4.5, repeat: Infinity, delay: 3.5 }}
        />

      </motion.svg>
    </div>
  );
}
