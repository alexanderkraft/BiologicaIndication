import { getSession, withApiAuthRequired, withPageAuthRequired } from '@auth0/nextjs-auth0';

export { getSession, withApiAuthRequired, withPageAuthRequired };

/**
 * Auth0 role claim key in JWT.
 */
export const ROLES_CLAIM = 'https://biologica-indication/roles';

/**
 * Extracts the user's role from the Auth0 session.
 *
 * @param session - The Auth0 session object
 * @returns The user's role or undefined if not set
 */
export function getUserRole(session: { user: Record<string, unknown> }): string | undefined {
  const roles = session.user[ROLES_CLAIM];
  if (Array.isArray(roles) && roles.length > 0) {
    return roles[0] as string;
  }
  return undefined;
}
