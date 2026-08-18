import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaInstance: PrismaClient | null = null;
try {
  prismaInstance = globalThis.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== 'production' && prismaInstance) {
    globalThis.prisma = prismaInstance;
  }
} catch (e) {
  console.warn('⚠️ [Prisma] Could not initialize PrismaClient in this runtime:', e);
}

export const prisma = prismaInstance;

let lastDbCheckTime = 0;
let cachedDbStatus: boolean | null = null;
const CACHE_TTL_MS = 5000; // 5 seconds cache for unreachable state

export async function checkDbConnection(): Promise<boolean> {
  const now = Date.now();
  if (cachedDbStatus === true) return true;
  if (cachedDbStatus === false && now - lastDbCheckTime < CACHE_TTL_MS) {
    return false;
  }

  if (!prisma) {
    cachedDbStatus = false;
    lastDbCheckTime = now;
    return false;
  }

  try {
    const connectPromise = prisma.$connect();
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database timeout')), 1000)
    );
    await Promise.race([connectPromise, timeoutPromise]);
    cachedDbStatus = true;
    lastDbCheckTime = now;
    return true;
  } catch (err) {
    console.warn("⚠️ PostgreSQL database is unreachable. Gracefully falling back to Mock Mode.");
    cachedDbStatus = false;
    lastDbCheckTime = now;
    return false;
  }
}
