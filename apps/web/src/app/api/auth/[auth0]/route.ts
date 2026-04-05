import { handleAuth, handleLogin, handleCallback, handleLogout } from '@auth0/nextjs-auth0';
import { writeAuditEvent } from '@/lib/audit';
import type { NextRequest } from 'next/server';

/**
 * Auth0 authentication route handler.
 * Handles login, callback, and logout flows.
 * Writes audit events for login and logout actions.
 */
export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      // Request 60-minute session with refresh token rotation
      max_age: 3600,
    },
  }),
  callback: handleCallback({
    async afterCallback(_req: NextRequest, session: { user: { sub: string; email: string } }) {
      // Write login audit event
      await writeAuditEvent({
        eventType: 'USER_LOGIN',
        actorId: session.user.sub,
        metadata: { email: session.user.email },
      });
      return session;
    },
  }),
  logout: handleLogout({
    returnTo: '/',
  }),
});
