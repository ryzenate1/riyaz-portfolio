'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const STORAGE_KEY = 'ryzen-view-preference';

type ViewMode = 'casual' | 'pro';

interface HeaderToggleProps {
  currentView: ViewMode;
  className?: string;
}

export function HeaderToggle({ currentView, className = '' }: HeaderToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for hydration detection
    setMounted(true);
  }, []);

  const toggleView = () => {
    const newView: ViewMode = currentView === 'casual' ? 'pro' : 'casual';
    
    // Save preference
    localStorage.setItem(STORAGE_KEY, newView);
    
    // Get the subpath after /casual or /pro
    const pathParts = pathname.split('/').filter(Boolean);
    const subpath = pathParts.slice(1).join('/');
    
    // Navigate to the equivalent page in the other view
    const newPath = subpath ? `/${newView}/${subpath}` : `/${newView}`;
    router.push(newPath);
  };

  const isPro = currentView === 'pro';

  if (!mounted) {
    // SSR fallback - render a simple link
    return (
      <noscript>
        <a 
          href={isPro ? '/casual' : '/pro'}
          className="text-sm underline"
        >
          Switch to {isPro ? 'Casual' : 'Pro'} View
        </a>
      </noscript>
    );
  }

  // Casual theme toggle styling - Pill style like Cassie's
  if (currentView === 'casual') {
    return (
      <button
        onClick={toggleView}
        aria-pressed={isPro}
        aria-label={`Switch to professional view`}
        className={`
          relative w-[52px] h-7
          bg-gradient-to-r from-[#f4a261] to-[#e07a5f]
          rounded-full cursor-pointer
          transition-all duration-300 ease-out
          hover:scale-105 hover:shadow-lg
          focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-transparent
          ${className}
        `}
        title="Switch to Pro view"
      >
        <motion.div
          className="absolute top-[3px] w-[22px] h-[22px] bg-white rounded-full shadow-md"
          initial={false}
          animate={{ left: isPro ? 'calc(100% - 25px)' : '3px' }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    );
  }

  // Pro theme toggle styling (dark theme)
  return (
    <button
      onClick={toggleView}
      aria-pressed={isPro}
      aria-label={`Switch to ${isPro ? 'casual' : 'professional'} view`}
      className={`
        relative flex items-center gap-2 px-4 py-2 
        bg-neutrals-800/50 border border-neutrals-700/50 
        rounded-full text-sm font-medium text-neutrals-300
        hover:bg-neutrals-700/50 hover:border-neutrals-600
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-neutrals-900
        ${className}
      `}
    >
      <span className="text-xs uppercase tracking-wide text-neutrals-500">View</span>
      <div className="relative flex items-center bg-neutrals-900 rounded-full p-0.5">
        <motion.div
          layoutId="toggle-indicator-pro"
          className="absolute w-6 h-6 bg-primary rounded-full"
          initial={false}
          animate={{ x: isPro ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
        <span className={`relative z-10 w-6 h-6 flex items-center justify-center text-xs ${!isPro ? 'text-neutrals-900' : 'text-neutrals-500'}`}>
          C
        </span>
        <span className={`relative z-10 w-6 h-6 flex items-center justify-center text-xs ${isPro ? 'text-neutrals-900' : 'text-neutrals-500'}`}>
          P
        </span>
      </div>
    </button>
  );
}

// Hook to get and set view preference
export function useViewPreference(): [ViewMode | null, (view: ViewMode) => void] {
  const [preference, setPreferenceState] = useState<ViewMode | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ViewMode | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required to sync localStorage with state on mount
    setPreferenceState(stored);
  }, []);

  const setPreference = (view: ViewMode) => {
    localStorage.setItem(STORAGE_KEY, view);
    setPreferenceState(view);
  };

  return [preference, setPreference];
}

// Utility to get stored preference (for middleware/server)
export function getStoredPreference(): ViewMode | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY) as ViewMode | null;
}
