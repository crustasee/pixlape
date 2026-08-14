'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { IconRenderer } from '@/components/ui/IconRenderer';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

export interface ArticleFormData {
  id?: string | number;
  title: string;
  excerpt: string;
  category: string;
  tag: string;
  author: string;
  readTime: string;
  date: string;
  icon: string;
  imageUrl: string;
  targetTab: 'Blog Tab' | 'Help Center Tab' | 'Legal & Policy Tab' | 'Markdown System Doc';
  content: string;
  isPublished?: boolean;
}

export interface ArticlesFormProps {
  initialData?: Partial<ArticleFormData>;
  onSubmit: (data: ArticleFormData) => void;
  isSubmitting?: boolean;
}

export const ArticlesForm: React.FC<ArticlesFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  const currentDateStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const [formData, setFormData] = useState<ArticleFormData>({
    id: initialData?.id,
    title: initialData?.title || '',
    excerpt: initialData?.excerpt || '',
    category: initialData?.category || 'DESIGN TRENDS',
    tag: initialData?.tag || 'GUIDE',
    author: initialData?.author || 'PIXLApe Team',
    readTime: initialData?.readTime || '5 min read',
    date: initialData?.date || currentDateStr,
    icon: initialData?.icon || '🎨',
    imageUrl: initialData?.imageUrl || '/icon/stock/blog001.svg',
    targetTab: initialData?.targetTab || 'Blog Tab',
    content: initialData?.content || '',
    isPublished: initialData?.isPublished ?? true,
  });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        imageUrl: initialData.imageUrl || prev.imageUrl,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    setImageError(false);
  }, [formData.imageUrl]);

  const presetCoverImages = [
    { label: 'Blog Vector 1', path: '/icon/stock/blog001.svg' },
    { label: 'Blog Vector 2', path: '/icon/stock/blog002.svg' },
    { label: 'Blog Vector 3', path: '/icon/stock/blog003.svg' },
    { label: 'Blog Vector 4', path: '/icon/stock/blog004.svg' },
    { label: 'Blog Vector 5', path: '/icon/stock/blog005.svg' },
    { label: 'Blog Vector 6', path: '/icon/stock/blog006.svg' },
    { label: 'Blog Vector 7', path: '/icon/stock/blog007.svg' },
    { label: 'Design System', path: '/icon/stock/designs.svg' },
    { label: 'Multimedia', path: '/icon/stock/multimedia.svg' },
    { label: 'CLI & Tech', path: '/icon/stock/agent_cli.svg' },
    { label: 'Dev Tools', path: '/icon/devtools.svg' },
    { label: 'Art Graphic', path: '/icon/artgraphic.svg' },
  ];

  const presetEmojis = ['🎨', '⚡', '📜', '🚀', '💡', '🛠️', '🔥', '💎', '📊', '🔒', '🌐', '✨'];

  const categoryOptions = [
    'DESIGN TRENDS',
    'WORKFLOW',
    'LICENSING',
    'BROWSER UTILS',
    'DEV TOOLS',
    'TUTORIAL',
    'HELP & FAQ',
    'ANNOUNCEMENT',
    'LEGAL & POLICY',
  ];

  const tagOptions = ['POPULAR', 'GUIDE', 'ESSENTIAL', 'HOT', 'NEW', 'TUTORIAL', 'FEATURED'];
  const supportedFormats = ['.JPEG', '.PNG', '.SVG', '.WEBM', '.GIF'];

  const isVideoFormat = (url: string) => {
    return url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.mp4');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-full space-y-8 select-none font-mono text-evergreen">
      {/* ── Sticky Control Header ── */}
      <div className="bg-darkteal p-5 sm:p-6 rounded-2xl border-2 border-border-color shadow-hard-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sticky top-20 z-20">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-black uppercase tracking-wider bg-black text-yellow-green border border-border-color shadow-[1.5px_1.5px_0_var(--border-color)]">
              DOCUMENT VAULT CMS
            </span>
            <span className="text-xs text-white/80 font-mono font-bold">
              {formData.id ? `Editing ID: #${formData.id}` : 'Create Article Draft'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-yellow-green font-head tracking-tight uppercase mt-1">
            {formData.title ? `Article: ${formData.title}` : 'Create & Publish Article Document'}
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Link href="/admin/document">
            <Button
              type="button"
              variant="neutral"
              className="font-mono text-xs font-black uppercase border-2 border-border-color bg-cayenne text-white hover:bg-red-700 py-2.5 px-4 rounded-xl"
            >
              CANCEL
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            className="font-mono text-xs sm:text-sm font-black text-black uppercase bg-yellow-green border-2 border-border-color shadow-hard hover:bg-neo-yellow hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 py-2.5 px-5 cursor-pointer rounded-xl"
          >
            <IconRenderer icon="/icon/button/save_white.svg" alt="Publish" className="w-5 h-5 object-contain" />
            <span>{isSubmitting ? 'PUBLISHING...' : formData.id ? 'SAVE CHANGES' : 'PUBLISH ARTICLE'}</span>
          </Button>
        </div>
      </div>

      {/* ── 2 Columns Layout: Form Fields + Live Preview Card ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── LEFT / MAIN FORM AREA (8 Cols) - SOFT LINEN PANEL ── */}
        <div className="lg:col-span-8 bg-soft-linen p-6 sm:p-8 rounded-2xl border-2 border-border-color shadow-hard-lg space-y-8 font-mono">
          {/* Section 1: Article Metadata & Primary Info */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-head font-black uppercase tracking-widest text-evergreen border-b-2 border-border-color/20 pb-3 flex items-center gap-3">
              <IconRenderer icon="/icon/blogtotal2.svg" alt="Article" className="w-7 h-7 object-contain" />
              <span>Primary Article Details</span>
            </h3>

            <Input
              label="ARTICLE TITLE *"
              name="title"
              placeholder="e.g. Why Neo-Brutalism is Taking Over Modern Web & UI Design"
              value={formData.title}
              onChange={handleChange}
              className="border-2 border-border-color bg-white font-black text-sm text-evergreen shadow-hard-sm rounded-xl"
              required
            />

            <div className="space-y-1">
              <label className="block text-xs font-mono font-black uppercase tracking-wider text-evergreen mb-1">
                EXCERPT / SUMMARY *
              </label>
              <textarea
                name="excerpt"
                rows={3}
                placeholder="Short summary describing the article's core topic, key takeaways, and purpose..."
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border-1 rounded-xl text-xs font-mono font-bold text-evergreen placeholder-evergreen/50 focus:outline-none focus:border-darkteal shadow-hard-sm leading-relaxed"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1">
                <label className="block text-xs font-mono font-black uppercase tracking-wider text-evergreen mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 bg-white border-1 border-border-color rounded-xl text-xs font-mono font-bold text-evergreen focus:outline-none shadow-hard-sm"
                >
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <Input
                  label="Badge Tag"
                  name="tag"
                  placeholder="e.g. POPULAR"
                  value={formData.tag}
                  onChange={handleChange}
                  className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm uppercase rounded-xl"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tagOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, tag: t }))}
                      className="px-2.5 py-1 text-[10px] font-mono font-black bg-white border border-border-color rounded-lg hover:bg-yellow-green hover:text-black cursor-pointer shadow-[1px_1px_0_var(--border-color)] text-evergreen transition-all"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              <Input
                label="Author Name"
                name="author"
                placeholder="PIXLApe Team"
                value={formData.author}
                onChange={handleChange}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm rounded-xl"
              />

              <Input
                label="Estimated Read Time"
                name="readTime"
                placeholder="5 min read"
                value={formData.readTime}
                onChange={handleChange}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm rounded-xl"
              />

              <Input
                label="Publication Date"
                name="date"
                placeholder="Aug 12, 2026"
                value={formData.date}
                onChange={handleChange}
                className="border-2 border-border-color bg-white text-xs font-bold shadow-hard-sm rounded-xl"
              />
            </div>
          </div>

          <div className="border-t-2 border-border-color/20 my-6" />

          {/* Section 2: Cover Image & Media Placeholder (Recommended Size Preset 1440x480px .JPEG/.PNG/.SVG/.WEBM/.GIF) */}
          <div className="space-y-5">
            <div className="border-b-2 border-border-color/20 pb-3 flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-base sm:text-lg font-head font-black uppercase tracking-widest text-evergreen flex items-center gap-3">
                <IconRenderer icon="/icon/add_white.svg" alt="Media" className="w-6 h-6 object-contain" />
                <span>COVER IMAGE & GRAPHIC BANNER</span>
              </h3>
              <span className="text-xs font-mono font-black bg-darkteal text-yellow-green px-3 py-1 rounded-lg border border-border-color">
                PRESET BANNER: 1440 × 480 PX
              </span>
            </div>

            {/* Supported Format Specification Bar */}
            <div className="p-3.5 bg-evergreen text-white rounded-xl border-2 border-border-color shadow-hard-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-yellow-green text-sm font-black">⚙️ COMPATIBILITY:</span>
                <span className="font-bold text-white/90">Formats Supported:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {supportedFormats.map((fmt) => (
                  <span
                    key={fmt}
                    className="px-2.5 py-0.5 bg-black text-yellow-green rounded border border-border-color text-[10px] font-black uppercase"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* Cover Image Input with Live Preview */}
            <div className="space-y-4 bg-white p-5 rounded-2xl border-2 border-border-color shadow-hard-sm">
              <Input
                label="COVER BANNER IMAGE / VIDEO URL (.JPEG, .PNG, .SVG, .WEBM, .GIF)"
                name="imageUrl"
                placeholder="e.g. /icon/stock/blog001.svg or https://images.unsplash.com/..."
                value={formData.imageUrl}
                onChange={handleChange}
                className="border-2 border-border-color bg-white text-xs font-bold text-evergreen shadow-hard-sm rounded-xl"
              />

              {/* Cover Image Live Preview Box (1440x480 Aspect Ratio Preset) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono font-black uppercase text-evergreen">
                    Banner Preview Box (Preset 1440 × 480 px Aspect Ratio):
                  </label>
                  <span className="text-[10px] font-black uppercase bg-yellow-green text-black px-2 py-0.5 rounded border border-border-color">
                    3:1 BANNER RATIO
                  </span>
                </div>

                <div className="w-full aspect-[3/1] min-h-[160px] rounded-xl bg-darkteal border-2 border-border-color overflow-hidden relative shadow-hard-sm flex items-center justify-center">
                  {formData.imageUrl && !imageError ? (
                    isVideoFormat(formData.imageUrl) ? (
                      <video
                        src={formData.imageUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <img
                        src={formData.imageUrl}
                        alt="Cover Preview"
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center space-y-2 bg-yellow-green/20 w-full h-full">
                      <span className="text-5xl">{formData.icon || '🖼️'}</span>
                      <span className="text-xs font-mono font-black text-evergreen uppercase">
                        {imageError ? '⚠️ Image load failed — Fallback Preset' : 'No Cover Image Provided'}
                      </span>
                      <span className="text-[11px] font-mono text-evergreen/80">
                        Default Banner Preset: 1440 × 480 px (.jpg, .png, .svg, .webm, .gif)
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 bg-black text-yellow-green text-[10px] font-mono font-black px-2.5 py-1 rounded-md border border-border-color shadow-[1px_1px_0_var(--border-color)] uppercase">
                    {formData.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-evergreen/90 text-white text-[10px] font-mono font-black px-2 py-0.5 rounded border border-border-color">
                    1440×480 PX
                  </div>
                </div>
              </div>

              {/* Preset Stock Cover Images */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-mono font-black uppercase text-evergreen">
                  Fast Preset Vector Covers:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {presetCoverImages.map((preset) => (
                    <button
                      key={preset.path}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, imageUrl: preset.path }))}
                      className={`p-2 rounded-xl border-2 font-mono text-xs font-black flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        formData.imageUrl === preset.path
                          ? 'bg-yellow-green text-black border-border-color shadow-[2px_2px_0_var(--border-color)] scale-105'
                          : 'bg-soft-linen border-border-color text-evergreen hover:bg-yellow-green/40'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-border-color flex items-center justify-center p-1 overflow-hidden shrink-0">
                        <IconRenderer icon={preset.path} alt={preset.label} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] truncate w-full text-center">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Emoji Presets */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-mono font-black uppercase text-evergreen">
                  Emoji Icon Glyph:
                </label>
                <div className="flex flex-wrap gap-2">
                  {presetEmojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, icon: emoji }))}
                      className={`w-9 h-9 rounded-xl text-lg border-2 transition-all flex items-center justify-center cursor-pointer ${
                        formData.icon === emoji
                          ? 'bg-cayenne text-white border-border-color shadow-[2px_2px_0_var(--border-color)] scale-105'
                          : 'bg-soft-linen border-border-color text-evergreen hover:bg-yellow-green'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-border-color/20 my-6" />

          {/* Section 3: Publication Scope / Target Tab */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-head font-black uppercase tracking-widest text-evergreen border-b-2 border-border-color/20 pb-3 flex items-center gap-3">
              <IconRenderer icon="/icon/checklist.svg" alt="Tab" className="w-6 h-6 object-contain" />
              <span>Publication Scope & Target Tab</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'Blog Tab', label: 'Blog Tab (/blog)', color: 'bg-yellow-green text-black' },
                { id: 'Help Center Tab', label: 'Help Center (/help)', color: 'bg-darkteal text-white' },
                { id: 'Legal & Policy Tab', label: 'Legal & Policy', color: 'bg-cayenne text-white' },
                { id: 'Markdown System Doc', label: 'Markdown Spec', color: 'bg-evergreen text-white' },
              ].map((tab) => {
                const isSelected = formData.targetTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, targetTab: tab.id as any }))}
                    className={`p-3 rounded-xl border-2 font-mono text-xs font-black uppercase transition-all text-left flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? `${tab.color} border-border-color shadow-[2.5px_2.5px_0_var(--border-color)] scale-105`
                        : 'bg-white text-evergreen/80 border-border-color hover:bg-yellow-green hover:text-black'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-90 mt-2">{isSelected ? '✓ ACTIVE' : '+ SELECT'}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t-2 border-border-color/20 my-6" />

          {/* Section 4: Full Article Markdown Content */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-head font-black uppercase tracking-widest text-evergreen border-b-2 border-border-color/20 pb-3 flex items-center gap-3">
              <IconRenderer icon="/icon/doc.svg" alt="Content" className="w-6 h-6 object-contain" />
              <span>FULL ARTICLE MARKDOWN CONTENT</span>
            </h3>

            <RichTextEditor
              label="Article Body (Markdown & Rich Text)"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write the full article content here. Use Markdown for headings, code blocks, bullet points, and quotes..."
              minHeight="380px"
              required
            />
          </div>
        </div>

        {/* ── RIGHT COLUMN (4 Cols): LIVE PUBLIC STORE ARTICLE PREVIEW CARD ── */}
        <div className="lg:col-span-4 space-y-6 sticky top-28 font-mono">
          <div className="bg-darkteal p-6 rounded-2xl border-2 border-border-color shadow-hard space-y-4">
            <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-3">
              <span className="text-base font-head font-black uppercase tracking-widest text-yellow-green flex items-center gap-2">
                <IconRenderer icon="/icon/eye_white.svg" alt="Preview" className="w-6 h-6 object-contain" />
                <span>ARTICLE PREVIEW</span>
              </span>
              <span className="text-xs font-mono font-black bg-yellow-green text-black border border-border-color px-2.5 py-1 rounded-md shadow-[1px_1px_0_var(--border-color)]">
                LIVE VIEW
              </span>
            </div>

            {/* Simulated Public Blog Card */}
            <article className="bg-soft-linen rounded-2xl border-2 border-border-color shadow-hard overflow-hidden">
              <div className="w-full aspect-[3/1] bg-darkteal flex items-center justify-center overflow-hidden relative border-b-2 border-border-color">
                {formData.imageUrl && !imageError ? (
                  isVideoFormat(formData.imageUrl) ? (
                    <video src={formData.imageUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                  ) : (
                    <img src={formData.imageUrl} alt="Preview Cover" className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center bg-yellow-green/30 w-full h-full p-4 text-center">
                    <span className="text-4xl">{formData.icon || '📝'}</span>
                  </div>
                )}
                {formData.tag && (
                  <div className="absolute top-2.5 right-2.5 bg-cayenne text-white rounded-md px-2.5 py-0.5 text-[10px] font-mono font-black border border-border-color shadow-[1.5px_1.5px_0_var(--border-color)]">
                    {formData.tag}
                  </div>
                )}
              </div>

              <div className="p-5 space-y-3 font-mono">
                <div className="text-[11px] font-mono font-black text-cayenne uppercase flex items-center gap-2">
                  <span>{formData.category}</span>
                  <span>•</span>
                  <span>{formData.date}</span>
                </div>

                <h3 className="font-head font-black text-base text-evergreen leading-snug uppercase">
                  {formData.title || 'Untitled Article'}
                </h3>

                <p className="text-xs text-evergreen/80 font-bold leading-relaxed line-clamp-3 font-body">
                  {formData.excerpt || 'Article summary description will appear here as you type...'}
                </p>

                <div className="pt-3 border-t-2 border-border-color/20 flex justify-between items-center text-[10px] font-mono font-black text-evergreen/70">
                  <span>By {formData.author}</span>
                  <span>⏱️ {formData.readTime}</span>
                </div>
              </div>
            </article>

            <div className="text-xs font-mono text-white/90 font-bold text-center">
              Real-time store view preview updates dynamically (1440 × 480 px banner).
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="w-full py-3.5 text-xs font-mono font-black uppercase bg-yellow-green text-black border-2 border-border-color shadow-hard hover:bg-neo-yellow hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2 rounded-xl"
            >
              <IconRenderer icon="/icon/button/save_white.svg" alt="Publish" className="w-5 h-5 object-contain" />
              <span>{isSubmitting ? 'PUBLISHING...' : formData.id ? 'SAVE CHANGES' : 'PUBLISH ARTICLE'}</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

