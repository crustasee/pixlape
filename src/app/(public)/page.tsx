'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { AssetGrid } from '@/components/assets/AssetGrid';
import { QuickModal } from '@/components/assets/QuickModal';
import { useAssetFilter } from '@/hooks/useAssetFilter';
import { AssetItem } from '@/types';
import { AssetService } from '@/lib/asset-service';

export default function HomePage() {
  const {
    category,
    setCategory,
    osFilter,
    setOsFilter,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filteredAssets,
    totalCount,
  } = useAssetFilter();

  const [activeModalAsset, setActiveModalAsset] = useState<AssetItem | null>(null);
  const [stats, setStats] = useState(() => AssetService.getStats());

  useEffect(() => {
    const updateStats = () => setStats(AssetService.getStats());
    updateStats();
    const unsubscribe = AssetService.subscribe(updateStats);
    return () => unsubscribe();
  }, []);

  const showHero = searchQuery.trim() === '' && osFilter === 'all';

  return (
    <div className="flex-1 w-full flex flex-col gap-3">
      {showHero && (
        <section className="px-4 sm:px-6 md:px-8 pt-6 max-w-full w-full mx-auto" aria-label="Hero">
          <div className="hero-static-box hero-grid-bg p-5 md:p-7 relative overflow-hidden border shadow-hard-sm rounded-lg">

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
              {/* Left Side: Content */}
              <div className="flex-1">
                <h1 className="font-head font-black text-3xl md:text-3xl lg:text-3xl tracking-tight mb-3">
                  <span className="font-pixel bg-neo-yellow text-darkteal px-6 py-4 rounded-lg border mr-6">
                    PIXLAPE+
                  </span>
                  <span className="font-pixel text-white">
                    ++TROVE++
                  </span>
                </h1>

                <p className="font-body text-xs md:text-sm text-gray-200 font-medium max-w-2xl leading-relaxed mb-4 p-3 rounded-lg border border-white/5">
                  Frontend Developers, UI Templates, icon packs, design tools, and dev utilities — built with obsession.
                  Free & Pro assets, virus-scanned, ready to download.
                </p>
              </div>

              {/* Right Side: Compact Stats */}
              <div className="flex lg:flex-col sm:flex-row flex-wrap gap-2 shrink-0 justify-start sm:justify-between lg:justify-center">
                {[
                  { label: 'ASSETS COUNT', value: `${stats.totalAssets}++`, color: 'bg-yellow-green text-black' },
                  { label: 'FREE ITEMS', value: `${stats.freeAssets}`, color: 'bg-yellow-green text-black' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`${stat.color} border border-border-color rounded-lg px-4 py-2 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-3 lg:gap-1 min-w-30 sm:min-w-35 shadow-[2px_2px_0_var(--border-color)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none`}

                  >
                    <div className="font-mono text-xs font-bold opacity-90 tracking-wider order-2 lg:order-1">
                      {stat.label}
                    </div>
                    <div
                      className="font-head font-black text-lg md:text-xl leading-none order-1 lg:order-2"
                      suppressHydrationWarning
                    >
                      {stat.value}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <div
        id="vault-grid"
        className="flex flex-col md:flex-row items-start gap-3 px-4 sm:px-6 md:px-8 pb-8 max-w-full w-full mx-auto flex-1"
      >
        <Sidebar
          currentCategory={category}
          onCategoryChange={setCategory}
          currentOS={osFilter}
          onOSChange={setOsFilter}
        />

        <AssetGrid
          category={category}
          assets={filteredAssets}
          totalCount={totalCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
          onQuickView={(asset) => setActiveModalAsset(asset)}
        />

        <QuickModal
          asset={activeModalAsset}
          onClose={() => setActiveModalAsset(null)}
        />
      </div>
    </div>
  );
}
