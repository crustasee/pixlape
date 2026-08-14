'use client';

import { useState, useMemo, useEffect } from 'react';
import { AssetItem, CategoryType, OSFilterType, SortOption } from '@/types';
import { ASSET_DATABASE } from '@/data/assets';

export function useAssetFilter() {
  const [category, setCategory] = useState<CategoryType>('design_app');
  const [osFilter, setOsFilter] = useState<OSFilterType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('popular');
  const [allAssets, setAllAssets] = useState<AssetItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchAssets() {
      try {
        setLoading(true);
        const res = await fetch('/api/public/products');
        const json = await res.json();
        if (json.success && json.data) {
          setAllAssets(json.data);
        } else {
          setAllAssets(getDefaultAssets());
        }
      } catch {
        setAllAssets(getDefaultAssets());
      } finally {
        setLoading(false);
      }
    }

    fetchAssets();
  }, []);

  function getDefaultAssets(): AssetItem[] {
    const list: AssetItem[] = [];
    Object.keys(ASSET_DATABASE).forEach((cat) => {
      ASSET_DATABASE[cat as CategoryType].forEach((item) => {
        list.push({ ...item, category: cat as CategoryType });
      });
    });
    return list;
  }

  const filteredAssets = useMemo(() => {
    // Filter by Category
    let items = allAssets.filter(item => item.category === category);

    // Filter by OS
    if (osFilter !== 'all') {
      items = items.filter(
        (item) => item.os && (item.os.includes('all') || item.os.includes(osFilter) || (osFilter === 'mobile' && item.os.includes('android')))
      );
    }

    // Filter by Search Query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          (item.tag && item.tag.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortOption === 'name') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'newest') {
      items.sort((a, b) => {
        const idA = typeof a.id === 'number' ? a.id : parseInt(String(a.id).replace(/\D/g, '')) || 0;
        const idB = typeof b.id === 'number' ? b.id : parseInt(String(b.id).replace(/\D/g, '')) || 0;
        return idB - idA;
      });
    } else {
      // Default: Popular (downloads)
      items.sort((a, b) => {
        const dlA = typeof a.downloads === 'number' ? a.downloads : parseFloat(String(a.downloads).replace(/[^\d.]/g, '')) || 0;
        const dlB = typeof b.downloads === 'number' ? b.downloads : parseFloat(String(b.downloads).replace(/[^\d.]/g, '')) || 0;
        return dlB - dlA;
      });
    }

    return items;
  }, [allAssets, category, osFilter, searchQuery, sortOption]);

  return {
    category,
    setCategory,
    osFilter,
    setOsFilter,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filteredAssets,
    totalCount: filteredAssets.length,
    loading
  };
}
