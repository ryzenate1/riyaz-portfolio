'use client';

import { motion } from 'framer-motion';
import type { ProjectData } from './index';

interface FeaturesListProps {
  project: ProjectData;
}

export function FeaturesList({ project }: FeaturesListProps) {
  return (
    <div className="mb-8">
      <h4 className="text-sm font-medium text-neutrals-500 uppercase tracking-wider mb-4">
        Key Features
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {project.features.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-neutrals-800/40 border border-neutrals-800 hover:border-neutrals-700 transition-colors"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: project.accentColor }}
            />
            <span className="text-sm text-neutrals-300">{feature}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
