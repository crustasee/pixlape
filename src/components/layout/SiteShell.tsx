'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { MarqueeTicker } from '@/components/layout/MarqueeTicker';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const CHROMELESS_PREFIXES = ['/admin'];

export const SiteShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname() || '';
  const isChromeless = CHROMELESS_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isChromeless) {
    return <>{children}</>;
  }

  return (
    <>
      <MarqueeTicker />
      <Header />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </>
  );
};
