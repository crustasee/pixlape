'use client';

import React from 'react';
import { AssetItem, CategoryType, SortOption } from '@/types';
import { AssetCard } from './AssetCard';

interface AssetGridProps {
  category: CategoryType;
  assets: AssetItem[];
  totalCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortOption: SortOption;
  onSortChange: (s: SortOption) => void;
  onQuickView: (asset: AssetItem) => void;
}

export const AssetGrid: React.FC<AssetGridProps> = ({
  category,
  assets,
  totalCount,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  onQuickView,
}) => {
  return (
    <main className="flex-1 w-full flex flex-col gap-6">
      {/* Top Search Bar */}
      <div className="search-bar-box bg-yellow-100 p-5">
        <div className="search-bar-wrapper bg-yellow-100">
          <span className="search-bar-icon" aria-hidden="true">
            🖥️
          </span>
          <input
            type="text"
            className="search-bar-input"
            placeholder="Quick search icons, brushes, developer tools, multimedia..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Search assets"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="search-bar-clear-btn"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Grid Controls Header */}
      <div className="bg-yellow-green text-darkteal border-2 border-border-color shadow-hard rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <h2 className="font-head font-black text-xl md:text-2xl tracking-wider uppercase text-darkteal">
            {category.replace(/_/g, ' ')} TROVE ※
          </h2>
          <span className="bg-yellow-green text-darkteal text-sm font-mono px-2.5 py-1 rounded-lg font-bold border border-border-color shadow-[1px_1px_0_var(--border-color)]">
            {totalCount} ITEMS ▼
          </span>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="font-mono text-sm font-black tracking-wide text-darkteal uppercase">
            SORT BY :
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="px-4 py-2 text-sm font-mono font-black border-2 border-border-color bg-yellow-green text-darkteal rounded-lg outline-none cursor-pointer hover:bg-yellow-green/90 transition-colors shadow-hard-sm"
            aria-label="Sort assets"
          >
            <option value="popular">● Most Downloads</option>
            <option value="newest">● Newest First</option>
            <option value="name">● Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Card Grid */}
      {assets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-7">
          {assets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} onQuickView={onQuickView} />
          ))}
        </div>
      ) : (
        <div className="neo-glass bg-darkteal p-12 flex flex-col items-center justify-center text-cente">
          <div className="text-5xl mb-4 select-none animate-bounce">🔍</div>
          <h3 className="font-head font-black text-xl text-text mb-2 tracking-wide uppercase">
            NO ASSETS FOUND
          </h3>
          <p className="font-body text-xs text-text/70 max-w-md leading-relaxed mb-4">
            No results match &quot;{searchQuery}&quot; in the {category} category.
          </p>
          <button
            onClick={() => onSearchChange('')}
            className="px-4 py-2 text-xs font-mono font-black tracking-wider border-2 border-border-color bg-neo-yellow text-text rounded-xl transition-all duration-200 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none focus:outline-none focus:ring-2 focus:ring-neo-cyan focus:ring-offset-2"
          >
            CLEAR SEARCH
          </button>
        </div>
      )}
    </main>
  );
};
