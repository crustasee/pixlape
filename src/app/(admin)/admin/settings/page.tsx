'use client';

import React, { useState, useEffect } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconRenderer } from '@/components/ui/IconRenderer';

interface SystemSettings {
  siteName: string;
  siteDescription: string;
  mainLogoUrl: string;
  adminAvatarUrl: string;
  adminName: string;
  adminEmail: string;
  adminRole: string;
  adminBio: string;
  currency: string;
  maintenanceMode: boolean;
  marqueeText: string;
  defaultLicense: string;
  defaultPrice: number;
  itemsPerPage: number;
  adminSecretKey: string;
  virusTotalAutoScan: boolean;
  cloudSyncInterval: string;
  // Social Media & Platform Integrations
  googleClientId: string;
  googleProfileUrl: string;
  githubUrl: string;
  vercelUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  discordUrl: string;
}

const DEFAULT_SETTINGS: SystemSettings = {
  siteName: 'PIXLAPE.COM',
  siteDescription: 'Independent developers. Digital Art material & Design assets. Crafted with care, built with love.',
  mainLogoUrl: '/logo_icon.svg',
  adminAvatarUrl: '/avatar_profile.gif',
  adminName: 'Super Admin',
  adminEmail: 'project@keratuli.site',
  adminRole: 'SUPERADMIN',
  adminBio: 'Lead Vault Architect & Digital Asset Curator at PixlApe.',
  currency: 'USD',
  maintenanceMode: false,
  marqueeText: '🔥 CORELDRAW 2026 GRAPHICS SUITE DROPPED • OVER 1,200+ NEO-BRUTALIST ICONS ACTIVE • DOWNLOAD PRO ASSETS INSTANTLY',
  defaultLicense: 'MIT License',
  defaultPrice: 29,
  itemsPerPage: 24,
  adminSecretKey: 'pixlape_secret_2026_key',
  virusTotalAutoScan: true,
  cloudSyncInterval: '15 mins',
  // Platform Defaults
  googleClientId: '84930291-pixlape.apps.googleusercontent.com',
  googleProfileUrl: 'https://myaccount.google.com',
  githubUrl: 'https://github.com/pixlape',
  vercelUrl: 'https://vercel.com/pixlape-team',
  twitterUrl: 'https://x.com/pixlape_official',
  facebookUrl: 'https://facebook.com/pixlape.vault',
  discordUrl: 'https://discord.gg/pixlape',
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'branding' | 'profile' | 'general' | 'security' | 'storage' | 'social'>('branding');
  const [saved, setSaved] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);

  // Hydrate settings from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedSettings = localStorage.getItem('pixlape_admin_settings');
        if (savedSettings) {
          const parsed = JSON.parse(savedSettings);
          setSettings((prev) => ({ ...prev, ...parsed }));
        }
      } catch (err) {
        console.error('Failed to load settings from localStorage', err);
      }
    }
  }, []);

  useEffect(() => {
    setLogoError(false);
  }, [settings.mainLogoUrl]);

  useEffect(() => {
    setAvatarError(false);
  }, [settings.adminAvatarUrl]);

  const presetLogos = [
    { label: 'PIXLape', path: '/logo_icon.svg' },
    { label: 'Trex', path: '/icon/logo2.svg' },
    { label: 'PIXLAPE 3', path: '/icon/logo3.svg' },
    { label: 'PIXLAPE 4', path: '/icon/logo4.svg' },
    { label: 'PIXLAPE 5', path: '/icon/logo5.svg' },
    { label: 'PIXLAPE 6', path: '/icon/logo6.svg' },
    { label: 'PIXLAPE 7', path: '/icon/logo7.svg' },
    { label: 'PIXLAPE 8', path: '/icon/logo8.svg' },
  ];

  const presetAvatars = [
    { label: 'GIF Profile', path: '/avatar_profile.gif' },
    { label: 'Admin Badge', path: '/icon/admin.svg' },
    { label: 'User Icon', path: '/icon/1user.svg' },
    { label: 'User Profile', path: '/icon/button/user.svg' },
    { label: 'Dino Avatar', path: '/icon/stock/dino.svg' },
    { label: 'Robot Avatar', path: '/icon/stock/robotic.svg' },
    { label: 'Agent CLI', path: '/icon/stock/agent_cli.svg' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setSettings((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'defaultPrice' || name === 'itemsPerPage') {
      setSettings((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('pixlape_admin_settings', JSON.stringify(settings));
      } catch (err) {
        console.error('Failed to save settings to localStorage', err);
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  const handleExportConfig = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pixlape_settings_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to system defaults?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('pixlape_admin_settings');
      }
      setSettings(DEFAULT_SETTINGS);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <>
      <AdminHeader title="Admin Settings & Store Configuration" breadcrumb={['Admin', 'Settings']} />
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-full w-full text-text font-mono">
        {/* ── Section 1: Settings Telemetry Status Bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-yellow-green border border-border-color p-4 rounded-lg shadow-hard-sm font-mono text-darkteal">
            <span className="text-xs text-darkteal font-black uppercase tracking-wider block">◯ Main Store Logo Status</span>
            <div className="text-sm font-black text-darkteal mt-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block"></span>
              <span className="truncate">{settings.mainLogoUrl ? 'LOADED & ACTIVE' : 'NO LOGO SET'}</span>
            </div>
          </div>

          <div className="bg-yellow-green border border-border-color p-4 rounded-lg shadow-hard-sm font-mono text-darkteal">
            <span className="text-xs text-darkteal font-black uppercase tracking-wider block">◯ Admin Profile Role</span>
            <div className="text-sm font-black text-darkteal mt-1 flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-yellow-green text-darkteal rounded-md text-xs uppercase font-black border border-border-color">
                {settings.adminRole || 'SUPERADMIN'}
              </span>
            </div>
          </div>

          <div className="bg-yellow-green border border-border-color p-4 rounded-lg shadow-hard-sm font-mono text-darkteal">
            <span className="text-xs text-darkteal font-black uppercase tracking-wider block">$ Vault Currency</span>
            <div className="text-sm font-black text-darkteal mt-1">
              {settings.currency === 'USD'
                ? 'USD ($)'
                : settings.currency === 'IDR'
                ? 'IDR (Rp)'
                : settings.currency === 'EUR'
                ? 'EUR (€)'
                : 'GBP (£)'}
            </div>
          </div>

          <div className="bg-yellow-green border border-border-color p-4 rounded-lg shadow-hard-sm font-mono text-darkteal">
            <span className="text-xs text-darkteal font-black uppercase tracking-wider block">◯ Security Guard</span>
            <div className="text-xs font-black text-darkteal bg-yellow-green px-2.5 py-1 rounded-md border border-border-color w-fit mt-1">
              {settings.virusTotalAutoScan ? 'VERIFIED (100% CLEAN)' : 'MANUAL SCANS ONLY'}
            </div>
          </div>
        </div>

        {/* ── Saved Toast Banner ── */}
        {saved && (
          <div className="bg-soft-linen text-black border- border-border-color p-4 rounded-lg shadow-hard-sm font-mono font-black text-sm flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <span>SETTINGS SAVED SUCCESSFULLY! Persistent state synced across local vault configuration.</span>
            </div>
            <span className="text-xs uppercase bg-black text-white px-2.5 py-1 rounded-md">SYNC ACTIVE</span>
          </div>
        )}

        {/* ── Section 2: Tab Navigation Controls ── */}
        <div className="flex flex-wrap items-center gap-3 bg-yellow-100 border border-border-color p-3.5 rounded-lg shadow-hard-sm font-mono">
          {[
            { id: 'branding', label: '▶ BRANDING & LOGOS', desc: 'Main Store Logo & Ticker' },
            { id: 'profile', label: '▶ ADMIN PROFILE', desc: 'Avatar & Account Details' },
            { id: 'general', label: '▶ GENERAL & DEFAULTS', desc: 'Currency & Access Modes' },
            { id: 'security', label: '▶ SECURITY & API KEYS', desc: 'Tokens & Protection' },
            { id: 'storage', label: '▶ STORAGE & TELEMETRY', desc: 'Cloud Mirrors & Backup' },
            { id: 'social', label: '▶ SOCIAL & PLATFORMS', desc: 'Google, GitHub, Vercel, X, FB' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 rounded-lg border border-border-color font-mono text-xs font-black uppercase transition-all duration-200 cursor-pointer flex flex-col items-start ${
                  isActive
                    ? 'bg-yellow-green text-darkteal border-border-color shadow-hard-sm scale-102'
                    : 'bg-white text-darkteal border-border-color hover:bg-yellow-green hover:text-darkteal'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[10px] opacity-80 font-bold mt-0.5">{tab.desc}</span>
              </button>
            );
          })}
        </div>

        {/* ── Main Form Container (2 Columns: Controls + Live Preview Side Panel) ── */}
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── LEFT COLUMN (8 Cols): Main Settings Panel ── */}
          <div className="lg:col-span-8 bg-yellow-50 text-darkteal p-6 sm:p-8 rounded-2xl border-2 border-border-color shadow-hard space-y-8 font-mono">
            {/* ── TAB 1: BRANDING & LOGOS ── */}
            {activeTab === 'branding' && (
              <div className="space-y-6">
                <div className="border-b-2 border-border-color pb-4">
                  <h2 className="text-xl font-head font-black uppercase text-darkteal flex items-center gap-3">
                    <span>▶ Store Branding & Logo Configuration</span>
                  </h2>
                  <p className="text-xs font-mono font-bold text-darkteal/80 mt-1">
                    Manage main store logo placeholder, marquee ticker announcements, and public metadata.
                  </p>
                </div>

                {/* Main Logo Image Setting Box */}
                <div className="space-y-4 bg-yellow-100 p-5 rounded-xl border-2 border-border-color shadow-hard-sm">
                  <Input
                    label="MAIN STORE LOGO IMAGE PATH OR URL"
                    name="mainLogoUrl"
                    placeholder="e.g. /icon/logo_icon.svg or https://your-cdn.com/logo.png"
                    value={settings.mainLogoUrl}
                    onChange={handleChange}
                    className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                  />

                  {/* Logo Live Preview & Preset Controls */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                    {/* Preview Box */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                      <span className="text-xs font-black uppercase text-darkteal">PREVIEW:</span>
                      <div className="w-36 h-36 rounded-xl bg-white border-2 border-border-color flex items-center justify-center p-3 shadow-hard-sm overflow-hidden select-none">
                        {settings.mainLogoUrl && !logoError ? (
                          <img
                            src={settings.mainLogoUrl}
                            alt="Main Logo"
                            className="w-full h-full object-contain"
                            onError={() => setLogoError(true)}
                          />
                        ) : (
                          <span className="text-4xl">🏛️</span>
                        )}
                      </div>
                      <span className="text-xs font-mono font-bold text-darkteal">
                        {logoError ? '⚠️ Invalid Image Path' : 'Main store logo'}
                      </span>
                    </div>

                    {/* Stock Logo Presets Grid */}
                    <div className="flex-1 space-y-3 w-full">
                      <span className="text-xs font-mono font-black uppercase text-darkteal block">
                        STOCK LOGO PRESETS:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {presetLogos.map((preset) => (
                          <button
                            key={preset.path}
                            type="button"
                            onClick={() => setSettings((prev) => ({ ...prev, mainLogoUrl: preset.path }))}
                            className={`p-2.5 rounded-xl border-2 font-mono text-xs font-black flex items-center gap-2.5 transition-all cursor-pointer ${
                              settings.mainLogoUrl === preset.path
                                ? 'bg-yellow-green text-darkteal border-border-color shadow-hard-sm scale-102'
                                : 'bg-white border-border-color text-darkteal hover:bg-yellow-green'
                            }`}
                          >
                            <div className="w-7 h-7 rounded-lg bg-white border border-border-color flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                              <IconRenderer icon={preset.path} alt={preset.label} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xs truncate">{preset.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Input
                  label="Site Title *"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase text-darkteal">Site Tagline & Meta Description</label>
                  <textarea
                    name="siteDescription"
                    value={settings.siteDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border-2 border-border-color rounded-xl text-xs font-bold text-darkteal focus:outline-none focus:border-cayenne shadow-hard-sm leading-relaxed"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase text-darkteal">Header Marquee Ticker Message</label>
                  <input
                    type="text"
                    name="marqueeText"
                    value={settings.marqueeText}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border-2 border-border-color rounded-xl text-xs font-mono font-bold text-darkteal focus:outline-none focus:border-cayenne shadow-hard-sm"
                  />
                </div>
              </div>
            )}

            {/* ── TAB 2: ADMIN PROFILE ── */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="border-b-2 border-border-color pb-4">
                  <h2 className="text-xl font-head font-black uppercase text-darkteal flex items-center gap-3">
                    <span>▶ Admin Profile & Identity Settings</span>
                  </h2>
                  <p className="text-xs font-mono font-bold text-darkteal/80 mt-1">
                    Update header profile avatar logo, admin name, credentials, and bio.
                  </p>
                </div>

                {/* Avatar Logo Placeholder Setting Box */}
                <div className="space-y-4 bg-yellow-100 p-5 rounded-xl border-2 border-border-color shadow-hard-sm">
                  <Input
                    label="ADMIN PROFILE AVATAR LOGO URL OR PATH"
                    name="adminAvatarUrl"
                    placeholder="e.g. /avatar_profile.gif or /icon/admin.svg"
                    value={settings.adminAvatarUrl}
                    onChange={handleChange}
                    className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                  />

                  {/* Avatar Live Preview Box & Presets */}
                  <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                    {/* Avatar Live Box */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <span className="text-xs font-black uppercase text-darkteal">Preview:</span>
                      <div className="w-36 h-36 rounded-xl bg-white border-2 border-border-color flex items-center justify-center p-2 shadow-hard-sm overflow-hidden relative select-none">
                        {settings.adminAvatarUrl && !avatarError ? (
                          <img
                            src={settings.adminAvatarUrl}
                            alt="Avatar Preview"
                            className="w-full h-full object-cover rounded-lg"
                            onError={() => setAvatarError(true)}
                          />
                        ) : (
                          <span className="text-3xl text-darkteal font-black">
                            {settings.adminName ? settings.adminName.charAt(0).toUpperCase() : 'A'}
                          </span>
                        )}
                        <span className="absolute bottom-2 right-2 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-black" title="Online" />
                      </div>
                      <span className="text-xs font-mono font-bold text-darkteal">
                        {avatarError ? '⚠️ Image Error — Initials Fallback' : 'Profile Logo'}
                      </span>
                    </div>

                    {/* Stock Avatar Presets */}
                    <div className="flex-1 space-y-2 w-full">
                      <span className="text-xs font-mono font-black uppercase text-darkteal block">
                        QUICK SELECT PRESETS:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {presetAvatars.map((preset) => (
                          <button
                            key={preset.path}
                            type="button"
                            onClick={() => setSettings((prev) => ({ ...prev, adminAvatarUrl: preset.path }))}
                            className={`p-2.5 rounded-xl border-2 font-mono text-xs font-black flex items-center gap-2 transition-all cursor-pointer ${
                              settings.adminAvatarUrl === preset.path
                                ? 'bg-yellow-green text-darkteal border-border-color shadow-hard-sm scale-102'
                                : 'bg-white border-border-color text-darkteal hover:bg-yellow-green'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-white border border-border-color flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                              <IconRenderer icon={preset.path} alt={preset.label} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xs truncate">{preset.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Admin Display Name"
                    name="adminName"
                    value={settings.adminName}
                    onChange={handleChange}
                    className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                  />

                  <Input
                    label="Admin Email Address"
                    name="adminEmail"
                    type="email"
                    value={settings.adminEmail}
                    onChange={handleChange}
                    className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Admin Role Badge"
                    name="adminRole"
                    value={settings.adminRole}
                    onChange={handleChange}
                    className="border-2 border-border-color bg-white text-xs font-mono font-black text-darkteal shadow-hard-sm uppercase"
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase text-darkteal">Security Level</label>
                    <div className="px-5 py-3.5 bg-white border-2 border-border-color rounded-xl text-xs font-mono font-black text-darkteal shadow-hard-sm flex items-center justify-between">
                      <span>●●●●●●●●●●●●●○○○○</span>
                      <span className="px-2.5 py-0.5 bg-yellow-green text-darkteal rounded-md text-xs border border-border-color">Good</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase text-darkteal">Admin Bio / Description</label>
                  <textarea
                    name="adminBio"
                    value={settings.adminBio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border-2 border-border-color rounded-xl text-xs font-bold text-darkteal focus:outline-none focus:border-cayenne shadow-hard-sm leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* ── TAB 3: GENERAL & DEFAULTS ── */}
            {activeTab === 'general' && (
              <div className="space-y-7">
                <div className="border-b-2 border-border-color pb-4">
                  <h2 className="text-xl font-head font-black uppercase text-darkteal flex items-center gap-2">
                    <span>▶ General Vault Defaults & Access Modes</span>
                  </h2>
                  <p className="text-xs font-mono font-bold text-darkteal/80 mt-1">
                    Configure currency symbols, maintenance mode, and default product catalog settings.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase text-darkteal">Default Store Currency</label>
                    <select
                      name="currency"
                      value={settings.currency}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 bg-white border-2 border-border-color rounded-xl text-xs font-bold text-darkteal focus:outline-none shadow-hard-sm"
                    >
                      <option value="USD">USD ($ - United States Dollar)</option>
                      <option value="IDR">IDR (Rp - Indonesian Rupiah)</option>
                      <option value="EUR">EUR (€ - Euro)</option>
                      <option value="GBP">GBP (£ - British Pound)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase text-darkteal">Catalog Items Per Page</label>
                    <select
                      name="itemsPerPage"
                      value={settings.itemsPerPage}
                      onChange={handleChange}
                      className="w-full px-3.5 py-3 bg-white border-2 border-border-color rounded-xl text-xs font-bold text-darkteal focus:outline-none shadow-hard-sm"
                    >
                      <option value={12}>12 Items Per Page</option>
                      <option value={24}>24 Items Per Page</option>
                      <option value={48}>48 Items Per Page</option>
                      <option value={96}>Show All Items</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    label="Default Asset License Terms"
                    name="defaultLicense"
                    value={settings.defaultLicense}
                    onChange={handleChange}
                    className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                  />

                  <Input
                    label="Default Pro Asset Price (USD $)"
                    name="defaultPrice"
                    type="number"
                    step="0.01"
                    value={settings.defaultPrice}
                    onChange={handleChange}
                    className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                  />
                </div>

                {/* Maintenance Mode Box */}
                <div className="flex items-center justify-between p-5 bg-yellow-100 border-2 border-border-color rounded-xl shadow-hard-sm text-darkteal">
                  <div>
                    <span className="font-mono font-black text-sm uppercase text-darkteal block">
                      Enable Maintenance Mode
                    </span>
                    <span className="text-xs font-mono font-bold text-darkteal/80">
                      Restrict public browsing and display maintenance landing notice
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    id="maintenance"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="w-6 h-6 rounded border-2 border-border-color text-darkteal cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* ── TAB 4: SECURITY & API KEYS ── */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="border-b-2 border-border-color pb-4">
                  <h2 className="text-xl font-head font-black uppercase text-darkteal flex items-center gap-3">
                    <span>▶ Security Telemetry & API Key Guard</span>
                  </h2>
                  <p className="text-xs font-mono font-bold text-darkteal/80 mt-1">
                    Manage secret keys, VirusTotal auto-scan options, and request verification tokens.
                  </p>
                </div>

                <Input
                  label="Admin Secret Guard Key (x-admin-secret)"
                  name="adminSecretKey"
                  type="password"
                  value={settings.adminSecretKey}
                  onChange={handleChange}
                  className="border-2 border-border-color bg-white text-sm font-mono font-bold text-darkteal shadow-hard-sm"
                />

                <div className="flex items-center justify-between p-5 bg-yellow-100 border-2 border-border-color rounded-xl shadow-hard-sm text-darkteal">
                  <div>
                    <span className="font-mono font-black text-sm uppercase text-darkteal block">
                      VirusTotal Automated File Safety Scan
                    </span>
                    <span className="text-xs font-mono font-bold text-darkteal/80">
                      Automatically verify asset archive hashes against VirusTotal API on upload
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    name="virusTotalAutoScan"
                    checked={settings.virusTotalAutoScan}
                    onChange={handleChange}
                    className="w-6 h-6 rounded border-2 border-border-color text-darkteal cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* ── TAB 5: STORAGE & TELEMETRY ── */}
            {activeTab === 'storage' && (
              <div className="space-y-6">
                <div className="border-b-2 border-border-color pb-4">
                  <h2 className="text-xl font-head font-black uppercase text-darkteal flex items-center gap-2">
                    <span>▶ Cloud Mirror Storage & Backup Export</span>
                  </h2>
                  <p className="text-xs font-mono font-bold text-darkteal/80 mt-1">
                    Configure mirror telemetry polling, export configuration backups, or reset settings.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase text-darkteal">Cloud Storage Mirror Auto-Sync Interval</label>
                  <select
                    name="cloudSyncInterval"
                    value={settings.cloudSyncInterval}
                    onChange={handleChange}
                    className="w-full px-3.5 py-3 bg-white border-2 border-border-color rounded-xl text-xs font-bold text-darkteal focus:outline-none shadow-hard-sm"
                  >
                    <option value="5 mins">5 Minutes Interval</option>
                    <option value="15 mins">15 Minutes Interval (Recommended)</option>
                    <option value="1 hour">1 Hour Interval</option>
                    <option value="Manual Only">Manual Sync Only</option>
                  </select>
                </div>

                <div className="pt-4 border-t-2 border-border-color flex flex-wrap items-center justify-between gap-4">
                  <Button
                    type="button"
                    variant="neutral"
                    onClick={handleExportConfig}
                    className="font-mono text-xs font-black uppercase bg-white text-darkteal border-2 border-border-color shadow-hard-sm hover:bg-yellow-green flex items-center gap-2 py-2.5 px-4 rounded-xl"
                  >
                    <span>▼ EXPORT CONFIG (JSON)</span>
                  </Button>

                  <Button
                    type="button"
                    variant="danger"
                    onClick={handleResetDefaults}
                    className="font-mono text-xs font-black uppercase bg-red-600 text-white border-2 border-border-color shadow-hard-sm hover:bg-red-700 flex items-center gap-2 py-2.5 px-4 rounded-xl"
                  >
                    <span>↻ RESET ALL</span>
                  </Button>
                </div>
              </div>
            )}

            {/* ── TAB 6: SOCIAL & PLATFORMS ── */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="border-b-2 border-border-color pb-4">
                  <h2 className="text-xl font-head font-black uppercase text-darkteal flex items-center gap-3">
                    <span>▶ Social Media & Platform Account Integrations</span>
                  </h2>
                  <p className="text-sm font-mono font-bold text-darkteal mt-1">
                    Connect public developer accounts (Google, GitHub, Vercel) and social media handles (Twitter, Facebook, Discord).
                  </p>
                </div>

                {/* Developer & Cloud Accounts Section */}
                <div className="space-y-4 bg-yellow-100 p-5 rounded-xl border-2 border-border-color shadow-hard-sm">
                  <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-2">
                    <span className="font-mono font-black text-md uppercase text-darkteal flex items-center gap-2">
                      ◯ DEVELOPER & CLOUD PLATFORMS
                    </span>
                    <span className="text-[10px] font-black bg-yellow-green text-darkteal px-2 py-0.5 rounded border border-border-color uppercase">
                      3 CONNECTED
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Google Auth Client ID"
                      name="googleClientId"
                      value={settings.googleClientId}
                      onChange={handleChange}
                      placeholder="e.g. 84930291.apps.googleusercontent.com"
                      className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                    />

                    <Input
                      label="Google Profile / Dev Console URL"
                      name="googleProfileUrl"
                      value={settings.googleProfileUrl}
                      onChange={handleChange}
                      placeholder="https://myaccount.google.com"
                      className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="GitHub Account / Org URL"
                      name="githubUrl"
                      value={settings.githubUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/pixlape"
                      className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                    />

                    <Input
                      label="Vercel Team / Project URL"
                      name="vercelUrl"
                      value={settings.vercelUrl}
                      onChange={handleChange}
                      placeholder="https://vercel.com/pixlape-team"
                      className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                    />
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="space-y-4 bg-yellow-100 p-5 rounded-xl border-2 border-border-color shadow-hard-sm">
                  <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-2">
                    <span className="font-mono font-black text-md uppercase text-darkteal flex items-center gap-2">
                      ◯ SOCIAL MEDIA CHANNELS
                    </span>
                    <span className="text-[10px] font-black bg-cayenne text-white px-2 py-0.5 rounded border border-border-color uppercase">
                      PUBLIC FOOTER
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Twitter / X URL"
                      name="twitterUrl"
                      value={settings.twitterUrl}
                      onChange={handleChange}
                      placeholder="https://x.com/pixlape_official"
                      className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                    />

                    <Input
                      label="Facebook URL"
                      name="facebookUrl"
                      value={settings.facebookUrl}
                      onChange={handleChange}
                      placeholder="https://facebook.com/pixlape.vault"
                      className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                    />
                  </div>

                  <Input
                    label="Discord Link"
                    name="discordUrl"
                    value={settings.discordUrl}
                    onChange={handleChange}
                    placeholder="https://discord.gg/pixlape"
                    className="border-2 border-border-color bg-white text-xs font-mono font-bold text-darkteal shadow-hard-sm"
                  />
                </div>
              </div>
            )}

            {/* ── Global Submit / Save Action Footer ── */}
            <div className="pt-6 border-t-2 border-border-color flex items-center justify-between flex-wrap gap-4">
              <span className="text-xs font-mono font-bold text-darkteal/80">
                {saved ? '✓ System Configuration Saved & Active' : 'Unsaved changes will persist upon click.'}
              </span>
              <Button
                type="submit"
                variant="primary"
                className="font-mono text-sm sm:text-base font-black uppercase bg-green-500 text-black border-2 border-border-color shadow-hard hover:bg-green-400 transition-all cursor-pointer flex items-center gap-2 py-3.5 px-7 rounded-xl"
              >
                <span>{saved ? '✓ SETTINGS SAVED!' : '▣ SAVE ALL SETTINGS'}</span>
              </Button>
            </div>
          </div>

          {/* ── RIGHT COLUMN (4 Cols): LIVE LOGO & PROFILE PREVIEW PANEL ── */}
          <aside className="lg:col-span-4 space-y-6 sticky top-20 font-mono">
            {/* Social Media & Platform Integration Status Card */}
            <div className="bg-yellow-green p-6 rounded-2xl border-2 border-border-color shadow-hard space-y-4 text-darkteal">
              <div className="flex items-center justify-between border-b-2 border-border-color pb-3">
                <span className="text-base font-mono font-black uppercase text-darkteal flex items-center gap-2">
                  <span>●●●○○ INTEGRATIONS STATUS</span>
                </span>
                <span className="text-sm font-mono font-black bg-yellow-green text-darkteal px-2 py-0.5 rounded border border-border-color uppercase">
                  6 ACTIVE
                </span>
              </div>

              <div className="space-y-2 font-mono text-lg">
                <a href={settings.googleProfileUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-white border-1 border-border-color rounded-lg hover:bg-yellow-green transition-all shadow-hard-sm">
                  <span className="font-bold text-sm flex items-center gap-2">◪ Google Auth</span>
                  <span className="badge bg-green-500 text-white font-black text-sm px-2 py-0.5 rounded">CONNECTED</span>
                </a>

                <a href={settings.githubUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-white border-1 border-border-color rounded-lg hover:bg-yellow-green transition-all shadow-hard-sm">
                  <span className="font-bold text-sm flex items-center gap-2">▩ GitHub</span>
                  <span className="badge bg-yellow-green text-darkteal font-black text-sm px-2 py-0.5 rounded">VERIFIED</span>
                </a>

                <a href={settings.vercelUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-white border-2 border-border-color rounded-xl hover:bg-yellow-green transition-all shadow-hard-sm">
                  <span className="font-bold text-sm flex items-center gap-2">▲ Vercel Edge</span>
                  <span className="badge bg-yellow-green text-darkteal font-black text-sm px-2 py-0.5 rounded">DEPLOYED</span>
                </a>

                <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-white border-1 border-border-color rounded-lg hover:bg-yellow-green transition-all shadow-hard-sm">
                  <span className="font-bold text-sm flex items-center gap-2">✕  Twitter / X</span>
                  <span className="badge bg-cayenne text-white font-black text-sm px-2 py-0.5 rounded">ACTIVE</span>
                </a>

                <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-white border-1 border-border-color rounded-lg hover:bg-yellow-green transition-all shadow-hard-sm">
                  <span className="font-bold text-sm flex items-center gap-2">▩ Facebook</span>
                  <span className="badge bg-cayenne text-white font-black text-[10px] px-2 py-0.5 rounded">ACTIVE</span>
                </a>

                <a href={settings.discordUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2.5 bg-white border-2 border-border-color rounded-xl hover:bg-yellow-green transition-all shadow-hard-sm">
                  <span className="font-bold text-sm flex items-center gap-2">⌗ Discord</span>
                  <span className="badge bg-yellow-green text-darkteal font-black text-[10px] px-2 py-0.5 rounded">JOIN</span>
                </a>
              </div>
            </div>

            {/* Store Branding & Logo Card Preview */}
            <div className="bg-yellow-100 p-6 rounded-2xl border-2 border-border-color shadow-hard space-y-4 text-darkteal">
              <div className="flex items-center justify-between border-b-2 border-border-color pb-3">
                <span className="text-base font-mono font-black uppercase text-darkteal flex items-center gap-2">
                  <span>◯◯◯</span><span>STORE LOGO PREVIEW</span>
                </span>
                <span className="text-[10px] font-mono font-black bg-cayenne text-white px-2 py-0.5 rounded border border-border-color uppercase">
                  PUBLIC HEADER
                </span>
              </div>

              {/* Simulated Public Web Header */}
              <div className="bg-white p-4 rounded-xl border-2 border-border-color shadow-hard-sm space-y-3">
                <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-lg bg-white border-2 border-border-color flex items-center justify-center p-1.5 shadow-hard-sm overflow-hidden shrink-0">
                      {settings.mainLogoUrl && !logoError ? (
                        <img
                          src={settings.mainLogoUrl}
                          alt="Logo Preview"
                          className="w-full h-full object-contain"
                          onError={() => setLogoError(true)}
                        />
                      ) : (
                        <span className="text-xl">🏛️</span>
                      )}
                    </div>
                    <div>
                      <span className="font-head font-black text-lg uppercase text-darkteal block leading-none">
                        {settings.siteName || 'PIXLAPE.COM'}
                      </span>
                      <span className="text-xs font-mono font-bold text-darkteal/70 block mt-0.5 truncate max-w-[140px]">
                        Digital Asset Vault
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-mono font-black bg-yellow-green text-darkteal rounded uppercase border border-border-color">
                    PRO
                  </span>
                </div>

                <div className="text-xs font-mono font-bold text-darkteal/90 leading-relaxed line-clamp-2">
                  {settings.siteDescription}
                </div>
              </div>

              {/* Live Ticker Preview */}
              <div className="space-y-2">
                <span className="text-sm font-mono font-black text-cayenne uppercase block">Live Marquee Ticker Preview:</span>
                <div className="bg-yellow-50 text-darkteal p-2.5 rounded-xl border-2 border-border-color text-xs font-mono font-black truncate shadow-hard-sm">
                  {settings.marqueeText}
                </div>
              </div>
            </div>

            {/* Admin Profile Avatar Card Preview */}
            <div className="bg-yellow-100 p-6 rounded-2xl border-2 border-border-color shadow-hard space-y-4 text-darkteal">
              <div className="flex items-center justify-between border-b-2 border-border-color pb-3">
                <span className="text-base font-mono font-black uppercase text-darkteal flex items-center gap-3">
                  <span>◯◯◯</span><span>ADMIN AVATAR CARD</span>
                </span>
                <span className="text-[10px] font-mono font-black bg-yellow-green text-darkteal px-2 py-0.5 rounded border border-border-color uppercase">
                  {settings.adminRole || 'SUPERADMIN'}
                </span>
              </div>

              <div className="bg-yellow-50 p-4 rounded-xl border-2 border-border-color shadow-hard-sm space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 rounded-xl bg-white border-2 border-border-color flex items-center justify-center p-1 shadow-hard-sm overflow-hidden relative shrink-0">
                    {settings.adminAvatarUrl && !avatarError ? (
                      <img
                        src={settings.adminAvatarUrl}
                        alt="Avatar Card"
                        className="w-full h-full object-cover rounded-lg"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <span className="text-2xl text-darkteal font-black">
                        {settings.adminName ? settings.adminName.charAt(0).toUpperCase() : 'A'}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-mono font-black text-base text-darkteal uppercase truncate">{settings.adminName || 'ADMIN'}</h4>
                    <span className="text-sm text-darkteal font-mono font-bold block truncate">{settings.adminEmail}</span>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-mono font-black bg-yellow-green text-darkteal border border-border-color rounded uppercase">
                      ● ONLINE
                    </span>
                  </div>
                </div>

                <p className="text-xs text-darkteal/90 font-mono font-medium leading-relaxed border-t border-border-color/20 pt-2 line-clamp-2">
                  {settings.adminBio}
                </p>
              </div>
            </div>
          </aside>
        </form>
      </main>
    </>
  );
}
