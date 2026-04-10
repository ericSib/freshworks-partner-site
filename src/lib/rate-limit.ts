/**
 * In-memory sliding window rate limiter.
 *
 * Designed for Vercel serverless functions where each cold-start gets a fresh
 * Map. Within a single instance lifetime it enforces a per-IP request cap
 * using a sliding window algorithm.
 *
 * The module exposes a generic `createRateLimiter` factory and two
 * pre-configured instances:
 *
 *  - contactRateLimiter — reused by /api/contact (5 req / 15 min)
 *  - quizRateLimiter    — reused by /api/quiz/submit (10 req / 15 min)
 *
 * Each instance has its own bucket, so a prospect submitting the contact
 * form does not eat into the quota they have for the quiz funnel.
 */

export interface RateLimitResult {
  /** Whether the request is allowed. */
  allowed: boolean;
  /** Milliseconds the caller should wait before retrying (0 when allowed). */
  retryAfterMs: number;
}

export interface RateLimiterConfig {
  /** Maximum requests allowed inside the sliding window. */
  maxRequests: number;
  /** Sliding window duration in milliseconds. */
  windowMs: number;
}

export interface RateLimiter {
  check: (ip: string) => RateLimitResult;
  reset: () => void;
}

/**
 * Build a standalone sliding-window rate limiter. Each call returns a
 * fresh instance with its own in-memory store, so different endpoints
 * never pollute each other's buckets.
 */
export function createRateLimiter({
  maxRequests,
  windowMs,
}: RateLimiterConfig): RateLimiter {
  const ipTimestamps: Map<string, number[]> = new Map();

  function check(ip: string): RateLimitResult {
    const now = Date.now();
    const windowStart = now - windowMs;

    let timestamps = ipTimestamps.get(ip);
    if (timestamps) {
      // Garbage-collect entries outside the current window.
      timestamps = timestamps.filter((ts) => ts > windowStart);
    } else {
      timestamps = [];
    }

    if (timestamps.length >= maxRequests) {
      const oldestInWindow = timestamps[0];
      const retryAfterMs = oldestInWindow + windowMs - now;

      ipTimestamps.set(ip, timestamps);
      return { allowed: false, retryAfterMs };
    }

    timestamps.push(now);
    ipTimestamps.set(ip, timestamps);
    return { allowed: true, retryAfterMs: 0 };
  }

  function reset(): void {
    ipTimestamps.clear();
  }

  return { check, reset };
}

/** Maximum requests for the /api/contact bucket. */
export const MAX_REQUESTS = 5;
/** Sliding window duration in milliseconds (15 minutes). */
export const WINDOW_MS = 15 * 60 * 1000;

/** /api/contact rate limiter — 5 requests per 15 minutes. */
export const contactRateLimiter = createRateLimiter({
  maxRequests: MAX_REQUESTS,
  windowMs: WINDOW_MS,
});

/** /api/quiz/submit rate limiter — 10 requests per 15 minutes. */
export const quizRateLimiter = createRateLimiter({
  maxRequests: 10,
  windowMs: WINDOW_MS,
});

/**
 * Legacy aliases kept for backward compatibility with /api/contact and
 * its existing tests. New code should use the limiter instances above.
 */
export const checkRateLimit = contactRateLimiter.check;
export const resetRateLimiter = contactRateLimiter.reset;
