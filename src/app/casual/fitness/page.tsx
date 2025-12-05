'use client';

import { MonoImage } from '@/components/mono-image';
import { motion } from 'framer-motion';
import { Dumbbell, Target, Heart, Flame, Clock, TrendingUp } from 'lucide-react';
import riyazImg from '@/assets/images/riyaz.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const principles = [
  {
    icon: Target,
    title: 'Consistency Over Intensity',
    description: 'Showing up every day matters more than going hard once a week. Small, consistent efforts compound into massive results.',
  },
  {
    icon: Heart,
    title: 'Mind-Muscle Connection',
    description: 'Every rep with intention. Quality over quantity. Feel the muscle work, don\'t just move the weight.',
  },
  {
    icon: Clock,
    title: 'Recovery is Training',
    description: 'Sleep, nutrition, and rest are as important as the workout itself. Growth happens during recovery.',
  },
  {
    icon: TrendingUp,
    title: 'Progressive Overload',
    description: 'Gradual increase in challenge. Whether it\'s weight, reps, or time under tension—keep pushing the boundary.',
  },
];

export default function FitnessPage() {
  return (
    <div className="casual-theme">
      {/* Hero */}
      <section className="casual-section">
        <div className="casual-container">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[var(--cream-200)] flex items-center justify-center mx-auto">
                <Dumbbell className="text-[var(--text-700)]" size={28} />
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="casual-heading-1 font-serif">
              Fitness Journey
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="casual-paragraph">
              Kinesiology isn&apos;t just a field of study for me—it&apos;s a way of understanding 
              how we move, grow, and become stronger versions of ourselves.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* My Story */}
      <section className="casual-section-sm bg-[var(--paper)]">
        <div className="casual-container">
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="aspect-[4/5] relative">
              <MonoImage
                src={riyazImg.src}
                alt="Riyaz - Fitness"
                fill
                containerClassName="h-full"
                caption="The journey never ends"
              />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h2 className="casual-heading-2 font-serif mb-6">The Beginning</h2>
              <div className="space-y-4 casual-paragraph">
                <p>
                  My fitness journey started from a place of curiosity. I wanted to understand 
                  why certain exercises worked, how muscles adapted, and what made the difference 
                  between training smart and just training hard.
                </p>
                <p>
                  That curiosity led me to kinesiology—the science of human movement. What I 
                  discovered transformed not just my body, but my entire approach to life. 
                  Discipline, patience, and the ability to show up even when motivation fades.
                </p>
                <p>
                  Today, fitness is my anchor. It&apos;s where I find clarity, build resilience, 
                  and practice the art of continuous improvement.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Training Principles */}
      <section className="casual-section">
        <div className="casual-container">
          <motion.h2 
            className="casual-heading-2 font-serif text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Training Principles I Live By
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {principles.map((principle, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="casual-card h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--cream-200)] flex items-center justify-center flex-shrink-0">
                      <principle.icon className="text-[var(--text-700)]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[var(--text-900)] mb-2">
                        {principle.title}
                      </h3>
                      <p className="casual-muted">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quote */}
      <section className="casual-section bg-[var(--paper)]">
        <div className="casual-container">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Flame className="mx-auto mb-6 text-[var(--accent)]" size={32} />
            <blockquote className="font-serif text-2xl md:text-3xl text-[var(--text-800)] italic leading-relaxed mb-4">
              &ldquo;The body achieves what the mind believes.&rdquo;
            </blockquote>
            <p className="casual-muted">— The foundation of every workout</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
