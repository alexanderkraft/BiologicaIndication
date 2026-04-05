import { PrismaClient } from '@prisma/client';

declare global {
  // Allow reuse of PrismaClient in development hot reloading
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

/**
 * Singleton Prisma client instance.
 * In development, reuses the global instance to avoid creating too many connections.
 * In production, creates a new instance.
 *
 * @returns The singleton Prisma client
 */
function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });
}

export const prisma: PrismaClient =
  process.env.NODE_ENV === 'production' ? createPrismaClient() : (globalThis.__prisma ??= createPrismaClient());
