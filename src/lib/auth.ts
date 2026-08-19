import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { prisma } from "./db";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
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
});