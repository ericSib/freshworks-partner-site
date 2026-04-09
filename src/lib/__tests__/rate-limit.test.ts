import { describe, it, expect, vi, beforeEach } from 'vitest';

import {
  checkRateLimit,
  resetRateLimiter,
  MAX_REQUESTS,
  WINDOW_MS,
} from '../rate-limit';

describe('checkRateLimit', () => {
  beforeEach(() => {
    resetRateLimiter();
    vi.restoreAllMocks();
  });

  it('allows the first request', () => {
    const result = checkRateLimit('192.168.0.1');

    expect(result.allowed).toBe(true);
    expect(result.retryAfterMs).toBe(0);
  });

  it('allows up to MAX_REQUESTS within the window', () => {
    for (let i = 0; i < MAX_REQUESTS; i++) {
      const result = checkRateLimit('192.168.0.2');
      expect(result.allowed).toBe(true);
    }
  });

  it('blocks the request exceeding MAX_REQUESTS', () => {
    for (let i = 0; i < MAX_REQUESTS; i++) {
      checkRateLimit('192.168.0.3');
    }

    const result = checkRateLimit('192.168.0.3');

    expect(result.allowed).toBe(false);
    expect(result.retryAfterMs).toBeGreaterThan(0);
  });

  it('allows requests again after the window expires', () => {
    const baseTime = 1_000_000_000_000;
    vi.spyOn(Date, 'now').mockReturnValue(baseTime);

    // Exhaust the limit.
    for (let i = 0; i < MAX_REQUESTS; i++) {
      checkRateLimit('192.168.0.4');
    }

    // Still blocked right at the limit.
    expect(checkRateLimit('192.168.0.4').allowed).toBe(false);

    // Advance time past the window.
    vi.spyOn(Date, 'now').mockReturnValue(baseTime + WINDOW_MS + 1);

    const result = checkRateLimit('192.168.0.4');

    expect(result.allowed).toBe(true);
    expect(result.retryAfterMs).toBe(0);
  });

  it('tracks different IPs independently', () => {
    // Exhaust limit for IP A.
    for (let i = 0; i < MAX_REQUESTS; i++) {
      checkRateLimit('10.0.0.1');
    }

    expect(checkRateLimit('10.0.0.1').allowed).toBe(false);

    // IP B should still be allowed.
    const result = checkRateLimit('10.0.0.2');

    expect(result.allowed).toBe(true);
    expect(result.retryAfterMs).toBe(0);
  });

  it('returns a meaningful retryAfterMs when blocked', () => {
    const baseTime = 1_000_000_000_000;
    vi.spyOn(Date, 'now').mockReturnValue(baseTime);

    for (let i = 0; i < MAX_REQUESTS; i++) {
      checkRateLimit('192.168.0.5');
    }

    // Advance a little within the window.
    const elapsed = 60_000; // 1 minute
    vi.spyOn(Date, 'now').mockReturnValue(baseTime + elapsed);

    const result = checkRateLimit('192.168.0.5');

    expect(result.allowed).toBe(false);
    // The oldest entry was at baseTime, so retry after WINDOW_MS - elapsed.
    expect(result.retryAfterMs).toBe(WINDOW_MS - elapsed);
  });
});

describe('resetRateLimiter', () => {
  it('clears all stored state', () => {
    // Exhaust the limit.
    for (let i = 0; i < MAX_REQUESTS; i++) {
      checkRateLimit('192.168.0.6');
    }

    expect(checkRateLimit('192.168.0.6').allowed).toBe(false);

    resetRateLimiter();

    // After reset the IP should be allowed again.
    const result = checkRateLimit('192.168.0.6');

    expect(result.allowed).toBe(true);
    expect(result.retryAfterMs).toBe(0);
  });
});
