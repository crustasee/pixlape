import { AssetItem, Product } from '@/types';

/**
 * Utility function to conditionally join classNames
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format currency to IDR / USD format
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

/**
 * Convert AssetItem to Product type
 */
export function assetItemToProduct(item: AssetItem): Product {
  const parsedPrice = item.price
    ? parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0
    : item.isPremium
    ? 29
    : 0;

  const generatedSlug = item.name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

  return {
    id: item.id,
    slug: generatedSlug || String(item.id),
    name: item.name,
    desc: item.desc,
    size: item.size,
    os: item.os,
    rating: item.rating,
    downloads: item.downloads,
    tag: item.tag,
    icon: item.icon,
    license: item.license,
    version: item.version,
    category: item.category || 'design_app',
    isPremium: Boolean(item.isPremium),
    price: parsedPrice,
  };
}

/**
 * Convert a plain text string into a URL-safe slug.
 * Example: "Hello World! 2024" → "hello-world-2024"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Convert Product to AssetItem type
 */
export function productToAssetItem(product: Product): AssetItem {
  return {
    id: typeof product.id === 'string' ? parseInt(product.id, 10) || 1 : product.id,
    name: product.name,
    desc: product.desc,
    size: product.size,
    os: Array.isArray(product.os) ? (product.os as string[]) : ['all'],
    rating: String(product.rating || '5.0'),
    downloads: String(product.downloads || '1.0k'),
    tag: product.tag || 'NEW',
    icon: product.icon || '📦',
    license: product.license || 'MIT License',
    version: product.version || 'v1.0',
    category: product.category as any,
    isPremium: product.isPremium,
    price: typeof product.price === 'number' ? `$${product.price}` : product.price,
  };
}
