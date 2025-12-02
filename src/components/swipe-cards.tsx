'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence, type PanInfo } from 'framer-motion';
import Link from 'next/link';

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  slug: string;
  gradient: string;
  icon: string;
};

const projects: Project[] = [
  {
    id: '1',
    title: 'Kadal Thunai',
    description: 'A premium fish e-commerce platform delivering fresh seafood directly from fishermen to your doorstep.',
    tags: ['E-Commerce', 'Next.js', 'Stripe'],
    slug: 'kadal-thunai',
    gradient: 'from-blue-900/40 to-cyan-900/40',
    icon: '🐟',
  },
  {
    id: '2',
    title: 'Saira Tickets',
    description: 'Modern ticket booking interface with seamless seat selection and payment flow.',
    tags: ['UI/UX', 'Booking System', 'Design'],
    slug: 'saira-tickets',
    gradient: 'from-purple-900/40 to-pink-900/40',
    icon: '🎫',
  },
  {
    id: '3',
    title: 'BLE Bus Tracker',
    description: 'Smart India Hackathon project — BLE & LoRa based real-time bus tracking system.',
    tags: ['IoT', 'BLE', 'LoRa', 'Hackathon'],
    slug: 'bus-tracker',
    gradient: 'from-green-900/40 to-emerald-900/40',
    icon: '🚌',
  },
];

function SwipeCard({ 
  project, 
  onSwipe,
  isTop,
}: { 
  project: Project; 
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);
  
  // Pre-compute transforms at top level to avoid conditional hook calls
  const skipOpacity = useTransform(x, [-100, 0], [1, 0]);
  const viewOpacity = useTransform(x, [0, 100], [0, 1]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      onSwipe('right');
    } else if (info.offset.x < -threshold) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none"
      style={{ x, rotate, opacity }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ 
        x: x.get() > 0 ? 300 : -300, 
        opacity: 0,
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.3 }}
    >
      <div className={`relative h-full bg-gradient-to-br ${project.gradient} border border-neutrals-800 rounded-2xl overflow-hidden`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        {/* Icon */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-6xl opacity-20">
          {project.icon}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-neutrals-950 via-neutrals-950/90 to-transparent pt-32">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-neutrals-400 bg-neutrals-800/80 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-medium text-neutrals-100 mb-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-neutrals-400 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* View link */}
          <Link 
            href={`/project/${project.slug}`}
            className="inline-flex items-center text-neutrals-300 text-sm hover:text-neutrals-100 transition-colors"
          >
            View project
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* Swipe indicators */}
        {isTop && (
          <>
            <motion.div
              className="absolute top-6 left-6 px-3 py-1.5 border border-neutrals-500 rounded text-neutrals-500 font-medium text-xs uppercase tracking-wider rotate-[-12deg]"
              style={{ opacity: skipOpacity }}
            >
              Skip
            </motion.div>
            <motion.div
              className="absolute top-6 right-6 px-3 py-1.5 border border-neutrals-300 rounded text-neutrals-300 font-medium text-xs uppercase tracking-wider rotate-[12deg]"
              style={{ opacity: viewOpacity }}
            >
              View
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export function SwipeCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 150);
  };

  const currentProject = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Card stack */}
      <div className="relative h-[440px] sm:h-[480px]">
        <AnimatePresence mode="popLayout">
          {/* Background card (next) */}
          <motion.div
            key={`bg-${nextProject.id}`}
            className="absolute inset-0"
            initial={{ scale: 0.9 }}
            animate={{ scale: 0.95, y: 8 }}
            style={{ zIndex: 0 }}
          >
            <div className={`h-full bg-gradient-to-br ${nextProject.gradient} border border-neutrals-800 rounded-2xl opacity-50`} />
          </motion.div>

          {/* Top card (current) */}
          <SwipeCard
            key={currentProject.id}
            project={currentProject}
            onSwipe={handleSwipe}
            isTop={true}
          />
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={() => handleSwipe('left')}
          className="w-11 h-11 rounded-full border border-neutrals-700 flex items-center justify-center text-neutrals-500 hover:text-neutrals-300 hover:border-neutrals-600 transition-colors"
          aria-label="Skip project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-neutrals-200 w-4' 
                  : 'bg-neutrals-700 hover:bg-neutrals-600'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <Link
          href={`/project/${currentProject.slug}`}
          className="w-11 h-11 rounded-full border border-neutrals-700 flex items-center justify-center text-neutrals-500 hover:text-neutrals-300 hover:border-neutrals-600 transition-colors"
          aria-label="View project"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {/* Swipe hint */}
      <p className="text-center text-neutrals-600 text-xs mt-5">
        Swipe to browse · Tap to view details
      </p>
    </div>
  );
}
