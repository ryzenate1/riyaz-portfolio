'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  label: string;
  title: string;
  subtitle: string;
}

const SectionTitle = ({ label, title, subtitle }: SectionTitleProps) => {
  return (
    <motion.div
      className="text-center mb-12 md:mb-16"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      {/* Label Tag */}
      <div className="inline-block px-3 py-1 mb-4 rounded-full bg-neutrals-800/50 backdrop-blur-sm border border-blue-400/30">
        <span className="text-xs uppercase tracking-wider font-medium text-blue-300">
          {label}
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-4xl md:text-5xl font-semibold mb-3 text-neutrals-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
        {title}
      </h2>
      {/* Subtitle */}
      <p className="text-lg md:text-xl text-neutrals-400 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] max-w-2xl mx-auto">
        {subtitle}
      </p>
    </motion.div>
  );
};

export { SectionTitle };
