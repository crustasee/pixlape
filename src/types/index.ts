// =============================================================================
// PIXLAPE — Unified Type Definitions
// =============================================================================
// All project-wide types are consolidated here.
// Sections:
//   1. Common / Enum Types
//   2. Asset / Frontend Types
//   3. Blog & FAQ Types
//   4. Product (Backend) Types
//   5. Order Types
//   6. User Types
// =============================================================================

// -----------------------------------------------------------------------------
// 1. Common / Enum Types
// -----------------------------------------------------------------------------

export type CategoryType = 'design_app' | 'multimedia' | 'apk_package' | 'tools_app' | 'art_graphics';

export type OSFilterType = 'all' | 'windows' | 'macos' | 'linux' | 'mobile' | 'cli';

export type SortOption = 'popular' | 'newest' | 'name';

// -----------------------------------------------------------------------------
// 2. Asset / Frontend Types
// -----------------------------------------------------------------------------

export interface AssetItem {
  id: number;
  name: string;
  desc: string;
  tagline?: string;
  size: string;
  os: string[];
  rating: string;
  downloads: string;
  tag: string;
  icon: string;
  license: string;
  version: string;
  category?: CategoryType;
  isPremium?: boolean;
  price?: string;
  bannerImage?: string;
  detailsMarkdown?: string;
  markdownFile?: string;
  requirements?: Record<string, string>;
}

// -----------------------------------------------------------------------------
// 3. Blog & FAQ Types
// -----------------------------------------------------------------------------

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  tag: string;
  icon: string;
  content?: string;
  imageUrl?: string;
  caption?: string;
  highlights?: string[];
  shareUrls?: { twitter?: string; linkedin?: string };
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

// -----------------------------------------------------------------------------
// 4. Product (Backend/Admin) Types
// -----------------------------------------------------------------------------

export interface Product {
  id: string | number;
  slug: string;
  name: string;
  desc: string;
  size: string;
  os: string[] | OSFilterType[];
  rating: string | number;
  downloads: string | number;
  tag: string;
  icon: string;
  license: string;
  version: string;
  category: CategoryType | string;
  isPremium: boolean;
  price: number | string;
  stock?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateProductInput {
  name: string;
  slug?: string;
  desc: string;
  price: number;
  category: string;
  size?: string;
  os?: string[];
  tag?: string;
  license?: string;
  version?: string;
  isPremium?: boolean;
  stock?: number;
}

// -----------------------------------------------------------------------------
// 5. Order Types
// -----------------------------------------------------------------------------

export type OrderStatus = 'pending' | 'completed' | 'cancelled' | 'failed';

export interface OrderItem {
  id: string | number;
  productId: string | number;
  productName: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string | number;
  userId: string | number;
  userEmail: string;
  userName: string;
  totalAmount: number;
  status: OrderStatus;
  items: OrderItem[];
  createdAt: string | Date;
  updatedAt?: string | Date;
}

// -----------------------------------------------------------------------------
// 6. User Types
// -----------------------------------------------------------------------------

export type UserRole = 'USER' | 'ADMIN';

export interface User {
  id: string | number;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
  createdAt: string | Date;
}
