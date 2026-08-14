'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AssetItem } from '@/types';
import { isImageIcon, getIconSrc } from '@/data/assets';

interface AssetRelatedListProps {
  relatedAssets: AssetItem[];
}

export const AssetRelatedList: React.FC<AssetRelatedListProps> = ({ relatedAssets }) => {
  if (!relatedAssets || relatedAssets.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between border-b-2 border-border-color pb-3">
        <h3 className="font-head font-black text-base md:text-lg text-evergreen uppercase tracking-wide">
          RECOMMENDED ASSETS IN VAULT
        </h3>
        <Link href="/" className="font-mono text-xs font-bold text-evergreen hover:text-cayenne uppercase transition-colors">
          VIEW ALL ASSETS →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {relatedAssets.map((rel) => (
          <Link key={rel.id} href={`/preview/${rel.id}`}>
            <div className="p-4 bg-yellow-100 border-2 border-border-color shadow-hard-sm rounded-2xl hover:-translate-y-1 hover:shadow-hard transition-all cursor-pointer flex items-center gap-4 group">
              <div className="w-16 h-16 min-w-[56px] min-h-[56px] bg-white border-1 font-mono border-border-color rounded-lg flex items-center justify-center text-3xl shrink-0 p-1.5 overflow-hidden">
                {isImageIcon(rel.icon) ? (
                  <Image
                    src={getIconSrc(rel.icon)}
                    alt={rel.name}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <span>{rel.icon || '📦'}</span>
                )}
              </div>

              <div className="min-w-0 flex flex-col gap-1 flex-1">
                <h4 className="font-head font-black text-sm text-evergreen uppercase truncate leading-tight group-hover:text-cayenne transition-colors">
                  {rel.name}
                </h4>
                <div className="flex items-center gap-2 text-xs text-evergreen/80 font-mono font-bold">
                  <span>⭐ {rel.rating}</span>
                  <span>•</span>
                  <span>⬇️ {rel.downloads}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
