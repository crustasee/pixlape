'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AssetItem } from '@/types';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { IconRenderer, isImageIcon } from '@/components/ui/IconRenderer';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

export interface ProductFormProps {
  initialData?: Partial<AssetItem>;
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

const AVAILABLE_OS = [
  { id: 'windows', label: 'Windows' },
  { id: 'macos', label: 'macOS' },
  { id: 'linux', label: 'Linux' },
  { id: 'cli', label: 'CLI / Shell' },
];

const PRESET_SVG_ICONS = [
  { label: 'software', path: '/icon/allapps.svg' },
  { label: 'app', path: '/icon/appssoftware.svg' },
  { label: 'design', path: '/icon/stock/adobe-dw.svg' },
  { label: 'multimedia', path: '/icon/multimedia.svg' },
  { label: 'apk', path: '/icon/android21.svg' },
  { label: 'graphics', path: '/icon/stock/adobe_draw.svg' },
  { label: 'CLI Tool', path: '/icon/console.svg' },
  { label: 'Dev Kit', path: '/icon/devtools.svg' },
  { label: 'Gimp', path: '/icon/stock/gimp.svg' },
  { label: 'paint', path: '/icon/stock/paint.svg' },
  { label: 'Documentation', path: '/icon/stock/doc.svg' },
  { label: 'Finance', path: '/icon/finance.svg' },
  { label: 'art graphic', path: '/icon/graphicdraw.svg' },
  { label: 'note', path: '/icon/stock/evernote.svg' },
  { label: 'Charts', path: '/icon/chart.svg' },
  { label: 'Tag', path: '/icon/stock/dino.svg' },
  { label: 'MediaEncoder', path: '/icon/stock/media_encoder.svg' },
  { label: 'java', path: '/icon/stock/java.svg' },
];

const PRESET_ICONS = [
  '⚡', '🎨', '📦', '💻', '🛠️', '🎵', '🚀', '🔥',
  '⚙️', '💎', '🎮', '📱', '🔒', '🌐', '📊', '✨',
];

const VERSION_PRESETS = ['v1.0.0', 'v2.4.0', 'v2026.1', 'v3.0.0'];
const SIZE_PRESETS = ['15 MB', '85 MB', '450 MB', '1.2 GB', '2.4 GB'];
const LICENSE_PRESETS = ['CC0 1.0 Universal', 'MIT License', 'OFL Font License', 'Commercial Pro'];

const isPresetIcon = (iconStr?: string) => {
  if (!iconStr) return false;
  if (PRESET_ICONS.includes(iconStr)) return true;
  return PRESET_SVG_ICONS.some(
    (s) => s.path === iconStr || s.path.replace(/^public\//, '/') === iconStr.replace(/^public\//, '/')
  );
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  const initialPrice = typeof initialData?.price === 'number'
    ? initialData.price
    : parseFloat(String(initialData?.price || '0').replace(/[^0-9.]/g, '')) || 0;

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    desc: initialData?.desc || '',
    tagline: initialData?.tagline || '',
    price: initialPrice,
    category: initialData?.category || 'tools_app',
    size: initialData?.size || '15 MB',
    tag: initialData?.tag || 'VERIFIED',
    license: initialData?.license || 'CC0 1.0 Universal',
    version: initialData?.version || 'v1.0.0',
    isPremium: initialData?.isPremium || false,
    os: initialData?.os || ['windows', 'macos'],
    downloadUrl: initialData?.downloadUrl || '',
    bannerImage: initialData?.bannerImage || '',
    detailsMarkdown: initialData?.detailsMarkdown || '',
    markdownFile: initialData?.markdownFile || '',
    requirementsRaw: initialData?.requirements ? JSON.stringify(initialData.requirements, null, 2) : '',
  });

  const availableOS = AVAILABLE_OS;
  const presetSvgIcons = PRESET_SVG_ICONS;
  const presetIcons = PRESET_ICONS;
  const versionPresets = VERSION_PRESETS;
  const sizePresets = SIZE_PRESETS;
  const licensePresets = LICENSE_PRESETS;

  const initialIcon = initialData?.icon || '/icon/product.svg';
  const initialIsCustom = isImageIcon(initialIcon) && !isPresetIcon(initialIcon);

  const [icon, setIcon] = useState<string>(initialIsCustom ? '📦' : initialIcon);
  const [customIconUrl, setCustomIconUrl] = useState<string>(initialIsCustom ? initialIcon : '');
  const [useCustomIcon, setUseCustomIcon] = useState<boolean>(initialIsCustom);
  const [activeFormTab, setActiveFormTab] = useState<'basic' | 'media' | 'tier' | 'docs'>('basic');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        desc: initialData.desc || '',
        tagline: initialData.tagline || '',
        price: initialData.price ? (typeof initialData.price === 'number' ? initialData.price : parseFloat(String(initialData.price).replace(/[^0-9.]/g, '')) || 0) : 0,
        category: initialData.category || 'tools_app',
        size: initialData.size || '15 MB',
        tag: initialData.tag || 'VERIFIED',
        license: initialData.license || 'CC0 1.0 Universal',
        version: initialData.version || 'v1.0.0',
        isPremium: initialData.isPremium || false,
        os: initialData.os || ['windows', 'macos'],
        downloadUrl: initialData.downloadUrl || '',
        bannerImage: initialData.bannerImage || '',
        detailsMarkdown: initialData.detailsMarkdown || '',
        markdownFile: initialData.markdownFile || '',
        requirementsRaw: initialData.requirements ? JSON.stringify(initialData.requirements, null, 2) : '',
      });
      const initIcon = initialData.icon || '/icon/product.svg';
      const isCustom = isImageIcon(initIcon) && !isPresetIcon(initIcon);
      setUseCustomIcon(isCustom);
      if (isCustom) {
        setCustomIconUrl(initIcon);
        setIcon('📦');
      } else {
        setIcon(initIcon);
        setCustomIconUrl('');
      }
    }
  }, [initialData]);

  const currentActiveIcon = useCustomIcon && customIconUrl.trim() ? customIconUrl.trim() : icon;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === 'price') {
      setFormData((prev) => ({ ...prev, price: parseFloat(value) || 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const toggleOS = (osId: string) => {
    setFormData((prev) => {
      const currentOS = prev.os || [];
      if (currentOS.includes(osId)) {
        return { ...prev, os: currentOS.filter((item) => item !== osId) };
      } else {
        return { ...prev, os: [...currentOS, osId] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let parsedRequirements: Record<string, string> = {};
    if (formData.requirementsRaw.trim()) {
      try {
        parsedRequirements = JSON.parse(formData.requirementsRaw);
      } catch (err) {
        formData.requirementsRaw.split('\n').forEach((line) => {
          const parts = line.split(':');
          if (parts.length >= 2) {
            parsedRequirements[parts[0].trim()] = parts.slice(1).join(':').trim();
          }
        });
      }
    }

    onSubmit({
      ...formData,
      icon: currentActiveIcon,
      requirements: parsedRequirements,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-full space-y-8 select-none font-mono">

      {/* ──======================== Sticky Configurator Control Header ========================── */}
      <div className="bg-yellow-green p-3 rounded-lg border border-border-color shadow-hard-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sticky top-15 z-15">
        <div>
          <div className="flex items-center gap-3">
          </div>
          <h2 className="text-2xl font-black font-mono text-darkteal tracking-tight uppercase">
            {initialData?.name ? `Edit Asset: ${initialData.name}` : 'Create New Asset Product'}
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Link href="/admin/products">
            <Button type="button" variant="neutral" className="font-mono text-xl font-black uppercase bg-cayenne text-white px-9">
              cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            className="font-mono text-sm font-black text-darkteal uppercase bg-green-500 border border-border-color hover:translate-x-0.5 hover:translate-y-0.5 transition-all py-2.5 px-9 cursor-pointer"
          >
            <span>{isSubmitting ? 'SAVING...' : initialData?.name ? 'SAVE' : 'PUBLISH ASSET'}</span>
          </Button>
        </div>
      </div>

      {/* ── Main Form Layout: 2 Columns (Form Fields + Live Interactive Preview Card) ── */}
      <div className="grid grid-cols-1 items-start">

        {/* ── LEFT / MAIN FORM AREA (8 Cols) - UNIFIED BEIGE PANEL ── */}
        <div className="lg:col-span-8 bg-yellow-50 p-6 sm:p-8 rounded-lg border border-border-color shadow-hard-sm space-y-8 font-mono">

          {/* Section 1: Basic Information */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-xl font-mono font-black uppercase tracking-widest text-darkteal border-b-2 border-border-color pb-3 flex items-center gap-5">
              <span>▶ Primary Product Information</span>
            </h3>

            <Input
              label="◯ TITLE *"
              name="name"
              placeholder="e.g. Adobe Master Collection 2026"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="◯ Tagline / Subtitle"
              name="tagline"
              placeholder="e.g. Professional Vector Illustration & Page Layout Software"
              value={formData.tagline}
              onChange={handleChange}
            />

            <RichTextEditor
              label="◯ Full Overview & Description"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Detailed overview of the product, key tools, features, and creative use-cases..."
              minHeight="340px"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="space-y-1 font-mono">
                <label className="block text-sm font-mono font-black uppercase tracking-wider text-darkteal">
                  Asset Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 bg-white border border-border-color rounded-xl text-sm font-mono font-bold text-black focus:outline-none shadow-hard-sm"
                >
                  <option value="tools_app">Tools App</option>
                  <option value="design_app">Design App</option>
                  <option value="multimedia">Multimedia</option>
                  <option value="apk_package">Apk Package</option>
                  <option value="art_graphics">Art & Graphics</option>
                </select>
              </div>

              <div className="space-y-1 font-mono">
                <Input
                  label="Badge Tag"
                  name="tag"
                  placeholder="VERIFIED"
                  value={formData.tag}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="border-t-2 border-border-color/20 my-6" />

          {/* Section 2: Icon & Cover Media */}
          <div className="space-y-5">
            <div className="border-border-color flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-mono font-black uppercase tracking-widest text-darkteal flex items-center gap-5">
                <span>◯ INSERT ICON & IMAGE</span>
              </h3>
              <button
                type="button"
                onClick={() => setUseCustomIcon(!useCustomIcon)}
                className="text-sm font-mono font-black text-darkteal cursor-pointer"
              >
                {useCustomIcon ? 'Switch to Preset Glyphs & SVGs' : 'Switch to Custom Image Path (.png, .svg)'}
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-yellow-50 p-5 rounded-lg border border-border-color shadow-hard-sm">
              <div className="w-20 h-20 rounded-lg bg-white border border-border-color flex items-center justify-center shrink-0 shadow-hard-sm overflow-hidden p-2.5">
                <IconRenderer icon={currentActiveIcon} alt="Icon Preview" className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 space-y-3 w-full">
                {!useCustomIcon ? (
                  <div className="space-y-3">
                    {/* SVG Vector Icon Presets */}
                    <div>
                      <div className="text-xs font-mono font-black text-black mb-2 uppercase">SVG Vector Icon Presets:</div>
                      <div className="flex flex-wrap gap-2">
                        {presetSvgIcons.map((svg) => (
                          <button
                            key={svg.path}
                            type="button"
                            onClick={() => {
                              setIcon(svg.path);
                              setUseCustomIcon(false);
                            }}
                            className={`px-3 py-1.5 rounded-xl border-2 text-xs font-mono font-black flex items-center gap-2 transition-all cursor-pointer ${icon === svg.path && !useCustomIcon
                              ? 'bg-yellow-green text-black border-border-color shadow-[2px_2px_0_var(--border-color)] scale-105'
                              : 'bg-cayenne border-border-color text-black hover:bg-neo-yellow'
                              }`}
                          >
                            <IconRenderer icon={svg.path} alt={svg.label} className="w-4.5 h-4.5 object-contain" />
                            <span>{svg.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Emoji Presets */}
                    <div>
                      <div className="text-xs font-mono font-black text-black mb-2 uppercase">Emoji Glyphs:</div>
                      <div className="flex flex-wrap gap-2">
                        {presetIcons.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => {
                              setIcon(emoji);
                              setUseCustomIcon(false);
                            }}
                            className={`w-9 h-9 rounded-xl text-lg border-2 transition-all flex items-center justify-center cursor-pointer ${icon === emoji && !useCustomIcon
                              ? 'bg-neo-pink text-white border-border-color shadow-[2px_2px_0_var(--border-color)] scale-105'
                              : 'bg-surface border-border-color text-black hover:bg-neo-yellow'
                              }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Input
                      label="Add Icon Path (.svg/.png./.webp/.gif/.ico/.jpg)"
                      placeholder="/icon/shared/addasset.svg"
                      value={customIconUrl}
                      onChange={(e) => setCustomIconUrl(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>

            <Input
              label="◯ Banner Image Cover Path (/Assets/img/...)"
              name="bannerImage"
              placeholder="/Assets/img/cdraw.png"
              value={formData.bannerImage}
              onChange={handleChange}
            />
          </div>

          <div className="border-t-2 border-border-color my-6" />

          {/* Section 3: Pricing, OS & License */}
          <div className="space-y-5">
            <h3 className="text-base sm:text-lg font-mono font-black uppercase tracking-widest text-darkteal pb-3 flex items-center gap-4">
              <span>◯ Access Tier, Pricing & Operating Systems</span>
            </h3>

            {/* Pro Vault Toggle */}
            <div className="flex items-center justify-between p-4 bg-yellow-100 border border-border-color rounded-lg shadow-hard-sm">
              <div>
                <span className="font-mono font-black text-sm uppercase text-darkteal block">Pro Vault Access Tier</span>
                <span className="text-xs font-mono font-bold text-darkteal">Exclusive for Pro membership users</span>
              </div>
              <input
                type="checkbox"
                name="isPremium"
                checked={formData.isPremium}
                onChange={handleChange}
                className="w-6 h-6 rounded border border-border-color focus:ring-0 cursor-pointer"
              />
            </div>

            <div className="flex flex-col w-2xl gap-4">
              <Input
                label="▷ Price (USD $)"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
              />

              {/* Version Presets */}
              <div className="space-y-1 flex flex-col">
                <Input
                  label="▷ Build Version Tag"
                  name="version"
                  placeholder="v2026.1"
                  value={formData.version}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Size & License Presets */}
            <div className="flex flex-col w-2xl md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Input
                  label="▷ Download Size"
                  name="size"
                  placeholder="2.4 GB"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ==============================External Target Download URL Field ============================*/}
            <div className="border border-black rounded-lg p-5 shadow-hard-sm bg-yellow-100 space-y-1">
              <Input
                label="◯ URL External Target Download (Direct CDN / Download Mirror)"
                name="downloadUrl"
                placeholder="e.g. https://drive.google.com/..."
                value={formData.downloadUrl}
                onChange={handleChange}
              />
              <p className="text-sm font-mono font-bold text-yellow-green mt-5">
                🔗 If set, users clicking &quot;DOWNLOAD&quot; on the public asset detail page will be directed to this external link.
              </p>
            </div>

            {/* Operating Systems */}
            <div className="space-y-2 pt-2">
              <label className="block text-sm font-mono font-black uppercase tracking-wider text-darkteal">
                Supported Platforms (Select All That Apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                {availableOS.map((os) => {
                  const isSelected = (formData.os || []).includes(os.id);
                  return (
                    <button
                      key={os.id}
                      type="button"
                      onClick={() => toggleOS(os.id)}
                      className={`px-3.5 py-3 rounded-lg border font-mono sm:text-sm font-black uppercase transition-all flex items-center justify-between cursor-pointer ${isSelected
                        ? 'bg-green-400 text-evergreen border-border-color shadow-[2px_2px_0_var(--border-color)]'
                        : 'bg-red-300 text-cayenne border-border-color hover:bg-green-200'
                        }`}
                    >
                      <span>{os.label}</span>
                      <span>{isSelected ? '✓' : '+'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>


          {/* Section 4: Markdown Documentation Specs */}
          <div className="border border-border-color bg-yellow-100 rounded-lg p-5 shadow-hard-sm space-y-5">
            <h3 className="text-base sm:text-lg font-mono font-black uppercase tracking-widest text-darkteal pb-3 flex items-center gap-6">
              <span>◯ DOCUMENTATION OVERVIEW</span>
            </h3>

            <Input
              label="Description (/public/Description/...)"
              name="markdownFile"
              placeholder="/DescriptionData/CorelDraw2026.md"
              value={formData.markdownFile}
              onChange={handleChange}
              className="bg-green-200 text-sm"
            />

            <div className="space-y-2">
              <label className="block text-[14px] font-mono font-black uppercase tracking-wider text-darkteal">
               ≡ Markdown Details
              </label>
              <textarea
                name="detailsMarkdown"
                value={formData.detailsMarkdown}
                onChange={handleChange}
                rows={6}
                placeholder="### 🎨 Asset Overview&#10;&#10;**Features:**&#10;- Feature 1&#10;- Feature 2..."
                className="w-full px-4 py-3 bg-white border border-border-color rounded-lg text-sm font-mono font-bold text-black placeholder-black/50 focus:outline-none focus:border-neo-pink shadow-hard-sm leading-relaxed"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-mono font-black uppercase tracking-wider text-darkteal">
                ≡ Requirements
              </label>
              <textarea
                name="detailsMarkdown"
                value={formData.detailsMarkdown}
                onChange={handleChange}
                rows={4}
                placeholder={`{\n  "Sistem Operasi": "Windows 11 atau 10 64-bit",\n  "RAM": "8 GB Recommended"\n}`}
                className="w-full px-4 py-3 bg-white border border-border-color rounded-lg text-sm font-mono font-bold text-black placeholder-black/50 focus:outline-none focus:border-neo-pink shadow-hard-sm leading-relaxed"
              />
            </div>
          </div>

        </div>

        {/* ── RIGHT COLUMN (4 Cols): LIVE INTERACTIVE ASSET STORE PREVIEW CARD ── */}
        <div className="lg:col-span-4 space-y-6 sticky top-40">
          <div className="bg-yellow-100 p-6 rounded-lg border border-border-color shadow-hard-sm space-y-5">
            <div className="flex items-center justify-between border-b-2 border-border-color/20 pb-3">
              <span className="text-base font-mono font-black uppercase tracking-widest text-black flex items-center gap-6">
                <IconRenderer icon="/icon/multimedia.svg" alt="Preview" className="w-7 h-7 object-contain" />
                <span>PRODUCT PREVIEW</span>
              </span>
              <span className="text-xs font-mono font-black bg-neo-lime text-black border border-border-color px-2.5 py-1 rounded-md shadow-[1px_1px_0_var(--border-color)]">
                STORE VIEW
              </span>
            </div>

            {/* Simulated Live Public Store Asset Card */}
            <div className="bg-yellow-50 rounded-xl border-2 border-border-color shadow-hard-sm overflow-hidden">
              <div className="w-full h-40 bg-yellow-300 flex items-center justify-center overflow-hidden relative border-b-2 border-border-color p-4">
                {formData.bannerImage ? (
                  <img src={formData.bannerImage} alt="Banner" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-white border-2 border-border-color flex items-center justify-center p-2.5 shadow-hard-sm">
                    <IconRenderer icon={currentActiveIcon} alt="Preview" className="w-full h-full object-contain" />
                  </div>
                )}
                {formData.isPremium && (
                  <div className="absolute top-2.5 right-2.5 bg-soft-linen text-black rounded-md px-2.5 py-1 text-xs font-mono font-black border border-border-color shadow-[1.5px_1.5px_0_var(--border-color)]">
                    ⚡ PRO
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3 font-mono">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 bg-neo-yellow text-black border border-border-color rounded">
                      {formData.category.replace('_', ' ')}
                    </span>
                    <h4 className="font-mono font-black text-base uppercase text-black mt-1 line-clamp-1">
                      {formData.name || 'Untitled Asset'}
                    </h4>
                  </div>
                  <span className="text-base font-mono font-black text-black bg-neo-yellow px-2.5 py-1 rounded-lg border-2 border-border-color shadow-[1.5px_1.5px_0_var(--border-color)] shrink-0">
                    {Number(formData.price) > 0 ? `$${formData.price}` : 'FREE'}
                  </span>
                </div>

                <p className="text-xs text-darkteal font-bold leading-relaxed line-clamp-2">
                  {formData.desc || 'Asset description will appear here as you type...'}
                </p>

                <div className="flex flex-wrap gap-1.5 text-xs font-mono font-black pt-1">
                  <span className="bg-cayenne text-white px-2 py-0.5 rounded border border-border-color">{formData.version}</span>
                  <span className="bg-neo-lime text-black px-2 py-0.5 rounded border border-border-color">{formData.size}</span>
                  {formData.downloadUrl && (
                    <span className="bg-neo-pink text-white px-2 py-0.5 rounded border border-border-color">🔗 EXT DOWNLOAD</span>
                  )}
                  {(formData.os || []).map((o) => (
                    <span key={o} className="bg-surface text-black px-2 py-0.5 rounded border border-border-color uppercase">{o}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-evergreen font-bold text-center">
              Preview updates live as you edit form fields.
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              className="w-full py-4 text-sm font-mono font-bold uppercase tracking-wider bg-green-500 border border-border-color shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-8"
            >
              <span>{isSubmitting ? 'SAVING...' : initialData?.name ? 'SAVE CHANGES' : 'PUBLISH ASSET'}</span>
            </Button>
          </div>
        </div>

      </div>
    </form>
  );
};
