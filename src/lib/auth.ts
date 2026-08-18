// =============================================================================
// PIXLAPE — NextAuth v5 Configuration
// =============================================================================
// Configures JWT-based Credentials Authentication for Admin Dashboard.
// Supports both PostgreSQL (Prisma) user query and dev fallback admin login.
// =============================================================================

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "dev-secret-key-pixlape",
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = (credentials.email as string).trim().toLowerCase();
        const password = credentials.password as string;

        // 1. Cek PostgreSQL via Prisma jika DB terhubung
        if (prisma) {
          try {
            const user = await prisma.user.findUnique({
              where: { email },
            });

            if (user && user.password) {
              const isValid = await bcrypt.compare(password, user.password);
              if (isValid) {
                return {
                  id: user.id,
                  email: user.email,
                  name: user.name || "Admin User",
                  role: user.role || "ADMIN",
                };
              }
            }
          } catch (dbErr) {
            console.warn("⚠️ [Auth] Database user query fallback:", dbErr);
          }
        }

        // 2. Fallback Kredensial Admin Default (untuk dev/demo/tanpa seeding DB)
        const defaultAdminEmail = (process.env.ADMIN_EMAIL || "admin@store.com").toLowerCase();
        const defaultAdminPassword = process.env.ADMIN_PASSWORD || "admin123";

        const isFallbackMatch =
          (email === defaultAdminEmail && password === defaultAdminPassword) ||
          (email === "admin@pixlape.com" && password === "adminpassword");

        if (isFallbackMatch) {
          return {
            id: "default-admin-id",
            email: email,
            name: "Galih Addi (Admin)",
            role: "ADMIN",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "ADMIN";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});