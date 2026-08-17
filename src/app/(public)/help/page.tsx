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
    <div className="flex flex-col px-4 sm:px-6  py-6 max-w-full mx-auto w-full flex-1 gap-3">
      {/* ===============================Help Center Intro Header===================================================== */}
      {/* -------------------------------Main View Content--------------------------------------------------------- */}
      {activeTab === 'articles' ? (
        <HelpArticles />
      ) : (
        <div className="space-y-6">
          <div className="bg-darkteal border border-border-color p-4 rounded-xl shadow-hard flex items-center gap-3">
            <span className="text-xl">🔍</span>
            <input
              type="text"
              className="w-full bg-black border border-border-color rounded-lg px-4 py-2 text-xs font-mono font-bold text-yellow-green placeholder-white/50 focus:outline-none"
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

      {/* ===========================Discord Footer Action Box====================================== */}
      <div className="bg-yellow-green border border-border-color p-6 rounded-lg shadow-hard-sm flex flex-col md:flex-row md:items-center justify-between gap-6 font-mono">
        <div>
          <h3 className="font-mono font-black text-evergreen text-lg uppercase">
            MASIH MEMBUTUHKAN BANTUAN KHUSUS?
          </h3>
          <p className="font-mono text-lg text-darkteal leading-relaxed mt-1">
            PIXLApe Sentoesa Art Studio .
          </p>
        </div>
        <a
          href="https://discord.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center font-mono font-black text-sm uppercase tracking-wider px-5 py-3 bg-cayenne text-white border border-border-color shadow-[3px_3px_0_var(--border-color)] rounded-lg transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shrink-0"
        >
          JOIN DISCORD COMMUNITY →
        </a>
      </div>
    </div>
  );
}

