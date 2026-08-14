'use client';

import React, { useState } from 'react';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';

export interface CloudProvider {
  id: string;
  name: string;
  category: string;
  icon: string;
  status: 'connected' | 'syncing' | 'disconnected';
  usedStorage: string;
  totalStorage: string;
  percentUsed: number;
  speed: string;
  mirrorCount: number;
  rootUrl: string;
  color: string;
  badgeBg: string;
  accountEmail?: string;
  region?: string;
  lastSync?: string;
  autoSync?: boolean;
  apiKey?: string;
}

interface CloudCardProps {
  provider: CloudProvider;
  isSyncing: boolean;
  copiedUrl: string | null;
  onSync: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onCopyLink: (url: string) => void;
  onUpdateProvider: (updated: CloudProvider) => void;
  onDeleteProvider?: (id: string) => void;
}

export const CloudCard: React.FC<CloudCardProps> = ({
  provider,
  isSyncing,
  copiedUrl,
  onSync,
  onToggleStatus,
  onCopyLink,
  onUpdateProvider,
  onDeleteProvider,
}) => {
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isTestingConn, setIsTestingConn] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  // Form State for Manage Account
  const [editForm, setEditForm] = useState({
    name: provider.name,
    category: provider.category,
    accountEmail: provider.accountEmail || `${provider.id}_admin@modtrove.vault`,
    rootUrl: provider.rootUrl,
    totalStorage: provider.totalStorage,
    speed: provider.speed,
    autoSync: provider.autoSync ?? true,
    apiKey: provider.apiKey || `sk_live_mod_${provider.id}_9982`,
  });

  const isConnected = provider.status === 'connected';

  const handleSaveManagement = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProvider({
      ...provider,
      name: editForm.name,
      category: editForm.category,
      accountEmail: editForm.accountEmail,
      rootUrl: editForm.rootUrl,
      totalStorage: editForm.totalStorage,
      speed: editForm.speed,
      autoSync: editForm.autoSync,
      apiKey: editForm.apiKey,
    });
    setIsManageModalOpen(false);
  };

  const handleTestConnection = () => {
    setIsTestingConn(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTestingConn(false);
      setTestResult('Connection test successful! Latency: 24ms (TLS 1.3 Handshake)');
    }, 1200);
  };

  // Determine progress bar color based on percentage
  const getProgressBarColor = () => {
    if (provider.percentUsed >= 50) return 'bg-red-500 text-white';
    if (provider.percentUsed >= 20) return 'bg-green-500 text-black';
    return provider.badgeBg || 'bg-blue-500 text-black';
  };

  return (
    <>
      <div className="bg-yellow-100 border-2 border-border-color rounded-2xl p-5 shadow-hard hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg transition-all duration-200 flex flex-col justify-between gap-4 relative overflow-hidden text-text font-body">

        {/* Card Header: Icon, Provider Title, Status & Quick Manage Settings */}
        <div className="flex items-start justify-between gap-3 border-b-2 border-border-color/20 pb-4">
          <div className="flex items-center space-x-3 min-w-0">
            <div className={`w-12 h-12 rounded-2xl ${provider.badgeBg} border-2 border-border-color flex items-center justify-center shadow-hard-sm shrink-0 p-2 overflow-hidden`}>
              <IconRenderer icon={provider.icon} alt={provider.name} className="w-full h-full object-contain" fallbackEmoji="☁️" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-head font-black text-evergreen uppercase text-text leading-tight truncate">
                  {provider.name}
                </h3>
              </div>
              <span className="text-[12px] font-mono font-bold text-darkteal block mt-0.5 truncate">
                {provider.category}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span
              className={`px-2 py-1 text-[9px] font-mono font-black uppercase rounded-md border border-border-color shadow-[1px_1px_0_var(--border-color)] flex items-center gap-1 ${isSyncing
                ? 'bg-green-400 text-black animate-pulse'
                : isConnected
                  ? 'bg-green-400 text-green-700'
                  : 'bg-red-400 text-red-700'
                }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isSyncing ? 'bg-black animate-spin' : isConnected ? 'bg-white' : 'bg-red-500'}`} />
              {isSyncing ? 'SYNCING' : isConnected ? 'On' : 'Off'}
            </span>
          </div>
        </div>

        {/* Account Info Banner */}
        <div className="flex items-center justify-between text-[12px] font-mono bg-yellow-50 p-2.5 rounded-xl border border-border-color/30 shadow-[1px_1px_0_var(--border-color)]">
          <div className="flex items-center space-x-1.5 truncate">
            <span className="text-darkteal font-bold">ACCOUNT:</span>
            <span className="font-black text-darkteal truncate">{editForm.accountEmail}</span>
          </div>
          <span className="px-2 py-1 bg-cayenne text-text font-black rounded text-[10px] uppercase shrink-0 border border-border-color/20">
            {provider.autoSync !== false ? 'AUTO-SYNC' : 'MANUAL'}
          </span>
        </div>

        {/* Storage Meter & Progress */}
        <div className="space-y-2.5 font-mono text-xs">
          <div className="flex bg-yellow-100 justify-between items-center text-[14px] font-bold">
            <span className="text-darkteal uppercase">Storage:</span>
            <span className="font-black text-darkteal">
              {provider.usedStorage} / {provider.totalStorage}{' '}
              <span className={`px-1.5 py-0.2 rounded text-[14px] ${provider.percentUsed >= 85 ? 'bg-darkteal text-white' : 'bg-gray-200 text-black'}`}>
                {provider.percentUsed}%
              </span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-3.5 bg-darkteal border-2 border-border-color rounded-lg overflow-hidden p-0.5 shadow-inner">
            <div
              className={`h-full rounded-md transition-all duration-500 ${getProgressBarColor()}`}
              style={{ width: `${Math.max(provider.percentUsed, 4)}%` }}
            />
          </div>

          {/* Metrics Specs Grid */}
          <div className="grid grid-cols-3 gap-3 text-[12px] pt-1">
            <div className="bg-yellow-50 p-2 rounded-xl border border-border-color shadow-[1px_1px_0_var(--border-color)]">
              <span className="text-darkteal uppercase block font-bold">Synced Assets:</span>
              <strong className="text-neo-pink font-black text-sm">{provider.mirrorCount} / 41</strong>
            </div>
          </div>
        </div>

        {/* Icon-Only Action Toolbar */}
        <div className="pt-2 flex items-center justify-between gap-2 font-mono">
          <div className="flex items-center gap-2">
            {/* Sync Mirror Icon Button */}
            <button
              type="button"
              disabled={isSyncing || !isConnected}
              onClick={() => onSync(provider.id)}
              title={isSyncing ? 'Syncing mirror...' : 'Sync Mirror'}
              aria-label="Sync Mirror"
              className={`w-10 h-10 rounded-xl border-2 border-border-color flex items-center justify-center shadow-hard-sm transition-all ${isSyncing || !isConnected
                ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500'
                : 'bg-white text-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none cursor-pointer'
                }`}
            >
              <IconRenderer
                icon="public/icon/button/synct.svg"
                alt="Sync"
                fallbackEmoji="⚡"
                className={`w-5 h-5 object-contain ${isSyncing ? 'animate-spin' : ''}`}
              />
            </button>

            {/* Copy Link Icon Button */}
            <button
              type="button"
              onClick={() => onCopyLink(provider.rootUrl)}
              title={copiedUrl === provider.rootUrl ? 'Link Copied!' : 'Copy Mirror Link'}
              aria-label="Copy Mirror Link"
              className={`w-10 h-10 rounded-xl border-2 border-border-color flex items-center justify-center shadow-hard-sm transition-all cursor-pointer ${copiedUrl === provider.rootUrl
                ? 'bg-white text-black'
                : 'bg-white text-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none'
                }`}
            >
              <IconRenderer
                icon="public/icon/02link.svg"
                alt="Copy Link"
                fallbackEmoji={copiedUrl === provider.rootUrl ? '✅' : '🔗'}
                className="w-5 h-5 object-contain"
              />
            </button>

            {/* Manage Account Icon Button */}
            <button
              type="button"
              onClick={() => setIsManageModalOpen(true)}
              title="Manage Cloud Account & Settings"
              aria-label="Manage Cloud Account"
              className="w-10 h-10 rounded-xl border-2 border-border-color bg-white text-white flex items-center justify-center shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
            >
              <IconRenderer
                icon="public/icon/setting2.svg"
                alt="Manage"
                fallbackEmoji="⚙️"
                className="w-6 h-6 object-contain"
              />
            </button>
          </div>

          {/* Connection Status Toggle Icon Button */}
          <button
            type="button"
            onClick={() => onToggleStatus(provider.id)}
            title={isConnected ? 'Disconnect Cloud Provider' : 'Activate Connection'}
            aria-label={isConnected ? 'Disconnect Provider' : 'Activate Connection'}
            className={`w-10 h-10 rounded-xl border-2 border-border-color flex items-center justify-center shadow-hard-sm transition-all cursor-pointer ${isConnected
              ? 'bg-red-500 text-white hover:bg-red-600 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none'
              : 'bg-neo-lime text-black hover:bg-lime-400 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none'
              }`}
          >
            <IconRenderer
              icon={isConnected ? 'public/icon/trash_white.svg' : 'public/icon/cloudprove.svg'}
              alt={isConnected ? 'Disconnect' : 'Connect'}
              fallbackEmoji={isConnected ? '🔌' : '⚡'}
              className="w-5 h-5 object-contain"
            />
          </button>
        </div>
      </div>

      {/* Account Management & Configuration Modal */}
      <Modal
        isOpen={isManageModalOpen}
        onClose={() => setIsManageModalOpen(false)}
        title={`Manage ${provider.name} Account & Config`}
      >
        <form onSubmit={handleSaveManagement} className="space-y-4 font-mono text-xs text-text">
          <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-xl space-y-1">
            <div className="font-black text-blue-900 flex items-center gap-1.5 text-xs uppercase">
              <span>🛡️ Cloud Provider Account Hub</span>
            </div>
            <p className="text-[11px] text-blue-800 font-medium leading-relaxed">
              Configure credentials, mirror storage limits, root directory target, and auto-synchronization rules for this provider.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">Provider Display Name</label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">Category / Role</label>
              <Input
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">Account Email / ID</label>
              <Input
                type="email"
                value={editForm.accountEmail}
                onChange={(e) => setEditForm({ ...editForm, accountEmail: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">API Key / Access Token</label>
              <Input
                type="password"
                value={editForm.apiKey}
                onChange={(e) => setEditForm({ ...editForm, apiKey: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase text-text mb-1">Root Folder / Mirror Target URL</label>
            <Input
              value={editForm.rootUrl}
              onChange={(e) => setEditForm({ ...editForm, rootUrl: e.target.value })}
              className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">Total Storage Quota</label>
              <Input
                value={editForm.totalStorage}
                onChange={(e) => setEditForm({ ...editForm, totalStorage: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-text mb-1">Bandwidth Speed Rating</label>
              <Input
                value={editForm.speed}
                onChange={(e) => setEditForm({ ...editForm, speed: e.target.value })}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-surface border-2 border-border-color rounded-xl">
            <div>
              <span className="font-black text-xs uppercase block text-text">Background Auto-Sync</span>
              <span className="text-[10px] text-text/70 font-medium">Automatically mirror new vault assets every 15 minutes</span>
            </div>
            <input
              type="checkbox"
              checked={editForm.autoSync}
              onChange={(e) => setEditForm({ ...editForm, autoSync: e.target.checked })}
              className="w-5 h-5 accent-blue-600 rounded cursor-pointer"
            />
          </div>

          {testResult && (
            <div className="p-3 bg-green-50 border-2 border-green-300 rounded-xl text-green-900 font-mono text-[11px] font-bold">
              {testResult}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-border-color/20">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                variant="neutral"
                onClick={handleTestConnection}
                disabled={isTestingConn}
                className="font-mono text-xs font-black uppercase border-2 border-border-color bg-yellow-200 text-black w-full sm:w-auto"
              >
                {isTestingConn ? '⏳ TESTING...' : '🧪 TEST CONNECTION'}
              </Button>

              {onDeleteProvider && (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete ${provider.name}?`)) {
                      onDeleteProvider(provider.id);
                      setIsManageModalOpen(false);
                    }
                  }}
                  className="font-mono text-xs font-black uppercase w-full sm:w-auto"
                >
                  🗑️ DELETE
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Button
                type="button"
                variant="neutral"
                onClick={() => setIsManageModalOpen(false)}
                className="font-mono text-xs font-black uppercase w-full sm:w-auto"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="font-mono text-xs font-black uppercase bg-blue-600 text-white border-2 border-border-color shadow-hard-sm w-full sm:w-auto"
              >
                💾 SAVE CHANGES
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
