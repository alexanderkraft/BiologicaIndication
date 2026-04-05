import { z } from 'zod';

/**
 * Zod schema for all required environment variables.
 * Validated at startup — the app will throw if any are missing or invalid.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  // Auth0
  AUTH0_SECRET: z.string().min(32),
  AUTH0_BASE_URL: z.string().url(),
  AUTH0_ISSUER_BASE_URL: z.string().url(),
  AUTH0_CLIENT_ID: z.string().min(1),
  AUTH0_CLIENT_SECRET: z.string().min(1),
  // Database
  DATABASE_URL: z.string().url(),
  // App
  NEXT_PUBLIC_APP_VERSION: z.string().default('0.0.1'),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validates and returns all environment variables.
 * Throws a descriptive error if validation fails.
 *
 * @returns Validated environment variables
 * @throws Error if any required environment variable is missing or invalid
 */
function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const missing = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('\n');
    throw new Error(`Invalid environment configuration:\n${missing}`);
  }

  return result.data;
}

// Only validate in server context (not during static export)
export const env: Env =
  typeof window === 'undefined' && process.env.NODE_ENV !== 'test'
    ? validateEnv()
    : (process.env as unknown as Env);
