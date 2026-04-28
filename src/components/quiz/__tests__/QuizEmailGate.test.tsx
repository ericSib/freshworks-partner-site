import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import QuizEmailGate from "../QuizEmailGate";

/**
 * US-26.2 — QuizEmailGate accessibility contract.
 *
 * The email input must have an accessible name (WCAG 2.1 AA §1.3.1
 * "Info and Relationships" + §3.3.2 "Labels or Instructions"). A
 * placeholder alone is not sufficient at level AA — screen readers
 * need an aria-label, <label>, or aria-labelledby.
 *
 * Pattern : aria-label backed by an i18n key (FR/EN), so the spoken
 * announcement matches the user's locale.
 */

const i18nFixture: Record<string, string> = {
  "quiz.results.gateTitle": "Get the full report",
  "quiz.results.gateSubtitle": "Enter your email to unlock",
  "quiz.results.gatePlaceholder": "you@company.com",
  "quiz.results.gateUnlock": "Unlock",
  "quiz.results.gateDisclaimer": "Single use, no spam",
  "quiz.results.gateAriaLabel": "Enter your work email",
};

const t = (key: string) => i18nFixture[key] ?? key;

describe("QuizEmailGate", () => {
  it("renders an email input with an accessible name (US-26.2)", () => {
    render(
      <QuizEmailGate
        email=""
        onEmailChange={vi.fn()}
        gateState="locked"
        onSubmit={vi.fn()}
        t={t}
      />,
    );

    // The input must be findable by accessible name (aria-label OR <label>).
    // Before the fix, this would throw because the input has only a placeholder.
    const input = screen.getByRole("textbox", {
      name: /enter your work email/i,
    });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "email");
  });

  it("uses the i18n key 'quiz.results.gateAriaLabel' for the accessible name", () => {
    const localT = vi.fn((key: string) => i18nFixture[key] ?? key);
    render(
      <QuizEmailGate
        email=""
        onEmailChange={vi.fn()}
        gateState="locked"
        onSubmit={vi.fn()}
        t={localT}
      />,
    );

    expect(localT).toHaveBeenCalledWith("quiz.results.gateAriaLabel");
  });
});
