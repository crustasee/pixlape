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
    <div className="max-w-full mx-auto px-5 sm:px-6 md:px-8 w-full flex-1 flex flex-col gap-2">
      <div className="mb-6">
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
