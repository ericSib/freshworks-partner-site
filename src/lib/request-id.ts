/**
 * Correlation ID utilities for request tracing.
 *
 * Generates or extracts a unique request ID per incoming request.
 * The ID is propagated via the `x-request-id` response header.
 */

import { randomUUID } from "crypto";

const REQUEST_ID_HEADER = "x-request-id";

/**
 * Extract an existing request ID from headers or generate a new one.
 */
export function getRequestId(request: Request): string {
  return request.headers.get(REQUEST_ID_HEADER) ?? randomUUID();
}

export { REQUEST_ID_HEADER };
