'use client';

import React from 'react';
import { AssetItem } from '@/types';
import { isImageIcon, getIconSrc } from '@/data/assets';
import { IconRenderer } from '@/components/ui/IconRenderer';

interface AssetHeroBannerProps {
  asset: AssetItem;
}

export const AssetHeroBanner: React.FC<AssetHeroBannerProps> = ({ asset }) => {
  const isCorel = asset.name.toLowerCase().includes('corel') || asset.id === 9;
  const rawBanner =
    asset.bannerImage ||
    (isImageIcon(asset.icon) ? getIconSrc(asset.icon) : null) ||
    (isCorel ? '/uploads/corelBanner1.jpg' : null);

  const bannerSrc = rawBanner ? getIconSrc(rawBanner) : null;

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border-color shadow-hard bg-yellow-100 relative group">
      {/* 1440px x 480px ratio container */}
      <div className="w-full aspect-1440/480 min-h-50 max-h-120 relative flex items-center justify-center overflow-hidden bg-yellow-green">
        {bannerSrc ? (
          <img
            src={bannerSrc}
            alt={`${asset.name} Hero Banner (1440x480)`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Fallback Neo-Brutalist Banner Pattern */
          <div className="w-full h-full hero-grid-bg p-6 md:p-10 flex flex-col justify-between relative">
            <div className="flex justify-between items-start z-10">
              <span className="badge badge-darkteal font-mono text-sm font-black uppercase px-4 py-2 rounded-md">
                {asset.tag || 'PIXLAPE VAULT'}
              </span>
              <span className="badge badge-pink font-mono text-sm font-black px-4 py-2 rounded-md">
                1440 × 480 PX ASSET HERO
              </span>
            </div>

            <div className="z-10 flex items-center gap-6 bg-surface/95 backdrop-blur-sm p-6 rounded-xl border-2 border-border-color shadow-hard-sm max-w-2xl">
              <span className="text-5xl shrink-0 select-none flex items-center justify-center w-16 h-16 bg-white border border-border-color rounded-xl p-2">
                <IconRenderer icon={asset.icon} alt={asset.name} size={48} className="w-12 h-12 object-contain" />
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
        <div className="absolute bottom-3 right-3 z-10 bg-yellow-green text-darkteal backdrop-blur-md border border-border-color font-mono text-[10px] font-bold px-2.5 py-1 rounded-md shadow-sm pointer-events-none">
          1440 × 480 PX HERO BANNER
        </div>
      </div>
    </div>
  );
};
