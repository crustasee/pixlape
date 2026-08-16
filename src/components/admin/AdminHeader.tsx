'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { IconRenderer } from '../ui/IconRenderer';

export interface AdminHeaderProps {
  title?: string;
  breadcrumb?: string[];
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = 'Dashboard',
  breadcrumb = ['Admin', 'Overview'],
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-14 border-b-2 border-border-color bg-yellow-green px-8 flex items-center justify-between sticky top-0 z-30 select-none text-yellow-green rounded-2xl">
      {/* Left Title & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <div>
          <div className="flex items-center space-x-1.5 text-xs text-darkteal font-black uppercase tracking-wider font-mono">
            {breadcrumb.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span>{crumb}</span>
                {idx < breadcrumb.length - 1 && <span className="text-cayenne font-bold">/</span>}
              </React.Fragment>
            ))}
          </div>
          <h1 className="text-base sm:text-lg font-black text-darkteal leading-tight font-head uppercase tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right Header Tools & Controls */}
      <div className="flex items-center space-x-3">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-soft-linen border-2 border-border-color focus-within:border-white focus-within:shadow-[3px_3px_0_var(--c-pink)] rounded-lg px-3 py-1.5 w-60 text-xs text-text transition-all duration-200 shadow-hard-sm">
          <span className="mr-2 text-darkteal  font-bold select-none font-mono">&gt;_</span>
          <input
            type="text"
            placeholder="Search commands..."
            className="bg-transparent border-none outline-none text-xs text-text placeholder-text/50 w-full font-mono font-bold"
          />
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 ml-2 font-mono text-xs font-black bg-yellow-green text-black border border-border-color rounded shadow-[1px_1px_0_var(--border-color)]">
            /
          </kbd>
        </div>

        {/* System Health Badge */}
        <span className="hidden sm:inline-flex items-center space-x-2 text-xs uppercase font-black tracking-wider text-darkteal bg-green-500 px-3 py-1.5 rounded-xl border-1 border-border-color shadow-hard-sm font-mono select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-soft-linen"></span>
          </span>
          <span>online</span>
        </span>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className={`w-9 h-9 rounded-lg bg-yellow-100 border-2 border-border-color flex items-center justify-center text-text shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 relative focus:outline-none cursor-pointer ${showNotifications ? 'bg-darkteal text-white' : 'hover:bg-yellow-green'
              }`}
            title="Notifications"
            aria-label="Notifications"
            aria-expanded={showNotifications}
          >
            <IconRenderer icon="/icon/notif.svg" alt="Notifications" className="w-5 h-5 object-contain" />
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-lg bg-cayenne text-darkteal font-mono font-black text-[9px] flex items-center justify-center border-2 border-border-color shadow-[1px_1px_0_var(--border-color)]">
              2
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-yellow-100 border-1 border-border-color rounded-xl shadow-hard-lg p-4 space-y-3 z-50 animate-in fade-in slide-in-from-top-3 duration-250" role="menu">
              <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-2">
                <span className="text-xs font-black text-darkteal font-head uppercase tracking-wider">Notifications</span>
                <button className="text-xs font-mono font-black text-darkteal hover:underline cursor-pointer">
                  Mark all read
                </button>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-yellow-green rounded-lg border-1 border-border-color hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer" role="menuitem">
                  <div className="font-bold text-black flex justify-between items-center">
                    <span>New Product Added</span>
                    <span className="text-xs text-black">Just now</span>
                  </div>
                  <div className="text-xs text-black mt-0.5 font-sans font-medium">CorelDraw 2026 was synced in catalog.</div>
                </div>
                <div className="p-2.5 bg-yellow-green rounded-lg border-1 border-border-color hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer" role="menuitem">
                  <div className="font-bold text-black flex justify-between items-center">
                    <span>Order Completed #ORD-1001</span>
                    <span className="text-xs text-black/60">2h ago</span>
                  </div>
                  <div className="text-xs text-black/80 mt-0.5 font-sans font-medium">Payment received for $29.00.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className={`flex items-center space-x-2 p-1.5 px-3 rounded-lg bg-darktealborder-2 border-black shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 focus:outline-none cursor-pointer ${showUserMenu ? 'bg-neo-cyan text-black' : 'hover:bg-neo-yellow'
              }`}
            aria-label="User menu"
            aria-expanded={showUserMenu}
          >
            <div className="w-6 h-6 rounded-lg bg-darkteal text-yellow-green flex items-center justify-center font-mono font-black text-xs border border-border-color shadow-[1px_1px_0_var(--border-color)] shrink-0">
              ⌗
            </div>
            <span className="text-xs font-mono font-black text-text hidden sm:inline">ADMIN</span>
            <span className="text-xs font-mono text-white" aria-hidden="true">▼</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-yellow-green border-2 border-border-color rounded-2xl shadow-hard-lg p-2 space-y-1 z-50 animate-in fade-in slide-in-from-top-3 duration-250 font-mono text-xs" role="menu">
              <div className="px-3 py-2 border-b-2 border-border-color/20 mb-1">
                <div className="text-lg font-black text-darkteal font-head">Galih</div>
                <div className="text-sm text-darkteal font-bold truncate">project@keratuli.site</div>
              </div>
              <Link
                href="/admin/settings"
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-darkteal hover:bg-yellow-green font-bold border border-transparent hover:border-border-color transition-all"
                role="menuitem"
              >
                <span>▶</span>
                <span>Account Settings</span>
              </Link>
              <Link
                href="/admin/tools"
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-darkteal hover:bg-cayenne font-bold border border-transparent hover:border-border-color transition-all"
                role="menuitem"
              >
                <span>▶</span>
                <span>Admin Tools</span>
              </Link>
              <div className="border-t border-border-color/20 my-1" />
              <Link
                href="/"
                className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-cayenne hover:bg-cayenne hover:text-white font-black border border-transparent hover:border-border-color transition-all"
                role="menuitem"
              >
                <span>□</span>
                <span>Log Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
