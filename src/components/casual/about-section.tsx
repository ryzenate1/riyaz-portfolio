'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Cloud, 
  Dumbbell, 
  Code2, 
  Camera, 
  ChefHat, 
  Zap, 
  ArrowRight,
  Sparkles,
  Target,
  Flame,
  Heart,
  Trophy,
  Lightbulb,
  AlertCircle
} from 'lucide-react';

// ==================== ANIMATION HELPERS ====================

function Reveal({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: React.ReactNode; 
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ==================== MAIN ABOUT SECTION ====================

export function AboutSection() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="about-sections bg-[#faf8f5]">
      
      {/* ==================== INTRO - BOLD STATEMENT ==================== */}
      <section className="min-h-[80vh] flex items-center relative overflow-hidden">
        {/* Subtle background lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute h-px bg-[#1a1a2e] w-full"
              style={{ top: `${i * 5}%` }}
            />
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-32">
          <Reveal>
            <p className="text-[#d4af37] font-medium uppercase tracking-[0.3em] text-sm mb-8">
              About Me
            </p>
          </Reveal>
          
          <h1 className="mb-12">
            <Reveal delay={0.1}>
              <span 
                className="block text-5xl md:text-7xl lg:text-[5.5rem] font-black text-[#1a1a2e] leading-[1.05]"
                style={{ fontFamily: "'Mosk', sans-serif" }}
              >
                I&apos;m Riyaz.
              </span>
            </Reveal>
            <Reveal delay={0.2}>
              <span 
                className="block text-5xl md:text-7xl lg:text-[5.5rem] font-black text-[#1a1a2e]/20 leading-[1.05]"
                style={{ fontFamily: "'Mosk', sans-serif" }}
              >
                17 years old.
              </span>
            </Reveal>
            <Reveal delay={0.3}>
              <span 
                className="block text-5xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.05]"
                style={{ fontFamily: "'Mosk', sans-serif" }}
              >
                <span className="text-[#d4af37]">Curious</span>
                <span className="text-[#1a1a2e]"> about everything.</span>
              </span>
            </Reveal>
          </h1>

          <Reveal delay={0.4}>
            <p className="text-xl md:text-2xl text-[#555] max-w-2xl leading-relaxed">
              A high schooler from St. Joseph&apos;s studying Computer Science, 
              running on curiosity and caffeine. An ex-
              <a 
                href="https://www.trustchildren.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#d4af37] hover:underline"
              >
                Gurukulam
              </a>{' '}
              student.
            </p>
          </Reveal>

          {/* Role pills */}
          <Reveal delay={0.5}>
            <div className="flex flex-wrap gap-4 mt-12">
              {[
                { label: 'Developer', icon: Code2 },
                { label: 'Athlete', icon: Dumbbell },
                { label: 'Creator', icon: Camera },
                { label: 'Entrepreneur', icon: Zap },
              ].map(({ label, icon: Icon }) => (
                <span 
                  key={label}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#1a1a2e] text-[#1a1a2e] font-medium hover:bg-[#1a1a2e] hover:text-white transition-colors duration-300"
                >
                  <Icon size={18} />
                  {label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== MEET ME - PROFILE IMAGE ==================== */}
      <section className="py-24 md:py-32 bg-[#faf8f5] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Image Side */}
            <Reveal className="relative">
              <div className="relative -mt-28 md:-mt-44">
                {/* Decorative frame */}
                <div className="absolute -inset-4 md:-inset-6 border-2 border-[#d4af37]/30 -rotate-3" />
                <div className="absolute -inset-4 md:-inset-6 border-2 border-[#1a1a2e]/10 rotate-2" />
                
                {/* Main image container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1a1a2e]">
                  <Image
                    src="/images/riyaz-profile.jpg"
                    alt="Riyaz - Developer, Athlete, Creator"
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/40 via-transparent to-transparent" />
                </div>
                
                {/* Floating badge */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-[#d4af37] text-[#1a1a2e] px-6 py-3 font-bold"
                  initial={{ rotate: -5 }}
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  style={{ fontFamily: "'Mosk', sans-serif" }}
                >
                  Class of &apos;26
                </motion.div>
              </div>
            </Reveal>

            {/* Text Side */}
            <div className="md:pl-8">
              <Reveal>
                <p className="text-[#d4af37] font-medium uppercase tracking-[0.3em] text-sm mb-4">
                  Nice to meet you
                </p>
              </Reveal>
              
              <Reveal delay={0.1}>
                <h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a2e] mb-8 leading-tight"
                  style={{ fontFamily: "'Mosk', sans-serif" }}
                >
                  Meet Me
                </h2>
              </Reveal>
              
              <Reveal delay={0.2}>
                <p className="text-lg md:text-xl text-[#555] leading-relaxed mb-6">
                  That&apos;s me — probably thinking about my next project, 
                  or what to cook for dinner, or how clouds work.
                </p>
              </Reveal>
              
              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-[#555] leading-relaxed mb-8">
                  A 17-year-old from Chennai who codes, lifts, and questions everything. 
                  This portfolio is my digital home — raw, real, and always evolving.
                </p>
              </Reveal>
              
              <Reveal delay={0.4}>
                <div className="flex items-center gap-4">
                  <span 
                    className="text-2xl md:text-3xl font-bold text-[#1a1a2e]"
                    style={{ fontFamily: "'Caveat', cursive" }}
                  >
                    Welcome to my world ✨
                  </span>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== THE CHAOS ==================== */}
      <section className="py-32 bg-[#1a1a2e] text-white relative">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[#d4af37] font-medium uppercase tracking-[0.3em] text-sm mb-6">
              The Beautiful Mess
            </p>
          </Reveal>
          
          <Reveal delay={0.1}>
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white/90 mb-12">
              My brain doesn&apos;t know how to rest. I&apos;m either studying fitness, 
              learning cloud systems, editing videos, cooking something random, 
              or thinking about why the world works the way it does.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="border-l-2 border-[#d4af37] pl-8 py-4">
              <p 
                className="text-3xl md:text-4xl text-[#d4af37] font-bold"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                &ldquo;My life sounds like a mess, but it&apos;s a beautiful mess.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== WHAT I DO - MINIMAL GRID ==================== */}
      <section className="py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[#d4af37] font-medium uppercase tracking-[0.3em] text-sm mb-4">
              What I Do
            </p>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a2e] mb-20"
              style={{ fontFamily: "'Mosk', sans-serif" }}
            >
              The things I obsess over.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-16">
            {[
              { 
                icon: Cloud, 
                title: 'Cloud & Infrastructure',
                desc: 'AWS, Azure, GCP, Linux, Docker. Built Ryzen Clouds — my own hosting company. From physical servers to cloud architecture.'
              },
              { 
                icon: Dumbbell, 
                title: 'Fitness Science',
                desc: 'Kinesiology, biomechanics, nutrition. I study muscles like I study code. Training to failure, tracking everything, always pushing.'
              },
              { 
                icon: Code2, 
                title: 'Development',
                desc: 'Full-stack development. Hardware, firmware, networking. Understanding systems from the ground up.'
              },
              { 
                icon: Camera, 
                title: 'Creative Work',
                desc: 'Photography, cinematography, video editing. The visual side of my brain that never stops creating.'
              },
              { 
                icon: ChefHat, 
                title: 'Cooking',
                desc: 'Nutrition-focused experiments. Making food that actually tastes good while hitting macros.'
              },
              { 
                icon: Sparkles, 
                title: 'Always Learning',
                desc: 'Singing, dancing, new technologies. My brain sees everything as a skill tree to unlock.'
              },
            ].map(({ icon: Icon, title, desc }, index) => (
              <Reveal key={title} delay={index * 0.1}>
                <div className="group">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 flex items-center justify-center border-2 border-[#1a1a2e] group-hover:bg-[#d4af37] group-hover:border-[#d4af37] transition-colors duration-300">
                      <Icon size={24} className="text-[#1a1a2e] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#1a1a2e] mb-3">{title}</h3>
                      <p className="text-[#666] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== MY STORY - TIMELINE ==================== */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[#d4af37] font-medium uppercase tracking-[0.3em] text-sm mb-4">
              The Origin Story
            </p>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a2e] mb-20"
              style={{ fontFamily: "'Mosk', sans-serif" }}
            >
              How it all started.
            </h2>
          </Reveal>

          <div className="space-y-16">
            {[
              { 
                phase: '01',
                title: 'The Tinkerer',
                text: 'Started by breaking things apart to see how they worked. Modified games, wrote scripts, learned that everything is hackable if you\'re curious enough.'
              },
              { 
                phase: '02',
                title: 'The Deep Dive',
                text: 'Went from scripts to real programming. Lua, then Python, then everything else. Each language opened a new door.'
              },
              { 
                phase: '03',
                title: 'Building Real Things',
                text: 'Started Ryzen Clouds. Handled real clients, set up real servers, solved real problems at 2 AM. Made mistakes that taught me more than any textbook.'
              },
              { 
                phase: '04',
                title: 'The Gym Became a Classroom',
                text: 'Fitness hit different. Heavy sets, partials, stretch-focused movements. Recovery was bad, nutrition inconsistent, but I studied anatomy and biomechanics like my life depended on it.'
              },
              { 
                phase: '05',
                title: 'Now',
                text: 'All of it merged. Tech, fitness, creativity — not separate paths, but one evolving identity. Still learning. Still breaking things. Still curious.'
              },
            ].map(({ phase, title, text }, index) => (
              <Reveal key={phase} delay={index * 0.1}>
                <div className="flex gap-8 md:gap-12">
                  <div className="flex-shrink-0">
                    <span className="text-6xl md:text-7xl font-black text-[#1a1a2e]/10">{phase}</span>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3">{title}</h3>
                    <p className="text-lg text-[#555] leading-relaxed">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CURIOSITY - THE DRIVING FORCE ==================== */}
      <section className="py-32 bg-[#1a1a2e] overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[#d4af37] font-medium uppercase tracking-[0.3em] text-sm mb-4">
              The Driving Force
            </p>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-16"
              style={{ fontFamily: "'Mosk', sans-serif" }}
            >
              Curiosity.
            </h2>
          </Reveal>

          {/* Rhythmic list */}
          <div className="space-y-6 mb-16">
            {[
              'Curiosity is the reason I know cloud engineering at 17.',
              'Curiosity is the reason I understand muscles, tendons, force, and biomechanics.',
              'Curiosity is the reason I improved my physique despite low ferritin and insane training.',
              'Curiosity is the reason I built servers, ran a company, and learned networking.',
              'Curiosity is the reason I learned cooking, video editing, and camera science.',
              'Curiosity is the reason I\'ve changed my dream twenty times — but kept moving.',
            ].map((line, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <p className="text-xl md:text-2xl text-white/80 leading-relaxed pl-6 border-l-2 border-[#d4af37]/50 hover:border-[#d4af37] hover:text-white transition-all duration-300">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="border-t border-white/10 pt-12">
              <p className="text-xl md:text-2xl text-white/60 leading-relaxed mb-4">
                If someone asks me why I became like this, I genuinely don&apos;t know.
              </p>
              <p className="text-2xl md:text-3xl text-[#d4af37] font-bold">
                All I know is that once I start learning something, I don&apos;t stop until I feel like I own it.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== THE STRUGGLE ==================== */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[#d4af37] font-medium uppercase tracking-[0.3em] text-sm mb-4">
              The Reality
            </p>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a2e] mb-16"
              style={{ fontFamily: "'Mosk', sans-serif" }}
            >
              Being me feels like...
            </h2>
          </Reveal>

          <div className="space-y-8 mb-16">
            {[
              { text: 'Low ferritin. Still pushing through tough sessions.', icon: Flame },
              { text: 'Perfectionist. But also chaotic.', icon: Zap },
              { text: 'Want to master everything. Time slaps me every day.', icon: Target },
              { text: 'Try to stay consistent. Life keeps throwing problems.', icon: AlertCircle },
              { text: 'Burnt out, confused, overwhelmed — but I don\'t stop.', icon: Heart },
            ].map(({ text, icon: Icon }, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 flex items-center justify-center border-2 border-[#1a1a2e]/20 group-hover:border-[#d4af37] group-hover:bg-[#d4af37] transition-all duration-300">
                    <Icon size={20} className="text-[#1a1a2e]/40 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xl md:text-2xl text-[#1a1a2e]/80 group-hover:text-[#1a1a2e] transition-colors">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.6}>
            <div className="bg-[#faf8f5] p-8 md:p-12 border-l-4 border-[#d4af37]">
              <p className="text-2xl md:text-3xl text-[#1a1a2e] font-medium leading-relaxed">
                Every mistake shaped me. Every failure taught me something I&apos;ll use forever.
                <span className="text-[#d4af37]"> I don&apos;t hide my past because it literally built the person I am today.</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== THE FUTURE ==================== */}
      <section className="py-32 bg-[#1a1a2e] relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full" style={{ 
            backgroundImage: 'linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
          <Reveal>
            <p className="text-[#d4af37] font-medium uppercase tracking-[0.3em] text-sm mb-4">
              What&apos;s Next
            </p>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-16"
              style={{ fontFamily: "'Mosk', sans-serif" }}
            >
              The doors are open.
            </h2>
          </Reveal>

          <div className="space-y-12 mb-16">
            {[
              { 
                icon: Code2, 
                title: 'Developer',
                text: 'Not just code. Understanding systems from hardware to cloud, end to end.'
              },
              { 
                icon: Trophy, 
                title: 'Athlete',
                text: 'Not just training. Performing. Competing. Pushing limits that matter.'
              },
              { 
                icon: Camera, 
                title: 'Creator',
                text: 'Videos, photos, stories. Building things that make people feel something.'
              },
              { 
                icon: Zap, 
                title: 'All-Rounder',
                text: 'Strong, smart, creative, technical, artistic. All of it. No compromises.'
              },
            ].map(({ icon: Icon, title, text }, index) => (
              <Reveal key={title} delay={index * 0.1}>
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 flex items-center justify-center bg-[#d4af37] flex-shrink-0">
                    <Icon size={24} className="text-[#1a1a2e]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                    <p className="text-lg text-white/60">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="border-t border-white/10 pt-12 text-center">
              <p className="text-xl text-white/60 mb-4">
                I don&apos;t know where life will take me, but I&apos;m ready for all of it.
              </p>
              <p 
                className="text-3xl md:text-4xl text-[#d4af37] font-bold"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                The doors are wide open, and I&apos;m walking through every single one.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ==================== ADVICE - MINIMAL ==================== */}
      <section className="py-32 bg-[#d4af37]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <Reveal>
            <Lightbulb size={48} className="mx-auto mb-8 text-[#1a1a2e]" />
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1a2e] mb-12"
              style={{ fontFamily: "'Mosk', sans-serif" }}
            >
              My advice to you.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4 text-xl md:text-2xl text-[#1a1a2e]">
              <p className="font-bold">Be curious. Ask why. Break stuff. Fix stuff. Learn.</p>
              <p className="text-[#1a1a2e]/70">Don&apos;t be scared of mistakes.</p>
              <p className="text-[#1a1a2e]/70">Don&apos;t be scared of failing.</p>
              <p className="text-[#1a1a2e]/70">Don&apos;t be scared of restarting.</p>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}

// ==================== PREMIUM FOOTER ====================
export function CasualFooter() {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleProClick = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/pro');
    }, 1500);
  };

  return (
    <>
      {/* Full-screen loading overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#0f0f1a] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-16 h-16 mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-[#d4af37]/20" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#d4af37]" />
            </motion.div>
            
            <motion.p
              className="text-xl text-white font-bold mb-2"
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
              Loading...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="bg-[#0f0f1a] text-white">
        {/* CTA Section */}
        <div className="py-24 px-6 md:px-12 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-[#d4af37] font-medium uppercase tracking-[0.3em] text-sm mb-6">
                There&apos;s more
              </p>
              <h3 
                className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6"
                style={{ fontFamily: "'Mosk', sans-serif" }}
              >
                See the professional side.
              </h3>
              <p className="text-lg text-gray-400 mb-10 max-w-xl">
                Projects, skills, and the things I&apos;ve actually built. 
                The organized chaos.
              </p>
              
              <motion.button
                onClick={handleProClick}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#d4af37] text-[#1a1a2e] font-bold text-lg hover:bg-white transition-colors duration-300"
                whileTap={{ scale: 0.98 }}
                disabled={isNavigating}
              >
                View Pro Side
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="py-8 px-6 md:px-12">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Riyaz
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <a 
                href="https://instagram.com/ryzenate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-[#d4af37] transition-colors"
              >
                Instagram
              </a>
              <span className="text-gray-700">GitHub — Soon</span>
              <span className="text-gray-700">LinkedIn — Soon</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}