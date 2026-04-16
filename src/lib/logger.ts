/**
 * Structured JSON logger — zero dependencies.
 *
 * Outputs one JSON object per line for easy parsing by Vercel, Datadog, etc.
 * Supports log levels and an optional request ID for correlation.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/** Minimum log level — controlled via LOG_LEVEL env var. Defaults to "info". */
function getMinLevel(): LogLevel {
  const env = process.env.LOG_LEVEL?.toLowerCase();
  if (env && env in LEVEL_PRIORITY) return env as LogLevel;
  return "info";
}

interface LogEntry {
  level: LogLevel;
  service: string;
  message: string;
  timestamp: string;
  requestId?: string;
  [key: string]: unknown;
}

function shouldLog(level: LogLevel): boolean {
  return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[getMinLevel()];
}

function emit(entry: LogEntry): void {
  const out = JSON.stringify(entry);
  if (entry.level === "error") {
    console.error(out);
  } else if (entry.level === "warn") {
    console.warn(out);
  } else {
    console.log(out);
  }
}

export interface Logger {
  debug(message: string, extra?: Record<string, unknown>): void;
  info(message: string, extra?: Record<string, unknown>): void;
  warn(message: string, extra?: Record<string, unknown>): void;
  error(message: string, error?: unknown, extra?: Record<string, unknown>): void;
  child(overrides: { requestId?: string }): Logger;
}

/**
 * Create a logger scoped to a service name.
 *
 * @example
 * const log = createLogger("HubSpot");
 * log.info("Contact created", { contactId: "123" });
 * // → {"level":"info","service":"HubSpot","message":"Contact created","contactId":"123","timestamp":"..."}
 */
export function createLogger(service: string, requestId?: string): Logger {
  function log(
    level: LogLevel,
    message: string,
    extra?: Record<string, unknown>
  ): void {
    if (!shouldLog(level)) return;
    const entry: LogEntry = {
      level,
      service,
      message,
      timestamp: new Date().toISOString(),
      ...(requestId && { requestId }),
      ...extra,
    };
    emit(entry);
  }

  return {
    debug: (msg, extra) => log("debug", msg, extra),
    info: (msg, extra) => log("info", msg, extra),
    warn: (msg, extra) => log("warn", msg, extra),
    error: (msg, err, extra) => {
      const errorData: Record<string, unknown> = { ...extra };
      if (err instanceof Error) {
        errorData.errorMessage = err.message;
        errorData.errorStack = err.stack;
      } else if (err !== undefined) {
        errorData.errorRaw = String(err);
      }
      log("error", msg, errorData);
    },
    child: (overrides) =>
      createLogger(service, overrides.requestId ?? requestId),
  };
}
