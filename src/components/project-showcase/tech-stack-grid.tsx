'use client';

import { motion } from 'framer-motion';
import type { ProjectData } from './index';

interface TechStackGridProps {
  project: ProjectData;
}

export function TechStackGrid({ project }: TechStackGridProps) {
  return (
    <div className="mb-8">
      <h4 className="text-sm font-medium text-neutrals-500 uppercase tracking-wider mb-4">
        Tech Stack
      </h4>
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="group relative px-3 py-2 rounded-lg bg-neutrals-800/80 border border-neutrals-700/50 hover:border-neutrals-600 transition-all cursor-default"
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{tech.icon}</span>
              <span className="text-sm text-neutrals-300 group-hover:text-neutrals-100 transition-colors">
                {tech.name}
              </span>
            </div>
            {/* Glow on hover */}
            <div
              className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-xl"
              style={{ background: tech.color }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
