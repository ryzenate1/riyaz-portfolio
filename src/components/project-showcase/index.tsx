'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { KadalShowcase } from './kadal-showcase';
import { BusBuddyShowcase } from './busbuddy-showcase';
import { SairaShowcase } from './saira-showcase';

export type ProjectId = 'kadal' | 'busbuddy' | 'saira';

export interface ProjectData {
  id: ProjectId;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  accentColor: string;
  icon: string;
  techStack: { name: string; icon: string; color: string }[];
  features: string[];
  stats: { label: string; value: string }[];
  links: { github?: string; live?: string };
}

export const projectsData: ProjectData[] = [
  {
    id: 'kadal',
    title: 'Kadal Thunai',
    subtitle: 'Premium Seafood E-Commerce',
    description: 'A premium fresh seafood e-commerce platform targeting the Indian market. Features Tamil language support, weight-based pricing, and same-day delivery tracking.',
    gradient: 'from-[#bd2d3c] via-[#e1a653] to-[#bd2d3c]',
    accentColor: '#bd2d3c',
    icon: '🐟',
    techStack: [
      { name: 'Next.js 15', icon: '⚡', color: '#000' },
      { name: 'React 19', icon: '⚛️', color: '#61DAFB' },
      { name: 'Tailwind', icon: '🎨', color: '#06B6D4' },
      { name: 'Framer Motion', icon: '🎭', color: '#FF4154' },
      { name: 'GSAP', icon: '🟢', color: '#88CE02' },
      { name: 'Supabase', icon: '💾', color: '#3ECF8E' },
      { name: 'Prisma', icon: '🔷', color: '#2D3748' },
    ],
    features: [
      'Tamil/English Bilingual Support',
      'GSAP Animated Hero Banner',
      'Weight-Based Dynamic Pricing',
      'Swiggy-Style Cart & Checkout',
      'Real-time Order Tracking',
      'Trust Badge System',
    ],
    stats: [
      { label: 'Components', value: '50+' },
      { label: 'API Routes', value: '25+' },
      { label: 'Animations', value: '30+' },
    ],
    links: { github: '#', live: '#' },
  },
  {
    id: 'busbuddy',
    title: 'BusBuddy',
    subtitle: 'Smart Public Transport Tracker',
    description: 'Smart India Hackathon 2025 project — A real-time bus tracking system with multi-language voice commands, IoT device simulation, and offline-first architecture.',
    gradient: 'from-[#E83E59] via-[#FF6B6B] to-[#E83E59]',
    accentColor: '#E83E59',
    icon: '🚌',
    techStack: [
      { name: 'Next.js 14', icon: '⚡', color: '#000' },
      { name: 'Socket.IO', icon: '🔌', color: '#010101' },
      { name: 'Leaflet Maps', icon: '🗺️', color: '#199900' },
      { name: 'Web Speech API', icon: '🎤', color: '#4285F4' },
      { name: 'Zustand', icon: '🐻', color: '#433D39' },
      { name: 'Supabase RT', icon: '⚡', color: '#3ECF8E' },
    ],
    features: [
      '4-Language Voice Commands',
      'Real-time WebSocket Tracking',
      'IoT Device Simulation',
      'Offline-First PWA',
      'Custom Map Markers',
      'Tanglish/Hinglish NLP',
    ],
    stats: [
      { label: 'Languages', value: '4' },
      { label: 'Response', value: '<100ms' },
      { label: 'IoT Devices', value: '3' },
    ],
    links: { github: '#', live: '#' },
  },
  {
    id: 'saira',
    title: 'Saira Tickets',
    subtitle: 'Bus Ticket Booking Platform',
    description: 'A full-stack bus ticket booking platform with interactive seat selection, glassmorphism design, and complete booking flow from search to payment.',
    gradient: 'from-[#e11d48] via-[#f97316] to-[#e11d48]',
    accentColor: '#e11d48',
    icon: '🎫',
    techStack: [
      { name: 'Next.js 15', icon: '⚡', color: '#000' },
      { name: 'Spring Boot', icon: '🍃', color: '#6DB33F' },
      { name: 'Clerk Auth', icon: '🔐', color: '#6C47FF' },
      { name: 'Framer Motion', icon: '🎭', color: '#FF4154' },
      { name: 'Radix UI', icon: '🎯', color: '#111' },
      { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
    ],
    features: [
      'Interactive Seat Map',
      'Glassmorphism UI Design',
      'Multi-Step Booking Flow',
      'Advanced Bus Filtering',
      'Real-time Seat Updates',
      'Spring Boot Backend',
    ],
    stats: [
      { label: 'UI Components', value: '45+' },
      { label: 'API Endpoints', value: '20+' },
      { label: 'Booking Steps', value: '5' },
    ],
    links: { github: '#', live: '#' },
  },
];

export function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState<ProjectId>('kadal');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const currentProject = projectsData.find((p) => p.id === activeProject)!;

  return (
    <div ref={containerRef} className="w-full">
      {/* Project Selector Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {projectsData.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveProject(project.id)}
            className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeProject === project.id
                ? 'text-white'
                : 'text-neutrals-400 hover:text-neutrals-200 bg-neutrals-800/50 hover:bg-neutrals-800'
            }`}
          >
            {/* Active background gradient */}
            {activeProject === project.id && (
              <motion.div
                layoutId="activeProjectBg"
                className={`absolute inset-0 bg-gradient-to-r ${project.gradient} rounded-xl opacity-80`}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span className="text-xl">{project.icon}</span>
              <span className="hidden sm:inline">{project.title}</span>
            </span>
          </button>
        ))}
      </motion.div>

      {/* Project Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeProject === 'kadal' && <KadalShowcase project={currentProject} />}
          {activeProject === 'busbuddy' && <BusBuddyShowcase project={currentProject} />}
          {activeProject === 'saira' && <SairaShowcase project={currentProject} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
