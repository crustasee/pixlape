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
    const hasHighlights = highlights && highlights.length > 0;

    return (
        <section className="w-full mx-auto font-mono border-t-2 border-border-color bg-yellow-50/60 p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-border-color/20 pb-4">
                <span className="w-3 h-3 bg-cayenne border border-border-color rounded-full shadow-[1px_1px_0_var(--border-color)] inline-block"></span>
                <h2 className="font-head font-black text-xl uppercase tracking-wider text-evergreen">
                    Article Navigation & Context
                </h2>
            </div>

            <div className="flex md:flex-row w-full max-w-full gap-2">
                {/* Table of Contents Card */}
                <div className="w-full md:w-1/2 bg-yellow-100 border border p-5 sm:p-6 rounded-lg shadow-hard-sm space-y-3 flex flex-col">
                    <h3 className="font-head font-black text-base uppercase text-evergreen border-b-2 border-border-color pb-2 flex items-center gap-2">
                        <span>▢</span> Table of Contents
                    </h3>
                    <nav className="space-y-1.5 text-xs font-bold flex-1 overflow-y-auto max-h-full pr-1" aria-label="Table of contents">
                        {headings.length > 0 ? headings.map((h) => (
                            <a
                                key={h.id}
                                href={`#${h.id}`}
                                className={`block py-2 px-3 rounded-lg border text-xs font-mono transition-all duration-200 ${
                                    activeId === h.id
                                        ? 'bg-yellow-green text-white shadow-[2px_2px_0_var(--border-color)] font-black translate-x-1'
                                        : 'border-transparent text-evergreen/80 hover:border-border-color hover:bg-yellow-green/40 hover:text-evergreen'
                                } ${h.level >= 4 ? 'ml-4 text-xs' : ''}`}
                            >
                                {h.text}
                            </a>
                        )) : ['Overview', 'Key Principles', 'Takeaways'].map((item, i) => (
                            <a
                                key={i}
                                href={`#section-${i}`}
                                className="block py-2 px-3 rounded-lg border-1.5 border-transparent text-evergreen hover:border-border-color hover:bg-yellow-green/40 transition-all font-mono"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Key Takeaways Card */}
                {hasHighlights && (
                    <div className="w-full md:w-1/2 bg-yellow-100 border p-5 sm:p-6 rounded-lg shadow-hard-sm space-y-3 flex flex-col">
                        <h3 className="font-head font-black text-base uppercase text-evergreen border-b-2 pb-2 flex items-center gap-2">
                            <span>▣</span> Key Takeaways
                        </h3>
                        <ul className="space-y-2.5 text-xs font-mono font-bold text-evergreen flex-1">
                            {highlights.map((h, idx) => (
                                <li key={idx} className="flex items-start gap-2 bg-yellow-50/80 p-2.5 rounded-lg border border-border leading-snug">
                                    <span className="text-cayenne font-black select-none">•</span>
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Related Vault Articles Card */}
                <div className={`w-full md:w-1/2 bg-yellow-100 border border-border-color p-5 sm:p-6 rounded-lg shadow-hard-sm space-y-4 flex flex-col ${!hasHighlights ? 'md:col-span-1 lg:col-span-2' : ''}`}>
                    <h3 className="font-head font-black text-base uppercase text-evergreen border-b-2 border-border pb-2 flex items-center gap-2">
                        <span>▣</span> Related Vault Articles
                    </h3>
                    <div className={`gap-3 flex-1 ${!hasHighlights ? 'grid grid-cols-1 sm:grid-cols-2' : 'space-y-3'}`}>
                        {relatedPosts.map((rel) => (
                            <Link key={rel.id} href={`/blog/${rel.id}`} className="block group">
                                <div className="h-full border-2 border-border-color bg-yellow-50 p-3.5 rounded-xl shadow-hard-sm group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-yellow-green transition-all cursor-pointer space-y-2">
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
        </section>
    );
};


