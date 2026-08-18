'use client';

import React, { useRef, useState } from 'react';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { MarkdownRenderer } from '@/components/ui/MarkdownRenderer';

export interface RichTextEditorProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  minHeight?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label = 'Full Overview & Description',
  name,
  value,
  onChange,
  placeholder = 'Type detailed overview of product, features, tools, and usage guide...',
  required = false,
  minHeight = '320px',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [activeMode, setActiveMode] = useState<'write' | 'preview'>('write');
  const [fontSizeSelect, setFontSizeSelect] = useState<string>('normal');

  // Utility helper to insert markdown or HTML tags around selected text
  const insertFormatting = (prefix: string, suffix: string = '', defaultText: string = 'text') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end) || defaultText;
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newValue =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    // Create a synthetic event to trigger onChange
    const event = {
      target: {
        name,
        value: newValue,
      },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    onChange(event);

    // Restore focus & cursor position after state update
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length;
      textarea.setSelectionRange(
        start + prefix.length,
        newCursorPos
      );
    }, 0);
  };

  // Line prefix helper (for lists, headers, quotes)
  const insertLinePrefix = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, start);
    const textAfter = textarea.value.substring(end);
    const selectedText = textarea.value.substring(start, end);

    let formattedText = '';
    if (selectedText.includes('\n')) {
      formattedText = selectedText
        .split('\n')
        .map((line, idx) => (line.trim() ? (prefix.includes('%d') ? prefix.replace('%d', String(idx + 1)) + line : prefix + line) : line))
        .join('\n');
    } else {
      const p = prefix.includes('%d') ? prefix.replace('%d', '1') : prefix;
      formattedText = `${p}${selectedText || 'List item'}`;
    }

    const newValue = textBefore + formattedText + textAfter;

    const event = {
      target: {
        name,
        value: newValue,
      },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    onChange(event);

    setTimeout(() => {
      textarea.focus();
    }, 0);
  };

  // Font Size / Heading selector change
  const handleHeadingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const headingType = e.target.value;
    setFontSizeSelect(headingType);

    switch (headingType) {
      case 'h1':
        insertLinePrefix('# ');
        break;
      case 'h2':
        insertLinePrefix('## ');
        break;
      case 'h3':
        insertLinePrefix('### ');
        break;
      case 'h4':
        insertLinePrefix('#### ');
        break;
      case 'large':
        insertFormatting('<span style="font-size: 18px;">', '</span>', 'Large text');
        break;
      case 'small':
        insertFormatting('<span style="font-size: 12px;">', '</span>', 'Small text');
        break;
      default:
        break;
    }
  };

  // Word and Char Counters
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  return (
    <div className="space-y-2">
      {/* Label and Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <label className="block text-md font-mono font-black uppercase tracking-wider text-darkteal flex items-center gap-2">
          <span>{label}</span>
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>

        {/* Mode Selector (Write vs Preview) */}
        <div className="flex items-center gap-1.5 bg-yellow-green p-1 rounded-xl border-2 border-border-color shadow-[2px_2px_0_var(--border-color)]">
          <button
            type="button"
            onClick={() => setActiveMode('write')}
            className={`px-3 py-1 text-xs font-mono font-black uppercase rounded-lg transition-all cursor-pointer ${
              activeMode === 'write'
                ? 'bg-cayenne text-white border border-border-color shadow-[1px_1px_0_var(--border-color)]'
                : 'text-black hover:bg-yellow-green'
            }`}
          >
            EDIT MODE
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('preview')}
            className={`px-3 py-1 text-xs font-mono font-black uppercase rounded-lg transition-all cursor-pointer ${
              activeMode === 'preview'
                ? 'bg-cayenne text-white border border-border-color shadow-[1px_1px_0_var(--border-color)]'
                : 'text-black hover:bg-yellow-green'
            }`}
          >
            PREVIEW
          </button>
        </div>
      </div>

      {/* Editor Main Container */}
      <div className="bg-white border border-border-color rounded-lg shadow-hard-sm overflow-hidden flex flex-col">
        {/* Editor Utility Toolbar */}
        {activeMode === 'write' && (
          <div className="bg-green-300 border-b-2 border-border-color p-2.5 flex flex-wrap items-center gap-2 select-none">
            {/* Font Size & Heading Dropdown */}
            <div className="flex items-center gap-1">
              <select
                value={fontSizeSelect}
                onChange={handleHeadingChange}
                className="px-2.5 py-1.5 bg-green-300 border border-border-color rounded-lg text-xs font-mono font-black text-evergreen focus:outline-none shadow-[1.5px_1.5px_0_var(--border-color)] cursor-pointer"
                title="Heading / Font Size"
              >
                <option value="normal">Normal Text</option>
                <option value="h1">H1 Header</option>
                <option value="h2">H2 Subheader</option>
                <option value="h3">H3 Section Title</option>
                <option value="h4">H4 Sub-Section</option>
                <option value="large">Font Size: 18px</option>
                <option value="small">Font Size: 12px</option>
              </select>
            </div>

            <div className="h-6 w-[2px] bg-border-color/30 mx-0.5" />

            {/* Inline Formatting Tools */}
            <div className="flex items-center gap-3 text-evergreen">
              {/* Bold */}
              <button
                type="button"
                onClick={() => insertFormatting('**', '**', 'Bold Text')}
                title="Bold (Ctrl+B)"
                className="w-8 h-8 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne font-black text-lg flex items-center justify-center shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                B
              </button>

              {/* Italic */}
              <button
                type="button"
                onClick={() => insertFormatting('*', '*', 'Italic Text')}
                title="Italic (Ctrl+I)"
                className="w-8 h-8 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne text-black italic font-bold text-lg flex items-center justify-center shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <i>I</i>
              </button>

              {/* Underline */}
              <button
                type="button"
                onClick={() => insertFormatting('<u>', '</u>', 'Underlined Text')}
                title="Underline"
                className="w-8 h-8 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne text-black underline font-bold text-lg flex items-center justify-center shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <u>U</u>
              </button>

              {/* Strikethrough */}
              <button
                type="button"
                onClick={() => insertFormatting('~~', '~~', 'Strikethrough')}
                title="Strikethrough"
                className="w-8 h-8 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne text-black line-through font-bold text-lg flex items-center justify-center shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                S
              </button>
            </div>

            <div className="h-6 w-[2px] bg-darkteal mx-5" />

            {/* Paragraph & List Tools */}
            <div className="flex items-center gap-3 text-evergreen">
              {/* Numbered List */}
              <button
                type="button"
                onClick={() => insertLinePrefix('%d. ')}
                title="Numbered List"
                className="h-8 px-2.5 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne font-black text-xl items-center gap-1 shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <span className="hidden sm:inline">≡</span>
              </button>

              {/* Bullet List */}
              <button
                type="button"
                onClick={() => insertLinePrefix('- ')}
                title="Bullet List"
                className="h-8 px-2.5 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne font-black text-xs flex items-center gap-1 shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                <span className="hidden sm:inline">●●</span>
              </button>

              {/* Blockquote */}
              <button
                type="button"
                onClick={() => insertLinePrefix('> ')}
                title="Quote Block"
                className="w-8 h-8 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne font-black text-xs flex items-center justify-center shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                &ldquo;&rdquo;
              </button>

              {/* Code Snippet */}
              <button
                type="button"
                onClick={() => insertFormatting('`', '`', 'code')}
                title="Inline Code"
                className="w-8 h-8 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne text-black font-black text-xs flex items-center justify-center shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                &lt;/&gt;
              </button>
            </div>

            <div className="h-6 w-[2px] bg-border-color/30 mx-5" />

            {/* Text Alignment Tools */}
            <div className="flex items-center gap-3 text-evergreen">
              {/* Align Left */}
              <button
                type="button"
                onClick={() => insertFormatting('<div align="left">\n', '\n</div>', 'Left aligned content')}
                title="Align Left"
                className="w-8 h-8 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne text-black font-black text-lg flex items-center justify-center shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                ◁
              </button>

              {/* Align Center */}
              <button
                type="button"
                onClick={() => insertFormatting('<div align="center">\n', '\n</div>', 'Centered content')}
                title="Align Center"
                className="w-8 h-8 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne text-black font-black text-lg flex items-center justify-center shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                ▩
              </button>

              {/* Align Right */}
              <button
                type="button"
                onClick={() => insertFormatting('<div align="right">\n', '\n</div>', 'Right aligned content')}
                title="Align Right"
                className="w-8 h-8 rounded-lg border border-border-color bg-green-400 hover:bg-cayenne text-black font-black text-lg flex items-center justify-center shadow-[1.5px_1.5px_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
              >
                ▷
              </button>
            </div>
          </div>
        )}

        {/* Text Area Canvas or Preview Area */}
        {activeMode === 'write' ? (
          <textarea
            ref={textareaRef}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            style={{ minHeight }}
            className="w-full p-4 sm:p-5 bg-white sm:text-base font-mono font-bold text-darkteal placeholder-text focus:outline-none leading-relaxed resize-y"
          />
        ) : (
          <div
            style={{ minHeight }}
            className="w-full p-5 bg-[#FAF7F2] overflow-y-auto font-body text-sm text-text leading-relaxed space-y-4"
          >
            {value.trim() ? (
              <MarkdownRenderer content={value} />
            ) : (
              <div className="text-black/50 italic text-center py-10 font-mono">
                No description content typed yet. Switch back to Edit Mode to add text.
              </div>
            )}
          </div>
        )}

        {/* Editor Footer Status Bar */}
        <div className="bg-[#FAF7F2] border-t-2 border-border-color px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-black/70 select-none">
          <div className="flex items-center gap-4">
            <span>Words: <strong className="text-black">{wordCount}</strong></span>
            <span>Characters: <strong className="text-black">{charCount}</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs uppercase bg-white text-darkteal px-2 py-0.5 rounded border border-border-color font-black">
              HTML Tags
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
