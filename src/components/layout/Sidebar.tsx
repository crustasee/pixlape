'use client';

import React from 'react';
import { CategoryType, OSFilterType } from '@/types';
import { ASSET_DATABASE } from '@/data/assets';

interface SidebarProps {
  currentCategory: CategoryType;
  onCategoryChange: (cat: CategoryType) => void;
  currentOS: OSFilterType;
  onOSChange: (os: OSFilterType) => void;
}

const renderIcon = (icon: string) => {
  if (!icon) return null;
  // If icon is an HTML string like '<img src="public/icon/all_icon.svg">'
  if (icon.startsWith('<img') || icon.startsWith('<svg')) {
    const match = icon.match(/src=["']([^"']+)["']/);
    if (match && match[1]) {
      const src = match[1].replace(/^public\//, '/');
      return <img src={src.startsWith('/') ? src : `/${src}`} alt="" className="w-6 h-6 object-contain inline-block" />;
    }
  }
  // If icon is an asset path like '/icon/all_icon.svg' or 'public/icon/all_icon.svg'
  if (icon.includes('/') || icon.endsWith('.svg') || icon.endsWith('.png')) {
    const src = icon.replace(/^public\//, '/');
    return <img src={src.startsWith('/') ? src : `/${src}`} alt="" className="w-6 h-6 object-contain inline-block" />;
  }
  return <span>{icon}</span>;
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentCategory,
  onCategoryChange,
  currentOS,
  onOSChange,
}) => {
  const categories: { id: CategoryType; label: string; badge: string; variant: 'yellow' | 'pink' | 'cyan' | 'lime' | 'purple'; icon: string }[] = [
    { id: 'design_app', label: 'Design Apps', badge: `${ASSET_DATABASE.design_app.length}`, variant: 'yellow', icon: '/icon/appssoftware.svg' },
    { id: 'multimedia', label: 'Multimedia', badge: `${ASSET_DATABASE.multimedia.length}`, variant: 'yellow', icon: '/icon/multimedia.svg' },
    { id: 'apk_package', label: 'APK Packages', badge: `${ASSET_DATABASE.apk_package.length}`, variant: 'yellow', icon: '/icon/android.svg' },
    { id: 'tools_app', label: 'Dev Tools', badge: `${ASSET_DATABASE.tools_app.length}`, variant: 'yellow', icon: '/icon/devtools.svg' },
    { id: 'art_graphics', label: 'Art & Graphics', badge: `${ASSET_DATABASE.art_graphics.length}`, variant: 'yellow', icon: '/icon/artgraphic.svg' },
  ];

  const osFilters: { id: OSFilterType; label: string; icon: string }[] = [
    { id: 'all', label: 'ALL', icon: '/icon/allapps.svg' },
    { id: 'windows', label: 'WIN', icon: '/icon/windows.svg' },
    { id: 'macos', label: 'MAC', icon: '/icon/macos.svg' },
    { id: 'linux', label: 'LINUX', icon: '/icon/linux.svg' },
    { id: 'mobile', label: 'MOBILE', icon: '/icon/android.svg' },
  ];

  return (
    <aside className="flex flex-col w-full md:w-80 shrink-0 gap-6 md:sticky md:top-26 h-auto md:h-fit" role="complementary" aria-label="Sidebar filters">
      {/* Categories Section */}
      <div className="bg-yellow-100 text-evergreen border-2 border-border-color shadow-hard rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b-2 border-border-color pb-3">
          <span className="font-head font-extrabold text-base tracking-wider uppercase text-evergreen">CATEGORIES</span>
          <span className="badge bg-cayenne text-white text-xs rounded-lg font-mono font-bold px-2.5 py-1 border border-border-color shadow-[1.5px_1.5px_0_var(--border-color)]">VAULT</span>
        </div>
        <div className="flex flex-wrap md:flex-col gap-2.5" role="group" aria-label="Asset categories">
          {categories.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`sidebar-btn ${isActive ? 'sidebar-btn-active' : ''}`}
                aria-pressed={isActive}
                aria-label={`${cat.label} (${cat.badge} items)`}
              >
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex items-center justify-center w-6 h-6">{renderIcon(cat.icon)}</span>
                  {cat.label}
                </span>
                <span className={`badge badge-${cat.variant} text-[11px] px-2 py-0.5 rounded-md border border-border-color`}>{cat.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* OS Filter Section */}
      <div className="bg-yellow-100 text-black border-2 border-border-color shadow-hard rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b-2 border-black/30 pb-3">
          <span className="font-head font-extrabold text-base tracking-wider uppercase text-black">PLATFORM</span>
          <span className="badge bg-yellow-green text-evergreen text-xs rounded-lg font-mono font-bold px-2.5 py-1 border border-border-color shadow-[1.5px_1.5px_0_var(--border-color)]">SYSTEM</span>
        </div>
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Operating system filters">
          {osFilters.map((os) => {
            const isActive = currentOS === os.id;
            return (
              <button
                key={os.id}
                onClick={() => onOSChange(os.id)}
                className={`sidebar-btn ${isActive ? 'sidebar-btn-active' : ''}`}
                aria-pressed={isActive}
                aria-label={`Filter by ${os.label}`}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="flex items-center justify-center w-5 h-5">{renderIcon(os.icon)}</span>
                  {os.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Vault Status Section */}
      <div className="neo-glass bg-yellow-green text-black border-2 border-border-color shadow-hard rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b-2 border-black/30 pb-3">
          <span className="font-head font-extrabold text-base tracking-wider uppercase text-black">VAULT STATUS</span>
          <span className="badge bg-yellow-green text-evergreen text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border border-border-color animate-pulse">● LIVE</span>
        </div>
        <div className="flex flex-col gap-2.5 font-mono text-xs text-black bg-black/20 p-3.5 rounded-xl border border-white/10">
          <div className="flex justify-between">
            <span>Total Assets:</span>
            <span className="font-black text-black">41 Items</span>
          </div>
          <div className="flex justify-between">
            <span>Online Now:</span>
            <span className="font-black text-yellow-green flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-green animate-pulse" />
              23 users
            </span>
          </div>
          <div className="flex justify-between">
            <span>Security:</span>
            <span className="font-bold text-black">🛡️ Trusted</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
