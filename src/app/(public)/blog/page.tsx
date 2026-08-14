import React from 'react';
import Link from 'next/link';
import { BLOG_POSTS } from '@/data/blogs';
import { Button } from '@/components/ui/Button';

export const metadata = {
  title: 'Blog & Articles — PIXLApe.COM',
  description: 'Read the latest tutorials, design trend breakdowns, and developer utility guides on PIXLApe.',
};

export default function BlogPage() {
  return (
    <div className="flex flex-col p-6 md:p-8 max-w-[1640px] mx-auto w-full flex-1 gap-8">
      {/* Blog Intro Header */}
      <div className="rounded-lg border-1 border-border-color shadow-hard bg-yellow-100 p-6 md:p-8 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="badge bg-yellow-green text-black text-lg font-mono font-bold px-3 py-1 rounded-md">ARTICLES</span>
          <span className="badge bg-yellow-green text-black text-lg font-mono font-bold px-3 py-1 rounded-md">CREATOR HUB</span>
        </div>
        <h1 className="font-head font-black text-3xl md:text-6xl text-darkteal tracking-wide uppercase">
          BLOG & INSIGHTS
        </h1>
        <p className="font-mono text-lg text-darkteal leading-relaxed">
          Design system deep-dives, dev workflow guides, open source licensing breakdowns, and asset tutorial posts.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.map((post, index) => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <article
              className="asset-card bg-soft-linen p-0 flex flex-col h-full hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-hard-lg cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Cover Image */}
              <div className="w-full h-48 bg-soft-linen border-b-2 border-border-color overflow-hidden relative">
                {post.imageUrl ? (
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-black text-6xl select-none">{post.icon}</span>
                  </div>
                )}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-darkteal text-white px-2.5 py-0.5 text-[10px] font-mono font-black rounded-md border border-border-color shadow-[2px_2px_0_var(--border-color)] uppercase">
                    {post.category}
                  </span>
                  {post.tag && (
                    <span className="bg-neo-yellow text-black px-2.5 py-0.5 text-[10px] font-mono font-black rounded-md border border-border-color shadow-[2px_2px_0_var(--border-color)] uppercase">
                      {post.tag}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="text-sm font-mono font-bold text-cayenne uppercase mb-1.5">
                  {post.date}
                </div>

                <h2 className="font-bold font-black text-black md:text-xl mb-3 leading-snug">
                  {post.title}
                </h2>

                <p className="font-body text-sm text-black leading-relaxed mb-5 flex-1">
                  {post.excerpt}
                </p>

                <div className="pt-4 border-t border-border-color/80 flex justify-between items-center text-xs font-mono font-bold text-black">
                  <span>By {post.author}</span>
                  <span>⏱️ {post.readTime}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Subscribe Dispatch Section */}
      <div className="neo-glass bg-cayenne p-6 md:p-8 flex flex-col gap-4 text-center">
        <h2 className="font-head font-black text-4xl text-white uppercase">
          GET NOTIFIED ON NEW DROPS
        </h2>
        <p className="font-bold text-md md:text-md text-text/90 max-w-xl mx-auto leading-relaxed">
          Be first to know when new icon packs, audio stems, and dev tools land in the vault. No spam — just drops.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md w-full mx-auto mt-">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-6 py-3 bg-soft-linen border-2 border-border-color rounded-xl font-body text-sm font-semibold placeholder-text/50 outline-none"
          />
          <Button variant="secondary" className="font-mono font-black uppercase text-black text-md tracking-wider rounded-xl px-5 py-2.5 h-auto">
            SUBSCRIBE →
          </Button>
        </div>
      </div>
    </div>
  );
}
