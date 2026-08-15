'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { StatCard } from '@/components/admin/StatCard';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { BLOG_POSTS } from '@/data/blogs';
import { FAQ_ITEMS } from '@/data/faqs';
import { CardBlogs, DocumentItem } from '@/components/admin/CardBlogs';

const INITIAL_DOCUMENTS: DocumentItem[] = [
  // Blog Articles (Main Web /blog)
  ...BLOG_POSTS.map((b) => ({
    id: `blog_${b.id}`,
    title: b.title,
    excerpt: b.excerpt,
    category: b.category || 'Blog Article',
    targetTab: 'Blog Tab' as const,
    targetUrl: '/blog',
    author: b.author || 'PIXLApe Team',
    date: b.date || '2026-08-01',
    readTime: b.readTime || '5 min read',
    tag: b.tag || 'BLOG',
    icon: b.icon || '📝',
    content: b.excerpt,
  })),

  // Help & FAQ Knowledge Base Docs (Main Web /help)
  ...FAQ_ITEMS.map((f) => ({
    id: `help_${f.id}`,
    title: f.question,
    excerpt: f.answer,
    category: f.category || 'Help & FAQ',
    targetTab: 'Help Center Tab' as const,
    targetUrl: '/help',
    author: 'Support Knowledge Base',
    date: '2026-08-05',
    readTime: '2 min read',
    tag: 'FAQ',
    content: f.answer,
  })),

  // System & Legal Documents
  {
    id: 'doc_privacy',
    title: 'Privacy Polish & Security Telemetry Guidelines',
    excerpt: 'Comprehensive data privacy policy, local storage persistence guidelines, and telemetry audit specs.',
    category: 'Privacy Policy',
    targetTab: 'Legal & Policy Tab',
    targetUrl: '/privacy-polish',
    author: 'Legal & Tech Vault',
    date: '2026-08-08',
    readTime: '6 min read',
    tag: 'POLICY',
    content: 'Full Privacy Policy specifications and local storage configuration rules.',
  },
  {
    id: 'doc_coreldraw',
    title: 'CorelDraw 2026 Graphics Suite Technical Spec & Guide',
    excerpt: 'Structured markdown documentation covering vector engine features, system requirements, and installation steps.',
    category: 'Software Spec',
    targetTab: 'Markdown System Doc',
    targetUrl: '/preview/9',
    author: 'Corel Corporation',
    date: '2026-08-09',
    readTime: '10 min read',
    tag: 'MARKDOWN',
    content: '/DescriptionData/CorelDraw2026.md',
  },
  {
    id: 'doc_licensing',
    title: 'CC0 1.0 & MIT Commercial Licensing Terms',
    excerpt: 'Plain-English breakdown of open-source licenses, royalty-free usage, and commercial project rights.',
    category: 'Licensing',
    targetTab: 'Legal & Policy Tab',
    targetUrl: '/help',
    author: 'Legal Vault',
    date: '2026-08-02',
    readTime: '4 min read',
    tag: 'TERMS',
    content: 'CC0 1.0 Universal license details.',
  },
];

export default function AdminDocumentPage() {
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [activeTab, setActiveTab] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  // New Document Form
  const [newDoc, setNewDoc] = useState<Partial<DocumentItem>>({
    title: '',
    excerpt: '',
    category: 'General',
    targetTab: 'Blog Tab',
    author: 'PIXLApe Admin',
    tag: 'NEW',
    icon: '📄',
  });

  const handleCreateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDoc.title?.trim()) return;

    const targetUrl =
      newDoc.targetTab === 'Blog Tab'
        ? '/blog'
        : newDoc.targetTab === 'Help Center Tab'
          ? '/help'
          : newDoc.targetTab === 'Legal & Policy Tab'
            ? '/privacy-polish'
            : '/preview/9';

    const item: DocumentItem = {
      id: `doc_${Date.now()}`,
      title: newDoc.title,
      excerpt: newDoc.excerpt || '',
      category: newDoc.category || 'Article',
      targetTab: (newDoc.targetTab as any) || 'Blog Tab',
      targetUrl,
      author: newDoc.author || 'PIXLApe Admin',
      date: new Date().toISOString().split('T')[0],
      readTime: '3 min read',
      tag: newDoc.tag || 'PUBLISHED',
      icon: newDoc.icon || '📄',
      content: newDoc.excerpt || '',
    };

    setDocuments((prev) => [item, ...prev]);
    setIsCreateModalOpen(false);
    setNewDoc({ title: '', excerpt: '', category: 'General', targetTab: 'Blog Tab', author: 'PIXLApe Admin', tag: 'NEW', icon: '📄' });
  };

  const handleUpdateDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc) return;

    setDocuments((prev) =>
      prev.map((d) => (d.id === editingDoc.id ? editingDoc : d))
    );
    setEditingDoc(null);
  };

  const handleDeleteDocument = (id: string | number) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const handleCopyUrl = (doc: DocumentItem) => {
    const fullUrl = `${window.location.origin}${doc.targetUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(doc.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredDocs = documents.filter((doc) => {
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'BLOG' && doc.targetTab === 'Blog Tab') ||
      (activeTab === 'HELP' && doc.targetTab === 'Help Center Tab') ||
      (activeTab === 'LEGAL' && doc.targetTab === 'Legal & Policy Tab') ||
      (activeTab === 'MARKDOWN' && doc.targetTab === 'Markdown System Doc');

    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const blogCount = documents.filter((d) => d.targetTab === 'Blog Tab').length;
  const helpCount = documents.filter((d) => d.targetTab === 'Help Center Tab').length;
  const legalCount = documents.filter((d) => d.targetTab === 'Legal & Policy Tab').length;
  const markdownCount = documents.filter((d) => d.targetTab === 'Markdown System Doc').length;

  return (
    <>
      <AdminHeader title="Documents & Articles Collection" breadcrumb={['Admin', 'Documents & Blogs']} />
      <main className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full text-text font-body">

        {/* ── Metrics Overview ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xs font-mono font-black uppercase tracking-widest text-text/75">Content Vault Telemetry</h2>
              <p className="text-xs text-text/80 font-medium">Articles, Guides, FAQs and Markdown docs displayed on public /blog and /help pages</p>
            </div>
            <span className="text-[10px] font-mono font-black text-black bg-white border-2 border-border-color px-3 py-1 rounded-xl shadow-hard-sm select-none">
              PUBLISHED & LIVE SYNCED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard title="Total Published Docs" value={documents.length} icon="public/icon/blogtotal2.svg" trend="Live Sync" isPositive />
            <StatCard title="Blog Articles (/blog)" value={blogCount} icon="public/icon/blogtotal.svg" trend="Public" isPositive />
            <StatCard title="Help & FAQ Guides (/help)" value={helpCount} icon="public/icon/blogtotal.svg" trend="Public" isPositive />
            <StatCard title="Legal & Markdown Specs" value={legalCount + markdownCount} icon="public/icon/blogtotal.svg" trend="Verified" isPositive />
          </div>
        </section>

        {/* ── Main Web Collection Controller Bar ── */}
        <section className="bg-yellow-200 border-2 border-border-color p-6 rounded-xl shadow-hard space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-border-color/20 pb-4">
            <div>
              <h3 className="font-head font-black text-2xl text-evergreen uppercase tracking-tight mt-1">
                ○○●● Articles & Documentation Collection
              </h3>
              <p className="text-lg font-mono text-darkteal">
                Manage, publish, and edit articles displayed on the public Blog, Help Center, and Legal tabs.
              </p>
            </div>

            <Link href="/admin/document/new">
              <Button
                variant="primary"
                className="font-mono text-lg uppercase bg-green-600 text-black border-1 border-border-color shadow-hard-sm shrink-0"
              >
                ▶ NEW ARTICLE
              </Button>
            </Link>
          </div>

          {/* Filter Bar & Tabs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 font-mono">
            {/* Category Tab Buttons */}
            <div className="flex flex-wrap items-center gap-2 select-none">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3.5 py-2 rounded-xl text-sm font-black border-2 transition-all ${activeTab === 'ALL'
                  ? 'bg-yellow-green text-darkteal border-border-color shadow-[2.5px_2.5px_0_var(--border-color)]'
                  : 'bg-yellow-100 text-darkteal border-border-color hover:bg-green-200/80'
                  }`}
              >
                ALL ({documents.length})
              </button>
              <button
                onClick={() => setActiveTab('BLOG')}
                className={`px-3.5 py-2 rounded-xl text-darkteal text-sm font-black border-2 transition-all ${activeTab === 'BLOG'
                  ? 'bg-purple-200 text-black border-border-color shadow-[2.5px_2.5px_0_var(--border-color)]'
                  : 'bg-yellow-100 text-darkteal border-border-color hover:bg-neo-yellow/20'
                  }`}
              >
                BLOG ARTICLES ({blogCount})
              </button>
              <button
                onClick={() => setActiveTab('HELP')}
                className={`px-3.5 py-2 rounded-xl text-darkteal text-xs font-black border-2 transition-all ${activeTab === 'HELP'
                  ? 'bg-purple-200 text-black border-border-color shadow-[2.5px_2.5px_0_var(--border-color)]'
                  : 'bg-yellow-100 text-darkteal border-border-color hover:bg-neo-cyan/20'
                  }`}
              >
                HELP & FAQS ({helpCount})
              </button>
              <button
                onClick={() => setActiveTab('LEGAL')}
                className={`px-3.5 py-2 rounded-xl text-darkteal text-xs font-black border-2 transition-all ${activeTab === 'LEGAL'
                  ? 'bg-purple-200 text-black border-border-color shadow-[2.5px_2.5px_0_var(--border-color)]'
                  : 'bg-yellow-100 text-darkteal border-border-color hover:bg-neo-lime/20'
                  }`}
              >
                LEGAL & POLICIES ({legalCount})
              </button>
              <button
                onClick={() => setActiveTab('MARKDOWN')}
                className={`px-3.5 py-2 rounded-xl text-darkteal text-xs font-black border-2 transition-all ${activeTab === 'MARKDOWN'
                  ? 'bg-purple-200 text-white border-border-color shadow-[2.5px_2.5px_0_var(--border-color)]'
                  : 'bg-yellow-100 text-darkteal border-border-color hover:bg-neo-purple/20'
                  }`}
              >
                MARKDOWN ({markdownCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="w-full lg:w-72">
              <Input
                placeholder="🔍 Search article title or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-2 border-border-color bg-white text-xs font-bold rounded-xl shadow-hard-sm"
              />
            </div>
          </div>
        </section>

        {/* ── Document Collection Cards Grid ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <CardBlogs
              key={doc.id}
              doc={doc}
              copiedId={copiedId}
              onCopyUrl={handleCopyUrl}
              onEditDoc={setEditingDoc}
              onDeleteDoc={handleDeleteDocument}
            />
          ))}
        </section>

        {/* Modal: Create Article / Document */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Publish New Article / Web Document"
        >
          <form onSubmit={handleCreateDocument} className="space-y-4 font-mono text-sm text-text">
            <div>
              <label className="block text-lg font-black uppercase text-text mb-1">Document Title *</label>
              <Input
                placeholder="e.g. Master01 Vector Design Tools Guide"
                value={newDoc.title}
                onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                className="border-2 border-border-color bg-white text-lg font-bold shadow-hard-sm"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase text-text mb-1">Target Web Tab</label>
                <select
                  value={newDoc.targetTab}
                  onChange={(e) => setNewDoc({ ...newDoc, targetTab: e.target.value as any })}
                  className="w-full px-3 py-2 bg-white border-2 border-border-color rounded-xl text-xs font-bold text-text focus:outline-none shadow-hard-sm"
                >
                  <option value="Blog Tab">Blog Tab (/blog)</option>
                  <option value="Help Center Tab">Help Center Tab (/help)</option>
                  <option value="Legal & Policy Tab">Legal & Policy Tab (/privacy-polish)</option>
                  <option value="Markdown System Doc">Markdown System Doc (/preview/9)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-text mb-1">Category / Tag</label>
                <Input
                  placeholder="e.g. TUTORIAL or DESIGN"
                  value={newDoc.category}
                  onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                  className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-black uppercase text-text mb-1">Excerpt / Document Summary</label>
              <textarea
                value={newDoc.excerpt}
                onChange={(e) => setNewDoc({ ...newDoc, excerpt: e.target.value })}
                rows={4}
                placeholder="Enter article synopsis or document description..."
                className="w-full px-3.5 py-2.5 bg-white border-2 rounded-xl text-xs font-medium text-text focus:outline-none focus:border-neo-pink shadow-hard-sm leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="neutral"
                onClick={() => setIsCreateModalOpen(false)}
                className="font-mono text-xs font-black uppercase"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="font-mono text-sm font-black uppercase bg-neo-pink text-white border-2 border-border-color shadow-hard-sm"
              >
                + PUBLISH DOCUMENT
              </Button>
            </div>
          </form>
        </Modal>

        {/* Modal: Edit Existing Document */}
        <Modal
          isOpen={!!editingDoc}
          onClose={() => setEditingDoc(null)}
          title={editingDoc ? `Edit Document: ${editingDoc.title}` : ''}
        >
          {editingDoc && (
            <form onSubmit={handleUpdateDocument} className="space-y-4 font-mono text-xs text-text">
              <div>
                <label className="block text-xs font-black uppercase text-text mb-1">Document Title</label>
                <Input
                  value={editingDoc.title}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-text mb-1">Category</label>
                  <Input
                    value={editingDoc.category}
                    onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                    className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase text-text mb-1">Target Web Tab</label>
                  <select
                    value={editingDoc.targetTab}
                    onChange={(e) => setEditingDoc({ ...editingDoc, targetTab: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border-2 border-border-color rounded-xl text-xs font-bold text-text focus:outline-none shadow-hard-sm"
                  >
                    <option value="Blog Tab">Blog Tab (/blog)</option>
                    <option value="Help Center Tab">Help Center Tab (/help)</option>
                    <option value="Legal & Policy Tab">Legal & Policy Tab (/privacy-polish)</option>
                    <option value="Markdown System Doc">Markdown System Doc (/preview/9)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-text mb-1">Excerpt / Content</label>
                <textarea
                  value={editingDoc.excerpt}
                  onChange={(e) => setEditingDoc({ ...editingDoc, excerpt: e.target.value })}
                  rows={5}
                  className="w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs font-medium text-text focus:outline-none shadow-hard-sm leading-relaxed"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <Button
                  type="button"
                  variant="neutral"
                  onClick={() => setEditingDoc(null)}
                  className="font-mono text-xs font-black uppercase"
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="font-mono text-xs font-black uppercase bg-neo-lime text-black border-2 border-border-color shadow-hard-sm"
                >
                  💾 SAVE CHANGES
                </Button>
              </div>
            </form>
          )}
        </Modal>

      </main>
    </>
  );
}
