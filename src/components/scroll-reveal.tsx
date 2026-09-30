'use client';

import { cn } from '@/lib/utils';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  noAnimation?: boolean; // Skip animation, show immediately
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 0.6,
  once = true,
  threshold = 0.2,
  noAnimation = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold 
  });
  const shouldReduceMotion = useReducedMotion();

  // If noAnimation or the user prefers reduced motion, render without animation
  if (noAnimation || shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
        return { x: 0, y: 0 };
    }
  };

  const initial = getInitialPosition();

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ 
        opacity: 0,
        ...initial,
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
      } : undefined}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Custom easing for smooth feel
      }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children reveal
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function StaggerReveal({
  children,
  className,
  staggerDelay = 0.1,
  direction = 'up',
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const getDirection = () => {
    switch (direction) {
      case 'up': return { y: 30 };
      case 'down': return { y: -30 };
      case 'left': return { x: 30 };
      case 'right': return { x: -30 };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      ...getDirection(),
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}

// Text reveal with mask effect (GitHub style)
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ children, className, delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={cn('inline-block', className)}>{children}</span>;
  }

  return (
    <span ref={ref} className={cn('inline-block overflow-hidden', className)}>
      <motion.span
        className="inline-block"
        initial={{ y: '100%' }}
        animate={isInView ? { y: 0 } : undefined}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}
