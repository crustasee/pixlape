import { prisma } from './prisma';

export { prisma };

let lastDbCheckTime = 0;
let cachedDbStatus: boolean | null = null;
const CACHE_TTL_MS = 5000;

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
      setTimeout(() => reject(new Error('Database timeout')), 2000)
    );
    await Promise.race([connectPromise, timeoutPromise]);
    cachedDbStatus = true;
    lastDbCheckTime = now;
    return true;
  } catch (err) {
    console.warn('⚠️ PostgreSQL database is unreachable. Gracefully falling back to Mock Mode.');
    cachedDbStatus = false;
    lastDbCheckTime = now;
    return false;
  }
}
