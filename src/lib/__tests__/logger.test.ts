import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createLogger } from "@/lib/logger";

describe("createLogger", () => {
  const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-04-13T10:00:00.000Z"));
    logSpy.mockClear();
    errorSpy.mockClear();
    warnSpy.mockClear();
    vi.stubEnv("LOG_LEVEL", "");
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
  });

  it("emits structured JSON with service and timestamp", () => {
    const log = createLogger("TestService");
    log.info("hello world");

    expect(logSpy).toHaveBeenCalledOnce();
    const entry = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(entry).toMatchObject({
      level: "info",
      service: "TestService",
      message: "hello world",
      timestamp: "2026-04-13T10:00:00.000Z",
    });
  });

  it("includes extra fields in the JSON output", () => {
    const log = createLogger("Svc");
    log.info("created", { contactId: "123", email: "a@b.com" });

    const entry = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(entry.contactId).toBe("123");
    expect(entry.email).toBe("a@b.com");
  });

  it("includes requestId when provided", () => {
    const log = createLogger("Svc", "req-abc-123");
    log.info("test");

    const entry = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(entry.requestId).toBe("req-abc-123");
  });

  it("omits requestId when not provided", () => {
    const log = createLogger("Svc");
    log.info("test");

    const entry = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(entry.requestId).toBeUndefined();
  });

  it("routes error level to console.error", () => {
    const log = createLogger("Svc");
    log.error("boom", new Error("fail"));

    expect(errorSpy).toHaveBeenCalledOnce();
    const entry = JSON.parse(errorSpy.mock.calls[0][0] as string);
    expect(entry.level).toBe("error");
    expect(entry.errorMessage).toBe("fail");
    expect(entry.errorStack).toBeDefined();
  });

  it("routes warn level to console.warn", () => {
    const log = createLogger("Svc");
    log.warn("careful");

    expect(warnSpy).toHaveBeenCalledOnce();
    const entry = JSON.parse(warnSpy.mock.calls[0][0] as string);
    expect(entry.level).toBe("warn");
  });

  it("handles non-Error objects in error()", () => {
    const log = createLogger("Svc");
    log.error("oops", "string-error");

    const entry = JSON.parse(errorSpy.mock.calls[0][0] as string);
    expect(entry.errorRaw).toBe("string-error");
  });

  it("respects LOG_LEVEL=warn (suppresses info)", () => {
    vi.stubEnv("LOG_LEVEL", "warn");
    const log = createLogger("Svc");

    log.info("should be suppressed");
    log.warn("should appear");

    expect(logSpy).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledOnce();
  });

  it("respects LOG_LEVEL=error (suppresses info and warn)", () => {
    vi.stubEnv("LOG_LEVEL", "error");
    const log = createLogger("Svc");

    log.info("no");
    log.warn("no");
    log.error("yes", undefined);

    expect(logSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledOnce();
  });

  it("child() inherits service and overrides requestId", () => {
    const parent = createLogger("Svc", "parent-id");
    const child = parent.child({ requestId: "child-id" });

    child.info("from child");

    const entry = JSON.parse(logSpy.mock.calls[0][0] as string);
    expect(entry.service).toBe("Svc");
    expect(entry.requestId).toBe("child-id");
  });

  it("defaults to info level when LOG_LEVEL is invalid", () => {
    vi.stubEnv("LOG_LEVEL", "nonsense");
    const log = createLogger("Svc");

    log.debug("should be suppressed");
    log.info("should appear");

    expect(logSpy).toHaveBeenCalledOnce();
  });
});
