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
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6 max-w-full mx-auto w-full flex-1 gap-8">
      {/* Main Glassmorphism Container */}
      <div className="bg-yellow-100 text-evergreen p-6 md:p-10 w-full flex flex-col gap-8 shadow-hard-sm rounded-lg border border-border-color">

        {/* ================= HEADER & MANIFESTO ================= */}
        <div className="max-w-full w-full flex flex-col gap-4 border-b-2 border-border-color pb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="bg-green-300 text-black border border-border-color text-xs font-mono font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-hard-sm">
              PIXLApe Project
            </span>
            <span className="bg-green-300 border border-border-color text-black text-xs font-mono font-bold px-3 py-1.5 rounded-md shadow-hard-sm">
              VISUAL GRAPHIC
            </span>
            <span className="bg-green-300 border border-border-color text-black text-xs font-mono font-bold px-3 py-1.5 rounded-md shadow-hard-sm">
              FULLSTACK & VISUAL ARTIST
            </span>
            <span className="bg-green-300 border border-border-color text-black text-xs font-mono font-bold px-3 py-1.5 rounded-md flex items-center gap-2 shadow-hard-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-evergreen animate-ping inline-block"></span>
              START PROJECT INQUIRY
            </span>
          </div>

          <h1 className="font-head font-black text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none text-evergreen uppercase">
            ++ABOUT PIXLAPE<span className="text-cayenne"> ++++PROJECT</span>
          </h1>

          <p className="font-mono text-sm sm:text-base md:text-lg text-darkteal italic bg-white/40 p-5 border border-border-color rounded-lg leading-relaxed">
            &quot;We don&apos;t ship products. We ship pieces of ourselves. Built by independent hands, driven by obsession, and made with love that borders on madness.&quot;
          </p>
        </div>

        {/* ================= HERO PROFILE GRID ================= */}
        <div className="w-full flex flex-col lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Avatar Profile & Skill Badges (5/12 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <div className="w-full border border-border-color bg-yellow-200 shadow-hard-sm rounded-xl p-6 flex flex-col items-center text-center gap-5">

              {/* Profile GIF Container with Pulsing Frame */}
              <div className="aspect-square border border-border-color bg-yellow-100 shadow-hard-sm rounded-lg overflow-hidden relative group p-2 flex items-center justify-center">
                <Image
                  src={imgSrc}
                  alt="PIXLApe Lead Author Profile"
                  width={360}
                  height={360}
                  unoptimized={true}
                  onError={() => setImgSrc('/Assets/img/avatar_profile.gif')}
                  className="object-cover w-full h-full rounded-md transition-transform duration-300 group-hover:scale-105"
                  priority
                />

                {/* Animated Badge Overlay */}
                <span className="absolute bottom-4 right-4 bg-yellow-green text-evergreen font-mono font-black text-xs px-3 py-1.5 rounded-md border border-border-color shadow-hard-sm uppercase tracking-wider">
                  ⚡ GIF ANIMATED
                </span>
              </div>

              {/* Categorized Tech & Skill Chips */}
              <div className="flex flex-col gap-2 w-full pt-1">
                <span className="font-mono text-xs font-black text-evergreen uppercase tracking-wide text-left">
                  DEVELOPER & ARTIST TOOLKIT:
                </span>
                <div className="flex flex-wrap gap-2 font-mono text-xs font-bold">
                  <span className="px-3 py-1.5 bg-white text-evergreen border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                    Next.js 14
                  </span>
                  <span className="px-3 py-1.5 bg-white text-evergreen border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                    React & TS
                  </span>
                  <span className="px-3 py-1.5 bg-white text-evergreen border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                    Flutter
                  </span>
                  <span className="px-3 py-1.5 bg-white text-evergreen border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                    Vector Illustration
                  </span>
                  <span className="px-3 py-1.5 bg-white text-evergreen border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                    Graphic Design
                  </span>
                  <span className="px-3 py-1.5 bg-white text-evergreen border border-border-color rounded-lg shadow-hard-sm hover:-translate-y-0.5 transition-all">
                    Audio Stem Lab
                  </span>
                </div>
              </div>

              {/* Quick Contact & Bio Badge */}
              <div className="w-full bg-white/70 border border-border-color rounded-lg p-3 text-left font-mono text-xs text-evergreen/90 leading-relaxed">
                <span className="font-black text-cayenne block uppercase">⚡ INDIE CREATOR DIRECT:</span>
                Crafting tools, templates & graphics independently out of obsession and precision engineering.
              </div>

            </div>
          </div>

          {/* Right Column: Biography & Creative Philosophy (7/12 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b-2 border-border-color pb-3">
              <span className="text-cayenne font-mono font-black text-xl">▶</span>
              <h2 className="font-head font-black text-2xl md:text-3xl text-evergreen uppercase tracking-wide">
                BIOGRAPHY & CREATIVE PHILOSOPHY
              </h2>
            </div>

            <div className="flex flex-col gap-4 font-body text-base md:text-lg text-evergreen leading-relaxed">
              <p className="bg-white/60 p-4 border border-border-color rounded-xl shadow-hard-sm">
                <strong className="text-cayenne font-black uppercase">Established in 2013</strong> — <strong className="text-evergreen font-black uppercase">PIXLApe Project</strong> represents over 13 years of continuous work at the intersection of fullstack software engineering and high-contrast digital visual design.
              </p>

              <p className="text-evergreen/90 font-medium">
                Operating independently, I engineer high-performance web applications, neo-brutalist component architectures, vector graphic libraries, audio stem collections, and developer CLI tools — completely free from bloat, third-party tracking, or restrictive paywalls.
              </p>

              <p className="text-evergreen/90 font-medium">
                Every release in the PIXLApe vault is governed by a strict manifesto: clean modular architecture, tactile interface responsiveness, zero telemetry, and security-verified source files ready for instant production deployment.
              </p>
            </div>

            {/* Core Pillars / Guarantees Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex items-start gap-3">
                <span className="text-2xl">⚡</span>
                <div className="flex flex-col">
                  <strong className="font-mono font-black text-xs text-cayenne uppercase">TACTILE NEO-BRUTALISM</strong>
                  <span className="font-mono text-xs text-evergreen/80 mt-0.5">High contrast, hard shadows, vibrant neon palette & responsive micro-interactions.</span>
                </div>
              </div>

              <div className="p-3.5 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex items-start gap-3">
                <span className="text-2xl">🔒</span>
                <div className="flex flex-col">
                  <strong className="font-mono font-black text-xs text-darkteal uppercase">ZERO TELEMETRY GUARANTEE</strong>
                  <span className="font-mono text-xs text-evergreen/80 mt-0.5">No tracking scripts, no privacy invasion, 100% clean self-contained code.</span>
                </div>
              </div>

              <div className="p-3.5 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex items-start gap-3">
                <span className="text-2xl">💻</span>
                <div className="flex flex-col">
                  <strong className="font-mono font-black text-xs text-evergreen uppercase">BATTLE-TESTED STACK</strong>
                  <span className="font-mono text-xs text-evergreen/80 mt-0.5">Built with modern React, Next.js 14, TypeScript, Tailwind CSS, & Flutter.</span>
                </div>
              </div>

              <div className="p-3.5 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex items-start gap-3">
                <span className="text-2xl">🎨</span>
                <div className="flex flex-col">
                  <strong className="font-mono font-black text-xs text-cayenne uppercase">DUAL-CORE CREATIVITY</strong>
                  <span className="font-mono text-xs text-evergreen/80 mt-0.5">Combining complex logic engineering with high-fidelity visual artwork.</span>
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 gap-4 font-mono pt-1">
              <div className="p-4 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex flex-col gap-1">
                <span className="text-evergreen/70 block text-xs uppercase font-bold">EXPERIENCE:</span>
                <strong className="text-cayenne text-base sm:text-lg font-black">13+ YEARS (SINCE 2013)</strong>
              </div>
              <div className="p-4 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex flex-col gap-1">
                <span className="text-evergreen/70 block text-xs uppercase font-bold">CORE DUALITY:</span>
                <strong className="text-darkteal text-base sm:text-lg font-black">FULLSTACK + VISUAL ARTIST</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ================= CHRONOLOGICAL JOURNEY & MILESTONES ================= */}
        <div className="flex flex-col gap-5 border-t-2 border-border-color pt-7">
          <div className="flex items-center gap-3">
            <span className="text-darkteal font-mono font-black text-xl">▶</span>
            <h3 className="font-head font-black text-xl md:text-2xl text-evergreen uppercase tracking-wide">
              OUR CHRONOLOGICAL JOURNEY & MILESTONES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono">
            {/* Phase 1 */}
            <div className="p-5 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-border-color pb-2">
                <span className="font-black text-xs text-cayenne uppercase">PHASE 01 (2013 - 2017)</span>
                <span className="bg-yellow-green text-evergreen text-[10px] font-black px-2 py-0.5 rounded border border-border-color">GENESIS</span>
              </div>
              <h4 className="font-head font-black text-base text-evergreen uppercase">Retro Foundations & Visual Arts</h4>
              <p className="font-body text-xs text-evergreen/90 leading-relaxed">
                Started as a passion project exploring low-level canvas rendering, retro pixel illustration, and customized icon sets. Experimenting with visual artwork and raw layout logic laid the groundwork for PIXLApe&apos;s distinct high-contrast aesthetic.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="p-5 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-border-color pb-2">
                <span className="font-black text-xs text-darkteal uppercase">PHASE 02 (2018 - 2021)</span>
                <span className="bg-green-300 text-black text-[10px] font-black px-2 py-0.5 rounded border border-border-color">EXPANSION</span>
              </div>
              <h4 className="font-head font-black text-base text-evergreen uppercase">Fullstack & Cross-Platform</h4>
              <p className="font-body text-xs text-evergreen/90 leading-relaxed">
                Expanded into modern fullstack software development, mastering React, Next.js, Flutter, and serverless architectures. Built custom web tools, dynamic UI component kits, and cross-platform utilities for client projects worldwide.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="p-5 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-border-color pb-2">
                <span className="font-black text-xs text-evergreen uppercase">PHASE 03 (2022 - PRESENT)</span>
                <span className="bg-cayenne text-white text-[10px] font-black px-2 py-0.5 rounded border border-border-color">THE VAULT</span>
              </div>
              <h4 className="font-head font-black text-base text-evergreen uppercase">The PIXLApe Digital Vault</h4>
              <p className="font-body text-xs text-evergreen/90 leading-relaxed">
                Unified software engineering rigor with bold Neo-Brutalist artwork to launch the PIXLApe Digital Asset Vault — hosting 40+ curated products ranging from vector graphic packs to production-ready Next.js templates.
              </p>
            </div>
          </div>
        </div>

        {/* ================= CALL-TO-ACTION (CTA) SECTION ================= */}
        <div className="border-t-2 border-border-color pt-7 flex flex-col gap-6 item-center">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <h3 className="font-mono font-black text-base md:text-xl text-darkteal uppercase tracking-wide">
              +++++++++++ GET IN TOUCH ++++++++++++
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
      {/* ==================== BUTTON CTA 1: Project Dev Inquiry ==================== */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:project@keratuli.site?subject=Project%20Dev%20Inquiry%20-%20PIXLApe"
                className="w-full"
              >
                <button
                  type="button"
                  className="w-full py-4 px-4 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-border-color bg-cayenne text-white shadow-hard hover:bg-yellow-green hover:text-evergreen transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg flex items-center justify-center gap-2.5 cursor-pointer"
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

      {/* ========================= BUTTON CTA 2: Art Commission ========================= */}
            <div className="flex flex-col gap-2">
              <a
                href="mailto:project@keratuli.site?subject=Art%20Commission%20Inquiry%20-%20PIXLApe"
                className="w-full"
              >
                <button
                  type="button"
                  className="w-full py-4 px-4 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-border-color bg-green-400 text-black shadow-hard hover:bg-yellow-green hover:text-evergreen transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg flex items-center justify-center gap-2.5 cursor-pointer"
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
                  className="w-full py-4 px-4 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl border-2 border-border-color bg-yellow-green text-evergreen shadow-hard hover:bg-cayenne hover:text-white transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg flex items-center justify-center gap-2.5 cursor-pointer"
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

        {/* =========================== STATISTIC AT A GLANCE =========================== */}
        <div className="border border-border-color bg-yellow-green text-black p-3 rounded-lg flex flex-col gap-5 font-mono">
          <h3 className="font-head font-black text-lg tracking-wider uppercase text-darkteal">
            ++++++++++++++ STATISTICS AT A GLANCE
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
