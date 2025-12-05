'use client';

import { useEffect } from 'react';

export default function CasualError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Log error securely in production
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#d4af37] flex items-center justify-center p-4">
      <div className="text-center max-w-md bg-white/90 rounded-xl p-8 shadow-xl">
        <h2 className="text-2xl font-bold text-[#404040] mb-4">
          Oops! Something went wrong
        </h2>
        <p className="text-[#666] mb-6">
          Don&apos;t worry, it happens to the best of us. Let&apos;s try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#404040] hover:bg-[#333] text-white rounded-lg transition-colors font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
