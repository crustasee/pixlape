import { AssetItem, CategoryType, OSFilterType, SortOption } from '@/types';
import { ASSETS_DATA } from '@/data/assets';
import { prisma, checkDbConnection } from '@/lib/db';

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function prismaProductToAsset(p: any): AssetItem {
  const numericId =
    typeof p.id === 'number'
      ? p.id
      : parseInt(p.id, 10) || (Math.abs(hashCode(String(p.id))) % 90000) + 10000;

  return {
    id: numericId,
    slug: p.slug,
    name: p.name,
    desc: p.desc || '',
    size: p.size || '10 MB',
    os: Array.isArray(p.os) ? p.os : ['windows', 'macos'],
    rating: String(p.rating ?? '5.0'),
    downloads: String(p.downloads ?? '0'),
    tag: p.tag || 'NEW',
    icon: p.icon || '📦',
    license: p.license || 'Freeware',
    version: p.version || 'v1.0.0',
    category: (p.category as CategoryType) || 'design_app',
    isPremium: Boolean(p.isPremium),
    price: p.price
      ? typeof p.price === 'number'
        ? `$${p.price}`
        : String(p.price)
      : p.isPremium
        ? '$29'
        : 'FREE',
    downloadUrl: p.downloadLink || p.downloadUrl || '',
    stock: p.stock ?? 100,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

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
            const defaultMap = new Map(ASSETS_DATA.map((a) => [a.id, a]));
            this.assets = parsed.map((item: AssetItem) => {
              const defaultItem = defaultMap.get(item.id);
              if (defaultItem) {
                return {
                  ...item,
                  icon: defaultItem.icon,
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
      price: data.price
        ? String(data.price).startsWith('$')
          ? String(data.price)
          : `$${data.price}`
        : data.isPremium
          ? '$29'
          : 'FREE',
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
      price:
        data.price !== undefined
          ? String(data.price).startsWith('$')
            ? String(data.price)
            : `$${data.price}`
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

  static async getAllAsync(): Promise<AssetItem[]> {
    const isConnected = await checkDbConnection();
    if (isConnected && prisma) {
      try {
        const products = await prisma.product.findMany({
          orderBy: { createdAt: 'desc' },
        });
        if (products.length > 0) {
          return products.map(prismaProductToAsset);
        }
      } catch (err) {
        console.warn('⚠️ Error querying products from DB, falling back to static store:', err);
      }
    }
    return store.getAll();
  }

  static syncWithDatabase(): AssetItem[] {
    return store.syncWithDatabase();
  }

  static getById(id: number | string): AssetItem | null {
    return store.getById(id);
  }

  static async getByIdAsync(id: number | string): Promise<AssetItem | null> {
    const isConnected = await checkDbConnection();
    if (isConnected && prisma) {
      try {
        const strId = String(id);
        const product = await prisma.product.findFirst({
          where: {
            OR: [{ id: strId }, { slug: strId }],
          },
        });
        if (product) {
          return prismaProductToAsset(product);
        }
      } catch (err) {
        console.warn('⚠️ Error fetching product by ID from DB, falling back to static store:', err);
      }
    }
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

  static async createAssetAsync(data: Partial<AssetItem>): Promise<AssetItem> {
    const isConnected = await checkDbConnection();
    if (isConnected && prisma) {
      try {
        const rawPrice = data.price
          ? parseFloat(String(data.price).replace(/[^0-9.]/g, '')) || 0
          : 0;
        const slug = (data.name || 'untitled')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
        const created = await prisma.product.create({
          data: {
            slug: `${slug}-${Date.now().toString(36)}`,
            name: data.name || 'Untitled Asset',
            desc: data.desc || '',
            price: rawPrice,
            category: data.category || 'design_app',
            size: data.size || '10 MB',
            os: data.os || ['windows', 'macos'],
            tag: data.tag || 'NEW',
            icon: data.icon || '📦',
            license: data.license || 'Freeware',
            version: data.version || 'v1.0.0',
            isPremium: Boolean(data.isPremium),
            downloadLink: data.downloadUrl || '',
          },
        });
        const asset = prismaProductToAsset(created);
        store.createAsset(asset);
        return asset;
      } catch (err) {
        console.warn('⚠️ Error creating product in DB, falling back to static store:', err);
      }
    }
    return store.createAsset(data);
  }

  static updateAsset(id: number | string, data: Partial<AssetItem>): AssetItem | null {
    return store.updateAsset(id, data);
  }

  static async updateAssetAsync(
    id: number | string,
    data: Partial<AssetItem>
  ): Promise<AssetItem | null> {
    const isConnected = await checkDbConnection();
    if (isConnected && prisma) {
      try {
        const strId = String(id);
        const updateData: any = {};
        if (data.name !== undefined) updateData.name = data.name;
        if (data.desc !== undefined) updateData.desc = data.desc;
        if (data.category !== undefined) updateData.category = data.category;
        if (data.size !== undefined) updateData.size = data.size;
        if (data.os !== undefined) updateData.os = data.os;
        if (data.tag !== undefined) updateData.tag = data.tag;
        if (data.icon !== undefined) updateData.icon = data.icon;
        if (data.license !== undefined) updateData.license = data.license;
        if (data.version !== undefined) updateData.version = data.version;
        if (data.isPremium !== undefined) updateData.isPremium = Boolean(data.isPremium);
        if (data.downloadUrl !== undefined) updateData.downloadLink = data.downloadUrl;
        if (data.price !== undefined) {
          updateData.price = parseFloat(String(data.price).replace(/[^0-9.]/g, '')) || 0;
        }

        const updated = await prisma.product.update({
          where: { id: strId },
          data: updateData,
        });
        const asset = prismaProductToAsset(updated);
        store.updateAsset(id, asset);
        return asset;
      } catch (err) {
        console.warn('⚠️ Error updating product in DB, falling back to static store:', err);
      }
    }
    return store.updateAsset(id, data);
  }

  static deleteAsset(id: number | string): boolean {
    return store.deleteAsset(id);
  }

  static async deleteAssetAsync(id: number | string): Promise<boolean> {
    const isConnected = await checkDbConnection();
    if (isConnected && prisma) {
      try {
        await prisma.product.delete({ where: { id: String(id) } });
      } catch (err) {
        console.warn('⚠️ Error deleting product in DB, falling back to static store:', err);
      }
    }
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
      result.sort(
        (a, b) =>
          parseFloat(String(b.rating || '0')) - parseFloat(String(a.rating || '0'))
      );
    } else if (sort === 'newest') {
      result.sort((a, b) => Number(b.id) - Number(a.id));
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

  static async getStatsAsync() {
    const isConnected = await checkDbConnection();
    if (isConnected && prisma) {
      try {
        const prodCount = await prisma.product.count();
        const premiumCount = await prisma.product.count({ where: { isPremium: true } });
        const categoriesCount = (await prisma.product.groupBy({ by: ['category'] })).length;
        return {
          totalAssets: prodCount,
          premiumAssets: premiumCount,
          freeAssets: prodCount - premiumCount,
          categoriesCount: categoriesCount || 5,
          securityStatus: '100% VirusTotal Verified',
        };
      } catch (err) {
        console.warn('⚠️ Error fetching stats from DB, falling back to static store:', err);
      }
    }
    return AssetService.getStats();
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
