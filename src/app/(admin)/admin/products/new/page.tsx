'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductForm } from '@/components/admin/ProductForm';
import { AssetService } from '@/lib/asset-service';
import { AssetItem } from '@/types';

export default function NewProductPage() {
  const router = useRouter();

  const handleSubmit = (data: Partial<AssetItem>) => {
    const created = AssetService.createAsset(data);
    router.push(`/admin/products`);
  };

  return (
    <>
      <AdminHeader title="Create New Asset Product" breadcrumb={['Admin', 'Products', 'New']} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto font-body text-text">
        <ProductForm onSubmit={handleSubmit} />
      </main>
    </>
  );
}
