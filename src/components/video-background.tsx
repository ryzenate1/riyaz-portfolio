'use client';

import bgImage from '@/assets/bg2.jpg';
import Image from 'next/image';

function VideoBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-50 overflow-hidden"
    >
      <Image
        src={bgImage}
        alt=""
        fill
        className="object-cover opacity-80"
        priority
        fetchPriority="high"
        placeholder="blur"
        quality={80}
        sizes="100vw"
      />
    </div>
  );
}

export { VideoBackground };
