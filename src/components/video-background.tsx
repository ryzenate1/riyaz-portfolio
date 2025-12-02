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
        alt="Background"
        fill
        className="object-cover opacity-80"
        priority
        placeholder="blur"
        quality={100}
        sizes="100vw"
        unoptimized
      />
    </div>
  );
}

export { VideoBackground };
