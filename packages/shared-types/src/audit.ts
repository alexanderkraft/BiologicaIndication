/**
 * Supported audit event types.
 */
export type AuditEventType =
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'DISCLAIMER_ACCEPTED'
  | 'ENCOUNTER_CREATED'
  | 'ENCOUNTER_UPDATED'
  | 'ENCOUNTER_VIEWED'
  | 'RECOMMENDATION_GENERATED'
  | 'RECOMMENDATION_VIEWED'
  | 'PATIENT_CASE_CREATED'
  | 'PATIENT_CASE_UPDATED'
  | 'PATIENT_CASE_VIEWED'
  | 'ADMIN_ACTION';

/**
 * Input required to write an audit event.
 */
export interface AuditEventInput {
  /** The type of event */
  eventType: AuditEventType;
  /** Auth0 subject of the acting user */
  actorId: string;
  /** Optional organisation context */
  organisationId?: string;
  /** Optional resource type being acted upon */
  resourceType?: string;
  /** Optional resource identifier */
  resourceId?: string;
  /** Optional unstructured metadata */
  metadata?: Record<string, unknown>;
  /** IP address of the request */
  ipAddress?: string;
  /** User agent string */
  userAgent?: string;
}
