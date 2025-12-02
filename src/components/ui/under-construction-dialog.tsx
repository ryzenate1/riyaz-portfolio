'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Construction, MessageCircle, Instagram, ExternalLink } from 'lucide-react';

interface UnderConstructionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const contactOptions = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    href: 'https://wa.me/917200672127',
    color: 'bg-green-600 hover:bg-green-700',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/ryzenate',
    color: 'bg-pink-600 hover:bg-pink-700',
  },
];

export function UnderConstructionDialog({
  isOpen,
  onClose,
  title = "Under Construction",
  message = "This feature is being built. Reach out here instead:",
}: UnderConstructionDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-50 w-[85%] max-w-sm -translate-x-1/2 -translate-y-1/2"
          >
            <div className="rounded-2xl border border-yellow-500/30 bg-neutrals-900 shadow-xl overflow-hidden">
              
              {/* Warning stripe */}
              <div className="h-1.5 w-full bg-[repeating-linear-gradient(45deg,#eab308,#eab308_8px,#000_8px,#000_16px)]" />
              
              <div className="p-5">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute right-3 top-5 p-1.5 text-neutrals-400 hover:text-white transition-colors rounded-full hover:bg-neutrals-800"
                  aria-label="Close dialog"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Header */}
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-yellow-500/15 mb-3">
                    <Construction className="w-6 h-6 text-yellow-500" />
                  </div>
                  <h2 className="text-lg font-bold text-white mb-1">
                    {title}
                  </h2>
                  <p className="text-neutrals-400 text-sm">
                    {message}
                  </p>
                </div>

                {/* Apology */}
                <p className="text-neutrals-500 text-xs text-center mb-4 italic">
                  Sorry for the inconvenience! 🙏
                </p>

                {/* Contact options */}
                <div className="flex gap-3">
                  {contactOptions.map((option) => (
                    <a
                      key={option.name}
                      href={option.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-medium transition-all ${option.color}`}
                    >
                      <option.icon className="w-4 h-4" />
                      {option.name}
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
