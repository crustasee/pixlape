// =============================================================================
// PIXLAPE — NextAuth Configuration (stub)
// =============================================================================
// NextAuth is not yet wired up — no providers are configured and the
// next-auth package is not installed. The login flow is handled manually
// via /api/auth/login using JWT (jsonwebtoken).
// See lib/admin.ts for JWT verification utilities used by API routes.
// =============================================================================

export const authOptions = {
  providers: [],
  session: { strategy: 'jwt' as const },
  secret: process.env.NEXTAUTH_SECRET,
};
