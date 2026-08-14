'use client';

import React, { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Root Boundary Error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
      <div className="p-8 max-w-md w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl flex flex-col items-center gap-6">
        <span className="text-6xl animate-bounce" role="img" aria-label="Warning">
          ⚠️
        </span>
        <h2 className="font-head font-bold text-xl text-gray-900 dark:text-gray-100 uppercase tracking-wide">
          Something went wrong
        </h2>
        <p className="font-body text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {error.message || 'An unexpected error occurred while loading this page.'}
        </p>
        <button
          onClick={() => reset()}
          className="w-full py-3 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold uppercase tracking-wider rounded-lg transition-colors duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
