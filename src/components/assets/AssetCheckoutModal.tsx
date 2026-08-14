'use client';

import React, { useState } from 'react';
import { AssetItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { LicenseTier, LICENSE_PRICES } from './AssetLicenseSelector';

interface AssetCheckoutModalProps {
  asset: AssetItem;
  isOpen: boolean;
  onClose: () => void;
  selectedLicense: LicenseTier;
  finalPrice: number;
}

export const AssetCheckoutModal: React.FC<AssetCheckoutModalProps> = ({
  asset,
  isOpen,
  onClose,
  selectedLicense,
  finalPrice,
}) => {
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  if (!isOpen) return null;

  const tier = LICENSE_PRICES[selectedLicense];

  const handleCheckout = () => {
    setPurchaseComplete(true);
    setTimeout(() => {
      setPurchaseComplete(false);
      onClose();
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-6 bg-black transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="neo-glass w-full max-w-md bg-yellow-green text-black p-6 flex flex-col relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 rounded-xl border-2 border-border-color shadow-hard-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-border-color bg-cayenne hover:bg-cayenne hover:text-white flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
          onClick={onClose}
        >
          ×
        </button>

        {purchaseComplete ? (
          <div className="text-center py-6 flex flex-col items-center gap-4">
            <div className="text-5xl select-none animate-bounce">🎉</div>
            <h2 className="font-head text-lg font-black text-evergreen uppercase">ORDER CONFIRMED!</h2>
            <p className="font-body text-sm text-evergreen/80 max-w-sm leading-relaxed">
              Your license key and direct ZIP download pipeline have been activated.
            </p>
            <div className="badge bg-yellow-green text-evergreen text-xs px-3 py-1.5 font-mono font-bold inline-block border-2 border-border-color shadow-[2px_2px_0_var(--border-color)]">
              KEY: {selectedLicense.toUpperCase()}-LIC-2026-OK
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b-2 border-border-color pb-3">
              <h2 className="font-head text-3xl font-black text-evergreen uppercase">◯ THANK YOU !!!</h2>
            </div>

            <p className="font-body text-lg text-evergreen/80 leading-relaxed">
              ▶: <strong className="text-evergreen">{asset.name}</strong> ({tier.label})
              <br />
              ▶: <strong className="text-cayenne font-mono text-lg">${finalPrice} USD</strong>
            </p>

            <div className="flex flex-col gap-1.5">
              <label className="block font-mono text-lg font-black text-evergreen/85">◯ YOUR EMAIL:</label>
              <input
                type="email"
                placeholder="creator@pixlape.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full p-3 bg-white border-2 border-border-color text-sm font-medium text-evergreen rounded-xl outline-none focus:ring-2 focus:ring-yellow-green"
              />
            </div>

            <div className="flex justify-center pt-2">
              <Button
                onClick={handleCheckout}
                variant="green"
                className="w-full py-6 text-2xl font-black uppercase rounded-sm"
              >
                DOWNLOAD (RAR/ZIP)
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
