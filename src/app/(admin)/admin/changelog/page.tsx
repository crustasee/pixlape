'use client';

import React from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';

export default function AdminChangelogPage() {
  const changelog = [
    {
      version: 'v2.6.0',
      date: '2026-08-10',
      title: 'Admin UI/UX Main Website Design Sync & Live Catalog Reactive Store',
      changes: [
        'Synchronized entire Admin Panel UI/UX with the main website Neo-Brutalist design tokens (light background, surface cards, bold borders, hard shadows).',
        'Refactored ProductForm and ProductTable to connect reactively with AssetService, supporting live edits, deletes, creations, and localStorage persistence.',
        'Synchronized ProductForm specs (Markdown, requirements, icons, OS tags) directly with AssetDetailView public pages.',
      ],
    },
    {
      version: 'v2.5.0',
      date: '2026-08-03',
      title: 'Admin Dashboard Tools & Multi-Section Menu Upgrade',
      changes: [
        'Added Admin Tools & System Utilities page with cache clear and security audit tools.',
        'Structured sidebar menu into Main Menu, Tools & Utilities, and System Audit groups.',
        'Added interactive Header Search, Breadcrumbs, Notifications, and Profile dropdowns.',
      ],
    },
    {
      version: 'v2.4.0',
      date: '2026-08-01',
      title: 'Product Asset Management & Multi-Platform Filtering',
      changes: [
        'Added live search, category dropdowns, and free/premium filter.',
        'Integrated Quick Asset View Modal and Delete Confirmation Warning Modal.',
        'Added OS platform tags (Windows, macOS, Linux, CLI).',
      ],
    },
  ];

  return (
    <>
      <AdminHeader title="Audit Logs & System Changelog" breadcrumb={['Admin', 'Changelog']} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-4xl space-y-6 text-text font-body">
        {changelog.map((item) => (
          <div key={item.version} className="bg-yellow-green border-1 border-border-color p-6 rounded-2xl shadow-hard space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-border-color/20 pb-2">
              <div className="flex items-center space-x-2.5">
                <span className="px-2.5 py-1 bg-neo-yellow text-black font-mono text-xs rounded-md border border-border-color font-black shadow-[1.5px_1.5px_0_var(--border-color)]">
                  {item.version}
                </span>
                <h3 className="font-head font-black text-darkteal text-xl uppercase">{item.title}</h3>
              </div>
              <span className="text-sm font-mono font-bold text-darkteal">{item.date}</span>
            </div>
            <ul className="list-disc list-inside text-sm font-mono text-darkteal space-y-1.5 pl-2 font-medium">
              {item.changes.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    </>
  );
}
