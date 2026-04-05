import type { AuditEventInput } from '@biologica/shared-types';
import { logger } from './logger';

/**
 * Writes an audit event to the database.
 *
 * This service must be called from all API routes.
 * It catches its own errors and never disrupts the main request.
 * The AuditEvent table has no application-level delete or update routes.
 *
 * @param event - The audit event to write
 * @returns Promise that resolves when the event is written (or silently fails)
 */
export async function writeAuditEvent(event: AuditEventInput): Promise<void> {
  try {
    // Dynamic import to avoid issues during build/test
    const db = await import('@biologica/db');
    await db.prisma.auditEvent.create({
      data: {
        eventType: event.eventType,
        actorId: event.actorId,
        organisationId: event.organisationId ?? null,
        resourceType: event.resourceType ?? null,
        resourceId: event.resourceId ?? null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        metadata: (event.metadata ?? null) as any,
        ipAddress: event.ipAddress ?? null,
        userAgent: event.userAgent ?? null,
      },
    });
  } catch (err) {
    // Audit errors must never disrupt the main request
    logger.error(
      { err, event: { eventType: event.eventType, actorId: event.actorId } },
      'Failed to write audit event',
    );
  }
}

/**
 * AuditEventService class — injectable service for writing audit events.
 */
export class AuditEventService {
  /**
   * Writes an audit event to the database.
   *
   * @param event - The audit event to write
   * @returns Promise that resolves when the event is written
   */
  async writeEvent(event: AuditEventInput): Promise<void> {
    return writeAuditEvent(event);
  }
}
