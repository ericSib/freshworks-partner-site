import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormInput } from "../FormInput";

/**
 * US-23.3 — FormInput contract tests.
 * Three concerns: label/input wiring, error state announcement, and
 * pass-through of native input props (name, placeholder, type, etc.).
 */

describe("FormInput", () => {
  it("associates the label with the input via htmlFor + id", () => {
    render(<FormInput label="Email" id="email" name="email" />);
    const label = screen.getByText("Email");
    const input = screen.getByLabelText("Email");
    expect(label).toHaveAttribute("for", "email");
    expect(input).toHaveAttribute("id", "email");
  });

  it("renders without an error message when error is undefined", () => {
    render(<FormInput label="Name" id="name" />);
    const input = screen.getByLabelText("Name");
    expect(input).not.toHaveAttribute("aria-invalid", "true");
    expect(input).not.toHaveAttribute("aria-describedby");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("announces an error via role=alert + aria-describedby when error is set", () => {
    render(
      <FormInput
        label="Email"
        id="email"
        error="Email invalide"
      />
    );
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("id", "email-error");
    expect(alert).toHaveTextContent("Email invalide");
  });

  it("forwards native input props (name, type, placeholder)", () => {
    render(
      <FormInput
        label="Company"
        id="company"
        name="company"
        type="text"
        placeholder="Your company"
      />
    );
    const input = screen.getByLabelText("Company");
    expect(input).toHaveAttribute("name", "company");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("placeholder", "Your company");
  });
});
