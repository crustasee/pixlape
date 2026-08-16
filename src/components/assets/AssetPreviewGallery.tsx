'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AssetItem } from '@/types';
import { isImageIcon, getIconSrc } from '@/data/assets';

interface AssetPreviewGalleryProps {
  asset: AssetItem;
  isPremiumMode: boolean;
}

export const AssetPreviewGallery: React.FC<AssetPreviewGalleryProps> = ({ asset, isPremiumMode }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const isCorel = asset.name.toLowerCase().includes('corel') || asset.id === 9;
  const bannerSrc = asset.bannerImage || (isCorel ? '/corelBanner1.jpg' : null);

  const defaultReqs: Record<string, string> = {
    "Sistem Operasi": "Windows 11 atau Windows 10 64-bit",
    "Prosesor": "Intel Core i3/5/7/9 atau AMD Ryzen",
    "Memori (RAM)": "8 GB hingga 16 GB Recommended",
    "Ruang Hard Disk": "10 GB ruang kosong tersedia",
    "Kartu Grafis": "VRAM 3 GB mendukung OpenCL 1.2",
    "Resolusi Layar": "1920 x 1080 Full HD"
  };

  const reqs = asset.requirements || defaultReqs;
  const reqEntries = Object.entries(reqs);

  const slides = [
    { title: 'Galleries', badge: 'SLIDE 01' },
    { title: 'Requirements', badge: 'SLIDE 02' },
    { title: 'License', badge: 'SLIDE 03' },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/* Active Slide Display Container */}
      <div className="border border-black bg-white/70 shadow-hard-sm rounded-2xl p-4 md:p-5 flex flex-col gap-4 overflow-hidden transition-all duration-300">
        {/* Slide Header Bar (Non-Overlapping) */}
        <div className="flex items-center justify-between border-b-2 border-black/10 pb-2.5">
          <span className="badge badge-yellow text-black border-black font-mono text-[14px] font-black px-2.5 py-1 rounded-md uppercase">
            {slides[activeSlide].badge} • {slides[activeSlide].title}
          </span>
          <span className="font-mono text-xs font-bold text-black/70">
            PREVIEW ▶▶ {activeSlide + 1} OF {slides.length}
          </span>
        </div>

        {activeSlide === 0 ? (
          <div className="w-full flex flex-col gap-4 p-1">
            {/* Banner Container inside Slide 01 */}
            <div className="w-full aspect-[16/9] sm:aspect-[1440/480] max-h-72 relative rounded-lg border-1 border-border-color shadow-hard-sm overflow-hidden bg-yellow-green">
              {bannerSrc ? (
                <Image
                  src={bannerSrc}
                  alt={`${asset.name} Banner Overview`}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 800px"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full hero-grid-bg p-6 flex flex-col items-center justify-center text-center gap-3 relative">
                  <div className="w-32 h-32 border-2 border-border-color bg-white shadow-hard-sm rounded-xl flex items-center justify-center p-2 text-4xl shrink-0">
                    {isImageIcon(asset.icon) ? (
                      <Image
                        src={getIconSrc(asset.icon)}
                        alt={asset.name}
                        width={64}
                        height={64}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <span>{asset.icon || '📦'}</span>
                    )}
                  </div>
                  <h3 className="font-head font-black text-lg md:text-xl text-text uppercase tracking-tight">
                    {asset.name}
                  </h3>
                  <span className="badge badge-yellow font-mono text-sm font-bold px-4 py-1 rounded">
                    {asset.tag || 'FEATURED'} • {asset.version || 'v1.0'}
                  </span>
                </div>
              )}

              {/* Resolution Overlay Tag */}
              <div className="absolute bottom-2.5 right-2.5 bg-yellow-green text-black border-1 border-border-color font-mono text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                Documentation preview
              </div>
            </div>

            {/* Info Bar under banner inside Slide 01 */}
            <div className="flex items-center justify-between gap-3 p-3 bg-yellow-green border-2 border-border-color rounded-lg font-mono text-sm">
              <div className="flex items-center gap-2 font-bold truncate text-text">
                <span className="text-base select-none">
                  {asset.icon && !asset.icon.includes('/') ? asset.icon : '●●●○○'}
                </span>
                <span className="truncate">{asset.name}</span>
              </div>
              <span className="bg-yellow-green text-black border-2 border-border-color font-mono text-sm font-bold px-2.5 py-1 rounded-md shadow-sm pointer-events-none">
                {isPremiumMode ? '⚡ PRO ARCHIVE' : 'FREE VAULT'}
              </span>
            </div>
          </div>
        ) : activeSlide === 1 ? (
          <div className="w-full flex flex-col gap-4 p-2 text-left">
            <h4 className="font-head font-black text-lg text-black uppercase border-b-2 border-black pb-2 flex items-center justify-between">
              <span>🖥️ MINIMUM SYSTEM REQUIREMENTS</span>
              <span className="badge badge-yellow text-black border-black text-[12px] font-bold px-2 py-0.5 rounded">
                SPECIFICATIONS
              </span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-sm text-black">
              {reqEntries.map(([key, val], idx) => (
                <div key={idx} className="p-3 bg-white border-2 border-black rounded-xl shadow-hard-sm flex flex-col gap-1">
                  <span className="text-black/60 block text-[12px] uppercase font-bold tracking-wider">{key}:</span>
                  <strong className="text-black font-black text-md leading-snug">{val}</strong>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4 p-2 text-left font-mono text-lg">
            <h4 className="font-head text-2xl text-black uppercase border-b-2 border-border-color pb-2">
              License & Usage Rights
            </h4>
            <div className="p-4 bg-yellow-green border-2 border-border-color rounded-xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-bold">CURRENT LICENSE:</span>
                <span className="badge badge-lime font-bold">{asset.license}</span>
              </div>
              <p className="font-bold text-black text-sm leading-relaxed">
                {isPremiumMode
                  ? 'Includes commercial deployment rights, source modification, continuous version updates, and dedicated priority support.'
                  : 'Free for personal and commercial usage across digital projects. Royalty-free distribution with attribution optional.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Slide Thumbnails / Selector Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {slides.map((slide, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSlide(idx)}
            className={`p-3 border-2 border-border-color rounded-xl font-mono text-lg font-black transition-all text-left flex flex-col gap-1 cursor-pointer ${activeSlide === idx
              ? 'bg-cayenne text-white shadow-hard-sm -translate-x-px -translate-y-px'
              : 'bg-surface text-text hover:bg-yellow-green/40'
              }`}
          >
            <span className="text-[14px] opacity-80">{slide.badge}</span>
            <span className="truncate">{slide.title}</span>
          </button>
        ))}
      </div>

    </div>
  );
};
