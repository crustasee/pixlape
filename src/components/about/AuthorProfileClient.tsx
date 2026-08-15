'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const AuthorProfileClient: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('/avatar_profile.gif');

  const handleCopyEmail = (email: string, label: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(email);
      setCopiedEmail(label);
      setTimeout(() => setCopiedEmail(null), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6 max-w-[1850px] mx-auto w-full flex-1 gap-8">
      {/* Main Glassmorphism Container */}
      <div className="bg-yellow-100 text-evergreen p-6 md:p-10 w-full flex flex-col gap-8 shadow-hard-lg rounded-2xl border-2 border-border-color">

        {/* ================= HEADER & MANIFESTO ================= */}
        <div className="flex flex-col gap-4 border-b-2 border-border-color pb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-green-300 text-black border-1 border-border-color text-xs font-mono font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-hard-sm">
              PIXLApe Project
            </span>
            <span className="bg-green-300 border-1 border-border-color text-black text-xs font-mono font-bold px-3 py-1.5 rounded-md shadow-hard-sm">
              VISUAL GRAPHIC
            </span>
            <span className="bg-green-300 border-1 border-border-color text-black text-xs font-mono font-bold px-3 py-1.5 rounded-md shadow-hard-sm">
              FULLSTACK & VISUAL ARTIST
            </span>
            <span className="bg-green-300 border-1 border-border-color text-black text-xs font-mono font-bold px-3 py-1.5 rounded-md flex items-center gap-2 shadow-hard-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-evergreen animate-ping inline-block"></span>
              START PROJECT INQUIRY
            </span>
          </div>

          <h1 className="font-head font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none text-evergreen uppercase">
            ++ABOUT PIXLAPE<span className="text-cayenne"> ++++PROJECT</span>
          </h1>

          <p className="font-mono text-sm sm:text-base md:text-lg text-darkteal italic bg-white/40 p-5 border-1 border-border-color rounded-lg leading-relaxed">
            &quot;We don&apos;t ship products. We ship pieces of ourselves. Built by independent hands, driven by obsession, and made with love that borders on madness.&quot;
          </p>
        </div>

        {/* ================= HERO PROFILE GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: GIF Compatible Avatar Profile Component (5/12) */}
          <div className="lg:col-span-9 flex flex-col">
            <div className="w-full border-1 border-border-color bg-yellow-green shadow-hard rounded-xl p-6 flex flex-col items-center text-center">

              {/* Profile GIF Container with Pulsing Neon Frame */}
              <div className="w-full h-64 md:w-full md:h-64 border-2 border-border-color bg-soft-linen shadow-hard rounded-2xl overflow-hidden mb-5 p-1.5 group">

                {/* GIF Format Compatible Viewer with Fallback & Unoptimized flag */}
                <Image
                  src={imgSrc}
                  alt="PIXLApe Lead Author Profile"
                  width={256}
                  height={256}
                  unoptimized={true}
                  onError={() => setImgSrc('/Assets/img/avatar_profile.gif')}
                  className="object-cover w-full h-full rounded-xl transition-transform duration-300 group-hover:scale-105"
                  priority
                />

                {/* Animated Badge Overlay */}
                <span className="absolute bottom-3 right-3 badge bg-yellow-green text-evergreen font-mono text-[10px] font-bold px-2.5 py-1 rounded-md uppercase border border-border-color shadow-hard-sm">
                  GIF ANIMATED
                </span>
              </div>

              {/* Author Title */}
              <h2 className="font-head font-black text-4xl text-evergreen uppercase tracking-tight">
                PIXLApe PROJECT
              </h2>
              <span className="font-mono text-sm font-bold text-evergreen bg-yellow-green px-3 py-1.5 border-2 border-border-color rounded-lg mt-1 mb-4 shadow-hard-sm">
                Lead Engineer & Visual Architect
              </span>

              {/* Categorized Tech & Skill Chips */}
              <div className="flex flex-wrap justify-center gap-2 font-mono text-xs font-bold">
                <span className="px-3 py-1.5 bg-yellow-green text-darkteal border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                  Next.js & React
                </span>
                <span className="px-3 py-1.5 bg-yellow-green text-darkteal border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                  TypeScript
                </span>
                <span className="px-3 py-1.5 bg-yellow-green text-darkteal border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                  Flutter
                </span>
                <span className="px-3 py-1.5 bg-yellow-green text-darkteal border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                  Art Illustration
                </span>
                <span className="px-3 py-1.5 bg-yellow-green text-darkteal border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                  Graphic Design
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Biography & Experience (7/12) */}
          <div className="lg:col-span-9 flex flex-col gap-7">
            <h3 className="font-head font-black text-lg md:text-2xl text-evergreen border-b-2 border-border-color pb-2 uppercase tracking-wide">
              BIOGRAPHY & CREATIVE PHILOSOPHY
            </h3>

            <div className="flex flex-col gap-5 font-body text-lg md:text-base text-evergreen leading-relaxed font-medium">
              <p>
                Established in 2013,</p>
              <p><strong className="text-evergreen font-black uppercase">PIXLApe Project</strong> represents over a decade of continuous work at the intersection of fullstack software engineering and high-contrast digital visual design.
              </p>
              <p>
                Operating independently, I build lightning-fast web apps, neo-brutalist component systems, vector illustration packs, audio stem libraries, and developer utilities — free from bloat, trackers, or restrictive paywalls.
              </p>
              <p>
                Every release is held to a strict standard: clean architecture, tactile interface feedback, zero telemetry, and security-scanned archives before each drop.
              </p>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-4 font-mono text-md pt-5">
              <div className="p-4 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex flex-col gap-1">
                <span className="text-evergreen/70 block text-sm uppercase font-bold">EXPERIENCE:</span>
                <strong className="text-cayenne text-lg sm:text-base font-black">13+ YEARS (SINCE 2013)</strong>
              </div>
              <div className="p-4 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex flex-col gap-1">
                <span className="text-evergreen/70 block text-sm uppercase font-bold">CORE FOCUS:</span>
                <strong className="text-darkteal text-lg sm:text-base font-black">FULLSTACK + VISUAL ART</strong>
              </div>
            </div>
          </div>

        </div>

        {/* ================= CALL-TO-ACTION (CTA) SECTION ================= */}
        <div className="border-t-2 border-border-color pt-7 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="font-head font-black text-base md:text-lg text-evergreen uppercase tracking-wide">
              GET IN TOUCH / START A PROJECT
            </h3>
            <span className="font-mono text-xs font-black text-cayenne">
              AVAILABLE COMMISION PROJECT ▶▶
            </span>
          </div>

          {copiedEmail && (
            <div className="p-3 bg-yellow-green text-evergreen border-2 border-border-color font-mono font-bold text-xs text-center rounded-xl shadow-hard animate-in zoom-in-95">
              ✅ EMAIL ADDRESS FOR {copiedEmail} COPIED TO CLIPBOARD!
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* CTA 1: Project Dev Inquiry */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:project@keratuli.site?subject=Project%20Dev%20Inquiry%20-%20PIXLApe"
                className="w-full"
              >
                <button
                  type="button"
                  className="w-full py-4 px-4 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-border-color bg-cayenne text-white shadow-hard hover:bg-yellow-green hover:text-evergreen transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  COMMISION
                </button>
              </a>
              <button
                type="button"
                onClick={() => handleCopyEmail('project@keratuli.site', 'PROJECT DEV INQUIRY')}
                className="font-mono text-sm text-white hover:text-cayenne font-bold text-center underline cursor-pointer"
              >
                Copy project@keratuli.site
              </button>
            </div>

            {/* CTA 2: Art Commission */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:project@keratuli.site?subject=Art%20Commission%20Inquiry%20-%20PIXLApe"
                className="w-full"
              >
                <button
                  type="button"
                  className="w-full py-4 px-4 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-border-color bg-green-400 text-black shadow-hard hover:bg-yellow-green hover:text-evergreen transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none flex items-center justify-center gap-2.5 cursor-pointer"
                >
                 DISCUSS
                </button>
              </a>
              <button
                type="button"
                onClick={() => handleCopyEmail('project@keratuli.site', 'ART COMMISSION')}
                className="font-mono text-xs text-evergreen/80 hover:text-darkteal font-bold text-center underline cursor-pointer"
              >
                Copy project@keratuli.site
              </button>
            </div>

            {/* CTA 3: Explore Vault */}
            <div className="flex flex-col gap-2">
              <Link href="/" className="w-full">
                <button
                  type="button"
                  className="w-full py-4 px-4 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-border-color bg-yellow-green text-evergreen shadow-hard hover:bg-cayenne hover:text-white transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-0 active:translate-y-0 active:shadow-none flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  EXPLORE ASSET VAULT ▶
                </button>
              </Link>
              <span className="font-mono text-xs text-black font-bold text-center">
                Access 40+ Curated Assets
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="border-1 border-border-color bg-soft-linen text-black p-6 rounded-lg flex flex-col gap-5 font-mono">
          <h3 className="font-head font-black text-lg tracking-wider uppercase text-darkteal">
            ●●●●●●○○○ STATISTICS AT A GLANCE
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3 bg-white/30 border-2 border-border-color rounded-xl">
              <div className="text-3xl md:text-4xl font-mono font-black text-darkteal">100+</div>
              <div className="text-xs font-mono font-bold text-darkteal uppercase mt-1">PROJECT DONE</div>
            </div>
            <div className="p-3 bg-white/30 border-2 border-border-color rounded-xl">
              <div className="text-3xl md:text-4xl font-mono font-black text-darkteal">100+</div>
              <div className="text-xs font-mono font-bold text-darkteal uppercase mt-1">CLIENT WORLDWIDE</div>
            </div>
            <div className="p-3 bg-white/30 border-2 border-border-color rounded-xl">
              <div className="text-3xl md:text-4xl font-mono font-black text-darkteal">100%</div>
              <div className="text-xs font-mono font-bold text-dark teal uppercase mt-1">TRUSTED BY CLIENTS</div>
            </div>
            <div className="p-3 bg-white/30 border-2 border-border-color rounded-xl">
              <div className="text-3xl md:text-4xl font-mono font-black text-darkteal">4.9/5</div>
              <div className="text-xs font-mono font-bold text-darkteal uppercase mt-1">COMMUNITY RATING</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
