import { AssetItem, CategoryType, OSFilterType, SortOption } from '@/types';
import { ASSETS_DATA, ASSET_DATABASE } from '@/data/assets';

type Listener = () => void;

class AssetStore {
  private assets: AssetItem[] = [];
  private listeners: Listener[] = [];
  private initialized = false;

  constructor() {
    this.init();
  }

  private init() {
    if (this.initialized) return;
    this.initialized = true;

    // Start with default assets from data module
    this.assets = ASSETS_DATA.map((item) => ({ ...item }));

    // Hydrate from localStorage if in browser environment
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('pixlape_custom_assets');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Sync default asset icons and details from ASSETS_DATA while preserving custom user items
            const defaultMap = new Map(ASSETS_DATA.map((a) => [a.id, a]));
            this.assets = parsed.map((item: AssetItem) => {
              const defaultItem = defaultMap.get(item.id);
              if (defaultItem) {
                return {
                  ...item,
                  icon: defaultItem.icon, // Sync icon to catalog definition
                };
              }
              return item;
            });
          }
        }
      } catch (e) {
        console.error('Failed to load custom assets from localStorage', e);
      }
    }
  }

  public syncWithDatabase(): AssetItem[] {
    this.assets = ASSETS_DATA.map((item) => ({ ...item }));
    this.save();
    return [...this.assets];
  }

  private save() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('pixlape_custom_assets', JSON.stringify(this.assets));
      } catch (e) {
        console.error('Failed to persist assets to localStorage', e);
      }
    }
    this.notify();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public getAll(): AssetItem[] {
    this.init();
    return [...this.assets];
  }

  public getById(id: number | string): AssetItem | null {
    this.init();
    const targetId = typeof id === 'number' ? id : parseInt(id, 10);
    const asset = this.assets.find((a) => a.id === targetId || String(a.id) === String(id));
    return asset ? { ...asset } : null;
  }

  public getBySlugOrId(identifier: string | number): AssetItem | null {
    this.init();
    if (!identifier) return null;
    const str = String(identifier).trim().toLowerCase();
    const asset = this.assets.find(
      (a) =>
        String(a.id) === str ||
        a.name.toLowerCase().replace(/\s+/g, '-') === str ||
        a.name.toLowerCase() === str
    );
    return asset ? { ...asset } : this.getById(identifier);
  }

  public createAsset(data: Partial<AssetItem>): AssetItem {
    this.init();
    const maxId = this.assets.reduce((max, a) => (a.id > max ? a.id : max), 0);
    const newId = maxId + 1;

    const newAsset: AssetItem = {
      id: newId,
      name: data.name || 'Untitled Asset',
      desc: data.desc || '',
      size: data.size || '10 MB',
      os: data.os || ['windows', 'macos'],
      rating: data.rating || '5.0',
      downloads: data.downloads || '0',
      tag: data.tag || 'NEW',
      icon: data.icon || '📦',
      license: data.license || 'MIT License',
      version: data.version || 'v1.0.0',
      category: data.category || 'design_app',
      isPremium: Boolean(data.isPremium),
      price: data.price ? (String(data.price).startsWith('$') ? String(data.price) : `$${data.price}`) : data.isPremium ? '$29' : 'FREE',
      downloadUrl: data.downloadUrl || '',
      bannerImage: data.bannerImage || '',
      detailsMarkdown: data.detailsMarkdown || '',
      markdownFile: data.markdownFile || '',
      requirements: data.requirements || {},
    };

    this.assets.unshift(newAsset);
    this.save();
    return newAsset;
  }

  public updateAsset(id: number | string, data: Partial<AssetItem>): AssetItem | null {
    this.init();
    const targetId = typeof id === 'number' ? id : parseInt(id, 10);
    const index = this.assets.findIndex((a) => a.id === targetId || String(a.id) === String(id));

    if (index === -1) return null;

    const existing = this.assets[index];
    const updated: AssetItem = {
      ...existing,
      ...data,
      id: existing.id,
      price: data.price !== undefined
        ? (String(data.price).startsWith('$') ? String(data.price) : `$${data.price}`)
        : existing.price,
    };

    this.assets[index] = updated;
    this.save();
    return updated;
  }

  public deleteAsset(id: number | string): boolean {
    this.init();
    const targetId = typeof id === 'number' ? id : parseInt(id, 10);
    const initialLength = this.assets.length;
    this.assets = this.assets.filter((a) => a.id !== targetId && String(a.id) !== String(id));
    const deleted = this.assets.length < initialLength;
    if (deleted) {
      this.save();
    }
    return deleted;
  }

  public togglePremium(id: number | string): AssetItem | null {
    const existing = this.getById(id);
    if (!existing) return null;
    return this.updateAsset(id, { isPremium: !existing.isPremium });
  }
}

const store = new AssetStore();

export class AssetService {
  static subscribe(listener: Listener): () => void {
    return store.subscribe(listener);
  }

  static getAll(): AssetItem[] {
    return store.getAll();
  }

  static syncWithDatabase(): AssetItem[] {
    return store.syncWithDatabase();
  }

  static getById(id: number | string): AssetItem | null {
    return store.getById(id);
  }

  static getBySlugOrId(identifier: string | number): AssetItem | null {
    return store.getBySlugOrId(identifier);
  }

  static getByCategory(category: CategoryType): AssetItem[] {
    const all = store.getAll();
    return all.filter((item) => item.category === category);
  }

  static createAsset(data: Partial<AssetItem>): AssetItem {
    return store.createAsset(data);
  }

  static updateAsset(id: number | string, data: Partial<AssetItem>): AssetItem | null {
    return store.updateAsset(id, data);
  }

  static deleteAsset(id: number | string): boolean {
    return store.deleteAsset(id);
  }

  static togglePremium(id: number | string): AssetItem | null {
    return store.togglePremium(id);
  }

  static filterAssets({
    category = 'design_app',
    os = 'all',
    query = '',
    sort = 'popular',
  }: {
    category?: CategoryType;
    os?: OSFilterType;
    query?: string;
    sort?: SortOption;
  }): { items: AssetItem[]; total: number } {
    let result = store.getAll().filter((item) => !category || item.category === category);

    if (os !== 'all') {
      result = result.filter((item) => {
        if (!item.os) return true;
        if (item.os.includes('all')) return true;
        if (os === 'mobile' && item.os.includes('android')) return true;
        return item.os.includes(os);
      });
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q)
      );
    }

    if (sort === 'popular') {
      result.sort((a, b) => parseFloat(b.rating || '0') - parseFloat(a.rating || '0'));
    } else if (sort === 'newest') {
      result.sort((a, b) => b.id - a.id);
    } else if (sort === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return {
      items: result,
      total: result.length,
    };
  }

  static getStats() {
    const all = store.getAll();
    const premiumCount = all.filter((a) => a.isPremium).length;
    const categoriesCount = new Set(all.map((a) => a.category)).size;
    return {
      totalAssets: all.length,
      premiumAssets: premiumCount,
      freeAssets: all.length - premiumCount,
      categoriesCount,
      securityStatus: '100% VirusTotal Verified',
    };
  }

  static getCategoryCounts(): Record<CategoryType, number> {
    const all = store.getAll();
    const counts: Record<CategoryType, number> = {
      design_app: 0,
      multimedia: 0,
      apk_package: 0,
      tools_app: 0,
      art_graphics: 0,
    };
    all.forEach((item) => {
      if (item.category && counts[item.category] !== undefined) {
        counts[item.category] += 1;
      }
    });
    return counts;
  }
}
