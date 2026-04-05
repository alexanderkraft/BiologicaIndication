import pino from 'pino';

/**
 * Structured logger instance (pino).
 * Never use console.log in production paths — use this logger.
 *
 * @example
 * logger.info({ userId: 'abc' }, 'User logged in');
 * logger.error({ err }, 'Unexpected error');
 */
export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  ...(process.env.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: { colorize: true },
    },
  }),
  redact: ['req.headers.authorization', 'req.headers.cookie'],
});
