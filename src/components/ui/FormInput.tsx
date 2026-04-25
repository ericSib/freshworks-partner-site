import type { InputHTMLAttributes } from "react";

export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Visible label text — required for a11y. */
  label: string;
  /** Optional error message; rendered as role=alert below the input. */
  error?: string;
};

/**
 * Single source of truth for the dark-themed form input used in
 * Contact.tsx (and any future inline form). Centralizes the 159-char
 * className that was being copy-pasted across name / email / company
 * inputs (US-23.3, Refactoring Radar 25/04/2026).
 *
 * Accessibility:
 * - The label is wired to the input via htmlFor + id.
 * - When an error is set, the input gets aria-invalid + aria-describedby
 *   and the error message renders with role=alert so screen readers
 *   announce it on change.
 */
export function FormInput({ label, error, id, ...rest }: FormInputProps) {
  const errorId = error && id ? `${id}-error` : undefined;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-slate-400 text-sm font-medium mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className="w-full bg-white/[0.03] border border-white/8 rounded-lg px-4 py-3.5 text-surface placeholder:text-slate-600 focus:outline-none focus:border-accent/40 focus:shadow-[0_0_0_3px_rgba(184,146,106,0.08)] transition-all"
        {...rest}
      />
      {error && errorId && (
        <p
          id={errorId}
          role="alert"
          className="text-red-400 text-xs mt-1.5"
        >
          {error}
        </p>
      )}
    </div>
  );
}
