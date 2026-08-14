'use client';

import React from 'react';
import { AssetDetailView } from '@/components/assets/AssetDetailView';

interface StandardPreviewPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function StandardPreviewPage(props: StandardPreviewPageProps) {
  return <AssetDetailView assetId={props?.params?.id} />;
}
