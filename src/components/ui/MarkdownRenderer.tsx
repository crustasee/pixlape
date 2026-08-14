'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  if (!content) return null;

  const lines = content.split('\n');

  const parseInline = (text: string) => {
    // Bold: **text** or __text__
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Italics: *text* or _text_
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Inline Code: `code`
    formatted = formatted.replace(
      /`(.*?)`/g,
      '<code class="bg-black/10 px-1.5 py-0.5 rounded font-mono text-xs text-black border border-black/30 font-bold">$1</code>'
    );

    // Links: [label](url)
    formatted = formatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer" class="underline font-bold text-black hover:text-neo-pink transition-colors">$1</a>'
    );

    return formatted;
  };

  const elements: React.ReactNode[] = [];
  let currentList: { text: string; isOrdered: boolean }[] = [];

  const flushList = (key: string) => {
    if (currentList.length > 0) {
      const isOrdered = currentList[0].isOrdered;
      if (isOrdered) {
        elements.push(
          <ol key={key} className="list-decimal list-inside space-y-2 my-3 pl-2 text-black font-body text-sm font-semibold">
            {currentList.map((item, idx) => (
              <li key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: parseInline(item.text) }} />
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={key} className="list-disc list-inside space-y-2 my-3 pl-2 text-black font-body text-sm font-semibold">
            {currentList.map((item, idx) => (
              <li key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: parseInline(item.text) }} />
            ))}
          </ul>
        );
      }
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Check for unordered list (- or *)
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      currentList.push({ text: trimmed.substring(2), isOrdered: false });
      return;
    }

    // Check for ordered list (1. 2. etc)
    const matchOrdered = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (matchOrdered) {
      currentList.push({ text: matchOrdered[2], isOrdered: true });
      return;
    }

    // If not a list item, flush existing list
    flushList(`list-${index}`);

    if (trimmed.startsWith('#### ')) {
      elements.push(
        <h4
          key={index}
          className="font-head font-black text-sm md:text-base text-black uppercase mt-4 mb-2 tracking-tight bg-black/5 p-2 rounded-lg border-l-4 border-black"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(5)) }}
        />
      );
    } else if (trimmed.startsWith('### ')) {
      elements.push(
        <h3
          key={index}
          className="font-head font-black text-base md:text-lg text-black uppercase mt-5 mb-2 tracking-tight border-b-2 border-black/20 pb-1 flex items-center gap-2"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(4)) }}
        />
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h2
          key={index}
          className="font-head font-black text-lg md:text-xl text-black uppercase mt-6 mb-2 tracking-tight border-b-2 border-black pb-1"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(3)) }}
        />
      );
    } else if (trimmed.startsWith('# ')) {
      elements.push(
        <h1
          key={index}
          className="font-head font-black text-xl md:text-2xl text-black uppercase mt-6 mb-3 tracking-tight border-b-3 border-black pb-1"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(2)) }}
        />
      );
    } else if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote
          key={index}
          className="border-l-4 border-black bg-white/90 p-3.5 my-3 rounded-r-xl font-mono text-xs md:text-sm text-black italic shadow-sm leading-relaxed border-2 border-r-2 border-t-2 border-b-2 border-black/20"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed.substring(2)) }}
        />
      );
    } else if (trimmed.length > 0) {
      elements.push(
        <p
          key={index}
          className="font-body text-xs sm:text-sm text-black leading-relaxed my-2 font-medium"
          dangerouslySetInnerHTML={{ __html: parseInline(trimmed) }}
        />
      );
    }
  });

  flushList(`list-final`);

  return <div className={`markdown-content flex flex-col gap-1 ${className}`}>{elements}</div>;
};
