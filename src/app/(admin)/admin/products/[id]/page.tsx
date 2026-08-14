'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ProductForm } from '@/components/admin/ProductForm';
import { AssetService } from '@/lib/asset-service';
import { AssetItem } from '@/types';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [asset, setAsset] = useState<AssetItem | null>(null);

  useEffect(() => {
    if (id) {
      const found = AssetService.getById(id) || AssetService.getBySlugOrId(id);
      if (found) {
        setAsset(found);
      }
    }
  }, [id]);

  const handleSubmit = (data: Partial<AssetItem>) => {
    if (id) {
      AssetService.updateAsset(id, data);
      router.push('/admin/products');
    }
  };

  if (!asset) {
    return (
      <>
        <AdminHeader title="Loading Asset..." breadcrumb={['Admin', 'Products', 'Edit']} />
        <main className="p-8 text-center font-mono font-bold text-text">
          Loading asset data...
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader title={`Edit Product: ${asset.name}`} breadcrumb={['Admin', 'Products', 'Edit']} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto font-body text-text">
        <ProductForm initialData={asset} onSubmit={handleSubmit} />
      </main>
    </>
  );
}
