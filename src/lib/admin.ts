// =============================================================================
// PIXLAPE — Admin Auth & Guard Utilities
// =============================================================================
// Consolidated from admin-guard.ts and admin-auth.ts.
// Exports:
//   - isAdminUser()        — check if a user role string is ADMIN
//   - verifyAdminRequest() — header secret or dev-mode bypass check
//   - verifyAdmin()        — JWT Bearer token verification for API routes
// =============================================================================

import jwt from 'jsonwebtoken';
import { UserRole } from '@/types';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'dev-secret-key-pixlape';

/**
 * Check if a user role string equals ADMIN (case-insensitive).
 * Use this for server-component or session-based role guards.
 */
export function isAdminUser(role?: UserRole | string | null): boolean {
  if (!role) return false;
  return role.toUpperCase() === 'ADMIN';
}

/**
 * Check request header for `x-admin-secret`, or fall back to dev-mode allow.
 * Use this for simple header-authenticated server actions / API routes.
 */
export async function verifyAdminRequest(req?: Request): Promise<boolean> {
  if (!req) return true; // fallback for server component calls
  const adminSecret = req.headers.get('x-admin-secret');
  if (adminSecret && adminSecret === process.env.ADMIN_SECRET) {
    return true;
  }
  return process.env.NODE_ENV === 'development';
}

/**
 * Verify a JWT Bearer token in the `Authorization` header.
 * Returns a minimal user payload on success, or null on failure.
 * Use this for protected API routes that require a valid admin JWT.
 */
export async function verifyAdmin(
  req: Request
): Promise<{ success: boolean; userId?: string }> {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return { success: false };
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId?: string; sub?: string; role?: string };
    if (decoded.role !== 'ADMIN') {
      return { success: false };
    }
    return { success: true, userId: decoded.sub || decoded.userId };
  } catch {
    return { success: false };
  }
}
