'use client';

import React from 'react';
import Image from 'next/image';
import { AssetItem } from '@/types';

interface AssetHeroBannerProps {
  asset: AssetItem;
}

export const AssetHeroBanner: React.FC<AssetHeroBannerProps> = ({ asset }) => {
  // Check if banner image is explicitly set or if asset is CorelDraw
  const isCorel = asset.name.toLowerCase().includes('corel') || asset.id === 9;
  const bannerSrc = asset.bannerImage || (isCorel ? '/public/uploads/corelBanner1.jpg' : null);

  return (
    <div className="w-full overflow-hidden rounded-xl border-2 border-border-color shadow-hard bg-yellow-100 relative group">
      {/* 1440px x 480px ratio container */}
      <div className="w-full aspect-[1440/480] min-h-[200px] max-h-[480px] relative flex items-center justify-center overflow-hidden bg-cool-blue">
        {bannerSrc ? (
          <Image
            src={bannerSrc}
            alt={`${asset.name} Hero Banner (1440x480)`}
            fill
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-102"
          />
        ) : (
          /* Fallback Neo-Brutalist Banner Pattern */
          <div className="w-full h-full hero-grid-bg p-6 md:p-10 flex flex-col justify-between relative">
            <div className="flex justify-between items-start z-10">
              <span className="badge badge-pink font-mono text-sm font-black uppercase px-4 py-2 rounded-md">
                {asset.tag || 'PIXLAPE VAULT'}
              </span>
              <span className="badge badge-yellow font-mono text-sm font-black px-4 py-2 rounded-md">
                1440 × 480 PX ASSET HERO
              </span>
            </div>

            <div className="z-10 flex items-center gap-6 bg-surface/95 backdrop-blur-sm p-6 rounded-xl border-2 border-border-color shadow-hard-sm max-w-2xl">
              <span className="text-5xl shrink-0 select-none">
                {asset.icon && !asset.icon.includes('/') ? asset.icon : '📦'}
              </span>
              <div>
                <h2 className="font-head text-2xl md:text-3xl font-black uppercase text-text tracking-tight leading-tight">
                  {asset.name}
                </h2>
                <p className="font-body text-lg md:text-xl text-cassis/90 line-clamp-2 mt-1">
                  {asset.desc}
                </p>
              </div>
            </div>

            <div className="z-10 flex gap-2 font-mono text-xs font-bold">
              <span className="badge badge-cyan px-2.5 py-1 rounded-md">VERIFIED ASSET</span>
              <span className="badge badge-lime px-2.5 py-1 rounded-md">1440px × 480px BANNER</span>
            </div>
          </div>
        )}

        {/* Dimension Tag Indicator */}
        <div className="absolute bottom-3 right-3 z-10 bg-cassis/85 text-cool-blue backdrop-blur-md border border-border-color font-mono text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm pointer-events-none">
          1440 × 480 PX HERO BANNER
        </div>
      </div>
    </div>
  );
};
