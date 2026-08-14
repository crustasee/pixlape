'use client';

import React, { useState } from 'react';
import { AssetGrid } from '@/components/assets/AssetGrid';
import { QuickModal } from '@/components/assets/QuickModal';
import { useAssetFilter } from '@/hooks/useAssetFilter';
import { AssetItem } from '@/types';

export default function ProductsPage() {
  const {
    category,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filteredAssets,
    totalCount,
  } = useAssetFilter();

  const [activeModalAsset, setActiveModalAsset] = useState<AssetItem | null>(null);

  return (
    <div className="max-w-[1850px] mx-auto px-4 sm:px-6 md:px-8 py-6 w-full flex-1 flex flex-col gap-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Product Catalog</h1>
        <p className="text-gray-400 text-sm">Explore all available digital assets and tools.</p>
      </div>

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
  );
}
