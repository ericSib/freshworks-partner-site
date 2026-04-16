import { NextResponse } from "next/server";

const HUBSPOT_API = "https://api.hubapi.com";

interface DependencyStatus {
  name: string;
  status: "ok" | "degraded" | "unavailable";
  latencyMs?: number;
}

/** Ping HubSpot with a minimal API call (requires token). */
async function checkHubSpot(): Promise<DependencyStatus> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) return { name: "hubspot", status: "unavailable" };

  const start = Date.now();
  try {
    const res = await fetch(`${HUBSPOT_API}/crm/v3/objects/contacts?limit=1`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(3000),
    });
    return {
      name: "hubspot",
      status: res.ok ? "ok" : "degraded",
      latencyMs: Date.now() - start,
    };
  } catch {
    return {
      name: "hubspot",
      status: "unavailable",
      latencyMs: Date.now() - start,
    };
  }
}

/** Ping Resend API. */
async function checkResend(): Promise<DependencyStatus> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { name: "resend", status: "unavailable" };

  const start = Date.now();
  try {
    const res = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(3000),
    });
    return {
      name: "resend",
      status: res.ok ? "ok" : "degraded",
      latencyMs: Date.now() - start,
    };
  } catch {
    return {
      name: "resend",
      status: "unavailable",
      latencyMs: Date.now() - start,
    };
  }
}

/**
 * Health-check endpoint for load balancers / uptime monitors.
 *
 * GET /api/health        → quick 200 (no dep checks)
 * GET /api/health?deep=1 → checks HubSpot + Resend connectivity
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const deep = url.searchParams.get("deep") === "1";

  const base = {
    status: "ok" as const,
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "0.1.0",
  };

  if (!deep) {
    return NextResponse.json(base);
  }

  const deps = await Promise.all([checkHubSpot(), checkResend()]);
  const allOk = deps.every((d) => d.status === "ok");

  return NextResponse.json(
    {
      ...base,
      status: allOk ? "ok" : "degraded",
      dependencies: deps,
    },
    { status: allOk ? 200 : 207 }
  );
}
