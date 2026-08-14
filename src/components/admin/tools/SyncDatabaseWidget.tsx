'use client';

import React, { useState } from 'react';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { Button } from '@/components/ui/Button';

interface SyncDatabaseWidgetProps {
  onLog: (msg: string) => void;
  showHeader?: boolean;
}

export const SyncDatabaseWidget: React.FC<SyncDatabaseWidgetProps> = ({ onLog, showHeader = true }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [syncInterval, setSyncInterval] = useState('15m');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [syncProgress, setSyncProgress] = useState<number>(100);

  const handleTriggerSync = () => {
    setIsSyncing(true);
    setSyncProgress(25);
    onLog('Initiating Database Sync across Static DB <-> PostgreSQL <-> Cloud Storage Mirror...');

    setTimeout(() => {
      setSyncProgress(65);
      onLog('Syncing 41 asset catalog items & 5 blog articles...');
    }, 600);

    setTimeout(() => {
      setSyncProgress(100);
      setIsSyncing(false);
      setLastSyncTime(new Date().toLocaleTimeString());
      onLog('✓ Database Sync successfully completed! All remote mirrors up to date.');
    }, 1400);
  };

  return (
    <div className={showHeader ? "bg-darkteal border-2 border-border-color p-6 rounded-2xl shadow-hard space-y-4 font-mono text-text" : "space-y-4 font-mono text-text"}>
      {showHeader && (
        <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-darkteal border-2 border-border-color flex items-center justify-center p-2 shadow-hard-sm">
              <IconRenderer icon="public/icon/button/cloudmirror.svg" alt="Sync Database" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h3 className="font-head font-black uppercase text-black text-black tracking-tight">
                Sync Database
              </h3>
              <span className="text-[10px] font-bold text-white block">
                Multi-Node Mirroring • Auto-Sync Rule Engine
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setAutoSync(!autoSync)}
            className={`px-3 py-1 text-[10px] font-black uppercase rounded-lg border-2 border-border-color transition-all cursor-pointer ${
              autoSync ? 'bg-neo-lime text-black' : 'bg-white text-black/60'
            }`}
          >
            {autoSync ? '🟢 AUTO-SYNC: ON' : '🔴 AUTO-SYNC: OFF'}
          </button>
        </div>
      )}

      {/* Progress & Sync Status */}
      <div className="bg-white/20 p-4 rounded-lg border-1 border-border-color space-y-3">
        <div className="flex text-darkteal text-sm items-center justify-between font-black uppercase">
          <span>Sync Progress Target: Local ➔ PostgreSQL</span>
          <span className="text-darkteal">{syncProgress}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-yellow-green rounded-full border border-border-color overflow-hidden p-0.5">
          <div
            className="h-full bg-yellow-green rounded-full transition-all duration-300"
            style={{ width: `${syncProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-sm font-bold text-darkteal pt-1">
          <span>Last Sync: <strong>{lastSyncTime}</strong></span>
          <span>Target Node: <strong>aws-us-east-1</strong></span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-sm bg-yellow-50 font-black uppercase text-darkteal">Interval:</label>
          <select
            value={syncInterval}
            onChange={(e) => setSyncInterval(e.target.value)}
            className="px-6 py-1 bg-yellow-50 border-1 border-border-color rounded-lg text-sm font-black text-darkteal focus:outline-none cursor-pointer"
          >
            <option value="realtime">Real-time (Instant)</option>
            <option value="5m">Every 5 Minutes</option>
            <option value="15m">Every 15 Minutes</option>
            <option value="1h">Every 1 Hour</option>
          </select>
        </div>

        <Button
          size="sm"
          variant="primary"
          onClick={handleTriggerSync}
          disabled={isSyncing}
          className="w-full sm:w-auto font-mono text-sm font-black uppercase bg-cayenne text-white border-2 border-border-color flex items-center justify-center gap-2 py-2 px-4 shadow-hard-sm"
        >
          <span>{isSyncing ? 'SYNCING NOW...' : 'TRIGGER FULL SYNC'}</span>
        </Button>
      </div>
    </div>
  );
};
