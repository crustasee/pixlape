'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { DocumentItem } from '@/components/admin/CardBlogs';

interface EditDocumentModalProps {
  editingDoc: DocumentItem | null;
  onClose: () => void;
  onSave: (updatedDoc: DocumentItem) => void;
}

const PRESET_EMOJIS = ['📝', '🎨', '📜', '🚀', '💡', '🛠️', '🔒', '⚡', '💬', '📖', '🏷️', '🌐'];

const CATEGORY_PRESETS = [
  'Blog Article',
  'Help & FAQ',
  'Privacy Policy',
  'Software Spec',
  'Licensing',
  'Tutorial',
  'Announcement',
  'Design Guide',
];

const LOCAL_IMAGE_PRESETS = [
  { label: 'Blog Vector 1', path: '/icon/stock/blog001.svg' },
  { label: 'Blog Vector 2', path: '/icon/stock/blog002.svg' },
  { label: 'Blog Vector 3', path: '/icon/stock/blog003.svg' },

];

const TARGET_TAB_MAP: Record<
  DocumentItem['targetTab'],
  { url: string; badgeBg: string; textCol: string; label: string }
> = {
  'Blog Tab': {
    url: '/blog',
    badgeBg: 'bg-purple-200 border-purple-900',
    textCol: 'text-purple-900',
    label: 'Public Blog (/blog)',
  },
  'Help Center Tab': {
    url: '/help',
    badgeBg: 'bg-amber-200 border-amber-900',
    textCol: 'text-amber-900',
    label: 'Help Center (/help)',
  },
  'Legal & Policy Tab': {
    url: '/privacy-polish',
    badgeBg: 'bg-emerald-200 border-emerald-900',
    textCol: 'text-emerald-900',
    label: 'Legal & Policy (/privacy-polish)',
  },
  'Markdown System Doc': {
    url: '/preview/9',
    badgeBg: 'bg-cyan-200 border-cyan-900',
    textCol: 'text-cyan-900',
    label: 'Markdown Doc (/preview/9)',
  },
};

export const EditDocumentModal: React.FC<EditDocumentModalProps> = ({
  editingDoc,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<DocumentItem | null>(null);
  const [activeView, setActiveView] = useState<'EDIT' | 'PREVIEW'>('EDIT');
  const [imageSourceMode, setImageSourceMode] = useState<'PRESETS' | 'URL' | 'UPLOAD'>('PRESETS');
  const [imageLoadError, setImageLoadError] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    if (editingDoc) {
      setFormData({
        ...editingDoc,
        icon: editingDoc.icon || '📝',
        author: editingDoc.author || 'PIXLApe Team',
        readTime: editingDoc.readTime || '3 min read',
        tag: editingDoc.tag || 'DOCUMENT',
        date: editingDoc.date || new Date().toISOString().split('T')[0],
        imageUrl: editingDoc.imageUrl || '',
      });
      setIsDirty(false);
      setActiveView('EDIT');
      setImageLoadError(false);
    }
  }, [editingDoc]);

  if (!editingDoc || !formData) return null;

  const handleChange = (field: keyof DocumentItem, value: any) => {
    setFormData((prev) => {
      if (!prev) return null;
      const updated = { ...prev, [field]: value };
      
      // Auto-update targetUrl when targetTab changes
      if (field === 'targetTab' && TARGET_TAB_MAP[value as DocumentItem['targetTab']]) {
        updated.targetUrl = TARGET_TAB_MAP[value as DocumentItem['targetTab']].url;
      }
      return updated;
    });
    if (field === 'imageUrl') {
      setImageLoadError(false);
    }
    setIsDirty(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        handleChange('imageUrl', result);
        setImageLoadError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
    setIsDirty(false);
  };

  const handleCopyTargetUrl = () => {
    const fullUrl = `${window.location.origin}${formData.targetUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const insertFormat = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('edit-doc-excerpt') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentText = formData.excerpt || '';
    const selectedText = currentText.substring(start, end) || 'text';
    const replacement = `${prefix}${selectedText}${suffix}`;

    const newContent =
      currentText.substring(0, start) + replacement + currentText.substring(end);
    
    handleChange('excerpt', newContent);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 50);
  };

  const currentTabMeta = TARGET_TAB_MAP[formData.targetTab] || TARGET_TAB_MAP['Blog Tab'];
  const charCount = (formData.excerpt || '').length;
  const wordCount = (formData.excerpt || '').trim().split(/\s+/).filter(Boolean).length;

  return (
    <Modal
      isOpen={!!editingDoc}
      onClose={onClose}
      maxWidthClass="max-w-[1400px]"
      className="bg-soft-linen border rounded-lg border-black text-black shadow-hard-sm text-evergreen"
    >
      <div className="font-mono space-y-5" onKeyDown={handleKeyDown}>
        {/* ── Modal Header Header Banner ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-black pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl bg-white border border-black p-2 rounded-lg text-evergreen">
              {formData.icon || '📝'}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase bg-black text-white px-2 py-0.5 rounded tracking-wider">
                  ID: {formData.id}
                </span>
                {isDirty && (
                  <span className="text-[10px] font-black uppercase bg-amber-400 text-black px-2 py-0.5 rounded border border-black animate-pulse">
                    ● UNSAVED CHANGES
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black font-head tracking-tight text-black mt-0.5">
                Edit Vault Document
              </h2>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 bg-white border border-black p-1 rounded-lg shadow-hard-sm shrink-0">
            <button
              type="button"
              onClick={() => setActiveView('EDIT')}
              className={`px-3 py-1 text-xs font-black rounded-lg transition-all ${
                activeView === 'EDIT'
                  ? 'bg-yellow-green text-black border border-black shadow-[1.5px_1.5px_0_#000]'
                  : 'text-black/70 hover:bg-gray-100'
              }`}
            >
              EDIT
            </button>
            <button
              type="button"
              onClick={() => setActiveView('PREVIEW')}
              className={`px-3 py-1 text-xs font-black rounded-lg transition-all ${
                activeView === 'PREVIEW'
                  ? 'bg-yellow-green text-black border border-black shadow-hard-sm'
                  : 'text-evergreen hover:bg-gray-100'
              }`}
            >
              PREVIEW
            </button>
          </div>
        </div>

        {/* ── Main Form / Preview Body ── */}
        {activeView === 'EDIT' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title & Icon Pick Block */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-9">
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Document Title <span className="text-red-600">*</span>
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="e.g. Graphic Suite Technical Guide 2026"
                  className="border-2 border-black bg-white text-sm font-bold text-black focus:ring-2 focus:ring-yellow-400 shadow-[3px_3px_0_#000]"
                  required
                />
              </div>
            </div>

            {/* ── Document Cover Image Source Input ── */}
            <div className="bg-white border border-black p-4 rounded-lg shadow-hard-sm space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">🖼️</span>
                  <label className="text-xs font-black uppercase text-black">
                    Document Cover Image Source
                  </label>
                </div>
                
                {/* Source Mode Selector Tabs */}
                <div className="flex items-center gap-1 bg-yellow-50 border border-black p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setImageSourceMode('PRESETS')}
                    className={`px-2.5 py-1 text-[11px] font-black rounded transition-all ${
                      imageSourceMode === 'PRESETS'
                        ? 'bg-yellow-green text-black border border-black shadow-[1px_1px_0_#000]'
                        : 'text-black/70 hover:bg-gray-200'
                    }`}
                  >
                    📁 Local Presets
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSourceMode('URL')}
                    className={`px-2.5 py-1 text-[11px] font-black rounded transition-all ${
                      imageSourceMode === 'URL'
                        ? 'bg-yellow-green text-black border border-black shadow-[1px_1px_0_#000]'
                        : 'text-black/70 hover:bg-gray-200'
                    }`}
                  >
                    🌐 Web URL / Local Path
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageSourceMode('UPLOAD')}
                    className={`px-2.5 py-1 text-[11px] font-black rounded transition-all ${
                      imageSourceMode === 'UPLOAD'
                        ? 'bg-yellow-green text-black border border-black shadow-[1px_1px_0_#000]'
                        : 'text-black/70 hover:bg-gray-200'
                    }`}
                  >
                    📤 Local File Upload
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                {/* Input controls based on mode */}
                <div className="md:col-span-8 space-y-2">
                  {imageSourceMode === 'PRESETS' && (
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-black/70">
                        Select from Local Directory Assets:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {LOCAL_IMAGE_PRESETS.map((preset) => (
                          <button
                            key={preset.path}
                            type="button"
                            onClick={() => handleChange('imageUrl', preset.path)}
                            className={`p-2 border rounded-lg text-left flex flex-col items-center gap-1 transition-all ${
                              formData.imageUrl === preset.path
                                ? 'border-2 border-black bg-yellow-200 shadow-[2px_2px_0_#000]'
                                : 'border-black/30 bg-gray-50 hover:bg-yellow-100 hover:border-black'
                            }`}
                          >
                            <div className="w-10 h-10 flex items-center justify-center p-1 bg-white border border-black/20 rounded overflow-hidden">
                              <img src={preset.path} alt={preset.label} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[10px] font-bold text-center truncate w-full">{preset.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {imageSourceMode === 'URL' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-black/70">
                        Enter Image URL or Local Directory Path:
                      </label>
                      <Input
                        value={formData.imageUrl || ''}
                        onChange={(e) => handleChange('imageUrl', e.target.value)}
                        placeholder="e.g. /icon/stock/blog001.svg or https://images.unsplash.com/..."
                        className="border-2 border-black bg-white text-xs font-mono shadow-[2px_2px_0_#000]"
                      />
                      <div className="flex flex-wrap gap-1.5 text-[10px] font-mono text-black/70">
                        <span>Quick Local Paths:</span>
                        <button
                          type="button"
                          onClick={() => handleChange('imageUrl', '/icon/artgraphic.svg')}
                          className="underline text-blue-800 hover:text-black font-bold"
                        >
                          /icon/artgraphic.svg
                        </button>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => handleChange('imageUrl', '/icon/devtools.svg')}
                          className="underline text-blue-800 hover:text-black font-bold"
                        >
                          /icon/devtools.svg
                        </button>
                        <span>•</span>
                        <button
                          type="button"
                          onClick={() => handleChange('imageUrl', '/Assets/img/cdraw.png')}
                          className="underline text-blue-800 hover:text-black font-bold"
                        >
                          /Assets/img/cdraw.png
                        </button>
                      </div>
                    </div>
                  )}

                  {imageSourceMode === 'UPLOAD' && (
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold text-black/70">
                        Upload Image from Disk (Local Directory):
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="block w-full text-xs text-black font-mono border-2 border-black rounded-lg bg-white file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-1 file:border-black file:text-xs file:font-black file:bg-yellow-300 hover:file:bg-yellow-400 cursor-pointer shadow-[2px_2px_0_#000]"
                      />
                      <p className="text-[10px] text-black/60 font-mono">
                        Supports SVG, PNG, JPG, WEBP, GIF. File converts to persistent local data stream preview.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Target Tab & Category Grid */}
            <div className="flex flex-col md:grid-cols-2 gap-4 bg-white border border-black p-4 rounded-lg shadow-hard-sm">
              {/* Target Tab Selector */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase text-darkteal">
                    Target Web Tab
                  </label>
                  <span
                    className={`text-xs font-black uppercase px-2 py-0.5 rounded border ${currentTabMeta.badgeBg} ${currentTabMeta.textCol}`}
                  >
                    {formData.targetTab}
                  </span>
                </div>
                <select
                  value={formData.targetTab}
                  onChange={(e) =>
                    handleChange('targetTab', e.target.value as DocumentItem['targetTab'])
                  }
                  className="w-full px-3 py-2 bg-yellow-50 border border-black rounded-sm text-xs font-bold text-black focus:outline-none focus:bg-white shadow-[2px_2px_0_#000]"
                >
                  <option value="Blog Tab">Blog Tab (/blog)</option>
                  <option value="Help Center Tab">Help Center Tab (/help)</option>
                  <option value="Legal & Policy Tab">Legal & Policy Tab (/privacy-polish)</option>
                  <option value="Markdown System Doc">Markdown System Doc (/preview/9)</option>
                </select>
              </div>
            </div>

            {/* Author, Read Time, Date Meta Row */}
            <div className="flex gap-5 max-w-full w-full">
              <div>
                <label className="flex flex-col text-xs font-black uppercase text-black mb-1">
                  Author
                </label>
                <Input
                  value={formData.author || ''}
                  onChange={(e) => handleChange('author', e.target.value)}
                  placeholder="e.g. PIXLApe Team"
                  className="border-2 border-black bg-white text-xs font-bold shadow-[2px_2px_0_#000]"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Read Time
                </label>
                <Input
                  value={formData.readTime || ''}
                  onChange={(e) => handleChange('readTime', e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="border border-black bg-white text-xs font-bold shadow-hard-lg"
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  Publish Date
                </label>
                <div className="flex items-center gap-3">
                  <Input
                    type="date"
                    value={formData.date || ''}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="border border-black bg-white text-xs font-bold shadow-hard-sm"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleChange('date', new Date().toISOString().split('T')[0])
                    }
                    className="text-xs font-black uppercase bg-yellow-green border border-black hover:bg-yellow-400 px-2 py-2 rounded shrink-0 shadow-hard-sm"
                    title="Set today"
                  >
                    TODAY
                  </button>
                </div>
              </div>
            </div>

            {/* Content / Excerpt Section with Quick Toolbar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase text-black">
                  Excerpt / Document Content
                </label>

                {/* Toolbar buttons */}
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => insertFormat('**', '**')}
                    className="text-xs font-black bg-white border border-black hover:bg-gray-100 px-1.5 py-0.5 rounded shadow-[1px_1px_0_#000]"
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormat('* ', '')}
                    className="text-xs font-black bg-white border border-black hover:bg-gray-100 px-1.5 py-0.5 rounded shadow-[1px_1px_0_#000]"
                    title="Bullet point"
                  >
                    • List
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormat('`', '`')}
                    className="text-xs font-mono bg-white border border-black hover:bg-gray-100 px-1.5 py-0.5 rounded shadow-[1px_1px_0_#000]"
                    title="Inline Code"
                  >
                    &lt;/&gt;
                  </button>
                  <button
                    type="button"
                    onClick={() => insertFormat('[', '](https://)')}
                    className="text-xs font-bold bg-white border border-black hover:bg-gray-100 px-1.5 py-0.5 rounded shadow-[1px_1px_0_#000]"
                    title="Link"
                  >
                    🔗
                  </button>
                </div>
              </div>

              <textarea
                id="edit-doc-excerpt"
                value={formData.excerpt}
                onChange={(e) => handleChange('excerpt', e.target.value)}
                rows={6}
                placeholder="Enter detailed document excerpt, article summary, or markdown content..."
                className="w-full px-3.5 py-2.5 bg-white border-2 border-black rounded-xl text-xs font-mono text-black focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-[3.5px_3.5px_0_#000] leading-relaxed"
              />

              {/* Character & Word counter */}
              <div className="flex items-center justify-between text-sm font-mono text-black/70 px-1">
                <span>
                  📊 Stats: <strong className="text-black">{charCount}</strong> characters |{' '}
                  <strong className="text-black">{wordCount}</strong> words
                </span>
                <span className="text-[10px] text-black/50">
                  Tip: Press <kbd className="bg-black text-white px-1 py-0.5 rounded">Ctrl + Enter</kbd> to save
                </span>
              </div>
            </div>
          </form>
        ) : (
          /* ── Live Preview Mode ── */
          <div className="space-y-4 bg-white border-3 border-black p-5 rounded-2xl shadow-[5px_5px_0_#000]">
            <div className="flex items-center justify-between border-b-2 border-black/20 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{formData.icon}</span>
                <div>
                  <span className="text-[10px] font-black uppercase bg-purple-200 border border-black px-2 py-0.5 rounded mr-2">
                    {formData.tag || 'DOCUMENT'}
                  </span>
                  <span className="text-xs font-bold text-black/60">
                    {formData.category}
                  </span>
                  <h3 className="text-lg font-black text-black mt-0.5">
                    {formData.title || 'Untitled Document'}
                  </h3>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${currentTabMeta.badgeBg} ${currentTabMeta.textCol}`}>
                {formData.targetTab}
              </span>
            </div>

            {/* Cover Image in Live Preview Mode */}
            {formData.imageUrl && (
              <div className="w-full h-48 bg-yellow-50 border-2 border-black rounded-xl p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={formData.imageUrl}
                  alt={formData.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-black/70 bg-yellow-50 border border-black p-2.5 rounded-xl">
              <span>✍️ <strong>Author:</strong> {formData.author}</span>
              <span>⏱️ <strong>Read Time:</strong> {formData.readTime}</span>
              <span>📅 <strong>Date:</strong> {formData.date}</span>
              <span>🌐 <strong>URL:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-black">{formData.targetUrl}</code></span>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-black/70">Excerpt / Content Preview:</h4>
              <div className="p-4 bg-amber-50/50 border-2 border-black rounded-xl text-xs font-mono leading-relaxed whitespace-pre-wrap text-black">
                {formData.excerpt || <em className="text-black/40">(No content provided)</em>}
              </div>
            </div>
          </div>
        )}

        {/* ── Modal Actions Footer ── */}
        <div className="pt-3 border-t-3 border-black flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-black/60 font-mono">
            {isDirty ? (
              <span className="text-amber-700 font-bold">⚠️ Unsaved modifications pending</span>
            ) : (
              <span>✅ Up to date</span>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="neutral"
              onClick={onClose}
              className="font-mono text-xs font-black uppercase border-2 border-black bg-white hover:bg-gray-100 text-black shadow-[2.5px_2.5px_0_#000]"
            >
              CANCEL
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              variant="primary"
              className="font-mono text-xs font-black uppercase bg-green-400 hover:bg-green-500 text-black border-2 border-black shadow-[2.5px_2.5px_0_#000] px-5"
            >
              ✓ SAVE CHANGES
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
