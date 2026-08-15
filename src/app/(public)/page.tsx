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
    <div className="flex-1 w-full flex flex-col gap-6">
      {showHero && (
        <section className="px-4 sm:px-6 md:px-8 pt-6 max-w-[1850px] w-full mx-auto" aria-label="Hero">
          <div className="hero-static-box hero-grid-bg p-5 md:p-7 relative overflow-hidden border-2 border-border-color shadow-hard rounded-3xl">
            {/* Ambient glows */}
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-neo-yellow rounded-full opacity-20 blur-4xl pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-neo-cyan rounded-full opacity-20 blur-4xl pointer-events-none" aria-hidden="true" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Left Side: Content */}
              <div className="flex-1">
                <h1 className="font-head font-black text-3xl md:text-4xl lg:text-5xl tracking-tight text-white leading-none mb-3">
                  <span className="inline-block bg-neo-yellow text-black px-2.5 py-0.5 rounded border-1 border-border-color shadow-[2px_2px_0_var(--border-color)] mr-2">
                    ----PIXLAPE----
                  </span>
                  <span className="text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
                    ++TROVE++DIGITAL++VAULT
                  </span>
                </h1>

                <p className="font-body text-xs md:text-sm text-gray-200 font-medium max-w-2xl leading-relaxed mb-4 bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-white/5">
                  Frontend Developers, UI Templates, icon packs, design tools, and dev utilities — built with obsession.
                  Free & Pro assets, virus-scanned, ready to download.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={() => {
                      document.getElementById('vault-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-4 py-2 text-sm font-mono font-black tracking-wider border-1 border-border-color bg-white/20 text-black rounded-lg shadow-hard-sm hover:opacity-90 active:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-neo-cyan focus:ring-offset-2 transform-none"
                  >
                    BROWSE THE VAULT  ▶
                  </button>
                  <button
                    onClick={() => setCategory('design_app')}
                    className="px-4 py-2 text-sm font-mono font-black tracking-wider border-1 border-border-color bg-white/20 text-black rounded-lg shadow-hard-sm hover:opacity-90 active:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-neo-cyan focus:ring-offset-2 transform-none"
                  >
                    EXPLORE THE ABYSS  ▶
                  </button>
                </div>
              </div>

              {/* Right Side: Compact Stats */}
              <div className="flex lg:flex-col sm:flex-row flex-wrap gap-4 shrink-0 justify-start sm:justify-between lg:justify-center">
                {[
                  { label: 'ASSETS COUNT', value: `${stats.totalAssets}++`, color: 'bg-yellow-green text-black' },
                  { label: 'FREE ITEMS', value: `${stats.freeAssets}`, color: 'bg-yellow-green text-black' },
                  { label: 'PRO VAULT', value: `${stats.premiumAssets}`, color: 'bg-yellow-green text-black' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`${stat.color} border-1 border-border-color rounded-lg px-4 py-2 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-3 lg:gap-1 min-w-[120px] sm:min-w-[140px] shadow-[2px_2px_0_var(--border-color)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none`}
                  >
                    <div className="font-mono text-xs font-bold opacity-90 tracking-wider order-2 lg:order-1">
                      {stat.label}
                    </div>
                    <div className="font-head font-black text-lg md:text-xl leading-none order-1 lg:order-2">
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
        className="flex flex-col md:flex-row items-start gap-8 px-4 sm:px-6 md:px-8 pb-8 max-w-[1850px] w-full mx-auto flex-1"
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
