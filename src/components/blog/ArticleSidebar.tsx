'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';
import { HeadingInfo } from './ContentRenderer';

interface ArticleSidebarProps {
    headings: HeadingInfo[];
    activeId: string;
    post: BlogPost & { content: string };
    highlights: string[];
    relatedPosts: BlogPost[];
}

export const ArticleSidebar: React.FC<ArticleSidebarProps> = ({
    headings,
    activeId,
    post,
    highlights,
    relatedPosts
}) => {
    return (
        <aside className="lg:col-span-4 font-mono">
            <div className="sticky top-24 space-y-6 p-6">
                {/* TOC Section Card */}
                <div className="bg-white border-2 border-border-color p-5 rounded-2xl shadow-hard-sm space-y-4">
                    <h3 className="font-head font-black text-lg uppercase text-evergreen border-b-2 border-border-color/20 pb-2 flex items-center gap-2">
                        <span>📌</span> Table of Contents
                    </h3>
                    <nav className="space-y-1.5 text-xs font-bold" aria-label="Table of contents">
                        {headings.length > 0 ? headings.map((h) => (
                            <a
                                key={h.id}
                                href={`#${h.id}`}
                                className={`block py-2 px-3 rounded-xl border-1.5 font-mono transition-all duration-200 ${
                                    activeId === h.id
                                        ? 'bg-cayenne text-white border-border-color shadow-[2px_2px_0_var(--border-color)] font-black translate-x-1'
                                        : 'border-transparent text-evergreen/80 hover:border-border-color hover:bg-yellow-green/40 hover:text-evergreen'
                                } ${h.level >= 4 ? 'ml-4 text-[11px]' : ''}`}
                            >
                                {h.text}
                            </a>
                        )) : ['Overview', 'Key Principles', 'Takeaways'].map((item, i) => (
                            <a
                                key={i}
                                href={`#section-${i}`}
                                className="block py-2 px-3 rounded-xl border-1.5 border-transparent text-evergreen/80 hover:border-border-color hover:bg-yellow-green/40 transition-all font-mono"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Highlights Takeaways Card */}
                {highlights && highlights.length > 0 && (
                    <div className="bg-yellow-green/20 border-2 border-border-color p-5 rounded-2xl shadow-hard-sm space-y-3">
                        <h3 className="font-head font-black text-sm uppercase text-evergreen flex items-center gap-2">
                            <span>⚡</span> Article Key Takeaways
                        </h3>
                        <ul className="space-y-2 text-xs font-mono font-bold text-evergreen/90 list-disc pl-4">
                            {highlights.map((h, idx) => (
                                <li key={idx} className="leading-snug">{h}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Recent Articles Card */}
                <div className="bg-white border-2 border-border-color p-5 rounded-2xl shadow-hard-sm space-y-4">
                    <h3 className="font-head font-black text-lg uppercase text-evergreen border-b-2 border-border-color/20 pb-2 flex items-center gap-2">
                        <span>📰</span> Related Vault Articles
                    </h3>
                    <div className="space-y-3">
                        {relatedPosts.map((rel) => (
                            <Link key={rel.id} href={`/blog/${rel.id}`} className="block group">
                                <div className="border-1.5 border-border-color bg-[#FAF7F2] p-3.5 rounded-xl shadow-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-yellow-green/20 transition-all cursor-pointer space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black bg-cayenne text-white px-2 py-0.5 border border-border-color rounded uppercase shadow-[1px_1px_0_var(--border-color)]">
                                            {rel.category}
                                        </span>
                                        <span className="text-[11px] font-bold text-evergreen/70">⏱️ {rel.readTime}</span>
                                    </div>
                                    <h4 className="font-head font-black text-xs text-evergreen leading-snug line-clamp-2 uppercase group-hover:text-cayenne transition-colors">
                                        {rel.title}
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

