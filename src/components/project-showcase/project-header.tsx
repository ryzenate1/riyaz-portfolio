'use client';

import { motion } from 'framer-motion';
import type { ProjectData } from './index';

interface ProjectHeaderProps {
  project: ProjectData;
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  return (
    <div className="mb-10">
      {/* Title Row */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.8 }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl"
            style={{ 
              background: `linear-gradient(135deg, ${project.accentColor}20, ${project.accentColor}40)`,
              border: `1px solid ${project.accentColor}40`
            }}
          >
            {project.icon}
          </motion.div>
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold text-neutrals-50"
            >
              {project.title}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-neutrals-400"
            >
              {project.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6"
        >
          {project.stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div 
                className="text-2xl md:text-3xl font-bold"
                style={{ color: project.accentColor }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-neutrals-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-neutrals-300 leading-relaxed max-w-3xl"
      >
        {project.description}
      </motion.p>
    </div>
  );
}
