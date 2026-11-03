"use client";

import { useEffect } from "react";
import { SelectField, TextAreaField, TextField } from "./Field";
import { ErrorSummary, PreviewNotice, PreviewStatus } from "./FormShell";
import { phoneDigits, useMockForm, type Rules } from "./useMockForm";

const rules: Rules = {
  name: { label: "Name", required: "Enter your name" },
  email: {
    label: "Email address",
    required: "Enter your email address",
    format: "Enter an email address in the correct format, like name@example.com",
  },
  phone: { label: "Phone number", custom: phoneDigits("Enter a phone number with at least 10 digits, like (216) 555-0123") },
  message: { label: "Message", required: "Enter your message" },
};

const topics = [
  { value: "general", label: "General question" },
  { value: "dodd-agency-provider", label: "DODD Agency Provider" },
  { value: "health-care-consultant", label: "Health Care Consultant" },
];

export function ContactForm() {
  const { formRef, summaryRef, errors, previewed, onSubmit } = useMockForm(rules);

  // Preselect the topic when arriving from a service page (?service=...).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("service");
    const select = formRef.current?.elements.namedItem("topic");
    if (requested && select instanceof HTMLSelectElement && topics.some((t) => t.value === requested)) {
      select.value = requested;
    }
  }, [formRef]);

  return (
    <div>
      <PreviewNotice id="contact-form-notice">
        <p className="font-semibold">Preview only: this form doesn&apos;t send messages yet.</p>
        <p className="mt-1">
          Please call or email The Lion Group directly for now. Nothing you enter here leaves this page.
        </p>
      </PreviewNotice>

      <form
        ref={formRef}
        method="dialog"
        aria-labelledby="contact-form-heading"
        aria-describedby="contact-form-notice"
        onSubmit={onSubmit}
        className="mt-8 space-y-7"
      >
        <ErrorSummary summaryRef={summaryRef} errors={errors} rules={rules} title="Check the following before continuing" />

        <TextField id="name" label="Name" required autoComplete="name" error={errors.name} />
        <div className="grid gap-7 md:grid-cols-2">
          <TextField
            id="email"
            label="Email address"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            error={errors.email}
          />
          <TextField
            id="phone"
            label="Phone number"
            type="tel"
            autoComplete="tel"
            error={errors.phone}
          />
        </div>
        <SelectField id="topic" label="What is your question about?" options={topics} defaultValue="general" />
        <TextAreaField id="message" label="Message" required error={errors.message} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
          <p className="text-[0.9375rem]">Preview only: nothing will be sent.</p>
        </div>

        <PreviewStatus previewed={previewed}>
          <p className="font-semibold">Mockup only: nothing was sent.</p>
          <p className="mt-1">
            This form isn&apos;t connected to a destination yet. Integration is pending client approval.
          </p>
        </PreviewStatus>
      </form>
    </div>
  );
}
