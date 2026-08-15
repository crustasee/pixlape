'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { useSession, signOut } from 'next-auth/react';
import {
  ChevronLeft,
  ChevronRight,
  LogOut,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import {
  ADMIN_MAIN_MENU,
  ADMIN_TOOLS_MENU,
  ADMIN_SYSTEM_MENU,
  isNavActive,
  NavItem,
} from '@/lib/routes';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname() || '';
  const { data: session } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedState = localStorage.getItem('pixlape_sidebar_collapsed');
    if (savedState !== null) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);

  const toggleSidebar = () => {
    const nextState = !isCollapsed;
    setIsCollapsed(nextState);
    localStorage.setItem('pixlape_sidebar_collapsed', String(nextState));
  };

  const userName = session?.user?.name || 'Galih Addi';
  const userEmail = session?.user?.email || 'admin@store.com';

  const renderNavSection = (
    title: string,
    items: NavItem[],
    activeColorClass: string,
    hoverBgClass: string
  ) => (
    <div className="mb-5">
      {!isCollapsed ? (
        <div className="text-[11px] font-mono font-black uppercase tracking-widest text-yellow-green px-3 mb-2 select-none flex items-center justify-between">
          <span>{title}</span>
          <span className="text-[9px] bg-evergreen px-1.5 py-0.5 rounded text-white/70 border border-white/10">
            {items.length}
          </span>
        </div>
      ) : (
        <div className="w-full flex justify-center mb-2 select-none">
          <div className="h-0.5 w-6 bg-white/20 rounded" />
        </div>
      )}

      <nav className="space-y-1.5 font-mono">
        {items.map((item) => {
          const isActive = isNavActive(pathname, item.href);
          return (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={`flex items-center ${isCollapsed ? 'justify-center px-2 py-3' : 'justify-between px-3 py-2.5'
                  } rounded-xl text-xs font-mono font-black transition-all duration-200 border-2 ${isActive
                    ? `${activeColorClass} border-border-color shadow-[3px_3px_0_var(--border-color)] translate-x-0.5`
                    : `bg-darkteal text-white border-transparent hover:${hoverBgClass} hover:border-white/50 hover:shadow-[2px_2px_0_var(--border-color)]`
                  }`}
              >
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2.5'} min-w-0`}>
                  <IconRenderer
                    icon={item.icon}
                    alt={item.label}
                    className="w-5 h-5 object-contain shrink-0 transition-transform group-hover:scale-110"
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>

                {!isCollapsed && item.badge && (
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

              {/* Tooltip on Collapsed Hover */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 bg-darkteal text-white border-2 border-border-color rounded-xl text-xs font-mono font-black shadow-hard-sm whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-neo-yellow text-black px-1.5 py-0.5 rounded border border-border-color">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <aside
      className={`${isCollapsed ? 'w-20' : 'w-64'
        } bg-darkteal text-white border-r-2 border-border-color min-h-screen sticky top-0 h-screen overflow-y-auto ${isCollapsed ? 'p-2.5' : 'p-4'
        } flex flex-col justify-between shrink-0 select-none shadow-hard-lg z-30 font-mono transition-all duration-300 relative`}
    >
      <div>
        {/* Toggle Collapse Floating Button */}
        <button
          onClick={toggleSidebar}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className="absolute -right-3.5 top-6 bg-yellow-green text-black border-2 border-border-color rounded-full p-1 shadow-hard-sm hover:scale-110 active:scale-95 transition-all z-40 cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Workspace Brand Box */}
        <Link
          href="/"
          className={`bg-yellow-green text-black border-2 border-border-color rounded-2xl ${isCollapsed ? 'p-2 flex justify-center' : 'p-3.5'
            } mb-6 flex items-center justify-between shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-200 group block`}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2.5'}`}>
            <span className="w-10 h-10 rounded-lg bg-white border-1.5 border-border-color flex items-center justify-center font-black text-white text-sm shadow-[2px_2px_0_var(--border-color)] group-hover:scale-105 transition-transform overflow-hidden p-0.5 shrink-0">
              <Image
                src="/logo1.svg"
                alt="PIXLApe Logo"
                width={44}
                height={44}
                className="object-contain w-full h-full"
              />
            </span>
            {!isCollapsed && (
              <div>
                <div className="font-head text-1xl font-black tracking-tighter text-black flex items-center justify-left gap-2 mt-0.5">
                  PIXLAPE.com
                </div>
                <div className="text-xs text-black/80 font-mono font-bold flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-neo-lime animate-pulse inline-block" />
                  <span>DASHBOARD</span>
                </div>
              </div>
            )}
          </div>
        </Link>

        {/* Navigation Sections */}
        {renderNavSection('MENU', ADMIN_MAIN_MENU, 'bg-cayenne text-yellow-green', 'bg-evergreen')}
        {renderNavSection('Tools & Utilities', ADMIN_TOOLS_MENU, 'bg-cayenne text-yellow-green', 'bg-evergreen')}
        {renderNavSection('System', ADMIN_SYSTEM_MENU, 'bg-cayenne text-yellow-green', 'bg-evergreen')}
      </div>

      {/* Sidebar Footer User Info */}
      <div className={`pt-4 border-t-2 border-white/20 ${isCollapsed ? 'space-y-2' : 'space-y-2.5'} font-mono`}>
        {!isCollapsed ? (
          <>
            <div className="flex items-center space-x-2.5 px-2 bg-evergreen/60 p-2 rounded-xl border border-white/10">
              <div className="w-9 h-9 rounded-lg bg-yellow-green text-black border-2 border-border-color flex items-center justify-center font-mono font-black text-xs shadow-hard-sm shrink-0">
                <ShieldCheck className="w-5 h-5 text-black" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-head font-black text-white uppercase truncate">{userName}</div>
                <div className="text-[10px] font-mono font-bold text-yellow-green truncate">{userEmail}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 w-full">
              <Link
                href="/"
                title="View Main Site"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 bg-green-400 text-evergreen border-2 border-border-color rounded-xl text-xs font-mono font-black shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 cursor-pointer min-w-0"
              >
                <Globe className="w-4 h-4 shrink-0 text-evergreen" />
                <span className="truncate">SITE</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                title="Sign Out of Dashboard"
                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-2 bg-cayenne text-white border-2 border-border-color rounded-xl text-xs font-mono font-black shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 cursor-pointer min-w-0"
              >
                <LogOut className="w-4 h-4 shrink-0 text-white" />
                <span className="truncate">LOGOUT</span>
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <Link
              href="/"
              title="Back to Public Site"
              className="w-10 h-10 flex items-center justify-center bg-evergreen text-white border-2 border-border-color rounded-xl shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Globe className="w-4 h-4 text-yellow-green" />
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              title="Logout"
              className="w-10 h-10 flex items-center justify-center bg-cayenne text-white border-2 border-border-color rounded-xl shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
