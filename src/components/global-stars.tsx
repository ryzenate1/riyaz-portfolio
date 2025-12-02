'use client';

import { CSSStars } from './css-stars';
import { usePathname } from 'next/navigation';

// Pages where stars should NOT appear
const EXCLUDED_PATHS = ['/imprint', '/privacy', '/games'];

export function GlobalStarsBackground() {
  const pathname = usePathname();
  
  // Don't render stars on excluded pages
  if (EXCLUDED_PATHS.some(path => pathname.startsWith(path))) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <CSSStars count={120} opacity={0.7} />
    </div>
  );
}
