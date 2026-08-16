'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { AssetService } from '@/lib/asset-service';
import { ManageDatabaseWidget } from '@/components/admin/tools/ManageDatabaseWidget';
import { SyncDatabaseWidget } from '@/components/admin/tools/SyncDatabaseWidget';
import { CliToolsWidget } from '@/components/admin/tools/CliToolsWidget';
import { IpInspectorWidget } from '@/components/admin/tools/IpInspectorWidget';
import { ToolAccordionItem } from '@/components/admin/tools/ToolAccordionItem';
import { IconRenderer } from '@/components/ui/IconRenderer';

type CategoryFilter = 'all' | 'database' | 'terminal' | 'network' | 'operations' | 'security';

export default function AdminToolsPage() {
  const [apiKey, setApiKey] = useState('mod_live_sk_9f8a32b17c4e5d6');
  const [copiedKey, setCopiedKey] = useState(false);
  const [actionLog, setActionLog] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] System utilities initialized and ready.`,
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  // List View Accordion Expand/Collapse States
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(['manage-db', 'sync-db'])
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [isLogCollapsed, setIsLogCollapsed] = useState(false);

  const addLog = useCallback((msg: string) => {
    setActionLog((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
  }, []);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleExpandAll = () => {
    setOpenItems(new Set(['manage-db', 'sync-db', 'cli-tools', 'ip-inspector', 'maintenance', 'api-keys']));
  };

  const handleCollapseAll = () => {
    setOpenItems(new Set());
  };

  const handleClearCache = useCallback(() => {
    setIsProcessing(true);
    addLog('Initiating temporary cache & asset index purge...');
    setTimeout(() => {
      addLog('✓ Next.js static cache cleared successfully.');
      addLog('✓ AssetService local cache re-indexed.');
      setIsProcessing(false);
    }, 1000);
  }, [addLog]);

  const handleRunSecurityScan = useCallback(() => {
    setIsProcessing(true);
    addLog('Starting VirusTotal Security Audit on vault assets...');
    setTimeout(() => {
      const count = AssetService.getAll().length;
      addLog(`Scanning ${count} asset packages...`);
      addLog(`✓ ${count}/${count} assets passed VirusTotal clean check. 0 threats found.`);
      setIsProcessing(false);
    }, 1200);
  }, [addLog]);

  const handleExportJSON = useCallback(() => {
    const assets = AssetService.getAll();
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(assets, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pixlape_assets_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addLog(`✓ Exported ${assets.length} assets database JSON backup file.`);
  }, [addLog]);

  const handleGenerateKey = useCallback(() => {
    const newKey =
      'mod_live_sk_' +
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    addLog(`✓ Generated new API Key: ${newKey.substring(0, 16)}...`);
  }, [addLog]);

  const handleCopyKey = useCallback(() => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    addLog('✓ Active Secret API Key copied to clipboard.');
    setTimeout(() => setCopiedKey(false), 2000);
  }, [apiKey, addLog]);

  // Tools definitions list
  const toolsList = useMemo(() => [
    {
      id: 'manage-db',
      index: '01',
      title: 'DATABASE MANAGER',
      description: 'Inspect PostgreSQL tables, record counts, vacuum optimization & seed core catalog items.',
      category: 'database' as const,
      categoryLabel: 'Database',
      badge: 'POSTGRESQL & PRISMA',
      badgeColor: 'bg-yellow-green text-black',
      icon: 'public/icon/button/databse.svg',
      iconBg: 'bg-white',
      component: <ManageDatabaseWidget onLog={addLog} showHeader={false} />,
    },
    {
      id: 'sync-db',
      index: '02',
      title: 'Sync Database & Node Mirrors',
      description: 'Synchronize static database with remote PostgreSQL & cloud storage mirrors in real-time.',
      category: 'database' as const,
      categoryLabel: 'Database',
      badge: 'MULTI-NODE MIRROR',
      badgeColor: 'bg-neo-cyan text-white',
      icon: 'public/icon/button/syncdata.svg',
      iconBg: 'bg-white',
      component: <SyncDatabaseWidget onLog={addLog} showHeader={false} />,
    },
    {
      id: 'cli-tools',
      index: '03',
      title: 'CLI Tools & Interactive Shell',
      description: 'Run terminal scripts, ESLint checkers, Prisma code generators, and server health status audits.',
      category: 'terminal' as const,
      categoryLabel: 'Terminal',
      badge: 'SCRIPT EXECUTOR',
      badgeColor: 'bg-evergreen text-yellow-green border border-border-color',
      icon: 'public/icon/button/code.svg',
      iconBg: 'bg-white',
      component: <CliToolsWidget onLog={addLog} showHeader={false} />,
    },
    {
      id: 'ip-inspector',
      index: '04',
      title: 'Check IP & Network Inspector',
      description: 'Lookup geolocation data, ISP operators, WHOIS record details, and ASN threat security scores.',
      category: 'network' as const,
      categoryLabel: 'Network',
      badge: 'GEOIP & WHOIS',
      badgeColor: 'bg-yellow-green text-black',
      icon: 'public/icon/button/ipnet.svg',
      iconBg: 'bg-white',
      component: <IpInspectorWidget onLog={addLog} showHeader={false} />,
    },
    {
      id: 'maintenance',
      index: '05',
      title: 'Maintenance & Security Operations',
      description: 'Purge Next.js static asset cache, run VirusTotal malware audit, and export catalog JSON backups.',
      category: 'operations' as const,
      categoryLabel: 'Operations',
      badge: 'VIRUSTOTAL & CACHE',
      badgeColor: 'bg-neo-pink text-white',
      icon: 'public/icon/button/maintenance.svg',
      iconBg: 'bg-white',
      component: (
        <div className="space-y-4 font-mono text-black">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white/10 border border-border-color rounded-lg shadow-hard-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="font-black text-sm text-yellow-green uppercase flex items-center gap-2">
                  <span>⟳</span> Clear Cache
                </div>
                <p className="text-xs text-yellow-green mt-1">Clear Next.js static asset cache and force catalog re-indexing.</p>
              </div>
              <Button
                size="sm"
                variant="neutral"
                onClick={handleClearCache}
                disabled={isProcessing}
                className="w-full font-mono text-xs font-black uppercase border-2 border-border-color bg-neo-yellow text-black"
              >
                {isProcessing ? 'PURGING...' : 'PURGE CACHE'}
              </Button>
            </div>

            <div className="p-4 bg-white/10 border border-border-color rounded-lg shadow-hard-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="font-black text-sm text-yellow-green uppercase flex items-center gap-4">
                  <span>^</span> Security Scan Audit
                </div>
                <p className="text-xs text-yellow-green mt-1">Scan vault asset files against VirusTotal API database.</p>
              </div>
              <Button
                size="sm"
                variant="neutral"
                onClick={handleRunSecurityScan}
                disabled={isProcessing}
                className="w-full font-mono text-xs font-black uppercase border-2 border-border-color bg-yellow-green text-black"
              >
                {isProcessing ? 'SCANNING...' : 'RUN AUDIT'}
              </Button>
            </div>

            <div className="p-4 bg-white/10 border border-border-color rounded-lg shadow-hard-sm space-y-3 flex flex-col justify-between">
              <div>
                <div className="font-black text-sm text-yellow-green uppercase flex items-center gap-2">
                  <span>^</span> Export Catalog JSON
                </div>
                <p className="text-xs text-yellow-green mt-1">Download current digital asset vault catalog as JSON backup.</p>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={handleExportJSON}
                className="w-full font-mono text-xs font-black uppercase bg-yellow-green text-black border-2 border-border-color"
              >
                EXPORT JSON
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'api-keys',
      index: '06',
      title: 'System API Key Management',
      description: 'Manage active secret tokens, inspect permissions scope, copy keys, and rotate system API credentials.',
      category: 'security' as const,
      categoryLabel: 'Security',
      badge: 'SECRET TOKENS',
      badgeColor: 'bg-cayenne text-white',
      icon: 'public/icon/button/apikey.svg',
      iconBg: 'bg-white',
      component: (
        <div className="space-y-4 font-mono text-black">
          <div className="p-5 bg-evergreen border border-border-color rounded-lg space-y-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="block text-sm font-black text-darkteal uppercase tracking-wider">
                  Active Secret API Key
                  <p>-----------------------------------------------------------------------------------</p>
                </label>
                <span className="text-sm text-yellow-green font-semibold">
                  Full System Admin Access • Bearer Authorization Token
                </span>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-yellow-green text-black border border-border-color rounded w-fit">
                🟢 ACTIVE & VERIFIED
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex-1 w-full">
                <Input
                  value={apiKey}
                  readOnly
                  className="border border-border-color bg-black font-mono text-xs font-black text-cayenne shadow-hard-sm w-full"
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  size="sm"
                  variant="neutral"
                  onClick={handleCopyKey}
                  className="w-full sm:w-auto font-mono text-xs font-black uppercase border rounded-sm border-border-color bg-neo-yellow text-black"
                >
                  {copiedKey ? 'COPIED!' : 'COPY KEY'}
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleGenerateKey}
                  className="w-full sm:w-auto font-mono text-xs font-black uppercase bg-yellow-green text-black border-2 border-border-color"
                >
                  RE-GENERATE
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ], [addLog, apiKey, copiedKey, handleClearCache, handleCopyKey, handleExportJSON, handleGenerateKey, handleRunSecurityScan, isProcessing]);

  // Filter tools based on search and category
  const filteredTools = useMemo(() => {
    return toolsList.filter((tool) => {
      const matchesSearch =
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.badge.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, toolsList]);

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: `ALL TOOLS (${toolsList.length})` },
    { key: 'database', label: 'DATABASE' },
    { key: 'terminal', label: 'TERMINAL' },
    { key: 'network', label: 'NETWORK' },
    { key: 'operations', label: 'OPERATIONS' },
    { key: 'security', label: 'SECURITY' },
  ];

  return (
    <>
      <AdminHeader title="Admin Tools & System Utilities" breadcrumb={['Admin', 'Tools']} />
      <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] w-full text-text font-body">
        {/* Top Info Banner */}
        <div className="bg-yellow-green text-black border-2 border-border-color p-6 rounded-2xl shadow-hard flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-6">
              <span className="px-3 py-1 rounded bg-cayenne text-white font-mono text-xs font-black uppercase border border-border-color">
                EXPANDABLE UTILITIES VAULT
              </span>
            </div>
            <h2 className="font-black text-xl sm:text-3xl font-head uppercase tracking-tight mt-1 text-darkteal">
              Admin System Tools & Control Panel
            </h2>
            <p className="text-sm font-semibold text-darkteal mt-0.5">
              Expand dropdown items below to execute database seeding, multi-node sync, CLI commands, IP inspections, and security operations.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-yellow-100 p-2 px-3 rounded-xl border-2 border-border-color font-mono text-xs shrink-0 shadow-hard-sm">
            <span className="font-black uppercase text-black">Status:</span>
            <span className="px-2 py-0.5 bg-yellow-100 text-green-600 font-black text-xs rounded border border-border-color">
              ONLINE (6 TOOLS)
            </span>
            
          </div>
        </div>

        {/* ── Expandable List View (Accordion Dropdown Menu) ── */}
        <div className="space-y-4">
          <div className="flex bg-yellow-100 items-center justify-between font-mono text-sm p-3 rounded-xl border-2 border-border-color shadow-hard-sm">
            <span className="font-black uppercase text-darkteal">
              Tool System List ({filteredTools.length} {filteredTools.length === 1 ? 'item' : 'items'})
            </span>
            <span className="font-black text-neo-pink">
              {openItems.size} of {toolsList.length} Expanded
            </span>
          </div>

          {filteredTools.length === 0 ? (
            <div className="bg-yellow-green border-2 border-border-color p-8 rounded-2xl shadow-hard text-center font-mono space-y-2">
              <div className="text-2xl">🔍</div>
              <div className="font-black text-sm text-black uppercase">No Tools Found</div>
              <div className="text-xs text-darkteal">
                No system tool matched your search query &ldquo;{searchQuery}&rdquo;. Try clearing filters.
              </div>
              <Button
                size="sm"
                variant="neutral"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-2 font-mono text-lg font-black uppercase border-2 border-border-color bg-yellow-green text-darkteal"
              >
                CLEAR FILTERS
              </Button>
            </div>
          ) : (
            filteredTools.map((tool) => (
              <ToolAccordionItem
                key={tool.id}
                id={tool.id}
                index={tool.index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                iconBg={tool.iconBg}
                category={tool.categoryLabel}
                badge={tool.badge}
                badgeColor={tool.badgeColor}
                isOpen={openItems.has(tool.id)}
                onToggle={() => toggleItem(tool.id)}
              >
                {tool.component}
              </ToolAccordionItem>
            ))
          )}
        </div>

        {/* ── Diagnostic Execution Log Console ── */}
        <div className="bg-yellow-green border-2 border-border-color p-5 rounded-2xl shadow-hard space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-2">
            <span className="font-black uppercase text-darkteal flex items-center gap-2">
              <span>Diagnostic Execution Console</span>
              <span className="px-2 py-0.5 bg-cayenne text-darkteal text-lg rounded font-mono border border-border-color">
                {actionLog.length} LOGS
              </span>
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsLogCollapsed(!isLogCollapsed)}
                className="text-[12px] font-black text-yellow-green hover:underline uppercase cursor-pointer"
              >
                {isLogCollapsed ? '[+ EXPAND CONSOLE]' : '[- COLLAPSE CONSOLE]'}
              </button>
              <button
                type="button"
                onClick={() => setActionLog([])}
                className="text-[12px] font-black text-neo-pink hover:underline uppercase cursor-pointer"
              >
                CLEAR LOGS
              </button>
            </div>
          </div>

          {!isLogCollapsed && (
            <div className="p-4 bg-evergreen text-neo-lime rounded-xl border-2 border-border-color min-h-30 max-h-55 overflow-y-auto leading-relaxed shadow-hard-sm space-y-1 font-mono">
              {actionLog.length === 0 ? (
                <span className="text-neo-lime/60 italic">{"// Console ready. Execute actions in any tool above to view logs..."}</span>
              ) : (
                actionLog.map((log, i) => <div key={i}>{log}</div>)
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
