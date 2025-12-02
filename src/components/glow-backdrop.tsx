'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlowBackdropProps {
  className?: string;
  variant?: 'hero' | 'section' | 'card' | 'subtle';
  position?: 'top' | 'center' | 'bottom';
  animated?: boolean;
}

const glowVariants = {
  hero: 'w-[800px] h-[800px] opacity-30',
  section: 'w-[600px] h-[600px] opacity-20',
  card: 'w-[300px] h-[300px] opacity-25',
  subtle: 'w-[400px] h-[400px] opacity-15',
};

const positionClasses = {
  top: '-top-1/4 left-1/2 -translate-x-1/2',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  bottom: '-bottom-1/4 left-1/2 -translate-x-1/2',
};

export function GlowBackdrop({
  className,
  variant = 'section',
  position = 'center',
  animated = false,
}: GlowBackdropProps) {
  const baseClasses = cn(
    'absolute pointer-events-none rounded-full blur-[120px]',
    'bg-gradient-radial from-primary/60 via-primary/20 to-transparent',
    glowVariants[variant],
    positionClasses[position],
    className
  );

  if (animated) {
    return (
      <motion.div
        className={baseClasses}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    );
  }

  return <div className={baseClasses} />;
}

// Dual glow for hero sections
export function HeroGlow({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Primary large glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-primary/40 via-primary/10 to-transparent rounded-full blur-[100px]" />
      {/* Secondary accent glow */}
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-violet-500/20 via-transparent to-transparent rounded-full blur-[80px]" />
    </div>
  );
}

// Floating orb for ambient effect
export function FloatingOrb({ 
  className,
  delay = 0 
}: { 
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        'absolute w-2 h-2 rounded-full bg-primary/60 blur-sm',
        className
      )}
      animate={{
        y: [-20, 20, -20],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
