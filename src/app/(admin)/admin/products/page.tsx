'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductTable } from '@/components/admin/ProductTable';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { AssetService } from '@/lib/asset-service';
import { AssetItem } from '@/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AssetItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    setProducts(AssetService.getAll());
    const unsubscribe = AssetService.subscribe(() => {
      setProducts(AssetService.getAll());
    });
    return unsubscribe;
  }, []);

  const handleDelete = (id: string | number) => {
    AssetService.deleteAsset(id);
  };

  const handleTogglePremium = (id: string | number) => {
    AssetService.togglePremium(id);
  };

  const filteredProducts = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || (item.category && item.category.toLowerCase() === categoryFilter.toLowerCase());

    const matchesType =
      typeFilter === 'all' ||
      (typeFilter === 'premium' && item.isPremium) ||
      (typeFilter === 'free' && !item.isPremium);

    return matchesSearch && matchesCategory && matchesType;
  });

  const totalAssetsCount = products.length;
  const premiumCount = products.filter((p) => p.isPremium).length;
  const freeCount = totalAssetsCount - premiumCount;

  return (
    <>
      <AdminHeader title="Manage Product Assets" breadcrumb={['Admin', 'Products', 'Catalog']} />
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-full w-full text-text font-body">

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between bg-soft-linen border border-border-color p-4 rounded-lg shadow-hard-sm font-mono">
          <div className="flex-1 max-w-full gap-10 p-4">
            <Input
              placeholder="🔍 Search asset name, tag, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-border-color bg-white/50 focus:border-neo-pink text-xs font-bold rounded-lg shadow-hard-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-yellow-100 border-2 border-border-color rounded-lg text-sm font-black text-darkteal focus:outline-none shadow-hard-sm"
            >
              <option value="all">All Categories</option>
              <option value="design_app">Design App</option>
              <option value="multimedia">Multimedia</option>
              <option value="apk_package">Apk package</option>
              <option value="tools_app">Tools App</option>
              <option value="art_graphics">Art & graphics</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-yellow-100 border-2 border-border-color rounded-lg text-sm font-black text-darkteal focus:outline-none shadow-hard-sm"
            >
              <option value="all">All Licenses</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
            </select>

            <Link href="/admin/products/new">
              <Button variant="primary" className="font-mono text-lg font-black uppercase bg-green-300 text-darkteal border-2 border-border-color shadow-hard-sm flex items-center gap-3">
                <IconRenderer icon="/icon/add_white.svg" alt="Add Asset" className="w-5 h-5 object-contain" />
                <span>NEW PRODUCT</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-sm font-mono font-bold text-darkteal px-1">
          <span>
            Showing <strong className="text-cayenne font-black">{filteredProducts.length}</strong> of{' '}
            {totalAssetsCount} assets
          </span>
        </div>

        {/* Product Asset Table */}
        <ProductTable
          products={filteredProducts}
          onDelete={handleDelete}
          onTogglePremium={handleTogglePremium}
        />
      </main>
    </>
  );
}
