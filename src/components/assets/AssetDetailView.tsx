'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AssetService } from '@/lib/asset-service';
import { Button } from '@/components/ui/Button';
import { AssetItem, LicenseTier, LICENSE_PRICES } from '@/types';
import { AssetPreviewGallery } from './AssetPreviewGallery';
import { AssetCheckoutModal } from './AssetCheckoutModal';
import { AssetRelatedList } from './AssetRelatedList';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';
import { IconRenderer } from '@/components/ui/IconRenderer';


export interface AssetDetailViewProps {
  assetId?: string | number;
}

export const AssetDetailView: React.FC<AssetDetailViewProps> = ({ assetId }) => {
  const routeParams = useParams();
  const rawId = assetId || (routeParams?.id as string) || (routeParams?.slug as string) || '1';

  const [asset, setAsset] = useState<AssetItem | null>(null);
  const [isPremiumMode, setIsPremiumMode] = useState<boolean>(false);


  // Premium License & Checkout State
  const [selectedLicense] = useState<LicenseTier>('commercial');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Share Link State
  const [copiedLink, setCopiedLink] = useState(false);

  // Markdown Panel State
  const [fetchedMarkdown, setFetchedMarkdown] = useState<string | null>(null);
  const [markdownViewTab, setMarkdownViewTab] = useState<'rendered' | 'raw' | 'requirements'>('rendered');
  const [copiedMdSource, setCopiedMdSource] = useState(false);

  useEffect(() => {
    const updateAssetData = () => {
      const found = AssetService.getBySlugOrId(rawId) || AssetService.getAll()[0];
      if (found) {
        setAsset(found);
        setIsPremiumMode(Boolean(found.isPremium));

        if (found.markdownFile) {
          fetch(found.markdownFile)
            .then((res) => (res.ok ? res.text() : null))
            .then((text) => {
              if (text) setFetchedMarkdown(text);
            })
            .catch(() => { });
        } else {
          setFetchedMarkdown(null);
        }
      }
    };

    updateAssetData();
    const unsubscribe = AssetService.subscribe(updateAssetData);
    return () => unsubscribe();
  }, [rawId]);

  if (!asset) {
    return (
      <div className="flex flex-col w-full max-w-full items-center justify-center p-8 text-center">
        <div className="text-4xl mb-4 font-mono font-black animate-bounce">📦</div>
        <h2 className="font-head text-2xl font-black uppercase text-text mb-2">ASSET NOT FOUND</h2>
        <p className="font-mono text-lg text-text/90 mb-6">The requested digital asset could not be located in the vault.</p>
        <Link href="/">
          <Button variant="neutral" className="px-6 py-3 font-mono text-lg font-black uppercase rounded-xl">
            ← RETURN TO CATALOG
          </Button>
        </Link>
      </div>
    );
  }

  const tier = LICENSE_PRICES[selectedLicense];
  const finalPrice = tier.usd;


  const copyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Related Assets Recommendations (up to 3 items)
  const relatedAssets = AssetService.getAll()
    .filter((a) => a.id !== asset.id && (a.category === asset.category || a.isPremium === asset.isPremium))
    .slice(0, 3);

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-8 py-6 max-w-full mx-auto w-full flex-1 gap-1">
      {/* ---------------------------------Top Navigation & Mode Switcher ----------------------------------------------------------------*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-darkteal gap-4 border-border-color pb-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm font-mono font-bold text-darkteal overflow-x-auto">
          <Link href="/" className="hover:text-cayenne transition-colors shrink-0">
            HOME
          </Link>
          <span>/</span>
          <span className="text-cayenne uppercase shrink-0">
            {asset.category ? asset.category.replace('_', ' ') : 'VAULT'}
          </span>
          <span>/</span>
          <span className="opacity-70 uppercase truncate max-w-75 sm:max-w-lg">{asset.name}</span>
        </div>

        {/* -----------------------------------------Share & Dynamic Mode Switcher------------------------------------- */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={copyShareLink}
            type="button"
            className="px-3 py-1.5 text-sm font-mono bg-yellow-100 text-darkteal border-2 border-border-color rounded-xl hover:bg-yellow-green hover:text-evergreen transition-all flex items-center gap-1 cursor-pointer"
            title="Copy share link"
          >
            {copiedLink ? '✅ COPIED!' : '⌗ SHARE'}
          </button>

          <div className="flex items-center bg-bg border-2 border-border-color rounded-xl p-1 gap-1 font-mono text-sm font-bold">
            <button
              onClick={() => setIsPremiumMode(false)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${!isPremiumMode
                ? 'bg-yellow-green text-darkteal shadow-[2px_2px_0_var(--border-color)]'
                : 'text-darkteal hover:text-text'
                }`}
            >
              ◯ FREE
            </button>
            <button
              onClick={() => setIsPremiumMode(true)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${isPremiumMode
                ? 'bg-yellow-green text-darkteal shadow-[2px_2px_0_var(--border-color)]'
                : 'text-darkteal hover:text-text'
                }`}
            >
              ◯ PRO VAULT
            </button>
          </div>
        </div>
      </div>

      {/* --------------------------Main Content Panel ----------------------------------------------*/}
      <div className="bg-yellow-50 text-darkteal p-6 md:p-8 flex flex-col gap-6 shadow-hard-sm rounded-xl border-2 border-border-color">
        {/* ......................Head Section............................. */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-border-color pb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {isPremiumMode ? (
                <span className="bg-yellow-green text-darkteal border border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md uppercase tracking-wider">
                  ❤️PREMIUM
                </span>
              ) : (
                <span className="bg-yellow-green text-darkteal border border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md uppercase tracking-wider">
                  FREE DOWNLOAD
                </span>
              )}
              <span className="bg-yellow-green text-darkteal border border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md">
                {asset.tag || 'FEATURED'}
              </span>
              <span className="bg-yellow-green text-darkteal border border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md">
                VERSION {asset.version || 'v1.0'}
              </span>
              <span className="bg-yellow-green text-darkteal border border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md uppercase">
                {asset.category || 'ASSET'}
              </span>
              {asset.downloadUrl && (
                <span className="bg-neo-pink text-white border border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md uppercase flex items-center gap-1">
                  🔗 DIRECT EXTERNAL DOWNLOAD
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-border-color bg-white shadow-hard-sm rounded-xl flex items-center justify-center p-2 shrink-0 overflow-hidden">
                <IconRenderer icon={asset.icon} alt={asset.name} size={64} className="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
              </div>
              <h1 className="font-head text-2xl sm:text-3xl md:text-4xl font-black uppercase text-darkteal tracking-tight leading-tight">
                {asset.name}
              </h1>
            </div>

          </div>

          {/* ........................ Stats Badges ........................*/}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 flex-wrap">
            <span className="font-mono text-sm font-black text-evergreen bg-white px-3 py-2 border-2 border-border-color rounded-lg">
              ◯ {asset.rating} / 5.0
            </span>
            <span className="font-mono text-sm font-black text-evergreen bg-white px-3 py-2 border-2 border-border-color rounded-lg">
              ▼ {asset.downloads} DOWNLOADS
            </span>
            {isPremiumMode && (
              <span className="font-mono text-sm font-black text-cayenne bg-yellow-green px-3 py-2 border-2 border-border-color rounded-lg">
                ▶{asset.price || `$${tier.usd} USD`}
              </span>
            )}
          </div>
        </div>

        {/* ....................Body Section Grid.................................... */}
        <div className="max-w-full w-full gap-8 items-start">
          {/* ......................Left Column (7/12): 3-Slide Gallery.................... */}
          <div className="w-full max-w-full">
            <AssetPreviewGallery asset={asset} isPremiumMode={isPremiumMode} />
          </div>
        </div>

        {/* ===============Product Markdown Description & Information Section (Markdown Rendering Panel) =============== */}
        <div className="border-t-2 border-border-color/30 pt-9 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 bg-evergreen/5 p-3.5 rounded-xl border-2 border-border-color/30">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-white/40 text-evergreen border font-mono text-sm font-black px-5 py-2 rounded-md shadow-[2px_2px_0_var(--border-color)]">
                DOCUMENTATION
              </span>
              {asset.markdownFile && (
                <span className="font-bold text-sm bg-white text-black/60 px-3 py-1 rounded border border-border-color shadow-[1px_1px_0_var(--border-color)]">
                  ▼ {asset.markdownFile}
                </span>
              )}
            </div>

            {/* ========================View Mode Tabs =========================== */}
            <div className="flex items-center gap-4 font-mono text-sm font-bold flex-wrap">
              <button
                type="button"
                onClick={() => setMarkdownViewTab('rendered')}
                className={`px-5 py-2 rounded-sm border border-border-color transition-all cursor-pointer ${markdownViewTab === 'rendered'
                  ? 'bg-yellow-green text-white shadow-hard-sm'
                  : 'bg-white text-evergreen hover:bg-yellow-green'
                  }`}
              >
                Overview
              </button>
              {asset.requirements && (
                <button
                  type="button"
                  onClick={() => setMarkdownViewTab('requirements')}
                  className={`px-5 py-2 rounded-sm border border-border-color transition-all cursor-pointer ${markdownViewTab === 'requirements'
                    ? 'bg-yellow-green text-evergreen shadow-hard-sm'
                    : 'bg-white text-evergreen hover:bg-yellow-green'
                    }`}
                >
                  REQUIREMENTS
                </button>
              )}
            </div>
          </div>

          {/* Panel Content Display */}
          <div className="bg-white border-2 border-border-color shadow-hard-sm rounded-xl p-5 md:p-7 text-evergreen relative">
            {markdownViewTab === 'rendered' && (
              <MarkdownRenderer
                content={
                  fetchedMarkdown ||
                  asset.detailsMarkdown ||
                  `### ${asset.name} Overview\n\n**${asset.name}** adalah paket aset digital berkualitas tinggi yang dirancang untuk mempercepat alur kerja desain dan pengembangan Anda.`
                }
              />
            )}

            {markdownViewTab === 'requirements' && asset.requirements && (
              <div className="flex flex-col gap-4">
                <h3 className="font-head font-black text-xl uppercase text-evergreen border-b-2 border-border-color pb-2">
                  RECOMMENDED REQUIREMENTS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(asset.requirements).map(([key, val]) => (
                    <div key={key} className="bg-white p-3.5 rounded-lg border border-border-color flex flex-col gap-1">
                      <span className="font-mono text-lg font-black uppercase text-evergreen/70">{key}</span>
                      <span className="font-mono text-sm font-bold text-evergreen">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ======================Bottom Action Footer Bar=============================== */}
        <div className="border-t-2 border-border-color pt-8 flex flex-col gap-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button
              onClick={() => setCheckoutModalOpen(true)}
              className="w-full py-6 px-8 font-mono font-black text-lg uppercase tracking-wider rounded-lg border-2 border-border-color bg-yellow-green text-white shadow-hard hover:bg-yellow-green hover:text-evergreen transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg cursor-pointer flex items-center justify-center gap-2"
            >
              DOWNLOAD {asset.size ? `(${asset.size})` : ''}
            </button>

            <a
              href="https://ko-fi.com/X8H2252NMD"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <button
                type="button"
                className="w-full py-6 px-8 font-mono font-black text-lg uppercase tracking-wider rounded-xl border-2 border-border-color bg-yellow-500 text-black shadow-hard transition-all duration-200 hover:bg-yellow-300 hover:text-white hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg cursor-pointer"
              >
                ❤️ SUPPORT (DONATE)
              </button>
            </a>
          </div>

          <div className="text-center font-mono text-sm text-black">
            🔒 100% VirusTotal Clean • High-Speed CDN Mirror • Direct Instant Archive Access
          </div>
        </div>
      </div>

      {/* -----------------------------------------Recommended Assets List----------------------------------------------- */}
      <AssetRelatedList relatedAssets={relatedAssets} />

      {/* -------------------------------------------Checkout Modal--------------------------------------------------------- */}
      <AssetCheckoutModal
        asset={asset}
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        selectedLicense={selectedLicense}
        finalPrice={finalPrice}
      />

      {/* --------------------------------------------------Back Link ------------------------------------------------------*/}
      <div className="flex justify-center mt-4">
        <Link href="/">
          <Button variant="neutral" className="px-6 py-3 font-mono text-lg font-black uppercase rounded-lg">
            ← BACK TO ASSET CATALOG
          </Button>
        </Link>
      </div>
    </div>
  );
};
