'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AssetItem } from '@/types';
import { isImageIcon, getIconSrc } from '@/data/assets';

interface AssetCardProps {
  asset: AssetItem;
  onQuickView?: (asset: AssetItem) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onQuickView }) => {
  const router = useRouter();
  const detailUrl = asset.isPremium ? `/premium-preview/${asset.id}` : `/preview/${asset.id}`;

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(asset);
    } else {
      router.push(detailUrl);
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(detailUrl);
  };

  return (
    <div
      onClick={handleCardClick}
      className="asset-card group flex flex-col w-full bg-soft-linen text-black rounded-2xl border-2 border-border-color shadow-hard hover:shadow-hard-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden cursor-pointer focus-visible:outline-3 focus-visible:outline-cayenne"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      {/* Card Image / Icon Area */}
      <div className="w-full h-40 bg-cool-blue flex items-center justify-center overflow-hidden relative rounded-xl border-b-1 border-border-color">
        {isImageIcon(asset.icon) ? (
          <img
            src={getIconSrc(asset.icon)}
            alt={asset.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-cool-blue/60">
            <span className="text-4xl transition-transform duration-300 group-hover:scale-110 select-none">
              {asset.icon || '📦'}
            </span>
          </div>
        )}
        {asset.isPremium && (
          <div className="absolute top-3 right-3 bg-orange-topaz text-black rounded-full p-1 shadow-hard-sm border-1 border-border-color text-sm font-black w-10 h-10 flex items-center justify-center">
            ★
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-1 flex flex-col flex-1 justify-between gap-2">
        <div className="flex flex-col gap-3">
          {/* Badges */}
          <div className="flex gap-2 flex-wrap">
            {asset.isPremium && (
              <span className="badge badge-pink font-mono text-lg font-bold rounded-md">
                PRO
              </span>
            )}
            {asset.tag && (
              <span className="badge badge-soft-linen text-black font-mono text-lg font-bold rounded-md">
                {asset.tag}
              </span>
            )}
            {asset.version && (
              <span className="badge badge-soft-linen text-black font-mono text-lg font-bold rounded-md">
                {asset.version}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 className="text-2xl font-head font-black text-black leading-snug group-hover:text-orange-topaz transition-colors duration-150">
            {asset.name}
          </h2>

          {/* Description */}
          <p className="text-sm font-body text-cassis/95 dark:text-cool-blue/85 line-clamp-2 leading-relaxed font-medium">
            {asset.desc}
          </p>
        </div>

        {/* Footer info (Stats & CTA) */}
        <div className="flex flex-col gap-3 mt-2">
          {/* Stats */}
          <div className="flex items-center justify-between border-t-2 border-border-color/20 pt-3 text-xs font-mono font-bold text-black">
            <span className="flex items-center gap-1" title="File size">● {asset.size}</span>
            <span className="flex items-center gap-1" title="Rating">● {asset.rating}</span>
            <span className="flex items-center gap-1" title="Downloads">● {asset.downloads}</span>
          </div>

          {/* Tombol CTA */}
          <button
            onClick={handleCtaClick}
            type="button"
            className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-yellow-green text-evergreen hover:bg-cayenne hover:text-white text-sm font-mono font-black uppercase tracking-wider rounded-xl border-2 border-border-color shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard transition-all duration-200 active:translate-x-0 active:translate-y-0 active:shadow-none cursor-pointer"
          >
            <span>VIEW DETAILS</span>
            <span
              className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1 font-mono font-bold"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
