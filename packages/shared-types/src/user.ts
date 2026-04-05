/**
 * User roles in the system.
 */
export type UserRole = 'physician' | 'content_admin' | 'org_admin' | 'auditor';

/**
 * Represents an authenticated user session.
 */
export interface AuthUser {
  /** Auth0 subject identifier */
  sub: string;
  /** User email address */
  email: string;
  /** Assigned role */
  role: UserRole;
  /** Organisation identifier */
  organisationId: string;
  /** Whether the user has accepted the disclaimer */
  disclaimerAccepted: boolean;
}
