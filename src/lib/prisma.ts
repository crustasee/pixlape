import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  try {
    return new PrismaClient();
  } catch (error) {
    console.warn('⚠️ [Prisma] Could not initialize PrismaClient in this environment:', error);
    return null as unknown as PrismaClient;
  }
};

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: undefined | PrismaClient | null;
}

export const prisma =
  globalThis.prismaGlobal !== undefined ? globalThis.prismaGlobal : prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

