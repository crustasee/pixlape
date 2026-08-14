'use client';

import React from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gray-50 dark:bg-gray-950">
          <div className="p-8 max-w-md w-full bg-white border dark:border-gray-800 rounded-2xl shadow-xl flex flex-col items-center gap-6">
            <span className="text-6xl animate-bounce" role="img" aria-label="Critical Warning">
              🚨
            </span>
            <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100 uppercase tracking-wide">
              Critical System Error
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {error.message || 'A critical error occurred at the application level.'}
            </p>
            <button
              onClick={() => reset()}
              className="w-full py-3 px-5 bg-red-600 hover:bg-red-700 text-white font-semibold uppercase tracking-wider rounded-lg transition-colors duration-200"
            >
              Restart Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
