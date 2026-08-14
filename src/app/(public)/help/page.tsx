'use client';

import React, { useState } from 'react';
import { HelpArticles } from '@/components/help/HelpArticles';
import { FAQ_ITEMS } from '@/data/faqs';

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState<'articles' | 'faqs'>('articles');
  const [openId, setOpenId] = useState<number | null>(1);
  const [searchFilter, setSearchFilter] = useState('');

  const filteredFaqs = FAQ_ITEMS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchFilter.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchFilter.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="flex flex-col px-4 sm:px-6 md:px-8 py-6 max-w-[1850px] mx-auto w-full flex-1 gap-7 font-mono text-evergreen">
      {/* Help Center Intro Header */}
      <div className="bg-yellow-100 border-2 border-border-color rounded-2xl p-6 md:p-8 flex flex-col gap-4 text-center items-center shadow-hard">
        <h1 className="font-head font-black text-darkteal text-4xl md:text-5xl tracking-wide uppercase">
          HELP & DOCUMENTATION CENTER
        </h1>

        {/* View Switcher Tabs */}
        <div className="mt-4 flex items-center gap-3 bg-soft-linen p-2 rounded-xl border border-border-color">
          <button
            type="button"
            onClick={() => setActiveTab('articles')}
            className={`px-5 py-2.5 rounded-lg border-2 text-sm font-mono font-black uppercase transition-all cursor-pointer ${
              activeTab === 'articles'
                ? 'bg-yellow-green text-black border-border-color shadow-hard-sm'
                : 'bg-white text-white border-transparent hover:bg-white/20'
            }`}
          >
            DETAIL HELP ARTICLES
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('faqs')}
            className={`px-5 py-2.5 rounded-lg border-2 text-xs font-mono font-black uppercase transition-all cursor-pointer ${
              activeTab === 'faqs'
                ? 'bg-yellow-green text-black border-border-color shadow-hard-sm'
                : 'bg-white/10 text-white border-transparent hover:bg-white/20'
            }`}
          >
            ❓ QUICK FAQS
          </button>
        </div>
      </div>

      {/* Main View Content */}
      {activeTab === 'articles' ? (
        <HelpArticles />
      ) : (
        <div className="space-y-6">
          <div className="bg-darkteal border-2 border-border-color p-4 rounded-xl shadow-hard flex items-center gap-3">
            <span className="text-xl">🔍</span>
            <input
              type="text"
              className="w-full bg-black/40 border border-border-color rounded-lg px-4 py-2 text-xs font-mono font-bold text-yellow-green placeholder-white/50 focus:outline-none"
              placeholder="Cari FAQ cepat..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-soft-linen border-2 border-border-color rounded-2xl overflow-hidden shadow-hard transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="w-full px-5 py-4 bg-yellow-green border-none flex justify-between items-center text-left cursor-pointer font-head text-sm md:text-base font-black text-black"
                  >
                    <span className="flex items-center gap-3">
                      <span className="bg-white not-even: text-white text-xs font-mono px-3 py-1 rounded-md font-bold uppercase shrink-0 border border-border-color">
                        {faq.category}
                      </span>
                      {faq.question}
                    </span>
                    <span className="text-xl font-bold shrink-0">{isOpen ? '−' : '+'}</span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-3.5 font-body text-sm md:text-base text-evergreen leading-relaxed border-t border-dashed border-border-color/20 bg-white/70">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Discord Footer Action Box */}
      <div className="bg-darkteal border-2 border-border-color p-6 rounded-2xl shadow-hard flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono">
        <div>
          <h3 className="font-mono font-black text-yellow-green text-lg uppercase">
            MASIH MEMBUTUHKAN BANTUAN KHUSUS?
          </h3>
          <p className="font-mono text-lg text-yellow-green leading-relaxed mt-1">
            PIXLApe Sentoesa Art Studio .
          </p>
        </div>
        <a
          href="https://discord.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center font-mono font-black text-sm uppercase tracking-wider px-5 py-3 bg-cayenne text-white border-2 border-border-color shadow-[3px_3px_0_var(--border-color)] rounded-xl transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shrink-0"
        >
          JOIN DISCORD COMMUNITY →
        </a>
      </div>
    </div>
  );
}

