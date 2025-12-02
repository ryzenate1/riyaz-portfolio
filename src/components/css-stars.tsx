'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface CSSStarsProps {
  className?: string;
  count?: number;
  opacity?: number;
}

// Seeded random number generator for consistent results
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// CSS-only stars - zero JavaScript animation, pure performance
export function CSSStars({ 
  className, 
  count = 150,
  opacity = 0.8 
}: CSSStarsProps) {
  // Generate star positions once on mount using seeded random
  const [stars] = useState(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${seededRandom(i * 3) * 100}%`,
      top: `${seededRandom(i * 7 + 1) * 100}%`,
      size: seededRandom(i * 11 + 2) * 2 + 0.5,
      opacity: seededRandom(i * 13 + 3) * opacity,
    }));
  });

  return (
    <div 
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none -z-10',
        className
      )}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}

// Alternative: CSS-only using radial gradients (even more performant)
export function CSSStarsGradient({ className }: { className?: string }) {
  return (
    <div 
      className={cn(
        'absolute inset-0 pointer-events-none -z-10',
        className
      )}
      aria-hidden="true"
      style={{
        backgroundImage: `
          radial-gradient(2px 2px at 20px 30px, white, transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
          radial-gradient(1px 1px at 90px 40px, white, transparent),
          radial-gradient(2px 2px at 160px 120px, rgba(255,255,255,0.7), transparent),
          radial-gradient(1px 1px at 230px 80px, white, transparent),
          radial-gradient(2px 2px at 300px 200px, rgba(255,255,255,0.6), transparent),
          radial-gradient(1px 1px at 370px 150px, white, transparent),
          radial-gradient(2px 2px at 450px 50px, rgba(255,255,255,0.8), transparent),
          radial-gradient(1px 1px at 520px 180px, white, transparent),
          radial-gradient(2px 2px at 600px 100px, rgba(255,255,255,0.7), transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '650px 250px',
      }}
    />
  );
}
