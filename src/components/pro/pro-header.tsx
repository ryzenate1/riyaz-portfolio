'use client';

import { MobileNavigation } from '@/components/layout/mobile-navigation';
import { Container } from '@/components/ui/container';
import { useScrollThreshold } from '@/hooks/use-scroll-threshold';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const links = [
  {
    label: 'About',
    href: '/pro#about',
  },
  {
    label: 'Work',
    href: '/pro#work',
  },
  {
    label: 'Services',
    href: '/pro#services',
  },
  {
    label: 'Games',
    href: '/pro/games',
  },
  {
    label: '👋 Casual Side',
    href: '/casual',
  },
] as const;

export function ProHeader() {
  const { isScrollThresholdPassed } = useScrollThreshold();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isToggleHovered, setIsToggleHovered] = useState(false);
  const router = useRouter();

  const isBackgroundShown = isScrollThresholdPassed;

  const handleCasualClick = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/casual');
    }, 1500);
  };

  return (
    <>
      {/* Full-screen loading overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#d4af37] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Animated loader */}
            <motion.div
              className="relative w-20 h-20 mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-4 border-[#404040]/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#404040]"></div>
            </motion.div>
            
            {/* Loading text */}
            <motion.p
              className="text-2xl text-[#404040] font-bold mb-2"
              style={{ fontFamily: "'Mosk', sans-serif" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Switching to Casual Mode
            </motion.p>
            
            <motion.p
              className="text-[#404040]/70"
              style={{ fontFamily: "'Caveat', cursive", fontSize: '1.25rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Loading the personal side... 👋
            </motion.p>

            {/* Animated dots */}
            <motion.div className="flex gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-[#404040]"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
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

    <header
      aria-label="Primary"
      className="fixed top-0 z-40 w-full"
    >
      <Container>
        <div
          className={cn(
            'mt-4 rounded-full border-[0.5px] p-2 transition-colors duration-500',
            isBackgroundShown
              ? 'border-neutrals-50/20 bg-neutrals-900/60 shadow-[inset_0_1px_1px_0_rgb(255_254_249/0.3)] backdrop-blur-sm'
              : 'border-transparent bg-transparent',
          )}
        >
          <div className="flex items-center justify-between">
            {/* Left: Mobile nav + Desktop nav */}
            <div className="flex items-center">
              <MobileNavigation
                links={links}
                className="lg:hidden"
              />
              <nav
                aria-label="Primary"
                className="ms-4 hidden items-center gap-x-6 lg:flex"
              >
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-neutrals-50 after:via-neutrals-200 relative flex h-full items-center p-1 text-sm uppercase after:absolute after:inset-x-0 after:bottom-[12.25%] after:h-px after:scale-x-0 after:bg-gradient-to-r after:from-transparent after:to-transparent after:transition-transform hover:after:-scale-x-100 focus-visible:after:-scale-x-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link
                href="/pro"
                title="Navigate home"
                className="text-neutrals-50 hover:text-white transition-colors duration-200 flex items-baseline gap-1"
              >
                <span className="font-bold text-lg md:text-xl tracking-wider font-mono uppercase">
                  RYZEN
                </span>
                <span className="font-mono text-lg md:text-xl tracking-wider uppercase">
                  STUDIO
                </span>
              </Link>
            </div>

            {/* Right: Casual Mode Toggle */}
            <div className="flex items-center">
              <motion.button 
                onClick={handleCasualClick}
                onMouseEnter={() => setIsToggleHovered(true)}
                onMouseLeave={() => setIsToggleHovered(false)}
                disabled={isNavigating}
                className="relative w-[68px] h-[34px] rounded-full p-[3px] flex items-center cursor-pointer transition-all overflow-hidden group disabled:opacity-50"
                style={{
                  background: isToggleHovered 
                    ? 'linear-gradient(135deg, #ffffff 0%, #f8f8f8 50%, #f0f0f0 100%)' 
                    : 'linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #252525 100%)',
                  boxShadow: isToggleHovered 
                    ? '0 4px 15px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255,255,255,0.8)' 
                    : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                  border: isToggleHovered ? '1px solid rgba(64, 64, 64, 0.2)' : '1px solid rgba(212, 175, 55, 0.3)'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Switch to casual mode"
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(circle at 30% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 60%)'
                  }}
                />
                
                {/* Casual side icon - sun */}
                <motion.div
                  className="absolute left-[8px] text-sm z-10"
                  animate={{ 
                    opacity: isToggleHovered ? 1 : 0.3,
                    scale: isToggleHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  ☀️
                </motion.div>
                
                {/* Pro side icon - moon */}
                <motion.div
                  className="absolute right-[8px] text-sm z-10"
                  animate={{ 
                    opacity: isToggleHovered ? 0.2 : 1,
                    scale: isToggleHovered ? 0.8 : 1
                  }}
                  transition={{ duration: 0.2 }}
                >
                  🌙
                </motion.div>
                
                {/* Sliding indicator */}
                <motion.div
                  className="absolute w-[26px] h-[26px] rounded-full"
                  animate={{
                    left: isToggleHovered ? '4px' : '36px',
                    background: isToggleHovered 
                      ? 'linear-gradient(135deg, #d4af37 0%, #f0d68a 100%)'
                      : 'linear-gradient(135deg, #d4af37 0%, #b8972e 100%)'
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  style={{
                    boxShadow: '0 2px 8px rgba(212, 175, 55, 0.4)'
                  }}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </Container>
    </header>
    </>
  );
}
