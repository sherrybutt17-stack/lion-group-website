"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type FormControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface FieldRule {
  /** Shown in the error summary and next to the field. */
  label: string;
  required?: string;
  format?: string;
  custom?: (control: FormControl) => string | undefined;
}

/** Phone numbers need at least 10 digits; punctuation and spaces are fine. */
export const phoneDigits = (message: string) => (control: FormControl) =>
  control.value && control.value.replace(/\D/g, "").length < 10 ? message : undefined;

export type Rules = Record<string, FieldRule>;
export type Errors = Record<string, string>;

function validate(form: HTMLFormElement, rules: Rules): Errors {
  const errors: Errors = {};
  for (const [name, rule] of Object.entries(rules)) {
    const control = form.elements.namedItem(name);
    if (!(control instanceof HTMLInputElement || control instanceof HTMLTextAreaElement || control instanceof HTMLSelectElement)) {
      continue;
    }
    const { validity } = control;
    if (validity.valueMissing && rule.required) errors[name] = rule.required;
    else if ((validity.typeMismatch || validity.patternMismatch) && rule.format) errors[name] = rule.format;
    else if (rule.custom) {
      const message = rule.custom(control);
      if (message) errors[name] = message;
    }
  }
  return errors;
}

/**
 * Client-side validation for the mockup forms. Nothing is ever sent: a valid
 * submit only switches the form into its "preview" status message. Errors are
 * updated on submit only, so messages never shift the layout mid-interaction.
 */
export function useMockForm(rules: Rules) {
  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [previewed, setPreviewed] = useState(false);

  // With JS available we show our own error summary instead of browser bubbles.
  useEffect(() => {
    if (formRef.current) formRef.current.noValidate = true;
  }, []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(event.currentTarget, rules);
    setErrors(next);
    const hasErrors = Object.keys(next).length > 0;
    setPreviewed(!hasErrors);
    if (hasErrors) requestAnimationFrame(() => summaryRef.current?.focus());
  };

  return { formRef, summaryRef, errors, previewed, onSubmit };
}
