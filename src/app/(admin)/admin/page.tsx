'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatCard } from '@/components/admin/StatCard';
import { ProductTable } from '@/components/admin/ProductTable';
import { Button } from '@/components/ui/Button';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { AssetService } from '@/lib/asset-service';
import { AssetItem } from '@/types';

export default function AdminDashboardPage() {
  const [assets, setAssets] = useState<AssetItem[]>([]);

  useEffect(() => {
    setAssets(AssetService.getAll());
    const unsubscribe = AssetService.subscribe(() => {
      setAssets(AssetService.getAll());
    });
    return unsubscribe;
  }, []);

  const handleDelete = (id: string | number) => {
    AssetService.deleteAsset(id);
  };

  const handleTogglePremium = (id: string | number) => {
    AssetService.togglePremium(id);
  };

  const stats = AssetService.getStats();

  const categoryBreakdown = [
    { name: 'Design App', count: assets.filter((a) => a.category === 'design_app').length, color: 'bg-neo-yellow text-black', icon: 'public/icon/appssoftware.svg' },
    { name: 'Multimedia', count: assets.filter((a) => a.category === 'multimedia').length, color: 'bg-neo-pink text-white', icon: 'public/icon/multimedia.svg' },
    { name: 'Apk Package', count: assets.filter((a) => a.category === 'apk_package').length, color: 'bg-neo-cyan text-black', icon: 'public/icon/android.svg' },
    { name: 'Tools App', count: assets.filter((a) => a.category === 'tools_app').length, color: 'bg-neo-lime text-black', icon: 'public/icon/devtools.svg' },
    { name: 'Art & Graphics', count: assets.filter((a) => a.category === 'art_graphics').length, color: 'bg-neo-purple text-white', icon: 'public/icon/artgraphic.svg' },
  ];

  const quickActions = [
    { label: 'New Product', desc: 'Add a new asset', href: '/admin/products/new', icon: '/icon/button/add.svg', colorClass: 'bg-darkteal text-white' },
    { label: 'All Products', desc: 'Manage catalog', href: '/admin/products', icon: '/icon/button/all_product.svg', colorClass: 'bg-darkteal text-white' },
    { label: 'Cloud Mirrors', desc: 'View storage mirrors', href: '/admin/cloud', icon: '/icon/button/cloudmirror.svg', colorClass: 'bg-darkteal text-white' },
    { label: 'Public Site', desc: 'View live store', href: '/', icon: '/icon/button/publicsite.svg', colorClass: 'bg-darkteal text-white' },
  ];

  const recentActivity = [
    { action: 'Product synced', detail: 'CorelDraw 2026 Graphics Suite', time: 'Just now', color: 'bg-darkteal text-white' },
    { action: 'Vault catalog loaded', detail: `${assets.length} items active`, time: '1 min ago', color: 'bg-darkteal text-white' },
    { action: 'Order completed', detail: '#ORD-1001 — $29.00', time: '1 hour ago', color: 'bg-darkteal text-white' },
    { action: 'System check', detail: '100% VirusTotal Clean', time: '2 hours ago', color: 'bg-darkteal text-white' },
  ];

  return (
    <>
      <AdminHeader title="Admin Overview & Asset Management" />
      <main className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full text-text font-mono">

        {/* ── Section 1: Metric Overview Cards ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-mono font-black text-darkteal uppercase tracking-widest">Vault Dashboard Metrics</h2>
            </div>
            <span className="text-sm text-black bg-yellow-100 border-2 border-border-color px-2.5 py-1 rounded-xl shadow-hard-sm select-none">
              Sync Active
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard title="Total Product" value={stats.totalAssets} icon="public/icon/01total.svg" trend="12%" isPositive />
            <StatCard title="Total Downloads" value="24.5k" icon="public/icon/01download.svg" trend="8%" isPositive />
            <StatCard title="Total Revenue" value="$4,850" icon="public/icon/finance.svg" trend="24%" isPositive />
            <StatCard title="Pro Vault Assets" value={stats.premiumAssets} icon="public/icon/01coin.svg" trend="5%" isPositive />
          </div>
        </section>

        {/* ── Section 2: Quick Actions + Category Distribution + Activity ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Quick Action Shortcuts — 4 cols */}
          <div className="lg:col-span-4 bg-yellow-green border-2 border-border-color p-5 rounded-xl shadow-hard space-y-4">
            <div>
              <h3 className="text-md text-darkteal font-mono font-black uppercase tracking-widest flex items-center gap-5">
                <span>▶ Quick Actions</span>
              </h3>
              <p className="text-sm text-darkteal font-mono font-black uppercase tracking-widest flex items-center gap-5">++++++++++++++++++++++++++++++++++++++</p>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <div className={`flex items-center gap-3 p-3.5 border-2 border-border-color rounded-xl shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 cursor-pointer select-none ${action.colorClass}`}>
                    <div className="w-10 h-10 rounded-lg bg-white border-2 border-border-color flex items-center justify-center text-lg shrink-0 text-black shadow-hard-sm p-1.5 overflow-hidden">
                      <IconRenderer icon={action.icon} alt={action.label} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0 font-mono">
                      <div className="text-sm font-black uppercase">{action.label}</div>
                      <div className="text-xs opacity-90 truncate font-bold">{action.desc}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Category Breakdown — 4 cols */}
          <div className="lg:col-span-4 bg-yellow-100 border-2 border-border-color p-5 rounded-xl shadow-hard space-y-4">
            <div>
              <h3 className="text-xl font-mono font-black uppercase tracking-widest text-darkteal flex items-center gap-4">
                <IconRenderer icon="/icon/overview.svg" alt="Breakdown" className="w-4 h-4 object-contain" />
                <span>Filter</span>
              </h3>
              <p className="text-sm font-mono text-darkteal">Vault assets by category</p>
            </div>
            <div className="space-y-2.5 font-mono text-sm">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between p-3 bg-yellow-green border-2 border-border-color rounded-lg shadow-hard-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-border-color flex items-center justify-center p-1 overflow-hidden shrink-0">
                      <IconRenderer icon={cat.icon} alt={cat.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-black text-text uppercase text-sm">{cat.name}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-black border border-border-color shadow-[1px_1px_0_var(--border-color)] ${cat.color}`}>
                    {cat.count} items
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed — 4 cols */}
          <div className="lg:col-span-4 bg-yellow-100 border-2 border-border-color p-5 rounded-xl shadow-hard space-y-4">
            <div>
              <h3 className="text-lg font-mono font-black uppercase tracking-widest text-darkteal flex items-center gap-4">
                <span>▶ Recent System Activity</span>
              </h3>
              <p className="text-sm font-mono font-bold text-darkteal">Audit log & activity feed</p>
            </div>
            <div className="space-y-1 font-mono text-xs">
              {recentActivity.map((act, idx) => (
                <div key={idx} className="p-3 bg-yellow-green border-2 border-border-color rounded-lg shadow-hard-sm flex items-start space-x-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${act.color} border border-border-color shrink-0 mt-1`} />
                  <div className="min-w-0 flex-1">
                    <div className="font-black text-lg text-darkteal flex justify-between items-center">
                      <span className="uppercase text-sm">{act.action}</span>
                      <span className="text-sm text-text/60 font-bold">{act.time}</span>
                    </div>
                    <div className="text-sm text-darkteal font-mono font-medium mt-0.5 truncate">{act.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ── Section 3: Recent Asset Catalog Table ── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black uppercase font-mono text-text tracking-wide">
                Vault Product Assets ({assets.length})
              </h2>
              <p className="text-xs text-text/80 font-medium font-body">Manage, quick view, or edit items directly</p>
            </div>
            <Link href="/admin/products/new">
              <Button variant="primary" className="font-mono text-lg font-black uppercase bg-green-400 text-darkteal border-2 border-border-color shadow-hard-sm flex items-center gap-2">
                <span>+ CREATE NEW ASSET</span>
              </Button>
            </Link>
          </div>

          <ProductTable
            products={assets.slice(0, 8)}
            onDelete={handleDelete}
            onTogglePremium={handleTogglePremium}
          />
        </section>

      </main>
    </>
  );
}
