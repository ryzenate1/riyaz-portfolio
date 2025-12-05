'use client';

import { useEffect } from 'react';

export default function ProError({
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
    <div className="min-h-screen bg-neutrals-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-neutrals-50 mb-4">
          Something went wrong
        </h2>
        <p className="text-neutrals-300 mb-6">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
