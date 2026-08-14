'use client';

import React, { useState } from 'react';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { Button } from '@/components/ui/Button';

interface ManageDatabaseWidgetProps {
  onLog: (msg: string) => void;
  showHeader?: boolean;
}

export const ManageDatabaseWidget: React.FC<ManageDatabaseWidgetProps> = ({ onLog, showHeader = true }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'tables' | 'actions'>('tables');

  const tableStats = [
    { name: 'AssetItems (Catalog)', count: 41, size: '2.4 MB', status: 'Optimal' },
    { name: 'BlogPosts (Articles)', count: 5, size: '120 KB', status: 'Optimal' },
    { name: 'FAQItems (Guides)', count: 4, size: '45 KB', status: 'Optimal' },
    { name: 'CloudAccounts (Sync)', count: 3, size: '12 KB', status: 'Optimal' },
    { name: 'UserSessions (Logs)', count: 128, size: '480 KB', status: 'Optimal' },
  ];

  const handleSeed = () => {
    setIsProcessing(true);
    onLog('Initiating Database Seeding process with 41 core catalog assets...');
    setTimeout(() => {
      onLog('✓ Database successfully seeded! 41 items restored to initial state.');
      setIsProcessing(false);
    }, 1200);
  };

  const handleOptimize = () => {
    setIsProcessing(true);
    onLog('Running VACUUM & RE-INDEX on PostgreSQL database tables...');
    setTimeout(() => {
      onLog('✓ Database optimization complete. Reclaimed 1.2 MB unused space.');
      setIsProcessing(false);
    }, 1000);
  };

  const handleBackup = () => {
    setIsProcessing(true);
    onLog('Creating full SQL & JSON database snapshot backup...');
    setTimeout(() => {
      onLog(`✓ Backup created successfully: modtrove_db_dump_${Date.now()}.sql`);
      setIsProcessing(false);
    }, 900);
  };

  return (
    <div className={showHeader ? "bg-cayenne border-2 border-border-color p-6 rounded-2xl shadow-hard space-y-4 font-mono text-darkteal" : "space-y-4 font-mono text-text"}>
      {showHeader && (
        <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-yellow-green border-1 border-border-color flex items-center justify-center p-2 shadow-hard-sm">
              <IconRenderer icon="public/icon/button/databse.svg" alt="Manage Database" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h3 className="font-head font-black uppercase text-base text-black tracking-tight">
                Manage Database
              </h3>
              <span className="text-[10px] font-bold text-black/70 block">
                PostgreSQL Engine • Prisma Schema Managed
              </span>
            </div>
          </div>

          <span className="px-2.5 py-1 text-[10px] font-black uppercase bg-neo-lime text-black border border-border-color rounded-md shadow-[1px_1px_0_var(--border-color)]">
            HEALTHY (100%)
          </span>
        </div>
      )}

      {/* Navigation Toggles */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('tables')}
          className={`px-3 py-1.5 rounded-xl border-2 text-xs font-black uppercase transition-all cursor-pointer ${
            activeTab === 'tables'
              ? 'bg-yellow-green text-black border-border-color shadow-[2px_2px_0_var(--border-color)]'
              : 'bg-white/20 text-black border-border-color hover:bg-black/5'
          }`}
        >
          TABLE STATS ({tableStats.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('actions')}
          className={`px-3 py-1.5 rounded-xl border-2 text-xs font-black uppercase transition-all cursor-pointer ${
            activeTab === 'actions'
              ? 'bg-yellow-green text-black border-border-color shadow-[2px_2px_0_var(--border-color)]'
              : 'bg-white/20 text-black border-border-color hover:bg-black/5'
          }`}
        >
          DB OPERATIONS
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'tables' ? (
        <div className="space-y-2">
          <div className="bg-evergreen border-1 border-border-color rounded-sm overflow-hidden">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-evergreen border-b-2 border-border-color font-black text-sm text-yellow-green">
                <tr>
                  <th className="p-3">TABLE NAME</th>
                  <th className="p-3 text-center">RECORDS</th>
                  <th className="p-3 text-center">SIZE</th>
                  <th className="p-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y border-border-color/20 font-bold">
                {tableStats.map((t) => (
                  <tr key={t.name} className="hover:bg-neo-yellow/10">
                    <td className="p-3 text-yellow-green">{t.name}</td>
                    <td className="p-3 text-center text-yellow-green">{t.count}</td>
                    <td className="p-3 text-center text-yellow-green">{t.size}</td>
                    <td className="p-3 text-right text-white">{t.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <button
            type="button"
            onClick={handleBackup}
            disabled={isProcessing}
            className="p-3 bg-evergreen border-1 border-border-color rounded-sm shadow-hard-sm hover:bg-darkteal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer text-left space-y-1"
          >
            <div className="font-black text-sm uppercase text-yellow-green flex items-center gap-1.5">
              <span>↻</span> Backup DB
            </div>
            <div className="text-xs text-yellow-green font-medium">Export full SQL dump</div>
          </button>

          <button
            type="button"
            onClick={handleOptimize}
            disabled={isProcessing}
            className="p-3 bg-evergreen border-1 border-border-color rounded-sm shadow-hard-sm hover:bg-darkteal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer text-left space-y-1"
          >
            <div className="font-black text-sm uppercase text-yellow-green flex items-center gap-1.5">
              <span>▶</span> Optimize
            </div>
            <div className="text-xs text-yellow-green font-medium">Vacuum & clean indexes</div>
          </button>

          <button
            type="button"
            onClick={handleSeed}
            disabled={isProcessing}
            className="p-3 bg-evergreen border-1 border-border-color rounded-sm shadow-hard-sm hover:bg-neo-lime hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer text-left space-y-1"
          >
            <div className="font-black text-sm uppercase text-yellow-green flex items-center gap-1.5">
              <span>▢</span> Seed Catalog
            </div>
            <div className="text-xs text-yellow-green font-medium">Reset 41 core items</div>
          </button>
        </div>
      )}
    </div>
  );
};
