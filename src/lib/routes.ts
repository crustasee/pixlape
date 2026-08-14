/**
 * Admin Navigation Routes & Single-Source-of-Truth Config
 */

export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string | null;
}

export const ADMIN_MAIN_MENU: NavItem[] = [
  { label: 'OVERVIEW', href: '/admin', icon: 'public/icon/1overview.svg', badge: null },
  { label: 'PRODUCT', href: '/admin/products', icon: 'public/icon/1product.svg', badge: '41' },
  { label: 'CLOUD', href: '/admin/cloud', icon: 'public/icon/1cloud.svg', badge: 'MIRRORS' },
  { label: 'DOCUMENT & BLOG', href: '/admin/document', icon: 'public/icon/1blogs.svg', badge: 'NEW' },
];

export const ADMIN_TOOLS_MENU: NavItem[] = [
  { label: 'Tools', href: '/admin/tools', icon: 'public/icon/1tools.svg', badge: 'Manage' },
  { label: 'Setting', href: '/admin/settings', icon: 'public/icon/1setting.svg', badge: null },
];

export const ADMIN_SYSTEM_MENU: NavItem[] = [
  { label: 'Audit Logs', href: '/admin/changelog', icon: 'public/icon/1log.svg', badge: 'v2.5' },
];

/**
 * Checks if a route path is currently active
 */
export function isNavActive(pathname: string, href: string): boolean {
  if (!pathname) return false;
  if (href === '/admin') {
    return pathname === '/admin';
  }
  return pathname === href || pathname.startsWith(href + '/');
}
