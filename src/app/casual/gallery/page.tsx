'use client';

import { MonoImage } from '@/components/mono-image';
import { motion } from 'framer-motion';
import { Camera, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// Monochromatic portrait images from public/casual/gallery/portraits
const portraitImages = [
  { src: '/casual/gallery/portraits/IMG20251018135635.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018141100.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018150345.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018150506_01.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018150559.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018150610.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018150816_01.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018150819.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018154632.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155001.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155013.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155016.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155017.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155137.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155139.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155144.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155150.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155153.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155156.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG20251018155211.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG_20251202_103347.jpg', alt: 'Portrait' },
  { src: '/casual/gallery/portraits/IMG_20251205_123601.jpg', alt: 'Portrait' },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
                <Camera className="text-[var(--text-700)]" size={28} />
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="casual-heading-1 font-serif">
              Portraits
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="casual-paragraph">
              Captured in timeless monochrome. Each frame tells its own story.
            </motion.p>

            <motion.p variants={fadeInUp} className="casual-muted text-sm mt-2">
              {portraitImages.length} photographs
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid - Masonry Style */}
      <section className="casual-section-sm bg-[var(--paper)]">
        <div className="casual-container">
          <motion.div 
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {portraitImages.map((image, index) => (
              <motion.div 
                key={index} 
                variants={fadeInUp}
                className="break-inside-avoid cursor-pointer group"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-[var(--shadow-vintage)] hover:shadow-[var(--shadow-vintage-lg)] transition-shadow duration-300">
                  <MonoImage
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={800}
                    className="w-full h-auto"
                    containerClassName="w-full"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged portrait view"
        >
          <motion.div
            className="relative max-w-4xl max-h-[90vh] w-full h-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={selectedImage}
              alt="Enlarged portrait photograph"
              fill
              className="object-contain rounded-lg"
              style={{ filter: 'grayscale(100%) sepia(20%)' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
