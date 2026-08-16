'use client';

import React, { useState, useEffect } from 'react';
import { AssetItem, LicenseTier, LICENSE_PRICES } from '@/types';
import { Button } from '@/components/ui/Button';

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
  const [countdown, setCountdown] = useState(13);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(13);
      setIsReady(false);
      return;
    }

    setCountdown(13);
    setIsReady(false);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const tier = LICENSE_PRICES[selectedLicense];

  const handleCheckout = () => {
    if (asset.downloadUrl) {
      window.open(asset.downloadUrl, '_blank');
    }
    setPurchaseComplete(true);
    setTimeout(() => {
      setPurchaseComplete(false);
      onClose();
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-6 bg-yellow-green/30 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-yellow-green text-black p-6 flex flex-col relative animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 rounded-lg border-2 border-border-color shadow-hard-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-lg border-2 border-border-color bg-yellow-300 hover:bg-yellow-400 hover:text-white flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
          onClick={onClose}
        >
          ❌
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
              <h2 className="font-head text-3xl font-black text-evergreen uppercase">+++ THANK YOU !!! +++</h2>
            </div>

            <div className="text-lg leading-relaxed">
              ●: <strong className="text-evergreen font-mono">{asset.name}</strong> ({tier.label})
              <br />
              <div className="font-pixel text-white flex justify-center mt-2">
                <Button
                  onClick={() => window.open('https://saweria.co/pixlape', '_blank')}
                  variant="default"
                  className="w-full py-4 font-pixel text-lg font-black uppercase rounded-lg border-2 border-border-color shadow-[2px_2px_0_var(--border-color)]"
                >
                  ❤️ TIP CREATOR
                </Button>
              </div>
            </div>

            {/* 13 Seconds Countdown & Download Button */}
            {!isReady ? (
              <div className="flex flex-col items-center justify-center p-4 bg-yellow-100 border border-border-color rounded-lg font-mono text-center shadow-hard-sm space-y-2">
                <div className="flex items-center gap-2 text-darkteal font-black text-xs uppercase tracking-wider">
                  <span className="text-base animate-spin">⏳</span> PREPARING DOWNLOAD LINK...
                </div>
                <div className="text-4xl font-black font-mono text-cayenne animate-pulse">
                  {countdown}s
                </div>
                <p className="text-xs text-darkteal/80 font-bold">
                  Please wait 13 seconds for your download link to generate.
                </p>
              </div>
            ) : (
              <div className="flex font-pixel text-lg text-white justify-center pt-5 animate-in fade-in duration-300">
                <Button
                  onClick={handleCheckout}
                  variant="green"
                  className="w-full py-5 text-lg font-black uppercase rounded-lg border-2 border-border-color shadow-hard hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  DOWNLOAD (RAR/ZIP) ▶▶
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
