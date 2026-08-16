'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { BLOG_POSTS } from '@/data/blogs';
import { BlogPost } from '@/types';
import { ContentRenderer, extractHeadings } from './ContentRenderer';
import { ArticleSidebar } from './ArticleSidebar';
import { NewsletterSection } from './NewsletterSection';

export interface ArticlePageProps {
    article?: Partial<BlogPost> & { imageUrl?: string; content?: string };
}

const FALLBACK_CONTENT = `
### 🚀 Why Neo-Brutalism is Transforming Modern Web Interfaces

Modern web design has entered a new era. Enter **Neo-Brutalism**: a design movement that embraces raw aesthetics, high-contrast borders, bold typography, vibrant colors, and hard drop shadows.

#### 💡 Core Principles

1. **High Contrast & Hard Borders**: Unapologetic black borders (\`2px\` to \`4px\`) create distinct visual boundaries.
2. **Hard Drop Shadows**: Sharp 90-degree shadows (\`4px 4px 0 #000\`) without blur give components a tactile feel.
3. **Vibrant Palette**: Bright neon tones paired with deep black text.
4. **Expressive Typography**: Bold grotesque headings with clean monospaced sub-text.

> *"Neo-Brutalism isn't about breaking usability — it's about breaking boredom."*

#### 🛠️ Key Takeaways for Developers

- **CSS Custom Properties**: Define tokens for border colors and shadow offsets.
- **Micro-Interactions**: Use crisp translate animations on hover for tactile feedback.
- **Semantic Structure**: Maintain WCAG AAA standards for accessible text.
`;

export const ArticlePage: React.FC<ArticlePageProps> = ({ article }) => {
    const [copied, setCopied] = useState(false);
    const [liked, setLiked] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [activeId, setActiveId] = useState('');
    const contentRef = useRef<HTMLDivElement>(null);

    const post = useMemo(() => ({
        ...BLOG_POSTS[0], ...article,
        imageUrl: article?.imageUrl || '/icon/stock/blog001.svg',
        content: article?.content || FALLBACK_CONTENT,
    } as BlogPost & { content: string }), [article]);

    const headings = useMemo(() => extractHeadings(post.content || ''), [post.content]);
    const relatedPosts = useMemo(() => BLOG_POSTS.filter((b) => b.id !== post.id).slice(0, 4), [post.id]);

    const highlights = useMemo(() =>
    (post.highlights?.length ? post.highlights : [
        'Explores modern brutalist UI design trends & systems',
        'Practical developer & creator workflow tips',
        'Free-and-pro tool recommendations from PixlApe Vault',
    ]), [post.highlights]);

    const wordCount = useMemo(() => post.content?.split(/\s+/).length || 0, [post.content]);
    const calcReadTime = wordCount > 0 ? `${Math.max(1, Math.ceil(wordCount / 200))} min read` : post.readTime;

    // Scroll progress + active TOC heading
    useEffect(() => {
        const onScroll = () => {
            const el = contentRef.current;
            if (!el) return;
            const { top, height } = el.getBoundingClientRect();
            setReadingProgress(Math.min(100, Math.max(0, ((window.innerHeight - top) / height) * 100)));
            setShowBackToTop(window.scrollY > 400);
            for (let i = headings.length - 1; i >= 0; i--) {
                const h = document.getElementById(headings[i].id);
                if (h && h.getBoundingClientRect().top <= 110) { setActiveId(headings[i].id); break; }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [headings]);

    const copyLink = () => {
        if (typeof window !== 'undefined') {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true); setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <article className="w-full max-w-[1700px] mx-auto px-6 sm:px-6 lg:px-8 py-8 font-mono text-evergreen" ref={contentRef}>
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-[5px] bg-black/10">
                <div className="h-full bg-cayenne transition-[width] duration-150 shadow-[0_0_8px_var(--c-cayenne)]" style={{ width: `${readingProgress}%` }} />
            </div>

            {/* Breadcrumb Navigation */}
            <nav className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono font-bold border-b-2 border-border-color/20 pb-4 mb-6">
                <ol className="flex items-center gap-2.5 text-evergreen/80 list-none flex-wrap">
                    <li><Link href="/" className="hover:text-cayenne transition-colors uppercase font-black">HOME</Link></li>
                    <li aria-hidden className="text-evergreen/40">/</li>
                    <li><Link href="/blog" className="hover:text-cayenne transition-colors uppercase font-black">BLOG</Link></li>
                    <li aria-hidden className="text-evergreen/40">/</li>
                    <li className="text-evergreen font-black uppercase truncate max-w-[320px] sm:max-w-[500px]" aria-current="page">{post.title}</li>
                </ol>
                <Link href="/blog">
                    <Button variant="neutral" size="sm" className="font-mono text-xs font-black uppercase border-2 border-border-color bg-white hover:bg-yellow-green text-black px-4 py-2 shadow-hard-sm cursor-pointer transition-all">
                        ← ALL ARTICLES
                    </Button>
                </Link>
            </nav>

            {/* ONE UNIFIED MAIN ARTICLE PANEL */}
            <div className="bg-yellow-50 border-2 border-border-color rounded-3xl shadow-hard-lg overflow-hidden">
                {/* ── PANEL HEADER (Category + Metadata) ── */}
                <div className="bg-soft-linen p-6 sm:p-10 border-b-2 border-border-color space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="bg-cayenne text-white px-3.5 py-1 text-xs font-mono font-black rounded-lg border border-border-color shadow-[2px_2px_0_var(--border-color)] uppercase tracking-wider">
                            {post.category || 'DESIGN'}
                        </span>
                        {post.tag && (
                            <span className="bg-darkteal text-soft-linen px-3.5 py-1 text-xs font-mono font-black rounded-lg border border-border-color shadow-[2px_2px_0_var(--border-color)] uppercase tracking-wider">
                                ★ {post.tag}
                            </span>
                        )}
                        <span className="text-xs font-mono font-bold text-evergreen/80 ml-auto bg-white/60 px-3 py-1 rounded-lg border border-border-color/30">
                            📅 {post.date}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-head text-evergreen leading-tight uppercase tracking-tight">
                        {post.title}
                    </h1>

                    <p className="text-base sm:text-xl font-body font-medium text-evergreen/90 leading-relaxed max-w-4xl">
                        {post.excerpt}
                    </p>

                    {/* Author + Meta Actions Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-5 border-t-2 border-border-color/20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-cayenne border-2 border-border-color flex items-center justify-center text-white font-mono font-black text-lg shadow-hard-sm shrink-0">
                                {(post.author || 'P').charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="font-mono font-black text-evergreen uppercase text-sm sm:text-base">{post.author || 'PIXLApe Team'}</div>
                                <div className="text-xs text-evergreen/75 font-mono font-bold">PIXLape Vault Curator</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5 flex-wrap font-mono text-xs">
                            <span className="bg-white/80 text-evergreen px-3 py-1.5 rounded-xl border border-border-color font-black shadow-[1.5px_1.5px_0_var(--border-color)]">⏱️ {calcReadTime}</span>
                            {wordCount > 0 && <span className="bg-white/80 text-evergreen px-3 py-1.5 rounded-xl border border-border-color font-black shadow-[1.5px_1.5px_0_var(--border-color)] hidden sm:inline">📝 {wordCount.toLocaleString()} words</span>}
                            <button
                                onClick={() => setLiked(!liked)}
                                className={`px-4 py-1.5 rounded-xl border-2 font-mono font-black text-xs transition-all cursor-pointer shadow-hard-sm ${liked ? 'bg-cayenne text-white border-border-color' : 'bg-white text-evergreen border-border-color hover:bg-darkteal hover:text-white'}`}
                            >
                                {liked ? '❤️ LIKED' : '🤍 LIKE'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── COVER IMAGE ── */}
                <figure className="w-full h-[280px] sm:h-[440px] bg-darkteal border-b-2 border-border-color relative flex items-center justify-center overflow-hidden">
                    {post.imageUrl && !imageError ? (
                        <img src={post.imageUrl} alt={post.caption || post.title} className="w-full h-full object-cover" onError={() => setImageError(true)} />
                    ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-center space-y-3 bg-yellow-green/20 w-full h-full">
                            <span className="text-7xl select-none">{post.icon || '📜'}</span>
                            <span className="text-lg font-mono font-black uppercase text-evergreen">{post.category || 'PIXLape Insights'}</span>
                        </div>
                    )}
                    <div className="absolute top-4 left-4 bg-black text-yellow-green text-xs font-mono font-black px-3.5 py-1.5 rounded-xl border border-border-color shadow-hard-sm uppercase">
                        {post.icon || '📜'} VAULT ARTICLE
                    </div>
                    {post.caption && !imageError && (
                        <figcaption className="absolute bottom-0 left-0 right-0 bg-black/75 text-white text-xs font-mono px-5 py-2.5 backdrop-blur-sm border-t border-white/10">{post.caption}</figcaption>
                    )}
                </figure>

                {/* ── MAIN BODY GRID: Article Content + Right Side Panel ── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-border-color">
                    {/* LEFT: Article Body (8 cols) */}
                    <div className="lg:col-span-8 p-6 sm:p-10 space-y-6 font-body text-evergreen leading-relaxed bg-white/40">
                        {post.content ? <ContentRenderer content={post.content} /> : <p className="text-base font-medium text-evergreen">{post.excerpt}</p>}

                        {/* Tags & Share Footer */}
                        <div className="pt-8 border-t-2 border-border-color/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="font-black text-evergreen uppercase tracking-wider mr-1">TAGS:</span>
                                <span className="px-3 py-1 bg-darkteal text-white border border-border-color rounded-lg font-black uppercase shadow-[1px_1px_0_var(--border-color)]">#{post.category?.replace(/\s+/g, '')}</span>
                                <span className="px-3 py-1 bg-yellow-green text-black border border-border-color rounded-lg font-black uppercase shadow-[1px_1px_0_var(--border-color)]">#PIXLape</span>
                                <span className="px-3 py-1 bg-cayenne text-white border border-border-color rounded-lg font-black uppercase shadow-[1px_1px_0_var(--border-color)]">#DigitalAssets</span>
                            </div>
                            <button
                                onClick={copyLink}
                                className={`px-4 py-2.5 rounded-xl border-2 font-black text-xs transition-all cursor-pointer shadow-hard-sm ${copied ? 'bg-yellow-green text-black border-border-color' : 'bg-white text-black border-border-color hover:bg-yellow-green'}`}
                            >
                                {copied ? '✅ LINK COPIED!' : '🔗 SHARE ARTICLE'}
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Side Panel (4 cols) */}
                    <ArticleSidebar
                        headings={headings}
                        activeId={activeId}
                        post={post}
                        highlights={highlights}
                        relatedPosts={relatedPosts}
                    />
                </div>
            </div>

            <NewsletterSection />

            {/* Back to Top */}
            {showBackToTop && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-50 w-11 h-11 rounded-xl bg-yellow-green text-black border-2 border-border-color shadow-hard hover:-translate-y-1 hover:bg-cayenne hover:text-white transition-all cursor-pointer flex items-center justify-center font-black text-lg"
                    aria-label="Back to top"
                >↑</button>
            )}
        </article>
    );
};
