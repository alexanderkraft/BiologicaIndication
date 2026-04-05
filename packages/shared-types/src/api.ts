/**
 * Standard API error response shape.
 */
export interface ApiError {
  error: string;
  code: string;
}

/**
 * Standard API success response wrapper.
 */
export interface ApiSuccess<T> {
  data: T;
}

/**
 * Union type for API responses.
 */
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

/**
 * Health check response.
 */
export interface HealthCheckResponse {
  status: 'ok' | 'degraded';
  timestamp: string;
  version: string;
}
