'use client';

import { memo } from 'react';
import { CSSStars } from './css-stars';

// Static star field — CSS-only, zero JS animation.
// Previously used react-particles + tsparticles-slim for non-animated
// dots (move: false, opacity/size anim: false), which pulled ~150KB of
// particle engine into the client bundle for zero visual benefit.
const StarsBackground = memo(function StarsBackground() {
  return (
    <CSSStars
      count={150}
      opacity={0.8}
      className="mask-x-from-80%"
    />
  );
});

export { StarsBackground };
