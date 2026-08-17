'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

export const NewsletterSection: React.FC = () => {
    return (
        <section className="mt-8 bg-yellow-green p-8 sm:p-10 rounded-lg border border-border-color shadow-hard-sm space-y-4 text-center">
            <h2 className="font-head font-black text-3xl sm:text-5xl uppercase tracking-wide text-evergreen">NEVER MISS A VAULT DROP</h2>
            <p className="font-body text-lg font-medium max-w-xl mx-auto leading-relaxed opacity-95">
                Get notified when new articles, icon packs, audio stems, and dev tools launch in the PixlApe Vault.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 max-w-sm w-full mx-auto pt-2">
                <input type="email" placeholder="your@email.com" className="flex-6 px-7 py-3 bg-soft-linen text-evergreen border border-border-color rounded-xl font-mono text-md font-black outline-none shadow-hard-md placeholder:text-evergreen/60" aria-label="Email for newsletter" />
                <Button variant="primary" className="font-mono font-black uppercase text-lg px-5 py-3 bg-cayenne text-white border border-border-color shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer rounded-2xl">
                    SUBSCRIBE →
                </Button>
            </div>
        </section>
    );
};
