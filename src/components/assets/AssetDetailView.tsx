'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AssetService } from '@/lib/asset-service';
import { Button } from '@/components/ui/Button';
import { AssetItem } from '@/types';
import { AssetPreviewGallery } from './AssetPreviewGallery';
import { AssetLicenseSelector, LicenseTier, LICENSE_PRICES } from './AssetLicenseSelector';
import { AssetCheckoutModal } from './AssetCheckoutModal';
import { AssetRelatedList } from './AssetRelatedList';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

export interface AssetDetailViewProps {
  assetId?: string | number;
}

export const AssetDetailView: React.FC<AssetDetailViewProps> = ({ assetId }) => {
  const routeParams = useParams();
  const rawId = assetId || (routeParams?.id as string) || (routeParams?.slug as string) || '1';

  const [asset, setAsset] = useState<AssetItem | null>(null);
  const [isPremiumMode, setIsPremiumMode] = useState<boolean>(false);

  // Free Download State
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Premium License & Checkout State
  const [selectedLicense, setSelectedLicense] = useState<LicenseTier>('commercial');
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ text: string; success: boolean } | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Share Link State
  const [copiedLink, setCopiedLink] = useState(false);

  // Markdown Panel State
  const [fetchedMarkdown, setFetchedMarkdown] = useState<string | null>(null);
  const [markdownViewTab, setMarkdownViewTab] = useState<'rendered' | 'raw' | 'requirements'>('rendered');
  const [copiedMdSource, setCopiedMdSource] = useState(false);

  useEffect(() => {
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
  }, [rawId]);

  if (!asset) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
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
  const finalPrice = Math.round(tier.usd * (1 - discountPercent / 100));

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 6000);
    }, 1800);
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'MOD2026') {
      setDiscountPercent(20);
      setCouponMsg({ text: '🎉 20% DISCOUNT APPLIED SUCCESSFULLY!', success: true });
    } else if (code === 'FREEPRO') {
      setDiscountPercent(100);
      setCouponMsg({ text: '🔥 100% PROMO DISCOUNT APPLIED!', success: true });
    } else if (code === 'PROMO50') {
      setDiscountPercent(50);
      setCouponMsg({ text: '⚡ 50% SPECIAL DISCOUNT APPLIED!', success: true });
    } else {
      setCouponMsg({ text: '❌ INVALID CODE. TRY "MOD2026" OR "PROMO50"', success: false });
    }
  };

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
    <div className="flex flex-col px-4 sm:px-6 md:px-8 py-6 max-w-[1920px] mx-auto w-full flex-1 gap-6">
      {/* Top Navigation & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border-color pb-4">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-lg font-mono font-bold text-text/90 overflow-x-auto">
          <Link href="/" className="hover:text-cayenne transition-colors shrink-0">
            HOME
          </Link>
          <span>/</span>
          <span className="text-yellow-green uppercase shrink-0">
            {asset.category ? asset.category.replace('_', ' ') : 'VAULT'}
          </span>
          <span>/</span>
          <span className="opacity-70 uppercase truncate max-w-75 sm:max-w-lg">{asset.name}</span>
        </div>

        {/* Share & Dynamic Mode Switcher */}
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

      {/* Main Content Panel */}
      <div className="bg-yellow-50 text-darkteal p-6 md:p-8 flex flex-col gap-6 shadow-hard-lg rounded-xl border-2 border-border-color">
        {/* Head Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-border-color pb-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              {isPremiumMode ? (
                <span className="bg-yellow-green text-darkteal border-1 border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md uppercase tracking-wider">
                  ❤️PREMIUM
                </span>
              ) : (
                <span className="bg-yellow-green text-darkteal border-1 border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md uppercase tracking-wider">
                  FREE DOWNLOAD
                </span>
              )}
              <span className="bg-yellow-green text-darkteal border-1 border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md">
                {asset.tag || 'FEATURED'}
              </span>
              <span className="bg-yellow-green text-darkteal border-1 border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md">
                VERSION {asset.version || 'v1.0'}
              </span>
              <span className="bg-yellow-green text-darkteal border-1 border-border-color text-sm font-mono font-bold px-2 py-2 rounded-md uppercase">
                {asset.category || 'ASSET'}
              </span>
            </div>

            <h1 className="font-head text-2xl sm:text-3xl md:text-4xl font-black uppercase text-evergreen tracking-tight leading-tight">
              {asset.name}
            </h1>
          </div>

          {/* Stats Badges */}
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

        {/* Body Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7/12): 3-Slide Gallery */}
          <div className="lg:col-span-7">
            <AssetPreviewGallery asset={asset} isPremiumMode={isPremiumMode} />
          </div>

          {/* Right Column (5/12): License / Pricing Options */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 self-start">
            <AssetLicenseSelector
              asset={asset}
              isPremiumMode={isPremiumMode}
              selectedLicense={selectedLicense}
              onSelectLicense={setSelectedLicense}
              couponCode={couponCode}
              onCouponCodeChange={setCouponCode}
              onApplyCoupon={applyCoupon}
              couponMsg={couponMsg}
              discountPercent={discountPercent}
            />
          </div>
        </div>

        {/* Product Markdown Description & Information Section (Markdown Rendering Panel) */}
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

            {/* View Mode Tabs */}
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

        {/* Bottom Action Footer Bar */}
        <div className="border-t-2 border-border-color pt-8 flex flex-col gap-9">
          {downloadSuccess ? (
            <div className="p-4 bg-yellow-green text-evergreen border border-border-color font-mono font-black text-center text-sm rounded-xl shadow-hard animate-in zoom-in-95 duration-200">
              DOWNLOAD PIPELINE STARTED SUCCESSFULLY! CHECK YOUR DOWNLOADS FOLDER.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {isPremiumMode ? (
                <button
                  onClick={() => setCheckoutModalOpen(true)}
                  className="w-full py-6 px-8 font-mono font-black text-xl uppercase tracking-wider rounded-lg border-2 border-border-color bg-green-400 text-white shadow-hard hover:bg-green-300 hover:text-evergreen transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg cursor-pointer flex flex-col items-center justify-center"
                >
                  <span>DOWNLOAD</span>
                  <span className="text-sm font-bold uppercase tracking-wider opacity-90">
                    {discountPercent > 0
                      ? `${tier.label} — $${finalPrice} USD`
                      : `${selectedLicense} license — $${tier.usd} USD`}
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full py-6 px-8 font-mono font-black text-lg uppercase tracking-wider rounded-lg border-2 border-border-color bg-yellow-green text-white shadow-hard hover:bg-yellow-green hover:text-evergreen transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg cursor-pointer disabled:opacity-70"
                >
                  {downloading
                    ? 'PROCESSING DIRECT CDN LINK ●●●●●●●○○○○○○○○○'
                    : `DOWNLOAD (${asset.size})`}
                </button>
              )}

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
          )}

          <div className="text-center font-mono text-sm text-black">
            🔒 100% VirusTotal Clean • High-Speed CDN Mirror • Direct Instant Archive Access
          </div>
        </div>
      </div>

      {/* Recommended Assets List */}
      <AssetRelatedList relatedAssets={relatedAssets} />

      {/* Checkout Modal */}
      <AssetCheckoutModal
        asset={asset}
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        selectedLicense={selectedLicense}
        finalPrice={finalPrice}
      />

      {/* Back Link */}
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
