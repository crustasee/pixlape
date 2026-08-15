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
import { Google, Github, Discord, TwitterFill12, Facebook } from '@/components/ui/icontype';

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
    <footer className="mt-auto bg-yellow-green border-t-2 border-border-color text-soft-linen relative z-10" style={{ backgroundColor: 'var(--c-darkteal)' }} role="contentinfo">
      {/* ============ NEWSLETTER / DISPATCH CTA ============ */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 md:pt-14">
        <div className="bg-yellow-green text-evergreen border-2 border-border-color shadow-hard-lg rounded-2xl p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-10 relative overflow-hidden">
          {/* Subtle Decorative Pattern */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none select-none hidden md:block">
            <Terminal className="w-64 h-64 text-evergreen" aria-hidden="true" />
          </div>

          <div className="flex flex-col gap-2.5 lg:max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-black uppercase tracking-widest bg-evergreen text-yellow-green px-3 py-1 rounded-lg w-fit shadow-[2px_2px_0_rgba(0,0,0,0.9)]">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              Free Dispatch — Zero Spam
            </div>
            <h3 className="font-head font-black text-xl sm:text-2xl md:text-3xl uppercase leading-tight text-evergreen">
              Get notified on new vault drops
            </h3>
            <p className="font-body text-xs sm:text-sm font-semibold text-evergreen leading-relaxed max-w-lg">
              Fresh icons, custom brush packs, and dev tools land every week. Subscribe to be first in line when new assets release.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto lg:flex-1 lg:max-w-md relative z-10"
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
              placeholder="project@keratuli.site"
              className="flex-1 px-4 py-3 sm:py-3.5 bg-soft-linen border-2 border-black placeholder-evergreen/50 font-mono text-xs font-bold text-evergreen rounded-xl shadow-[3px_3px_0_rgba(0,0,0,1)] outline-none focus:border-cayenne focus:shadow-[4px_4px_0_rgba(0,0,0,1)] transition-all"
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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Brand & Identity (7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-6 font-pixel text-lg font-black tracking-tighter text-soft-linen focus:outline-none focus:ring-2 focus:ring-yellow-green rounded-lg w-fit group"
            aria-label="PIXLApe Home"
          >
            <span className="logo-icon relative overflow-hidden flex items-center justify-center w-16 h-16 bg-soft-linen border-1 border-border-color rounded-xl group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo_icon.svg"
                alt="M"
                width={52}
                height={52}
                className="object-contain"
              />
            </span>
            <span>
              PIXLApe<span className="text-yellow-green font-mono">.COM</span>
            </span>
          </Link>

          {/* System Status Badges */}
          <div className="flex flex-wrap gap-4 pt-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-soft-linen text-evergreen border-2 border-border-color font-mono text-[14px] font-black shadow-[2px_2px_0_var(--border-color)]">
              <span className="w-2 h-2 rounded-full bg-yellow-green animate-pulse" aria-hidden="true" />
              SYSTEM ONLINE
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-soft-linen text-evergreen border-2 border-border-color font-mono text-[14px] font-black shadow-[2px_2px_0_var(--border-color)]">
              <CheckCircle2 className="w-4 h-4 text-yellow-green" aria-hidden="true" />
              VERIFIED
            </span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-5 pt-2">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                title={label}
                className={`w-10 h-10 rounded-xl border-2 border-border-color bg-cayenne text-white flex items-center justify-center shadow-hard-sm ${color} hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-green focus:ring-offset-2`}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Console Telemetry Widget (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-cayenne text-evergreen border-2 border-border-color rounded-2xl p-6 shadow-hard flex flex-col gap-4">
            <div className="flex items-center justify-between border-b-2 border-border-color/30 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-evergreen">
                <Terminal className="w-4 h-4 text-cayenne" aria-hidden="true" />
                <span>Vault Telemetry</span>
              </div>
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-green animate-ping" aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-head font-black text-2xl sm:text-3xl text-white tracking-tight">
                +25,000 Downloads
              </span>
              <p className="font-body text-sm text-white font-medium leading-normal">
                Built with obsession — shipped by an independent author since 2013.
              </p>
            </div>

            <div className="flex items-center gap-3 font-mono text-md font-black text-evergreen bg-yellow-green border-2 border-border-color rounded-xl px-4 py-3 shadow-[2px_2px_0_var(--border-color)]">
              <Activity className="w-5 h-5 text-evergreen" aria-hidden="true" />
              <span>23 ACTIVE CONNECTIONS</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-md font-bold text-white/70 pt-1">
              <Heart className="w-5 h-5 text-cayenne fill-cayenne" aria-hidden="true" />
              <span>Handcrafted · Zero bloated frameworks</span>
            </div>
          </div>
        </div>
      </div>

      {/* ============ BOTTOM BAR ============ */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-6 lg:px-10">
        <div className="border-t-2 border-border-color/30 py-6 flex flex-col text-sm md:flex-row items-center justify-between gap-5 font-mono  text-soft-linen">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-3">
            <span>© 2026</span>
            <strong className="text-soft-linen font-black">PIXLApe.COM</strong>
            <span>— All rights reserved.</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/privacy-polish"
              className="inline-flex items-center gap-2 px-3 py-1.5 font-mono font-black text-xs uppercase tracking-wider border-2 border-border-color rounded-xl bg-darkteal text-yellow-green shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-green"
            >
              <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              Privacy Polish
            </Link>
            <span className="text-sm text-yellow-green">•</span>
            <Link href="/help" className="text-sm text-yellow-green hover:text-yellow-green transition-colors focus:underline">
              Terms
            </Link>
            <span className="text-sm text-yellow-green">•</span>
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
