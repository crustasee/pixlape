'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { IconRenderer } from '@/components/ui/IconRenderer';

export interface DocumentItem {
    id: string | number;
    title: string;
    excerpt: string;
    category: string;
    targetTab: 'Blog Tab' | 'Help Center Tab' | 'Legal & Policy Tab' | 'Markdown System Doc';
    targetUrl: string;
    author?: string;
    date?: string;
    readTime?: string;
    tag?: string;
    icon?: string;
    content?: string;
}

interface CardBlogsProps {
    doc: DocumentItem;
    copiedId: string | number | null;
    onCopyUrl: (doc: DocumentItem) => void;
    onEditDoc: (doc: DocumentItem) => void;
    onDeleteDoc: (id: string | number) => void;
}

export const CardBlogs: React.FC<CardBlogsProps> = ({
    doc,
    copiedId,
    onCopyUrl,
    onEditDoc,
    onDeleteDoc,
}) => {
    const badgeColorMap: Record<string, string> = {
        'Blog Tab': 'bg-purple-300 text-black',
        'Help Center Tab': 'bg-yellow-200 text-black',
        'Legal & Policy Tab': 'bg-purple-200 text-black',
        'Markdown System Doc': 'bg-yellow-green text-black',
    };

    const isCopied = copiedId === doc.id;

    return (
        <div className="bg-yellow-100 border border-border-color rounded-lg p-5 shadow-hard-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg transition-all duration-200 flex flex-col justify-between gap-4 relative text-text font-body">
            {/* Header Info */}
            <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 border-b-2 border-border-color/20 pb-3 font-mono">
                    <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                            className={`px-2.5 py-0.5 text-xs font-black uppercase rounded-lg border border-border-color shadow-[1px_1px_0_var(--border-color)] ${badgeColorMap[doc.targetTab] || 'bg-yellow-green text-black'
                                }`}
                        >
                            {doc.targetTab}
                        </span>
                        {doc.category && (
                            <span className="px-2 py-0.5 text-xs font-bold uppercase rounded-lg border border-border-color/30 bg-yellow-green text-black">
                                {doc.category}
                            </span>
                        )}
                    </div>

                    <span className="text-[10px] font-mono font-bold text-cayenne shrink-0">
                        {doc.date || '2026-08-01'}
                    </span>
                </div>

                <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-white border-1 border-border-color flex items-center justify-center text-xl shrink-0 shadow-hard-sm p-2 overflow-hidden">
                        <IconRenderer icon={doc.icon} alt={doc.title} fallbackEmoji="📝" className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-head font-black text-black uppercase text-md leading-snug line-clamp-2">
                            {doc.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 font-mono text-[10px] font-bold text-black">
                            <span>BY {doc.author || 'PIXLApe Team'}</span>
                            <span>•</span>
                            <span>{doc.readTime || '5 min read'}</span>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-black leading-relaxed font-body line-clamp-3 bg-yellow-50 p-3 rounded-lg border border-border-color shadow-[1px_1px_0_var(--border-color)]">
                    {doc.excerpt}
                </p>
            </div>

            {/* Icon-Only Action Toolbar */}
            <div className="pt-3 border-t-2 border-border-color/20 flex items-center justify-between gap-2 font-mono">
                <div className="flex items-center gap-2">
                    {/* View on Web */}
                    <Link href={doc.targetUrl} target="_blank" title="View Document on Public Web" aria-label="View on Web">
                        <button
                            type="button"
                            className="w-9 h-9 rounded-lg border-1 border-border-color bg-green-200 text-black flex items-center justify-center shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                        >
                            <IconRenderer
                                icon="public/icon/02eye.svg"
                                alt="View on Web"
                                fallbackEmoji="🌐"
                                className="w-7 h-7 object-contain"
                            />
                        </button>
                    </Link>

                    {/* Copy Link */}
                    <button
                        type="button"
                        onClick={() => onCopyUrl(doc)}
                        title={isCopied ? 'Link Copied to Clipboard!' : 'Copy Document Link'}
                        aria-label="Copy Document Link"
                        className={`w-9 h-9 rounded-lg border-1 border-border-color bg-green-200 flex items-center justify-center shadow-hard-sm transition-all cursor-pointer ${isCopied
                            ? 'bg-green-200 text-black shadow-none'
                            : 'bg-green-200 text-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none'
                            }`}
                    >
                        <IconRenderer
                            icon="public/icon/02link.svg"
                            alt="Copy Link"
                            fallbackEmoji={isCopied ? '✅' : '📋'}
                            className="w-7 h-7 object-contain"
                        />
                    </button>

                    {/* Edit Content */}
                    <button
                        type="button"
                        onClick={() => onEditDoc(doc)}
                        title="Edit Article / Document Content"
                        aria-label="Edit Document"
                        className="w-9 h-9 rounded-lg border-1 border-border-color bg-green-200 text-black flex items-center justify-center shadow-hard-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                    >
                        <IconRenderer
                            icon="public/icon/02edit.svg"
                            alt="Edit"
                            fallbackEmoji="✏️"
                            className="w-7 h-7 object-contain"
                        />
                    </button>
                </div>

                {/* Delete Document */}
                <button
                    type="button"
                    onClick={() => onDeleteDoc(doc.id)}
                    title="Delete Article / Document"
                    aria-label="Delete Document"
                    className="w-9 h-9 rounded-lg border-1 border-border-color bg-red-200 text-black flex items-center justify-center shadow-hard-sm hover:bg-red-400 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                >
                    <IconRenderer
                        icon="public/icon/button/trash.svg"
                        alt="Delete"
                        fallbackEmoji="🗑️"
                        className="w-10 h-10 object-contain"
                    />
                </button>
            </div>
        </div>
    );
};
