'use client';

import Image from 'next/image';
import { useState } from 'react';

interface MonoImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  caption?: string;
  className?: string;
  containerClassName?: string;
  showGrain?: boolean;
  priority?: boolean;
}

export function MonoImage({
  src,
  alt,
  width,
  height,
  fill = false,
  caption,
  className = '',
  containerClassName = '',
  showGrain = true,
  priority = false,
}: MonoImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className={`mono-img-container ${showGrain ? 'film-grain' : ''} ${containerClassName}`}>
      <div className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}>
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={`mono-img object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
            onLoad={() => setIsLoaded(true)}
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`mono-img transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
            onLoad={() => setIsLoaded(true)}
            priority={priority}
          />
        )}
        
        {/* Cream tint overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,248,241,0.03) 0%, rgba(255,248,241,0.08) 100%)',
            mixBlendMode: 'overlay',
          }}
        />
      </div>
      
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--muted)] italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
