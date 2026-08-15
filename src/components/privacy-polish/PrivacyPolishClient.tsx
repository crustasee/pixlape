'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileText,
  Database,
  Search,
  ArrowLeft,
  Mail,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

interface PrivacySection {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  summary: string;
  details: string[];
}

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    id: 'data-minimization',
    badge: 'SECTION 01',
    badgeColor: 'bg-neo-yellow text-black',
    title: 'Data Minimization Protocol',
    summary: 'We collect only what is strictly required to run PIXLApe. Zero unnecessary telemetry, zero profiling.',
    details: [
      'We do NOT track your cross-site browsing history or build behavioral advertising profiles.',
      'Anonymous site visit counters and download numbers are aggregated in-memory without personal identifiers.',
      'No hidden third-party tracking scripts (Google Analytics, Facebook Pixel, or ad networks) are embedded in this codebase.',
      'Your IP address is used only for real-time security throttling and rate-limiting at the CDN level, never stored in permanent database logs.',
    ],
  },
  {
    id: 'local-storage',
    badge: 'SECTION 02',
    badgeColor: 'bg-cayenne text-white',
    title: 'Local Storage & Browser Cookies',
    summary: 'We use client-side local storage exclusively for your user interface preferences.',
    details: [
      'pixlape_theme: Preserves your preferred UI theme (dark mode vs. light mode).',
      'cart_items: Keeps track of items added to your workspace cart locally in your browser memory.',
      'No third-party advertising cookies are stored or read by our servers.',
      'You can clear your local storage at any time via your browser settings without affecting core site browsing.',
    ],
  },
  {
    id: 'asset-safety',
    badge: 'SECTION 03',
    badgeColor: 'bg-neo-lime text-black',
    title: 'Asset Safety & Download Verification',
    summary: 'Every file, brush, icon pack, and script in our vault undergoes multi-stage security verification.',
    details: [
      '100% Verified Clean: All downloadable archives (.zip, .png, .brushset, .ttf, .json) are scanned for malware and executable payload risks.',
      'No DRM or License Trackers: Downloaded digital goods do not contain call-home scripts, telemetry pings, or license validation phone-homes.',
      'Direct Downloads: File streams are served directly via encrypted HTTPS connections.',
    ],
  },
  {
    id: 'dispatch-privacy',
    badge: 'SECTION 04',
    badgeColor: 'bg-neo-pink text-white',
    title: 'Dispatch & Newsletter Subscriptions',
    summary: 'Strict opt-in release dispatches. No third-party email brokerage or marketing spam.',
    details: [
      'When you subscribe to the Vault Dispatch, we store only your email address.',
      'Your email will ONLY be used to notify you of new asset releases, major platform updates, or critical maintenance notices.',
      'We never rent, sell, or trade your email address with third parties or advertisers.',
      'You can unsubscribe instantly at any time by clicking the unsubscribe link in any email dispatch.',
    ],
  },
  {
    id: 'third-party-links',
    badge: 'SECTION 05',
    badgeColor: 'bg-cayenne text-white',
    title: 'External Platforms & Embeds',
    summary: 'Links to GitHub, Discord, and external developer tools operate under their respective privacy policies.',
    details: [
      'Our website contains outgoing links to external resources (e.g. GitHub repos, Discord community, author socials).',
      'When navigating to an external link, you leave PIXLApe.COM and fall under the external site policy.',
      'We do not load external third-party widgets that track your browsing before you explicitly click an external link.',
    ],
  },
  {
    id: 'user-rights',
    badge: 'SECTION 06',
    badgeColor: 'bg-neo-yellow text-black',
    title: 'Your Rights & Data Deletion Protocol',
    summary: 'Full control over your data. Request complete deletion with zero friction.',
    details: [
      'Right to Access: Request a copy of any personal information associated with your email.',
      'Right to Erasure: Request permanent removal of your email from our newsletter dispatch database.',
      'To execute a data request, contact our team directly at project@keratuli.site with the subject "DATA ERASURE REQUEST".',
      'All valid erasure requests are processed within 48 business hours.',
    ],
  },
];

export const PrivacyPolishClient: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedStatus, setCopiedStatus] = useState(false);

  const filteredSections = PRIVACY_SECTIONS.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.details.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCopyPolicy = () => {
    const policySummary = `PIXLApe.COM - PRIVACY POLISH POLICY SUMMARY\n` +
      `===========================================\n` +
      `100% Clean Code, Zero Ad-Trackers, Zero Third-Party Analytics, Local Preferences Only.\n` +
      `Last Verified: August 2026\n` +
      `Contact: project@keratuli.site`;

    navigator.clipboard.writeText(policySummary);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2500);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex flex-col p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full flex-1 gap-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border-2 border-border-color font-mono text-xs font-black text-text shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO VAULT
        </Link>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-neo-pink text-yellow-100 border-2 border-border-color font-mono font-black text-xs shadow-hard-sm">
            <CheckCircle2 className="w-3.5 h-3.5" /> POLISH V2.4 SPEC
          </span>
        </div>
      </div>

      {/* Single Document Panel */}
      <div className="w-full bg-yellow-100 border-2 border-border-color rounded-xl shadow-hard-lg p-6 sm:p-10 md:p-12 flex flex-col gap-8 relative overflow-hidden">

        {/* Document Header Stamp & Meta */}
        <div className="flex flex-col gap-4 border-b-2 border-border-color pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-darkteal text-neo-yellow font-mono text-xs font-black uppercase tracking-wider rounded-md">
              <Terminal className="w-3.5 h-3.5" /> OFFICIAL MANIFEST // REF: PRIVACY-2026
            </div>
            <div className="font-mono text-xs font-bold text-darkteal">
              EFFECTIVE: AUGUST 2026
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-head font-black text-3xl sm:text-4xl md:text-5xl text-darkteal tracking-tight uppercase leading-none">
              PRIVACY POLISH <span className="text-neo-pink">POLICY</span>
            </h1>
            <p className="font-body text-sm sm:text-base text-darkteal leading-relaxed font-medium">
              Transparent, zero-tracker digital asset vault policy. No secret analytics, no behavioral profiling, zero third-party monetization. Pure code and clean assets.
            </p>
          </div>

          {/* Core Guarantee Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white text-darkteal border border-border-color p-2.5 rounded-xl flex items-center gap-2.5">
              <EyeOff className="w-4 h-4 text-neo-pink shrink-0" />
              <div>
                <div className="font-mono text-xs font-black text-darkteal uppercase">AD TRACKERS</div>
                <div className="font-head font-black text-xs sm:text-sm text-darkteal">0 TRACKERS</div>
              </div>
            </div>

            <div className="bg-white text-darkteal border border-border-color p-2.5 rounded-xl flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-yellow-green shrink-0" />
              <div>
                <div className="font-mono text-xs font-black text-darkteal uppercase">TRANSPORT</div>
                <div className="font-head font-black text-xs sm:text-sm text-darkteal">TLS 1.3</div>
              </div>
            </div>

            <div className="bg-white text-darkteal border border-border-color p-2.5 rounded-xl flex items-center gap-2.5">
              <Database className="w-4 h-4 text-black shrink-0" />
              <div>
                <div className="font-mono text-xs font-black text-darkteal uppercase">STORAGE</div>
                <div className="font-head font-black text-xs sm:text-sm text-darkteal">UI PREFS</div>
              </div>
            </div>

            <div className="bg-white text-darkteal border border-border-color p-2.5 rounded-xl flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-green-600 shrink-0" />
              <div>
                <div className="font-mono text-xs font-black text-darkteal uppercase">SAFETY</div>
                <div className="font-head font-black text-xs sm:text-sm text-darkteal">100% CLEAN</div>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar (Search + Copy Summary) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter document topics (e.g. cookies, email, deletion)..."
                className="w-full pl-10 pr-4 py-2 bg-white border-2 border-border-color rounded-xl font-mono text-sm font-bold text-darkteal outline-none focus:border-neo-pink transition-all"
              />
            </div>

            <button
              onClick={handleCopyPolicy}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-neo-yellow border-2 border-border-color rounded-xl font-mono font-black text-xs uppercase text-black shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer shrink-0"
            >
              {copiedStatus ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-black" /> COPIED!
                </>
              ) : (
                <>
                  <FileText className="w-3.5 h-3.5" /> COPY SUMMARY
                </>
              )}
            </button>
          </div>

          {/* Table of Contents Pill Bar */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="font-mono text-sm font-black uppercase text-darkteal mr-1">TOC:</span>
            {PRIVACY_SECTIONS.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="px-2.5 py-1 bg-white hover:bg-white border border-border-color rounded-md font-mono text-sm font-bold text-darkteal transition-all cursor-pointer hover:border-neo-pink"
              >
                {sec.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Continuous Document Sections */}
        <div className="flex flex-col gap-10">
          {filteredSections.length === 0 ? (
            <div className="bg-white border-2 border-border-color p-8 rounded-xl text-center font-mono text-xs font-bold text-darkteal">
              No policy section found for &quot;{searchQuery}&quot;. Try searching for &quot;cookies&quot;, &quot;email&quot;, or &quot;security&quot;.
            </div>
          ) : (
            filteredSections.map((sec) => (
              <div
                key={sec.id}
                id={sec.id}
                className="flex flex-col gap-4 scroll-mt-24 pb-8 border-b-2 border-dashed border-border-color/20 last:border-b-0 last:pb-0"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 font-mono text-[11px] font-black uppercase tracking-wider rounded-md border border-border-color shadow-[2px_2px_0_rgba(0,0,0,0.9)] ${sec.badgeColor}`}
                  >
                    {sec.badge}
                  </span>
                  <h2 className="font-head font-black text-xl sm:text-2xl text-darkteal uppercase tracking-wide">
                    {sec.title}
                  </h2>
                </div>

                {/* Section Summary */}
                <p className="font-body text-sm font-bold text-darkteal bg-white p-3 rounded-xl border border-border-color shadow-hard-sm">
                  {sec.summary}
                </p>

                {/* Detailed Clause List */}
                <div className="flex flex-col gap-2 pl-1 sm:pl-2">
                  {sec.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-start gap-3 font-body text-xs sm:text-sm text-darkteal leading-relaxed font-medium bg-white p-3 rounded-xl border border-border-color shadow-hard-sm"
                    >
                      <span className="font-mono font-black text-neo-pink text-xs select-none mt-0.5 shrink-0">
                        [✓]
                      </span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Document Footer & Contact Block */}
        <div className="mt-4 pt-8 border-t-2 border-border-color flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-neo-yellow/30 p-6 rounded-xl">
          <div className="flex flex-col gap-1 max-w-md">
            <div className="flex items-center gap-2 font-mono text-sm font-black uppercase text-darkteal">
              <Mail className="w-3.5 h-3.5 text-neo-pink" /> PRIVACY INQUIRIES & DATA DELETION
            </div>
            <p className="font-body text-xs text-darkteal font-medium">
              Need a copy of your email data or request immediate deletion? Contact maintainers directly.
            </p>
          </div>

          <a
            href="mailto:project@keratuli.site?subject=Privacy%20Inquiry%20-%20PIXLApe"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neo-pink text-white border-2 border-border-color rounded-xl font-mono font-black text-xs uppercase tracking-wider shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shrink-0"
          >
            <Mail className="w-3.5 h-3.5" /> EMAIL PRIVACY DESK
          </a>
        </div>
      </div>
    </div>
  );
};

