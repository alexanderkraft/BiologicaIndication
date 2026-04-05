import { NextResponse } from 'next/server';
import type { HealthCheckResponse } from '@biologica/shared-types';

/**
 * Health check endpoint.
 * Returns the application status and version.
 *
 * @returns Health check response with status and timestamp
 */
export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  const response: HealthCheckResponse = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.NEXT_PUBLIC_APP_VERSION ?? '0.0.1',
  };

  return NextResponse.json(response);
}
