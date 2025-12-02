'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ParallaxElementProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // Negative = moves up on scroll, Positive = moves down
  direction?: 'vertical' | 'horizontal';
  offset?: number; // Starting offset in pixels
}

// Individual parallax element
export function ParallaxElement({
  children,
  className,
  speed = -0.2,
  direction = 'vertical',
  offset = 0,
}: ParallaxElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + speed * 300]);
  const x = useTransform(scrollYProgress, [0, 1], [offset, offset + speed * 300]);

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={direction === 'vertical' ? { y } : { x }}
    >
      {children}
    </motion.div>
  );
}

// Floating orb/glow that moves on scroll (like GitHub clouds)
interface FloatingOrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'purple' | 'blue' | 'green';
  speed?: number;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
}

export function FloatingOrb({
  className,
  size = 'md',
  color = 'primary',
  speed = -0.15,
  blur = 'lg',
}: FloatingOrbProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 400]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 0.6, 0.6, 0.3]);

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
  };

  const colorClasses = {
    primary: 'bg-primary/30',
    purple: 'bg-purple-500/30',
    blue: 'bg-blue-500/30',
    green: 'bg-green-500/30',
  };

  const blurClasses = {
    sm: 'blur-2xl',
    md: 'blur-3xl',
    lg: 'blur-[80px]',
    xl: 'blur-[120px]',
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'absolute rounded-full pointer-events-none',
        sizeClasses[size],
        colorClasses[color],
        blurClasses[blur],
        className,
      )}
      style={{ y, opacity }}
    />
  );
}

// Container with multiple floating orbs for atmospheric effect
interface ParallaxAtmosphereProps {
  className?: string;
  variant?: 'hero' | 'section' | 'minimal';
}

export function ParallaxAtmosphere({ className, variant = 'section' }: ParallaxAtmosphereProps) {
  if (variant === 'hero') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
        <FloatingOrb 
          size="xl" 
          color="primary" 
          speed={-0.1} 
          blur="xl"
          className="top-1/4 -left-1/4" 
        />
        <FloatingOrb 
          size="lg" 
          color="purple" 
          speed={-0.2} 
          blur="lg"
          className="top-1/3 right-0" 
        />
        <FloatingOrb 
          size="md" 
          color="blue" 
          speed={-0.15} 
          blur="md"
          className="bottom-1/4 left-1/4" 
        />
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
        <FloatingOrb 
          size="lg" 
          color="primary" 
          speed={-0.1} 
          blur="xl"
          className="top-0 left-1/2 -translate-x-1/2" 
        />
      </div>
    );
  }

  // Default section variant
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <FloatingOrb 
        size="lg" 
        color="primary" 
        speed={-0.12} 
        blur="xl"
        className="top-1/4 -right-1/4" 
      />
      <FloatingOrb 
        size="md" 
        color="purple" 
        speed={-0.18} 
        blur="lg"
        className="bottom-1/3 -left-1/4" 
      />
    </div>
  );
}

// Scroll-linked fade in/out for sections
interface ScrollFadeProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollFade({ children, className }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{ opacity, scale }}
    >
      {children}
    </motion.div>
  );
}
