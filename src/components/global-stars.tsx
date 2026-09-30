'use client';

import { memo } from 'react';
import { usePathname } from 'next/navigation';
import { CSSStars } from './css-stars';

// Pages where stars should NOT appear
const EXCLUDED_PATHS = ['/imprint', '/privacy', '/games'];

// Memoized so client-side navigations that don't change the exclusion
// outcome don't re-render 120 star divs.
export const GlobalStarsBackground = memo(function GlobalStarsBackground() {
  const pathname = usePathname();

  // Don't render stars on excluded pages
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: -1 }} aria-hidden>
      <CSSStars count={120} opacity={0.7} />
    </div>
  );
});
