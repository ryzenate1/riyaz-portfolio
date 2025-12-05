'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Quote, Sparkles, Brain, Compass, Sun } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const wisdoms = [
  {
    icon: Brain,
    category: 'Mindset',
    title: 'Growth Happens in Discomfort',
    content: 'The moments that challenge you most are the moments that change you most. Lean into the hard things—that\'s where transformation lives.',
  },
  {
    icon: Compass,
    category: 'Direction',
    title: 'Progress Over Perfection',
    content: 'Waiting for the perfect moment means waiting forever. Start messy, iterate often, and trust the process. Done is better than perfect.',
  },
  {
    icon: Sun,
    category: 'Daily Life',
    title: 'Small Habits, Big Results',
    content: 'The person you become is shaped by what you do daily, not occasionally. Tiny consistent actions compound into remarkable outcomes.',
  },
  {
    icon: Sparkles,
    category: 'Perspective',
    title: 'Energy Flows Where Attention Goes',
    content: 'Focus on problems, you\'ll find more problems. Focus on possibilities, you\'ll find more possibilities. Guard your attention fiercely.',
  },
];

const quotes = [
  {
    text: 'The only person you should try to be better than is the person you were yesterday.',
    context: 'On self-improvement',
  },
  {
    text: 'Discipline is choosing between what you want now and what you want most.',
    context: 'On delayed gratification',
  },
  {
    text: 'Your habits are the compound interest of self-improvement.',
    context: 'On consistency',
  },
];

export default function AdvicePage() {
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
                <Lightbulb className="text-[var(--text-700)]" size={28} />
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="casual-heading-1 font-serif">
              Life Advice
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="casual-paragraph">
              Thoughts, philosophies, and little wisdoms I&apos;ve gathered along the way. 
              Not prescriptions—just perspectives that have helped me navigate life.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Wisdom Cards */}
      <section className="casual-section-sm bg-[var(--paper)]">
        <div className="casual-container">
          <motion.h2 
            className="casual-heading-2 font-serif text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Things I Believe In
          </motion.h2>

          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
          >
            {wisdoms.map((wisdom, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="casual-card h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--cream-200)] flex items-center justify-center">
                      <wisdom.icon className="text-[var(--text-700)]" size={20} />
                    </div>
                    <span className="text-xs uppercase tracking-wider text-[var(--muted)] font-medium">
                      {wisdom.category}
                    </span>
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[var(--text-900)] mb-3">
                    {wisdom.title}
                  </h3>
                  <p className="casual-paragraph text-base">
                    {wisdom.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quotes Section */}
      <section className="casual-section">
        <div className="casual-container">
          <motion.h2 
            className="casual-heading-2 font-serif text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Words I Live By
          </motion.h2>

          <motion.div 
            className="max-w-3xl mx-auto space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {quotes.map((quote, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="relative pl-8 border-l-2 border-[var(--accent)]"
              >
                <Quote className="absolute -left-3 top-0 w-6 h-6 text-[var(--accent)] bg-[var(--cream-100)]" />
                <blockquote className="font-serif text-xl md:text-2xl text-[var(--text-800)] italic leading-relaxed mb-2">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <p className="casual-muted text-sm">{quote.context}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Closing Thought */}
      <section className="casual-section bg-[var(--paper)]">
        <div className="casual-container">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="casual-heading-2 font-serif mb-4">
              A Final Thought
            </motion.h2>
            <motion.p variants={fadeInUp} className="casual-paragraph mb-6">
              Life is a continuous experiment. Take what resonates, leave what doesn&apos;t, 
              and always stay curious. The best advice is the advice you discover through 
              your own experience.
            </motion.p>
            <motion.p variants={fadeInUp} className="casual-muted italic">
              Stay learning, stay growing.
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
