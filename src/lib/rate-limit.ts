/**
 * In-memory sliding window rate limiter.
 *
 * Designed for Vercel serverless functions where each cold-start gets a fresh
 * Map. Within a single instance lifetime it enforces a per-IP request cap
 * using a sliding window algorithm.
 */

/** Maximum requests allowed inside the sliding window. */
export const MAX_REQUESTS = 5;

/** Sliding window duration in milliseconds (15 minutes). */
export const WINDOW_MS = 15 * 60 * 1000;

/** Per-IP store of request timestamps (epoch ms). */
const ipTimestamps: Map<string, number[]> = new Map();

export interface RateLimitResult {
  /** Whether the request is allowed. */
  allowed: boolean;
  /** Milliseconds the caller should wait before retrying (0 when allowed). */
  retryAfterMs: number;
}

/**
 * Check whether a request from `ip` is within the rate limit.
 *
 * On every call the function:
 * 1. Evicts timestamps older than the current window.
 * 2. Decides if the request count is below the cap.
 * 3. If allowed, records the current timestamp.
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Retrieve existing timestamps or start fresh.
  let timestamps = ipTimestamps.get(ip);

  if (timestamps) {
    // Garbage-collect entries outside the current window.
    timestamps = timestamps.filter((ts) => ts > windowStart);
  } else {
    timestamps = [];
  }

  if (timestamps.length >= MAX_REQUESTS) {
    // The oldest timestamp still inside the window determines when the
    // caller can retry (i.e. when that entry falls outside the window).
    const oldestInWindow = timestamps[0];
    const retryAfterMs = oldestInWindow + WINDOW_MS - now;

    ipTimestamps.set(ip, timestamps);
    return { allowed: false, retryAfterMs };
  }

  // Record this request and persist back to the map.
  timestamps.push(now);
  ipTimestamps.set(ip, timestamps);

  return { allowed: true, retryAfterMs: 0 };
}

/** Reset all stored state. Intended for use in tests only. */
export function resetRateLimiter(): void {
  ipTimestamps.clear();
}
