'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectData } from './index';
import { ProjectHeader } from './project-header';
import { TechStackGrid } from './tech-stack-grid';
import { FeaturesList } from './features-list';

interface KadalShowcaseProps {
  project: ProjectData;
}

// Mini Fish Product Card Demo
function FishProductDemo() {
  const [selectedWeight, setSelectedWeight] = useState('500g');
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const weights = [
    { value: '250g', multiplier: 0.25 },
    { value: '500g', multiplier: 0.5 },
    { value: '1kg', multiplier: 1 },
    { value: '2kg', multiplier: 2 },
  ];

  const basePrice = 450;
  const weight = weights.find((w) => w.value === selectedWeight);
  const currentPrice = Math.round(basePrice * (weight?.multiplier || 0.5));

  const handleAddToCart = () => {
    setIsAdded(true);
    // Vibration feedback simulation
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(50);
    }
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-xl"
    >
      {/* Product Image */}
      <div className="relative h-40 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <motion.span 
          className="text-7xl"
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          🐟
        </motion.span>
        
        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center"
        >
          <motion.span
            animate={{ scale: isWishlisted ? [1, 1.3, 1] : 1 }}
            className={isWishlisted ? 'text-red-500' : 'text-gray-400'}
          >
            {isWishlisted ? '❤️' : '🤍'}
          </motion.span>
        </motion.button>

        {/* Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-[#bd2d3c] text-white text-xs font-medium rounded">
          Fresh Today
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 mb-1">Seer Fish (Vanjaram)</h4>
        <p className="text-xs text-gray-500 mb-3">Premium cut • Cleaned & gutted</p>

        {/* Weight Selector */}
        <div className="flex gap-1.5 mb-3">
          {weights.map((w) => (
            <button
              key={w.value}
              onClick={() => setSelectedWeight(w.value)}
              className={`px-2 py-1 text-xs rounded-md transition-all ${
                selectedWeight === w.value
                  ? 'bg-[#bd2d3c] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {w.value}
            </button>
          ))}
        </div>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">₹{currentPrice}</span>
            <span className="text-xs text-gray-400 line-through ml-2">
              ₹{Math.round(currentPrice * 1.2)}
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              isAdded
                ? 'bg-green-500 text-white'
                : 'bg-[#bd2d3c] text-white hover:bg-[#a02532]'
            }`}
          >
            {isAdded ? '✓ Added' : 'Add'}
          </motion.button>
        </div>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {isAdded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow-lg whitespace-nowrap"
          >
            🎉 Added to cart!
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Mini Trust Badges Demo
function TrustBadgesDemo() {
  const badges = [
    { icon: '🏆', label: 'FSSAI Certified', color: 'from-green-500/20 to-green-600/20', border: 'border-green-500/30' },
    { icon: '🚚', label: 'Same Day', color: 'from-blue-500/20 to-blue-600/20', border: 'border-blue-500/30' },
    { icon: '💰', label: 'Best Price', color: 'from-red-500/20 to-red-600/20', border: 'border-red-500/30' },
    { icon: '⭐', label: 'Premium', color: 'from-yellow-500/20 to-yellow-600/20', border: 'border-yellow-500/30' },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r ${badge.color} border ${badge.border}`}
        >
          <span className="text-lg">{badge.icon}</span>
          <span className="text-xs font-medium text-white">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

// Tamil Testimonial Demo
function TamilTestimonialDemo() {
  const [showTamil, setShowTamil] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-sm p-4 rounded-xl bg-neutrals-800/50 border border-neutrals-700"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#bd2d3c] to-[#e1a653] flex items-center justify-center text-white font-medium">
          R
        </div>
        <div>
          <p className="font-medium text-neutrals-200 text-sm">Ramesh Kumar</p>
          <p className="text-xs text-neutrals-500">Chennai</p>
        </div>
        <div className="ml-auto flex">
          {[1,2,3,4,5].map((star) => (
            <span key={star} className="text-yellow-400 text-sm">★</span>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={showTamil ? 'tamil' : 'english'}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-neutrals-300 mb-3 leading-relaxed"
        >
          {showTamil 
            ? '"மீன் மிகவும் புதியதாகவும் சுவையாகவும் இருந்தது. டெலிவரி மிகவும் வேகமாக இருந்தது!"'
            : '"The fish was very fresh and tasty. Delivery was very fast!"'
          }
        </motion.p>
      </AnimatePresence>

      <button
        onClick={() => setShowTamil(!showTamil)}
        className="text-xs px-3 py-1.5 rounded-full bg-[#bd2d3c]/20 text-[#bd2d3c] hover:bg-[#bd2d3c]/30 transition-colors"
      >
        {showTamil ? 'Translate to English' : 'தமிழில் காண்க'}
      </button>
    </motion.div>
  );
}

export function KadalShowcase({ project }: KadalShowcaseProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Project Info */}
      <div>
        <ProjectHeader project={project} />
        <TechStackGrid project={project} />
        <FeaturesList project={project} />

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <motion.a
            href={project.links.github}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutrals-800 border border-neutrals-700 text-neutrals-200 hover:border-neutrals-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Code
          </motion.a>
          <motion.a
            href={project.links.live}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white transition-colors"
            style={{ background: project.accentColor }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Live Demo
          </motion.a>
        </div>
      </div>

      {/* Right: Interactive Demos */}
      <div className="space-y-6">
        {/* Product Card Demo */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutrals-800/50 to-neutrals-900/50 border border-neutrals-800">
          <h4 className="text-sm font-medium text-neutrals-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Interactive Demo — Product Card
          </h4>
          <div className="flex justify-center">
            <FishProductDemo />
          </div>
        </div>

        {/* Trust Badges */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutrals-800/50 to-neutrals-900/50 border border-neutrals-800">
          <h4 className="text-sm font-medium text-neutrals-400 mb-4">Trust Badges System</h4>
          <TrustBadgesDemo />
        </div>

        {/* Tamil Testimonial */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutrals-800/50 to-neutrals-900/50 border border-neutrals-800">
          <h4 className="text-sm font-medium text-neutrals-400 mb-4">Bilingual Testimonials</h4>
          <div className="flex justify-center">
            <TamilTestimonialDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
