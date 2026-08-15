'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';


export const Header: React.FC = () => {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'DOWNLOAD', href: '/products' },
    { label: 'ABOUT', href: '/about' },
    { label: 'BLOG', href: '/blog' },
    { label: 'HELP', href: '/help' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b-2 border-border-color bg-yellow-100 text-darkteal transition-all duration-300">
      <div className="max-w-[1950px] mx-auto w-full px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="logo flex items-center gap-5 font-pixel text-sm font-black tracking-tighter text-darkteal focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 rounded-lg"
          aria-label="PIXLApe Home"
        >
          <span className="logo-icon relative flex items-center justify-center w-9 h-9 bg-white rounded-lg transition-transform duration-300 hover:scale-110">
            <Image
              src="/icon/logo_icon.svg"
              alt="M"
              width={34}
              height={34}
              className="object-contain"
              unoptimized
            />
          </span>
          <span className="hidden sm:inline">
            __PIXLApe<span className="text-cayenne font-pixel text-sm">.COM</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-xs font-black tracking-wider transition-all duration-200 px-3 py-1.5 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-yellow-green focus:ring-offset-2 ${isActive
                  ? 'bg-yellow-green text-darkteal border-border-color'
                  : 'bg-yellow-100 text-darkteal font-mono text-sm border-transparent hover:bg-yellow-green hover:text-darkteal hover:border-border-color hover:shadow-[2px_2px_0_var(--border-color)]'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl border-2 border-border-color bg-cayenne text-white flex items-center justify-center text-lg transition-all duration-200 hover:bg-yellow-green hover:text-evergreen hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0_var(--border-color)] focus:outline-none focus:ring-2 focus:ring-yellow-green focus:ring-offset-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav
          className="absolute top-full left-0 right-0 bg-darkteal border-b-2 border-border-color p-4 flex flex-col gap-2 md:hidden animate-in slide-in-from-top-2 duration-200"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`font-mono text-sm font-black tracking-wider transition-all duration-200 px-4 py-3 rounded-xl border-2 ${isActive
                  ? 'bg-cayenne text-white border-border-color shadow-[2px_2px_0_var(--border-color)]'
                  : 'bg-darkteal text-soft-linen border-transparent hover:bg-yellow-green hover:text-evergreen hover:border-border-color hover:shadow-[2px_2px_0_var(--border-color)]'
                  }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
};
