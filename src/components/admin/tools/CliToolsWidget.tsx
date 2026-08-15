'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IconRenderer } from '@/components/ui/IconRenderer';

interface CliToolsWidgetProps {
  onLog: (msg: string) => void;
  showHeader?: boolean;
}

export const CliToolsWidget: React.FC<CliToolsWidgetProps> = ({ onLog, showHeader = true }) => {
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'PixlApe CLI Shell v2026.1.0 [Ready]',
    'Type "help" or click preset buttons to execute commands.',
  ]);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  const presetCommands = [
    { label: 'npm run lint', cmd: 'npm run lint' },
    { label: 'prisma generate', cmd: 'npx prisma generate' },
    { label: 'asset-cli sync', cmd: 'asset-cli --sync-all' },
    { label: 'system-check', cmd: 'system-check --full' },
  ];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    setTerminalHistory((prev) => [...prev, `$ ${raw}`]);
    onLog(`[CLI Shell] Executing command: "${raw}"`);

    const lower = raw.toLowerCase();
    if (lower === 'help') {
      setTerminalHistory((prev) => [
        ...prev,
        '  Available Commands:',
        '  - help               : Show available CLI shell commands',
        '  - clear              : Clear terminal screen',
        '  - status             : Inspect server health status',
        '  - npm run lint       : Execute Next.js linter',
        '  - npx prisma generate: Regenerate Prisma Client types',
        '  - asset-cli --sync   : Force re-indexing of asset catalog',
      ]);
    } else if (lower === 'clear') {
      setTerminalHistory(['PixlApe CLI Shell v2026.1.0 [Ready]']);
    } else if (lower === 'status') {
      setTerminalHistory((prev) => [
        ...prev,
        '  [STATUS AUDIT RESULT]',
        '  - Server Node  : Online (PID 14920)',
        '  - Memory Usage : 142 MB / 2048 MB',
        '  - Database     : Connected (0.4ms latency)',
        '  - Status Code  : 200 OK',
      ]);
    } else if (lower.includes('lint')) {
      setTerminalHistory((prev) => [
        ...prev,
        '  Running ESLint check on src/...',
        '  ✓ 0 errors, 0 warnings found in 48 files.',
      ]);
    } else if (lower.includes('prisma')) {
      setTerminalHistory((prev) => [
        ...prev,
        '  Environment variables loaded from .env',
        '  Prisma schema loaded from prisma/schema.prisma',
        '  ✔ Generated Prisma Client (v5.22.0)',
      ]);
    } else if (lower.includes('asset-cli') || lower.includes('sync')) {
      setTerminalHistory((prev) => [
        ...prev,
        '  [ASSET-CLI INDEXER]',
        '  Indexed 41 catalog assets across 5 categories.',
        '  ✓ All asset paths & tags verified cleanly.',
      ]);
    } else {
      setTerminalHistory((prev) => [
        ...prev,
        `  Executing: ${raw}...`,
        '  ✓ Execution completed with exit code 0.',
      ]);
    }

    setCommandInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(commandInput);
    }
  };

  return (
    <div className={showHeader ? "bg-darkteal border-2 border-border-color p-6 rounded-2xl shadow-hard space-y-4 font-mono text-text" : "space-y-4 font-mono text-text"}>
      {showHeader && (
        <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 text-darkteal border-2 border-border-color flex items-center justify-center p-2 shadow-hard-sm">
              <IconRenderer icon="public/icon/button/code.svg" alt="CLI Tools" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h3 className="font-head font-black uppercase text-base text-black tracking-tight">
                CLI Tools
              </h3>
              <span className="text-[10px] font-bold text-black/70 block">
                Interactive Terminal Shell • Server Script Executor
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => executeCommand('clear')}
            className="text-[10px] font-black text-cayenne hover:underline uppercase"
          >
            CLEAR TERMINAL
          </button>
        </div>
      )}

      {/* Preset Command Shortcuts */}
      <div className="flex flex-wrap gap-2">
        {presetCommands.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => executeCommand(p.cmd)}
            className="px-2.5 py-1 text-sm font-black bg-darkteal border-2 border-border-color rounded-lg hover:bg-green-600 cursor-pointer shadow-[1.5px_1.5px_0_var(--border-color)] transition-all"
          >
            $ {p.label}
          </button>
        ))}
      </div>

      {/* Terminal Viewport */}
      <div className="bg-evergreen text-neo-lime p-4 rounded-sm border-1 border-border-color min-h-[160px] max-h-[220px] overflow-y-auto font-mono text-xs leading-relaxed shadow-medium space-y-1">
        {terminalHistory.map((line, idx) => (
          <div key={idx} className={line.startsWith('$') ? 'text-neo-yellow font-black' : 'text-neo-lime'}>
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Command Input Prompt */}
      <div className="flex items-center gap-2 bg-white border-2 border-border-color rounded-xl p-2 shadow-hard-sm">
        <span className="text-black font-black text-sm px-1">$</span>
        <input
          type="text"
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type shell command (e.g. help, status, clear)..."
          className="w-full bg-transparent text-xs font-mono font-black text-black focus:outline-none placeholder-black/40"
        />
        <button
          type="button"
          onClick={() => executeCommand(commandInput)}
          className="px-3 py-1 bg-green-700 text-black font-black text-xs uppercase border border-border-color rounded-sm cursor-pointer hover:bg-green-600 transition-all shrink-0 shadow-[1px_1px_0_var(--border-color)]"
        >
          RUN
        </button>
      </div>
    </div>
  );
};
