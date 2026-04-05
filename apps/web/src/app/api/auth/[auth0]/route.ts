import { handleAuth, handleLogin, handleCallback, handleLogout } from '@auth0/nextjs-auth0';
import { writeAuditEvent } from '@/lib/audit';
import type { Session } from '@auth0/nextjs-auth0';
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
    async afterCallback(_req: NextRequest, session: Session) {
      // Write login audit event
      await writeAuditEvent({
        eventType: 'USER_LOGIN',
        actorId: session.user.sub as string,
        metadata: { email: session.user.email as string },
      });
      return session;
    },
  }),
  logout: handleLogout({
    returnTo: '/',
  }),
});
