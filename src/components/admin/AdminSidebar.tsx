'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IconRenderer } from '@/components/ui/IconRenderer';
import {
  ADMIN_MAIN_MENU,
  ADMIN_TOOLS_MENU,
  ADMIN_SYSTEM_MENU,
  isNavActive,
  NavItem,
} from '@/lib/routes';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname() || '';

  const renderNavSection = (
    title: string,
    items: NavItem[],
    activeColorClass: string,
    hoverBgClass: string
  ) => (
    <div className="mb-6">
      <div className="text-sm font-mono font-black uppercase tracking-widest text-yellow-green px-3 mb-2 select-none">
        {title}
      </div>
      <nav className="space-y-1.5 font-mono">
        {items.map((item) => {
          const isActive = isNavActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-black transition-all duration-200 border-1 ${isActive
                ? `${activeColorClass} border-border-color shadow-[3px_3px_0_var(--border-color)] translate-x-0.5`
                : `bg-darkteal text-white border-transparent hover:${hoverBgClass} hover:border-white/70 hover:shadow-[2px_2px_0_var(--border-color)]`
                }`}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <IconRenderer icon={item.icon} alt={item.label} className="w-5 h-5 object-contain shrink-0" />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-black font-mono px-2 py-0.5 rounded-md border shrink-0 transition-all ${isActive
                    ? 'bg-white text-black border-black'
                    : 'bg-neo-yellow text-black border-border-color shadow-[1px_1px_0_var(--border-color)]'
                    }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <aside className="w-64 bg-darkteal text-white border-r-2 border-border-color min-h-screen sticky top-0 h-screen overflow-y-auto p-4 flex flex-col justify-between shrink-0 select-none shadow-hard-lg z-20 font-mono">
      <div>
        {/* Workspace Brand Box */}
        <Link
          href="/"
          className="bg-yellow-green text-black border-2 border-border-color rounded-2xl p-3.5 mb-6 flex items-center justify-between shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 group block"
        >
          <div className="flex items-center space-x-2.5">
            <span className="w-12 h-12 rounded-lg bg-white border-1.5 border-border-color flex items-center justify-center font-black text-white text-sm shadow-[2px_2px_0_var(--border-color)] group-hover:scale-105 transition-transform overflow-hidden p-0.5">
              <Image
                src="/icon/shared/logopixl.png"
                alt="PIXLApe Logo"
                width={52}
                height={52}
                className="object-contain w-full h-full"
              />
            </span>
            <div>
              <div className="font-head text-1xl font-black tracking-tighter text-black flex items-center justify-left gap-2 mt-0.5">
                PIXLAPE.com
              </div>
              <div className="text-xs text-black/80 font-mono font-bold flex items-center gap-1 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-neo-lime animate-pulse inline-block" />
                <span>DASHBOARD</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Navigation Sections */}
        {renderNavSection('MENU', ADMIN_MAIN_MENU, 'bg-cayenne text-yellow-green', 'bg-evergreen')}
        {renderNavSection('Tools & Utilities', ADMIN_TOOLS_MENU, 'bg-cayenne text-yellow-green', 'bg-evergreen')}
        {renderNavSection('System', ADMIN_SYSTEM_MENU, 'bg-cayenne text-yellow-green', 'bg-evergreen')}
      </div>

      {/* Sidebar Footer User Info */}
      <div className="pt-4 border-t-2 border-white/20 space-y-3 font-mono">
        <div className="flex items-center space-x-2.5 px-2">
          <div className="w-10 h-10 rounded-lg bg-evergreen text-white border-2 border-border-color flex items-center justify-center font-mono font-black text-xs shadow-hard-sm shrink-0">
            ⭐
          </div>
          <div className="min-w-0">
            <div className="text-md font-head font-black text-white uppercase truncate">Galih Addi</div>
            <div className="text-xs font-mono font-bold text-white/80 truncate">project@keratuli.site</div>
          </div>
        </div>

        <Link
          href="/"
          className="flex items-center justify-center space-x-2 w-full py-2 bg-cayenne text-evergreen border-2 border-border-color rounded-xl text-xs font-mono font-black shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 cursor-pointer"
        >
          <span>🌐</span>
          <span>BACK TO SITE</span>
        </Link>
      </div>
    </aside>
  );
};
