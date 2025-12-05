'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/casual#writing', label: 'Writing' },
  { href: '/casual#speaking', label: 'Speaking' },
  { href: '/casual#workshop', label: 'Workshop' },
  { href: '/games', label: 'Playing' },
];

export function CasualHeader() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Track scroll to hide hint - even small scroll hides it
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleClick = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/pro');
    }, 1500);
  };

  return (
    <>
      {/* Full-screen loading overlay for Pro transition */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#0f0f1a] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Animated loader */}
            <motion.div
              className="relative w-16 h-16 mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/20" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d4af37]" />
            </motion.div>
            
            {/* Loading text */}
            <motion.p
              className="text-xl text-white font-bold mb-2"
              style={{ fontFamily: "'Mosk', sans-serif" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Switching to Pro Mode
            </motion.p>
            
            <motion.p
              className="text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Loading the professional side...
            </motion.p>

            {/* Animated dots */}
            <motion.div className="flex gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-[#d4af37]"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="fixed top-[-100%] left-4 bg-white text-gray-800 px-4 py-2 rounded z-[1000] focus:top-4 transition-all"
      >
        Skip to content
      </a>

      {/* Header bar - pro style */}
      <header className="fixed top-0 z-[100] w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-4 rounded-full border-[0.5px] border-[#404040]/20 bg-white/60 backdrop-blur-sm p-2 shadow-sm">
            <div className="flex items-center justify-between">
              
              {/* Left: Mobile hamburger + Desktop nav */}
              <div className="flex items-center">
                {/* Mobile hamburger menu */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="rounded-full px-3 py-1.5 transition-colors duration-500 lg:hidden"
                >
                  <div className="relative size-5">
                    <span
                      className={cn(
                        'absolute left-0 block h-[1.5px] w-4 bg-[#404040] transition-all duration-100',
                        isMobileMenuOpen ? 'top-[0.5rem] rotate-45' : 'top-1',
                      )}
                    />
                    <span
                      className={cn(
                        'absolute left-0 block h-[1.5px] w-4 bg-[#404040] transition-all duration-100',
                        isMobileMenuOpen ? 'top-[0.5rem] -rotate-45' : 'top-3',
                      )}
                    />
                  </div>
                  <span className="sr-only">Toggle Menu</span>
                </button>

                {/* Desktop navigation */}
                <nav className="ms-4 hidden items-center gap-x-6 lg:flex">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="relative text-[#404040] text-sm uppercase p-1 transition-all"
                      onMouseEnter={() => setHoveredLink(link.label)}
                      onMouseLeave={() => setHoveredLink(null)}
                    >
                      {link.label}
                      {/* Underline on hover */}
                      <motion.span
                        className="absolute inset-x-0 bottom-0 h-px bg-[#404040]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: hoveredLink === link.label ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Center: Logo */}
              <div className="absolute left-1/2 -translate-x-1/2">
                <Link 
                  href="/casual"
                  className="text-[#404040] hover:opacity-80 transition-opacity flex items-baseline gap-1"
                >
                  <span className="font-bold text-lg md:text-xl tracking-wider font-mono uppercase">
                    RYZEN
                  </span>
                  <span className="font-mono text-lg md:text-xl tracking-wider uppercase">
                    STUDIO
                  </span>
                </Link>
              </div>

              {/* Right: Toggle with arrow hint */}
              <div className="flex items-center gap-3">
                {/* Pro toggle */}
                <div className="relative">
                  {/* Arrow hint - hides on scroll */}
                  <AnimatePresence>
                    {!hasScrolled && (
                      <motion.div 
                        className="absolute top-[50px] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.svg
                          width="50"
                          height="45"
                          viewBox="0 0 50 45"
                          className="overflow-visible"
                          initial={{ opacity: 1 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.path
                            d="M25,42 C35,40 38,32 30,28 C22,24 20,18 28,14 C36,10 32,4 25,2"
                            stroke="#1a1a1a"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            fill="none"
                            initial={{ pathLength: 1 }}
                            animate={{ pathLength: 1 }}
                          />
                          <motion.path
                            d="M19,6 L25,0 L31,6"
                            stroke="#1a1a1a"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            initial={{ pathLength: 1 }}
                            animate={{ pathLength: 1 }}
                          />
                        </motion.svg>
                        
                        <span 
                          className="text-[#1a1a1a] whitespace-nowrap mt-2 text-center text-[16px] sm:text-[18px] lg:text-[22px]"
                          style={{ 
                            fontFamily: "'Caveat', cursive", 
                            fontWeight: 700,
                            lineHeight: 1.2
                          }}
                        >
                          Developer? Curious?<br/>This is for you! ✨
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Premium Toggle pill */}
                  <motion.button 
                    onClick={handleToggleClick}
                    onMouseEnter={() => setIsToggleHovered(true)}
                    onMouseLeave={() => setIsToggleHovered(false)}
                    disabled={isNavigating}
                    className="relative w-[68px] h-[34px] rounded-full p-[3px] flex items-center cursor-pointer transition-all overflow-hidden group disabled:opacity-50"
                    style={{
                      background: isToggleHovered 
                        ? 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #252525 100%)' 
                        : 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #f0f0f0 100%)',
                      boxShadow: isToggleHovered 
                        ? '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' 
                        : '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
                      border: isToggleHovered ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid rgba(64, 64, 64, 0.2)'
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Switch to professional mode"
                  >
                    {/* Glow effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: 'radial-gradient(circle at 70% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)'
                      }}
                    />
                    
                    {/* Casual side icon - sun */}
                    <motion.div
                      className="absolute left-[8px] text-sm z-10"
                      animate={{ 
                        opacity: isToggleHovered ? 0.2 : 1,
                        scale: isToggleHovered ? 0.8 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      ☀️
                    </motion.div>
                    
                    {/* Pro side icon - moon */}
                    <motion.div
                      className="absolute right-[8px] text-sm z-10"
                      animate={{ 
                        opacity: isToggleHovered ? 1 : 0.3,
                        scale: isToggleHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      🌙
                    </motion.div>
                    
                    {/* Toggle knob - premium gold */}
                    <motion.div
                      className="w-[26px] h-[26px] rounded-full z-20 relative"
                      style={{
                        background: 'linear-gradient(145deg, #e6c453 0%, #d4af37 30%, #c9a227 70%, #b8962a 100%)',
                        boxShadow: isToggleHovered 
                          ? '0 0 20px rgba(212, 175, 55, 0.6), 0 4px 10px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.4)' 
                          : '0 2px 8px rgba(212, 175, 55, 0.4), 0 2px 4px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.3)'
                      }}
                      animate={{ x: isToggleHovered ? 32 : 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {/* Inner shine */}
                      <div 
                        className="absolute inset-[2px] rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)'
                        }}
                      />
                    </motion.div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Popover */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="fixed top-[72px] left-4 right-4 sm:left-auto sm:right-auto sm:w-48 z-[100] bg-[#2a2a2a] backdrop-blur-lg rounded-xl overflow-hidden lg:hidden shadow-xl"
          >
            <nav className="flex flex-col py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-200 hover:text-white hover:tracking-wider px-4 py-2.5 text-sm uppercase transition-all"
                >
                  {link.label}
                </Link>
              ))}
              {/* Mobile toggle option */}
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleToggleClick();
                }}
                className="text-gray-200 hover:text-white hover:tracking-wider px-4 py-2.5 text-sm uppercase transition-all text-left border-t border-gray-600 mt-2 pt-3"
              >
                Pro Mode 🌙
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
