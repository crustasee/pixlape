'use client';

import React from 'react';
import { AssetDetailView } from '@/components/assets/AssetDetailView';

interface ProductDetailPageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function ProductDetailPage(props: ProductDetailPageProps) {
  return <AssetDetailView assetId={props?.params?.slug} />;
}
