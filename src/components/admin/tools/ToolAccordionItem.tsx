'use client';

import React from 'react';
import { IconRenderer } from '@/components/ui/IconRenderer';

export interface ToolAccordionItemProps {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: string;
  iconBg?: string;
  category: string;
  badge?: string;
  badgeColor?: string;
  isOpen: boolean;
  onToggle: () => void;
  quickAction?: React.ReactNode;
  children: React.ReactNode;
}

export const ToolAccordionItem: React.FC<ToolAccordionItemProps> = ({
  index,
  title, 
  description,
  icon,
  iconBg = 'bg-white',
  category,
  badge,
  badgeColor = 'bg-neo-lime text-black',
  isOpen,
  onToggle,
  quickAction,
  children,
}) => {
  return (
    <div
      className={`border-1 border-border-color rounded-lg shadow-hard transition-all duration-200 overflow-hidden font-mono ${isOpen ? 'bg-yellow-green' : 'bg-yellow-green hover:translate-x-0.5 hover:-translate-y-0.5'
        }`}
    >
      {/* ── Accordion List Header Bar ── */}
      <div
        onClick={onToggle}
        className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none transition-colors hover:bg-black/5"
      >
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Index Pill */}
          <span className="px-2.5 py-1 text-xs font-black bg-yellow-green text-darkteal border border-border-color rounded-lg shrink-0">
            #{index}
          </span>

          {/* Icon Box */}
          <div
            className={`w-11 h-11 rounded-xl ${iconBg} border-2 border-border-color flex items-center justify-center p-2 shadow-hard-sm shrink-0`}
          >
            <IconRenderer icon={icon} alt={title} className="w-6 h-6 object-contain" />
          </div>

          {/* Title & Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-head font-bold uppercase text-base sm:text-xl text-darkteal tracking-tight truncate">
                {title}
              </h3>
              <span className="text-sm font-black uppercase px-2 py-0.5 bg-white/30 text-darkteal border border-border-color rounded">
                {category}
              </span>
              {badge && (
                <span className={`text-sm font-black uppercase px-2 py-0.5 border border-border-color rounded shadow-[1px_1px_0_var(--border-color)] ${badgeColor}`}>
                  {badge}
                </span>
              )}
            </div>
            <p className="text-sm text-darkteal font-semibold mt-0.5 line-clamp-1">
              {description}
            </p>
          </div>
        </div>

        {/* Header Right Actions & Chevron Toggle */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-center" onClick={(e) => e.stopPropagation()}>
          {quickAction}

          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            className={`w-7 h-7 rounded-lg bg-none border-1 border-white flex items-center justify-center font-black text-white shadow-medium hover:bg-neo-yellow transition-all duration-200 ${isOpen ? 'rotate-180 bg-neo-yellow' : ''
              }`}
          >
            <svg
              className="w-4 h-4 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Expandable Dropdown Content Panel ── */}
      {isOpen && (
        <div className="border-t-2 border-border-color/20 p-4 sm:p-6 bg-yellow-50 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
};
