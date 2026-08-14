'use client';

import React from 'react';

export interface HeadingInfo { id: string; text: string; level: number; }

export const slugify = (text: string) =>
    text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

export function extractHeadings(content: string): HeadingInfo[] {
    return content.split('\n').reduce<HeadingInfo[]>((acc, line) => {
        const m = line.match(/^(#{2,4})\s+(.+)$/);
        if (m) acc.push({ id: slugify(m[2].trim()), text: m[2].trim(), level: m[1].length });
        return acc;
    }, []);
}

export function renderInline(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
        const candidates = [
            remaining.match(/\*\*(.+?)\*\*/) && { type: 'bold', ...{ match: remaining.match(/\*\*(.+?)\*\*/)! } },
            remaining.match(/`(.+?)`/) && { type: 'code', ...{ match: remaining.match(/`(.+?)`/)! } },
            remaining.match(/\[(.+?)\]\((.+?)\)/) && { type: 'link', ...{ match: remaining.match(/\[(.+?)\]\((.+?)\)/)! } },
        ].filter(Boolean).sort((a: any, b: any) => (a.match.index ?? 0) - (b.match.index ?? 0)) as any[];

        if (!candidates.length) { parts.push(<span key={key++}>{remaining}</span>); break; }
        const { type, match: m } = candidates[0];
        if (m.index > 0) parts.push(<span key={key++}>{remaining.slice(0, m.index)}</span>);
        if (type === 'bold') parts.push(<strong key={key++} className="font-black text-evergreen">{m[1]}</strong>);
        if (type === 'code') parts.push(<code key={key++} className="bg-yellow-green/20 px-2 py-0.5 rounded-md font-mono text-xs font-bold text-cayenne border border-border-color/30">{m[1]}</code>);
        if (type === 'link') parts.push(<a key={key++} href={m[2]} target="_blank" rel="noopener noreferrer" className="text-cayenne font-bold underline underline-offset-2 hover:text-darkteal transition-colors">{m[1]}</a>);
        remaining = remaining.slice(m.index + m[0].length);
    }
    return parts;
}

export function ContentRenderer({ content }: { content: string }) {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let key = 0;
    let listItems: string[] = [];
    let numbered = false;
    let codeLines: string[] = [];
    let codeLang = '';
    let inCode = false;

    const flushList = () => {
        if (!listItems.length) return;
        const Tag = numbered ? 'ol' : 'ul';
        elements.push(
            <Tag key={key++} className={numbered ? 'space-y-2 pl-6 list-decimal text-base sm:text-lg font-body' : 'space-y-2 pl-5 list-disc text-base sm:text-lg font-body'}>
                {listItems.map((item, i) => (
                    <li key={i} className="text-evergreen/90 font-medium leading-relaxed">
                        {renderInline(item.replace(/^(\d+\.\s*|-\s*)/, ''))}
                    </li>
                ))}
            </Tag>
        );
        listItems = []; numbered = false;
    };

    const flushCode = () => {
        if (!codeLines.length) return;
        elements.push(
            <div key={key++} className="relative group my-5">
                <button
                    onClick={() => navigator.clipboard.writeText(codeLines.join('\n'))}
                    className="absolute top-3 right-3 text-xs font-mono font-black bg-white/20 text-white border border-white/30 rounded-lg px-2.5 py-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-yellow-green hover:text-black shadow-sm"
                >📋 Copy</button>
                <pre className="bg-evergreen text-neo-lime rounded-xl border-2 border-border-color p-5 overflow-x-auto shadow-hard-sm">
                    <code className="font-mono text-xs sm:text-sm leading-relaxed">{codeLines.join('\n')}</code>
                </pre>
                {codeLang && <span className="block mt-1.5 text-[11px] font-mono font-black text-evergreen/70 uppercase">Code format: {codeLang}</span>}
            </div>
        );
        codeLines = []; codeLang = ''; inCode = false;
    };

    for (const line of lines) {
        if (line.startsWith('```')) { inCode ? flushCode() : (flushList(), inCode = true, codeLang = line.slice(3).trim()); continue; }
        if (inCode) { codeLines.push(line); continue; }
        if (line.match(/^#{2,4}\s/)) {
            flushList();
            const lvl = line.match(/^(#{2,4})/)![1].length;
            const text = line.replace(/^#{2,4}\s/, '').trim();
            const cls = lvl === 2
                ? 'font-head font-black text-2xl sm:text-3xl text-evergreen uppercase tracking-tight pt-6 pb-2 border-b-2 border-border-color/20 scroll-mt-24'
                : lvl === 3
                    ? 'font-head font-black text-xl sm:text-2xl text-evergreen uppercase pt-5 pb-1.5 border-b border-border-color/10 scroll-mt-24'
                    : 'font-head font-black text-base sm:text-lg text-cayenne uppercase pt-4 pb-1 scroll-mt-24';
            const Tag = (lvl === 2 ? 'h2' : lvl === 3 ? 'h3' : 'h4') as 'h2' | 'h3' | 'h4';
            elements.push(<Tag key={key++} id={slugify(text)} className={cls}>{renderInline(text)}</Tag>);
            continue;
        }
        if (line.startsWith('> ')) {
            flushList();
            elements.push(
                <blockquote key={key++} className="bg-white/80 border-l-4 border-cayenne p-4 rounded-r-xl italic text-sm sm:text-base font-body font-bold text-evergreen border-y border-r border-border-color/30 shadow-hard-sm my-5">
                    {renderInline(line.slice(2))}
                </blockquote>
            );
            continue;
        }
        if (/^\d+\.\s/.test(line)) { numbered = true; listItems.push(line); continue; }
        if (line.startsWith('- ')) { numbered = false; listItems.push(line); continue; }
        if (!line.trim()) { flushList(); continue; }
        flushList();
        elements.push(
            <p key={key++} className="text-base sm:text-lg text-evergreen/90 font-medium leading-relaxed font-body">{renderInline(line)}</p>
        );
    }
    flushList(); flushCode();
    return <div className="space-y-5">{elements}</div>;
}

