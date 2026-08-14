'use client';

import React from 'react';
import { AssetDetailView } from '@/components/assets/AssetDetailView';

interface PremiumPreviewPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function PremiumPreviewPage(props: PremiumPreviewPageProps) {
  return <AssetDetailView assetId={props?.params?.id} />;
}
