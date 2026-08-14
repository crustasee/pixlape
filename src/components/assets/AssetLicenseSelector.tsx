'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { AssetItem } from '@/types';
import { isImageIcon, getIconSrc } from '@/data/assets';

export type LicenseTier = 'personal' | 'commercial' | 'enterprise';

export const LICENSE_PRICES: Record<
  LicenseTier,
  { usd: number; originalUsd: number; idr: string; label: string; desc: string }
> = {
  personal: {
    usd: 29,
    originalUsd: 49,
    idr: 'Rp 450.000',
    label: 'Personal License',
    desc: '1 User, Personal projects & non-commercial apps.',
  },
  commercial: {
    usd: 59,
    originalUsd: 99,
    idr: 'Rp 890.000',
    label: 'Commercial / Team License',
    desc: 'Up to 10 Seats, Commercial client projects & SaaS products.',
  },
  enterprise: {
    usd: 149,
    originalUsd: 249,
    idr: 'Rp 2.250.000',
    label: 'Enterprise / Extended License',
    desc: 'Unlimited Users, Re-distribution rights & priority support.',
  },
};

interface AssetLicenseSelectorProps {
  asset: AssetItem;
  isPremiumMode: boolean;
  selectedLicense: LicenseTier;
  onSelectLicense: (tier: LicenseTier) => void;
  couponCode: string;
  onCouponCodeChange: (code: string) => void;
  onApplyCoupon: () => void;
  couponMsg: { text: string; success: boolean } | null;
  discountPercent: number;
}

export const AssetLicenseSelector: React.FC<AssetLicenseSelectorProps> = ({
  asset,
  isPremiumMode,
  selectedLicense,
  onSelectLicense,
  couponCode,
  onCouponCodeChange,
  onApplyCoupon,
  couponMsg,
  discountPercent,
}) => {
  const [selectedTip, setSelectedTip] = useState<number | null>(5);
  const tier = LICENSE_PRICES[selectedLicense];
  const finalPrice = Math.round(tier.usd * (1 - discountPercent / 100));

  if (!isPremiumMode) {
    return (
      <div className="w-full flex flex-col gap-4 font-mono">
        {/* Basic Information Card */}
        <div className="p-5 border-2 border-border-color bg-yellow-100 text-evergreen shadow-hard rounded-xl flex flex-col gap-4 text-xs">
          <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-3">
            <h3 className="font-head text-base font-black text-evergreen uppercase tracking-wide">
              ◯ BASIC INFORMATION
            </h3>
            <span className="badge bg-yellow-green text-evergreen font-bold text-xs px-2.5 py-0.5 rounded border border-border-color shadow-[1px_1px_0_var(--border-color)]">
              100% FREE
            </span>
          </div>

          {/* 90x90 px Icon Display */}
          <div className="flex items-center gap-4 border-b-2 border-border-color pb-3">
            <div className="w-[90px] h-[90px] min-w-[90px] min-h-[90px] border-2 border-border-color bg-white shadow-[3px_3px_0_var(--border-color)] rounded-2xl flex items-center justify-center p-2 text-4xl overflow-hidden shrink-0 select-none">
              {isImageIcon(asset.icon) ? (
                <Image
                  src={getIconSrc(asset.icon)}
                  alt={asset.name}
                  width={90}
                  height={90}
                  className="object-contain w-full h-full"
                />
              ) : (
                <span className="text-4xl">{asset.icon || '📦'}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 min-w-0">
              <h4 className="font-head font-black text-xl uppercase text-evergreen truncate leading-tight">
                {asset.name}
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-yellow-green text-darkteal font-mono text-sm font-bold px-2 py-0.5 rounded border border-border-color">
                  {asset.tag || 'FREE'}
                </span>
                <span className="bg-yellow-green text-darkteal font-mono text-sm font-bold px-2 py-0.5 rounded border border-border-color">
                  {asset.version || 'v1.0'}
                </span>
              </div>
              <span className="font-mono text-sm text-darkteal font-bold truncate">
                ARCHIVE SIZE: {asset.size}
              </span>
            </div>
          </div>

          {/* License Permission */}
          <div className="p-3 bg-yellow-100 border-2 border-border-color rounded-lg flex flex-col gap-2 shadow-hard-sm">
            <div className="flex justify-between items-center">
              <span className="text-darkteal font-bold text-lg">▶ PERMISSION:</span>
              <span className="bg-yellow-green text-darkteal font-bold text-sm px-2 py-0.5 rounded border border-border-color">
                {asset.license}
              </span>
            </div>
            <p className="text-darkteal text-lg font-mono leading-relaxed">
              Free access provided under open digital community guidelines. No registration required.
            </p>
          </div>

          {/* Technical Metadata Breakdown */}
          <div className="flex flex-col gap-2 pt-2 text-sm">
            <div className="flex justify-between font-mono text-sm text-darkteal">
              <span>ARCHIVE SIZE:</span>
              <strong className="text-sm text-darkteal">{asset.size}</strong>
            </div>
            <div className="flex justify-between font-mono text-sm text-darkteal">
              <span>RATING:</span>
              <strong className="text-sm text-darkteal">⭐ {asset.rating} / 5.0</strong>
            </div>
            <div className="flex justify-between font-mono text-sm text-darkteal">
              <span>TOTAL DOWNLOADS:</span>
              <strong className="text-sm text-darkteal">⬇️ {asset.downloads}</strong>
            </div>
            <div className="flex justify-between items-center text-darkteal pt-1">
              <span>● SECURITY SCAN:</span>
              <span className="text-sm bg-yellow-green text-darkteal font-black px-2 py-0.5 rounded border border-border-color">
                100% VIRUSTOTAL CLEAN
              </span>
            </div>
          </div>
        </div>

        {/* Creator Support Tip Box */}
        <div className="p-5 border-2 border-border-color bg-yellow-100 text-evergreen shadow-hard rounded-xl flex flex-col gap-4 text-sm">
          <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-2">
            <h3 className="font-head text-lg font-black text-evergreen uppercase">
              ❤️ OPTIONAL CREATOR TIP
            </h3>
          </div>
          <p className="font-mono text-sm text-darkteal font-bold leading-relaxed">
            Help keep this asset free and support independent digital creators by sending a quick tip!
          </p>
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            {[3, 5, 10].map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => setSelectedTip(amount)}
                className={`py-2.5 px-2 border-2 border-border-color rounded-lg font-mono text-sm font-bold transition-all cursor-pointer shadow-hard-sm ${
                  selectedTip === amount
                    ? 'bg-yellow-green text-evergreen border-border-color translate-x-0.5 translate-y-0.5 shadow-none'
                    : 'bg-white text-evergreen hover:bg-yellow-green'
                }`}
              >
                ${amount} USD
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 font-mono">
      {/* License Tier Selection Cards */}
      <div className="p-5 border-2 border-border-color bg-soft-linen text-evergreen shadow-hard rounded-xl flex flex-col gap-3 text-xs">
        <h3 className="font-head text-base font-black text-evergreen border-b-2 border-border-color/20 pb-2.5 uppercase tracking-wide">
          SELECT LICENSE TIER
        </h3>
        <div className="flex flex-col gap-2.5">
          {(Object.keys(LICENSE_PRICES) as LicenseTier[]).map((key) => {
            const item = LICENSE_PRICES[key];
            const isSelected = selectedLicense === key;
            return (
              <div
                key={key}
                onClick={() => onSelectLicense(key)}
                className={`p-3.5 border-2 border-border-color rounded-xl cursor-pointer transition-all flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-yellow-green/40 border-border-color shadow-hard-sm'
                    : 'bg-white hover:bg-yellow-green/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-4 h-4 rounded-full border-2 border-border-color flex items-center justify-center text-[10px] font-black ${
                        isSelected ? 'bg-yellow-green text-black' : 'bg-white'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                    <span className="font-head font-black text-sm uppercase text-evergreen">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono font-black text-sm text-cayenne">
                    <span>${item.usd}</span>
                    <span className="line-through text-xs text-evergreen/40 font-normal">
                      ${item.originalUsd}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] font-body text-evergreen/80 pl-6 leading-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Summary Box */}
      <div className="p-5 border-2 border-border-color bg-yellow-100 text-evergreen shadow-hard rounded-xl flex flex-col gap-3 text-xs">
        <h3 className="font-head text-base font-black text-evergreen border-b-2 border-border-color/20 pb-2.5 uppercase tracking-wide">
          ORDER SUMMARY
        </h3>

        {/* 90x90 px Icon Display */}
        <div className="flex items-center gap-4 border-b-2 border-border-color/20 pb-3">
          <div className="w-[90px] h-[90px] min-w-[90px] min-h-[90px] border-2 border-border-color bg-white shadow-[3px_3px_0_var(--border-color)] rounded-2xl flex items-center justify-center p-2 text-4xl overflow-hidden shrink-0 select-none">
            {isImageIcon(asset.icon) ? (
              <Image
                src={getIconSrc(asset.icon)}
                alt={asset.name}
                width={90}
                height={90}
                className="object-contain w-full h-full"
              />
            ) : (
              <span className="text-4xl">{asset.icon || '📦'}</span>
            )}
          </div>
          <div className="flex flex-col gap-1 min-w-0">
            <h4 className="font-head font-black text-base uppercase text-evergreen truncate leading-tight">
              {asset.name}
            </h4>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="badge bg-cayenne text-white font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-border-color">
                {asset.tag || 'PRO'}
              </span>
              <span className="badge bg-darkteal text-soft-linen font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-border-color">
                {asset.version || 'v1.0'}
              </span>
            </div>
            <span className="font-mono text-[11px] text-evergreen/80 font-bold truncate">
              SIZE: {asset.size}
            </span>
          </div>
        </div>

        <div className="flex justify-between text-evergreen/90">
          <span>SELECTED LICENSE:</span>
          <strong className="text-evergreen">{tier.label}</strong>
        </div>
        <div className="flex justify-between text-evergreen/70">
          <span>REGULAR PRICE:</span>
          <span className="line-through text-evergreen/50">${tier.originalUsd} USD</span>
        </div>
        {discountPercent > 0 && (
          <div className="flex justify-between text-cayenne font-bold">
            <span>DISCOUNT ({discountPercent}%):</span>
            <span>-${tier.usd - finalPrice} USD</span>
          </div>
        )}
        <hr className="border-t-2 border-border-color/10 my-1" />

        {/* Promo / Coupon Code Input */}
        <div className="flex flex-col gap-1.5 pt-1">
          <span className="text-[11px] font-black text-evergreen uppercase">PROMO / COUPON CODE</span>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="PROMO2026..."
              value={couponCode}
              onChange={(e) => onCouponCodeChange(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border-2 border-border-color text-xs font-mono font-bold text-evergreen rounded-lg outline-none uppercase focus:ring-2 focus:ring-yellow-green"
            />
            <button
              onClick={onApplyCoupon}
              type="button"
              className="px-4 py-2 font-mono text-xs font-black uppercase rounded-lg border-2 border-border-color bg-yellow-green text-evergreen hover:bg-cayenne hover:text-white cursor-pointer transition-colors shadow-hard-sm"
            >
              APPLY
            </button>
          </div>
          {couponMsg && (
            <div className={`text-[11px] font-mono font-bold ${couponMsg.success ? 'text-emerald-700' : 'text-cayenne'}`}>
              {couponMsg.text}
            </div>
          )}
        </div>

        <hr className="border-t-2 border-border-color/10 my-1" />
        <div className="flex justify-between items-center pt-1">
          <span className="font-black text-evergreen text-sm">TOTAL DUE:</span>
          <div className="text-right">
            <div className="text-xl font-mono font-black text-cayenne">
              ${finalPrice} USD
            </div>
            <div className="text-[11px] text-evergreen/70">Approx. {tier.idr}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
