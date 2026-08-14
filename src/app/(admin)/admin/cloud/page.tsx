'use client';

import React, { useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatCard } from '@/components/admin/StatCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { AssetService } from '@/lib/asset-service';
import { AssetItem } from '@/types';
import { CloudCard, CloudProvider } from '@/components/admin/CloudCard';

const DEFAULT_PROVIDERS: CloudProvider[] = [
  {
    id: 'gdrive',
    name: 'Google Drive',
    category: 'Primary Vault Mirror',
    icon: 'public/icon/gdrive.svg',
    status: 'connected',
    usedStorage: '420 GB',
    totalStorage: '2.0 TB',
    percentUsed: 21,
    speed: '1.2 GB/s',
    mirrorCount: 41,
    rootUrl: 'https://drive.google.com/drive/folders/modtrove_vault',
    color: 'bg-blue-400 text-black',
    badgeBg: 'bg-neo-yellow text-black',
  },
  {
    id: 'onedrive',
    name: 'Microsoft OneDrive',
    category: 'Enterprise Backup Mirror',
    icon: 'public/icon/onedrive.svg',
    status: 'connected',
    usedStorage: '310 GB',
    totalStorage: '1.0 TB',
    percentUsed: 31,
    speed: '950 MB/s',
    mirrorCount: 41,
    rootUrl: 'https://onedrive.live.com/?id=modtrove_vault',
    color: 'bg-white text-black',
    badgeBg: 'bg-white text-black',
  },
  {
    id: 'dropbox',
    name: 'Dropbox Pro',
    category: 'High-Speed CDN Sync',
    icon: 'public/icon/dropbox.svg',
    status: 'connected',
    usedStorage: '180 GB',
    totalStorage: '500 GB',
    percentUsed: 36,
    speed: '800 MB/s',
    mirrorCount: 41,
    rootUrl: 'https://dropbox.com/sh/modtrove_vault',
    color: 'bg-neo-pink text-white',
    badgeBg: 'bg-neo-pink text-white',
  },
  {
    id: 'mediafire',
    name: 'MediaFire',
    category: 'Direct Download Mirror',
    icon: 'public/icon/mediafire.svg',
    status: 'connected',
    usedStorage: '510 GB',
    totalStorage: '1.0 TB',
    percentUsed: 51,
    speed: '1.5 GB/s',
    mirrorCount: 38,
    rootUrl: 'https://mediafire.com/folder/modtrove_assets',
    color: 'bg-neo-lime text-black',
    badgeBg: 'bg-neo-lime text-black',
  },
  {
    id: 'mega',
    name: 'MEGA.nz Encrypted',
    category: 'Zero-Knowledge Encrypted Mirror',
    icon: 'public/icon/cloudtab.svg',
    status: 'connected',
    usedStorage: '290 GB',
    totalStorage: '1.0 TB',
    percentUsed: 29,
    speed: '1.1 GB/s',
    mirrorCount: 35,
    rootUrl: 'https://mega.nz/folder/modtrove_vault',
    color: 'bg-neo-purple text-white',
    badgeBg: 'bg-neo-purple text-white',
  },
  {
    id: 'amazons3',
    name: 'Amazon S3 Bucket',
    category: 'AWS Cloud Distribution CDN',
    icon: 'public/icon/cloudtab.svg',
    status: 'connected',
    usedStorage: '680 GB',
    totalStorage: '10.0 TB',
    percentUsed: 6.8,
    speed: '3.5 GB/s',
    mirrorCount: 41,
    rootUrl: 's3://us-east-1.amazonaws.com/modtrove-assets',
    color: 'bg-neo-yellow text-black',
    badgeBg: 'bg-neo-yellow text-black',
  },
  {
    id: 'cloudflare_r2',
    name: 'Cloudflare R2',
    category: 'Zero-Egress Object Storage',
    icon: 'public/icon/cloudtab.svg',
    status: 'connected',
    usedStorage: '410 GB',
    totalStorage: '5.0 TB',
    percentUsed: 8.2,
    speed: '4.0 GB/s',
    mirrorCount: 41,
    rootUrl: 'https://r2.pixlape.com/vault-mirrors',
    color: 'bg-neo-cyan text-black',
    badgeBg: 'bg-neo-cyan text-black',
  },
  {
    id: 'gcs',
    name: 'Google Cloud Storage',
    category: 'GCP Enterprise CDN',
    icon: 'public/icon/cloudtab.svg',
    status: 'connected',
    usedStorage: '350 GB',
    totalStorage: '5.0 TB',
    percentUsed: 7,
    speed: '3.2 GB/s',
    mirrorCount: 41,
    rootUrl: 'https://storage.googleapis.com/pixlape-vault',
    color: 'bg-neo-lime text-black',
    badgeBg: 'bg-neo-lime text-black',
  },
  {
    id: 'pcloud',
    name: 'pCloud Storage',
    category: 'Direct Web Mirror',
    icon: 'public/icon/cloudtab.svg',
    status: 'disconnected',
    usedStorage: '0 GB',
    totalStorage: '2.0 TB',
    percentUsed: 0,
    speed: '0 MB/s',
    mirrorCount: 0,
    rootUrl: 'https://pcloud.com/vault_mirror',
    color: 'bg-surface text-text',
    badgeBg: 'bg-surface text-text',
  },
];

export default function AdminCloudPage() {
  const [providers, setProviders] = useState<CloudProvider[]>(DEFAULT_PROVIDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Link Generator Tool State
  const [assets] = useState<AssetItem[]>(AssetService.getAll());
  const [selectedAssetId, setSelectedAssetId] = useState<number | string>(assets[0]?.id || 9);
  const [selectedProviderId, setSelectedProviderId] = useState<string>('gdrive');
  const [generatedLink, setGeneratedLink] = useState<string>('');
  const [copiedGeneratedLink, setCopiedGeneratedLink] = useState(false);

  // New Provider Form State
  const [newProvider, setNewProvider] = useState({
    name: '',
    category: 'Custom Cloud Mirror',
    totalStorage: '1.0 TB',
    rootUrl: '',
  });

  const handleSyncProvider = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setProviders((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'connected', mirrorCount: 41 } : p))
      );
      setSyncingId(null);
    }, 1500);
  };

  const handleToggleStatus = (id: string) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus = p.status === 'connected' ? 'disconnected' : 'connected';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  const handleUpdateProvider = (updated: CloudProvider) => {
    setProviders((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProvider = (id: string) => {
    setProviders((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  const handleGenerateMirror = () => {
    const asset = assets.find((a) => String(a.id) === String(selectedAssetId)) || assets[0];
    const provider = providers.find((p) => p.id === selectedProviderId) || providers[0];
    const fileName = `${asset.name.toLowerCase().replace(/\s+/g, '-')}_v${asset.version || '1.0'}.zip`;
    const mirror = `${provider.rootUrl}/${fileName}`;
    setGeneratedLink(mirror);
  };

  const handleAddProviderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProvider.name.trim()) return;

    const provider: CloudProvider = {
      id: `custom_${Date.now()}`,
      name: newProvider.name,
      category: newProvider.category || 'Custom Cloud Storage Mirror',
      icon: '🌩️',
      status: 'connected',
      usedStorage: '0 GB',
      totalStorage: newProvider.totalStorage || '1.0 TB',
      percentUsed: 0,
      speed: '1.0 GB/s',
      mirrorCount: 41,
      rootUrl: newProvider.rootUrl || 'https://cloud.storage/vault_mirror',
      color: 'bg-neo-cyan text-black',
      badgeBg: 'bg-neo-cyan text-black',
    };

    setProviders((prev) => [provider, ...prev]);
    setIsAddModalOpen(false);
    setNewProvider({ name: '', category: 'Custom Cloud Mirror', totalStorage: '1.0 TB', rootUrl: '' });
  };

  const filteredProviders = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConnectedCount = providers.filter((p) => p.status === 'connected').length;

  return (
    <>
      <AdminHeader title="Cloud Storage & Vault Mirrors" breadcrumb={['Admin', 'Cloud Storage']} />
      <main className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full text-text font-body">

        {/* ── Section 1: Metrics Overview Cards ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-mono font-black text-black bg-neo-lime border-2 border-border-color px-3 py-1 rounded-xl shadow-hard-sm select-none">
              ALL MIRRORS 100% HEALTHY
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard title="Connected Cloud Providers" value={`${activeConnectedCount} / ${providers.length}`} icon="public/icon/cloudprove.svg" trend="Active" isPositive />
            <StatCard title="Total Vault Storage Used" value="3.56 TB" icon="public/icon/folderblue.svg" trend="10.0 TB Total" isPositive />
            <StatCard title="Mirror Download Traffic" value="18.4k" icon="public/icon/cloudprove.svg" trend="High-Speed" isPositive />
            <StatCard title="Security Encryption" value="SSL / TLS 1.3" icon="public/icon/cloudsield.svg" trend="Verified" isPositive />
          </div>
        </section>

        {/* ── Section 2: Vault Direct Mirror Link Generator Tool ── */}
        <section className="bg-yellow-50 border-2 border-border-color p-6 rounded-2xl shadow-hard space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border-color/20 pb-4">
            <div>
              <h3 className="font-head font-black text-xl text-darkteal uppercase tracking-tight mt-1">
                Generate Direct Asset Cloud Mirror Links
              </h3>
              <p className="text-sm font-medium text-darkteal">
                Select a vault asset and cloud provider to instantly generate a direct download mirror link for users.
              </p>
            </div>

            <Button
              variant="primary"
              onClick={() => setIsAddModalOpen(true)}
              className="font-mono text-lg uppercase bg-yellow-green text-evergreen border-2 border-border-color shadow-hard-sm shrink-0"
            >+ ADD CLOUD PROVIDER
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end font-mono">
            <div className="sm:col-span-5 space-y-1">
              <label className="block text-sm font-black uppercase text-darkteal">1. Select Asset Product</label>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border-2 border-border-color rounded-xl text-xs font-black text-darkteal focus:outline-none shadow-hard-sm"
              >
                {assets.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.size})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-4 space-y-1">
              <label className="block text-sm font-black uppercase text-darkteal">2. Select Cloud Storage Mirror</label>
              <select
                value={selectedProviderId}
                onChange={(e) => setSelectedProviderId(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-border-color rounded-xl text-xs font-black text-darkteal focus:outline-none shadow-hard-sm"
              >
                {providers
                  .filter((p) => p.status === 'connected')
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.speed})
                    </option>
                  ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <Button
                variant="primary"
                onClick={handleGenerateMirror}
                className="w-1400px py-4 font-mono text-xl font-black uppercase bg-pink-300 text-evergreen border-2 border-border-color shadow-hard-sm"
              >GENERATE LINK
              </Button>
            </div>
          </div>

          {generatedLink && (
            <div className="p-4 bg-white border-2 border-border-color rounded-xl shadow-hard-sm flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase text-text/60 block">Direct Mirror Target URL:</span>
                <div className="text-xs font-bold text-neo-pink truncate mt-0.5">{generatedLink}</div>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={() => {
                  navigator.clipboard.writeText(generatedLink);
                  setCopiedGeneratedLink(true);
                  setTimeout(() => setCopiedGeneratedLink(false), 2500);
                }}
                className="font-mono text-xs font-black uppercase bg-neo-yellow text-black border-2 border-border-color shadow-[2px_2px_0_var(--border-color)] shrink-0"
              >
                {copiedGeneratedLink ? '✅ COPIED!' : '📋 COPY MIRROR LINK'}
              </Button>
            </div>
          )}
        </section>

        {/* ── Section 3: Cloud Storage Providers Cards Grid ── */}
        <section className="space-y-4">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProviders.map((provider) => (
              <CloudCard
                key={provider.id}
                provider={provider}
                isSyncing={syncingId === provider.id}
                copiedUrl={copiedUrl}
                onSync={handleSyncProvider}
                onToggleStatus={handleToggleStatus}
                onCopyLink={handleCopyLink}
                onUpdateProvider={handleUpdateProvider}
                onDeleteProvider={handleDeleteProvider}
              />
            ))}
          </div>
        </section>

        {/* Modal: Add New Cloud Provider */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Connect New Cloud Storage Provider"
        >
          <form onSubmit={handleAddProviderSubmit} className="space-y-4 font-mono text-xs text-text">
            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">Provider Name *</label>
              <Input
                placeholder="e.g. MediaFire Pro Vault or Box Business"
                value={newProvider.name}
                onChange={(e) => setNewProvider({ ...newProvider, name: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">Mirror Category</label>
              <Input
                placeholder="e.g. Direct High-Speed Download Mirror"
                value={newProvider.category}
                onChange={(e) => setNewProvider({ ...newProvider, category: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">Allocated Storage Limit</label>
              <Input
                placeholder="e.g. 2.0 TB"
                value={newProvider.totalStorage}
                onChange={(e) => setNewProvider({ ...newProvider, totalStorage: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">Root Folder / Mirror URL</label>
              <Input
                placeholder="https://drive.google.com/drive/folders/your_folder_id"
                value={newProvider.rootUrl}
                onChange={(e) => setNewProvider({ ...newProvider, rootUrl: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="neutral"
                onClick={() => setIsAddModalOpen(false)}
                className="font-mono text-xs font-black uppercase"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="font-mono text-xs font-black uppercase bg-neo-pink text-white border-2 border-border-color shadow-hard-sm"
              >
                + SAVE CONNECTION
              </Button>
            </div>
          </form>
        </Modal>

      </main>
    </>
  );
}
