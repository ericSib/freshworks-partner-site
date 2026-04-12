/**
 * T16 — Deep structural parity test between fr.json and en.json.
 *
 * Ensures both translation files have identical key structures,
 * preventing desynchronization after content refactoring.
 */

import { describe, it, expect } from "vitest";
import frMessages from "@/messages/fr.json";
import enMessages from "@/messages/en.json";

/**
 * Recursively extract all key paths from a nested object.
 * Arrays are walked by index (e.g., "cards.0.title").
 */
function extractKeyPaths(obj: unknown, prefix = ""): string[] {
  const paths: string[] = [];

  if (obj === null || obj === undefined || typeof obj !== "object") {
    return [prefix];
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return [prefix];
    obj.forEach((item, i) => {
      paths.push(...extractKeyPaths(item, `${prefix}.${i}`));
    });
    return paths;
  }

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null) {
      paths.push(...extractKeyPaths(value, path));
    } else {
      paths.push(path);
    }
  }

  return paths;
}

describe("i18n FR/EN parity (T16)", () => {
  const frPaths = extractKeyPaths(frMessages).sort();
  const enPaths = extractKeyPaths(enMessages).sort();

  it("FR and EN have the same number of key paths", () => {
    expect(frPaths.length).toBe(enPaths.length);
  });

  it("every FR key path exists in EN", () => {
    const enSet = new Set(enPaths);
    const missingInEn = frPaths.filter((p) => !enSet.has(p));
    expect(
      missingInEn,
      missingInEn.length > 0
        ? `Keys in FR but missing in EN:\n${missingInEn.join("\n")}`
        : undefined
    ).toHaveLength(0);
  });

  it("every EN key path exists in FR", () => {
    const frSet = new Set(frPaths);
    const missingInFr = enPaths.filter((p) => !frSet.has(p));
    expect(
      missingInFr,
      missingInFr.length > 0
        ? `Keys in EN but missing in FR:\n${missingInFr.join("\n")}`
        : undefined
    ).toHaveLength(0);
  });

  it("services cards have the same count in FR and EN", () => {
    const fr = frMessages as Record<string, unknown>;
    const en = enMessages as Record<string, unknown>;
    const frCards = (fr.services as Record<string, unknown>).cards;
    const enCards = (en.services as Record<string, unknown>).cards;
    expect(Array.isArray(frCards)).toBe(true);
    expect(Array.isArray(enCards)).toBe(true);
    expect((frCards as unknown[]).length).toBe((enCards as unknown[]).length);
  });

  it("problems cards have the same count in FR and EN", () => {
    const fr = frMessages as Record<string, unknown>;
    const en = enMessages as Record<string, unknown>;
    const frCards = (fr.problems as Record<string, unknown>).cards;
    const enCards = (en.problems as Record<string, unknown>).cards;
    expect(Array.isArray(frCards)).toBe(true);
    expect(Array.isArray(enCards)).toBe(true);
    expect((frCards as unknown[]).length).toBe((enCards as unknown[]).length);
  });

  it("FAQ items have the same count in FR and EN", () => {
    const fr = frMessages as Record<string, unknown>;
    const en = enMessages as Record<string, unknown>;
    const frItems = (fr.faq as Record<string, unknown>).items;
    const enItems = (en.faq as Record<string, unknown>).items;
    expect(Array.isArray(frItems)).toBe(true);
    expect(Array.isArray(enItems)).toBe(true);
    expect((frItems as unknown[]).length).toBe((enItems as unknown[]).length);
  });
});
