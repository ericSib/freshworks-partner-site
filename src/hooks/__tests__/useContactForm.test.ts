import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useContactForm } from "../useContactForm";

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

/** Identity translation function — returns the key as-is. */
const t = (key: string) => key;

/**
 * Populate the mocked FormData map and build a minimal
 * React form submit event that `handleSubmit` can consume.
 */
function setupFormData(data: Record<string, string>) {
  mockFormDataStore.clear();
  for (const [key, value] of Object.entries(data)) {
    mockFormDataStore.set(key, value);
  }
}

function createSubmitEvent() {
  return {
    preventDefault: vi.fn(),
    currentTarget: {},
  } as unknown as React.FormEvent<HTMLFormElement>;
}

/* ------------------------------------------------------------------ */
/*  Mocks                                                             */
/* ------------------------------------------------------------------ */

const mockFormDataStore = new Map<string, string>();

vi.stubGlobal("fetch", vi.fn());

beforeEach(() => {
  vi.restoreAllMocks();

  // Re-stub fetch after restoreAllMocks clears it
  vi.stubGlobal("fetch", vi.fn());

  // Mock FormData so `new FormData(form)` returns our controlled store.
  vi.stubGlobal(
    "FormData",
    class MockFormData {
      get(key: string) {
        return mockFormDataStore.get(key) ?? null;
      }
    }
  );

  mockFormDataStore.clear();
});

/* ------------------------------------------------------------------ */
/*  Tests                                                             */
/* ------------------------------------------------------------------ */

describe("useContactForm", () => {
  /* ---- 1. Initial state ----------------------------------------- */
  it("returns correct initial state", () => {
    const { result } = renderHook(() => useContactForm(t));

    expect(result.current.formState).toBe("idle");
    expect(result.current.errors).toEqual({});
    expect(result.current.submittedData).toBeNull();
    expect(typeof result.current.handleSubmit).toBe("function");
  });

  /* ---- 2. Validation — all empty fields ------------------------- */
  it("sets 4 errors when all fields are empty", async () => {
    const { result } = renderHook(() => useContactForm(t));

    setupFormData({});

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent());
    });

    expect(Object.keys(result.current.errors)).toHaveLength(4);
    expect(result.current.errors.name).toBe("form.required");
    expect(result.current.errors.email).toBe("form.required");
    expect(result.current.errors.company).toBe("form.required");
    expect(result.current.errors.challenge).toBe("form.required");
    expect(result.current.formState).toBe("idle");
  });

  /* ---- 3. Validation — invalid email format --------------------- */
  it("returns invalidEmail error for a badly-formatted email", async () => {
    const { result } = renderHook(() => useContactForm(t));

    setupFormData({
      name: "Alice",
      email: "invalid",
      company: "Acme",
      challenge: "cx",
    });

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent());
    });

    expect(result.current.errors.email).toBe("form.invalidEmail");
    // Other fields should NOT have errors
    expect(result.current.errors.name).toBeUndefined();
    expect(result.current.errors.company).toBeUndefined();
    expect(result.current.errors.challenge).toBeUndefined();
    expect(result.current.formState).toBe("idle");
  });

  /* ---- 4. Validation — valid data, no errors -------------------- */
  it("produces no validation errors when all fields are valid", async () => {
    const { result } = renderHook(() => useContactForm(t));

    setupFormData({
      name: "Alice",
      email: "alice@example.com",
      company: "Acme",
      challenge: "adoption",
    });

    // Stub fetch to resolve so handleSubmit doesn't throw
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent());
    });

    expect(result.current.errors).toEqual({});
  });

  /* ---- 5. Submission success (fetch 200) ------------------------ */
  it('transitions to "success" and exposes submittedData on 200', async () => {
    const { result } = renderHook(() => useContactForm(t));

    setupFormData({
      name: "Bob",
      email: "bob@test.io",
      company: "Corp",
      challenge: "migration",
    });

    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent());
    });

    expect(result.current.formState).toBe("success");
    expect(result.current.submittedData).toEqual({
      name: "Bob",
      email: "bob@test.io",
    });
  });

  /* ---- 6. Submission error (fetch 500) -------------------------- */
  it('transitions to "error" when fetch returns 500', async () => {
    const { result } = renderHook(() => useContactForm(t));

    setupFormData({
      name: "Charlie",
      email: "charlie@example.com",
      company: "Startup",
      challenge: "scale",
    });

    vi.mocked(fetch).mockResolvedValueOnce(
      new Response("Internal Server Error", { status: 500 })
    );

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent());
    });

    expect(result.current.formState).toBe("error");
    expect(result.current.submittedData).toBeNull();
  });

  /* ---- 7. Honeypot "website" field in payload ------------------- */
  it('includes the honeypot "website" field in the fetch payload', async () => {
    const { result } = renderHook(() => useContactForm(t));

    setupFormData({
      name: "Dana",
      email: "dana@example.com",
      company: "BigCo",
      challenge: "tool",
      website: "spam-bot-value",
    });

    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );

    await act(async () => {
      await result.current.handleSubmit(createSubmitEvent());
    });

    expect(fetch).toHaveBeenCalledOnce();

    const [url, options] = vi.mocked(fetch).mock.calls[0];
    expect(url).toBe("/api/contact");

    const body = JSON.parse((options as RequestInit).body as string);
    expect(body).toEqual({
      name: "Dana",
      email: "dana@example.com",
      company: "BigCo",
      challenge: "tool",
      website: "spam-bot-value",
    });
  });
});
