"use client";

import { useState } from "react";
import { EMAIL_REGEX } from "@/lib/validation";
import { trackContactSubmit } from "@/lib/analytics";

type FormState = "idle" | "sending" | "success" | "error";

/**
 * Challenge option keys — maps to `contact.form.challengeOptions.*` translations.
 */
export const CHALLENGE_KEYS = [
  "adoption",
  "cx",
  "tool",
  "migration",
  "scale",
  "itam",
  "other",
] as const;

interface SubmittedData {
  name: string;
  email: string;
}

interface UseContactFormReturn {
  formState: FormState;
  errors: Record<string, string>;
  submittedData: SubmittedData | null;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/**
 * Encapsulates contact form state, validation, and submission.
 *
 * @param t - Translation function scoped to the "contact" namespace.
 */
export function useContactForm(
  t: (key: string) => string
): UseContactFormReturn {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  const validate = (form: FormData) => {
    const errs: Record<string, string> = {};
    if (!form.get("name")) errs.name = t("form.required");
    const email = form.get("email") as string;
    if (!email) errs.email = t("form.required");
    else if (!EMAIL_REGEX.test(email)) errs.email = t("form.invalidEmail");
    if (!form.get("company")) errs.company = t("form.required");
    if (!form.get("challenge") || form.get("challenge") === "")
      errs.challenge = t("form.required");
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          challenge: form.get("challenge"),
          website: form.get("website") ?? "",
        }),
      });
      if (!res.ok) throw new Error("API error");
      setSubmittedData({
        name: form.get("name") as string,
        email: form.get("email") as string,
      });
      setFormState("success");
      trackContactSubmit();
    } catch {
      setFormState("error");
    }
  };

  return { formState, errors, submittedData, handleSubmit };
}
