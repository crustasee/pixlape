'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AssetItem } from '@/types';
import { isImageIcon, getIconSrc } from '@/data/assets';
import { Button } from '@/components/ui/Button';

interface QuickModalProps {
  asset: AssetItem | null;
  onClose: () => void;
}

export const QuickModal: React.FC<QuickModalProps> = ({ asset, onClose }) => {
  React.useEffect(() => {
    if (!asset) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [asset, onClose]);

  if (!asset) return null;

  const detailUrl = asset.isPremium ? `/premium-preview/${asset.id}` : `/preview/${asset.id}`;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-yellow-green/20 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${asset.name}`}
    >
      <div
        className="w-full max-w-lg bg-soft-linen p-6 flex flex-col rounded-lg border border-black shadow-hard-sm relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 w-12 h-12 rounded-lg border bg-red-500 border-black hover:bg-red-400 hover:text-white flex items-center justify-center font-bold text-xl cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-neo-cyan focus:ring-offset-2"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 mb-4 pr-8">
          <div className="w-24 h-24 shrink-0 bg-white border border-border-color shadow-[2px_2px_0_var(--border-color)] rounded-lg flex items-center justify-center text-3xl overflow-hidden p-1.5 select-none">
            {isImageIcon(asset.icon) ? (
              <Image
                src={getIconSrc(asset.icon)}
                alt={asset.name}
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            ) : (
              <span>{asset.icon}</span>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="font-head font-black text-2xl tracking-tight text-darkteal leading-tight truncate">
              {asset.name}
            </h2>
            <div className="flex gap-4 mt-4 flex-wrap">
              {asset.isPremium && (
                <span className="border-2 border-darkteal bg-yellow-green text-sm text-darkteal font-mono px-2 py-0.5 rounded-md font-bold">PRO</span>
              )}
              <span className="border-2 border-darkteal bg-yellow-green text-sm text-darkteal font-mono px-2 py-0.5 rounded-md font-bold">
                {asset.tag}
              </span>
              {asset.version && (
                <span className="border-2 border-darkteal bg-yellow-green text-sm text-darkteal font-mono px-2 py-0.5 rounded-md font-bold">
                  {asset.version}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Description */}
        <p className="font-bold text-sm text-darkteal leading-relaxed mb-5">
          {asset.desc}
        </p>

        {/* Stats Grid */}
        <div className="flex flex-col-2 gap-6 p-4 bg-yellow-100 border border-border-color shadow-[3px_3px_0_var(--border-color)] rounded-lg mb-5 font-mono text-sm font-bold text-darkteal">
          <div className="flex flex-col">
            <span className="text-darkteal text-sm uppercase tracking-wider">SIZE</span>
            <span>{asset.size} </span>
          </div>
          <div className="flex flex-col">
            <span className="text-darkteal text-sm uppercase tracking-wider">RATING</span>
            <span className="flex items-center gap-1">●{asset.rating}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-darkteal text-sm uppercase tracking-wider">DOWNLOADS</span>
            <span className="flex items-center gap-1">▼ {asset.downloads}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-darkteal text-sm uppercase tracking-wider">LICENSE</span>
            <span className="truncate">{asset.license}</span>
          </div>
        </div>

        {/* Supported OS Badges */}
        <div className="mb-6">
          <span className="font-mono text-sm font-black tracking-wider uppercase text-darkteal block mb-2">
            ▩ PLATFORMS:
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {asset.os.map((o) => (
              <span key={o} className="bg-yellow-green border border-black shadow-hard-sm text-sm text-white font-mono px-2.5 py-0.5 rounded-md font-bold uppercase">
                {o}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col sm:flex-row">
          {asset.downloadUrl ? (
            <a
              href={asset.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex"
            >
              <Button
                variant="primary"
                className="w-full uppercase font-black tracking-wider bg-yellow-green text-black rounded-xl py-2.5 focus:outline-none focus:ring-2 focus:ring-cayenne focus:ring-offset-2"
              >
                🔗 DOWNLOAD LINK →
              </Button>
            </a>
          ) : null}

          <Link href={detailUrl} className="flex-1 inline-flex">
            <Button
              variant="default"
              className="w-full uppercase font-black tracking-wider rounded-xl py-2.5 focus:outline-none focus:ring-2 focus:ring-cayenne focus:ring-offset-2"
            >
              SEE DETAILS ▶▶
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
