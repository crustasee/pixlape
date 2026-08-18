'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUp,
  ExternalLink,
  Mail,
  MessageCircle,
  Rss,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Activity,
  CheckCircle2,
  Heart,
} from 'lucide-react';
import { Google, Github, Discord, TwitterFill12, Facebook } from '@/components/ui/icon';
import { UserCommentSection } from '@/components/ui/UserCommentSection';

const SOCIAL_LINKS = [
  { label: 'Google Account', href: 'https://myaccount.google.com', icon: Google, color: 'hover:bg-yellow-green hover:text-darkteal' },
  { label: 'GitHub Org', href: 'https://github.com/pixlape', icon: Github, color: 'hover:bg-yellow-green hover:text-darkteal' },
  { label: 'Vercel Deployment', href: 'https://vercel.com/pixlape-team', icon: Sparkles, color: 'hover:bg-yellow-green hover:text-darkteal' },
  { label: 'Twitter / X', href: 'https://x.com/pixlape_official', icon: TwitterFill12, color: 'hover:bg-yellow-green hover:text-darkteal' },
  { label: 'Facebook', href: 'https://facebook.com/pixlape.vault', icon: Facebook, color: 'hover:bg-yellow-green hover:text-darkteal' },
  { label: 'Discord', href: 'https://discord.gg/pixlape', icon: Discord, color: 'hover:bg-yellow-green hover:text-darkteal' },
  { label: 'Email Support', href: 'mailto:project@keratuli.site', icon: Mail, color: 'hover:bg-yellow-green hover:text-darkteal' },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
    window.setTimeout(() => setSubscribed(false), 3200);
  };

  return (
    <footer className="mt-auto bg-soft-linen border-t-2 border-border-color text-soft-linen relative z-15" style={{ backgroundColor: 'var(--c-darkteal)' }} role="contentinfo">
      {/* ============ NEWSLETTER / DISPATCH CTA ============ */}
      <div className="max-w-full mx-auto w-full px-3 sm:px-6 lg:px-12 pt-10 md:pt-14">
        <div className="bg-green-300 text-evergreen border border-border-color shadow-hard-sm rounded-lg p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-10 relative overflow-hidden">
          {/* Subtle Decorative Pattern */}
          <div className="flex flex-col gap-4 lg:max-w-full relative z-12">
            <div className="inline-flex items-center gap-4 font-mono text-xs font-black uppercase tracking-widest bg-darkteal text-white px-3 py-1 rounded-lg w-fit shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              Free Dispatch — Zero Spam
            </div>
            <h3 className="flex flex-wrap max-w-full w-full font-head font-black text-3xl sm:text-5xl md:text-4xl uppercase leading-tight text-evergreen">
              +++++++ Get notified on new vault drops
            </h3>
            <p className="font-mono text-xs sm:text-sm font-semibold text-darkteal leading-relaxed max-w-full">
              Fresh icons, custom brush packs, and dev tools land every week. Subscribe to be first in line when new assets release.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col-1 sm:flex-row gap-3 w-full max-w-full lg:w-auto lg:flex-1 lg:max-w-full relative z-15"
            aria-label="Newsletter subscription"
          >
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=">>>>> your-email@domain.com"
              className="flex-1 px-4 py-3 sm:py-3.5 bg-soft-linen border border-black placeholder-darkteal font-mono text-xs font-bold text-evergreen rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)] outline-none focus:border-cayenne focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 font-mono font-black text-xs uppercase tracking-wider border-2 border-black bg-cayenne text-white rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)] hover:bg-yellow-green hover:text-evergreen hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-green focus:ring-offset-2 whitespace-nowrap"
            >
              {subscribed ? (
                <>
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" /> Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" aria-hidden="true" /> Subscribe
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ============ MAIN GRID CONTENT ============ */}
      <div className="max-w-full mx-auto w-full px-3 sm:px-6 lg:px-12 pt-10 md:pt-14">

        {/* Comment section forum */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <UserCommentSection />
        </div>
      </div>

      {/* ============ BOTTOM BAR ============ */}
      <div className="max-w-full text-darkteal mx-auto w-full px-6 sm:px-6 lg:px-10">
        <div className="border-t-2 border-border-color/30 py-6 flex flex-col text-sm md:flex-row items-center justify-between gap-5 font-mono  text-darkteal">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-3">
            <span>© 2026</span>
            <strong className="text-cayenne font-pixel-caps">PIXLApe.COM</strong>
            <span>— All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy-polish"
              className="inline-flex items-center gap-2 px-3 py-1.5 font-mono font-black text-xs uppercase tracking-wider border-2 border-border-color rounded-xl bg-yellow-green text-darkteal shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-green"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              Privacy Polish
            </Link>
            <span className="text-sm text-darkteal">•</span>
            <Link href="/help" className="text-sm text-yellow-green hover:text-yellow-green transition-colors focus:underline">
              Terms
            </Link>
            <span className="text-sm text-darkteal">•</span>
            <Link href="/help" className="text-sm text-yellow-green hover:text-yellow-green transition-colors focus:underline">
              License
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-xl bg-soft-linen text-evergreen border-2 border-border-color text-[14px] font-mono font-black uppercase shadow-[2px_2px_0_var(--border-color)]">
              MODLab+Project
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono font-black border-2 border-border-color rounded-xl bg-yellow-green text-darkteal shadow-hard-sm hover:bg-yellow-green hover:text-cayenne hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-green focus:ring-offset-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-5 h-5" aria-hidden="true" />
              TOP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
