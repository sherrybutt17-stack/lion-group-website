"use client";

import { careers } from "@/content/careers";
import { CheckboxField, RadioGroup, TextAreaField, TextField } from "./Field";
import { ErrorSummary, PreviewNotice, PreviewStatus } from "./FormShell";
import { phoneDigits, useMockForm, type Rules } from "./useMockForm";

const { resume } = careers;

const rules: Rules = {
  fullName: { label: "Full name", required: "Enter your full name" },
  email: {
    label: "Email address",
    required: "Enter your email address",
    format: "Enter an email address in the correct format, like name@example.com",
  },
  phone: {
    label: "Phone number",
    required: "Enter your phone number",
    custom: phoneDigits("Enter a phone number with at least 10 digits, like (216) 555-0123"),
  },
  position: { label: "Position of interest", required: "Enter the position you're interested in" },
  experience: { label: "Relevant experience" },
  resume: {
    label: "Resume",
    // Checks only the file's name, type and size. The file is never read or uploaded.
    custom: (control) => {
      const file = control instanceof HTMLInputElement ? control.files?.[0] : undefined;
      if (!file) return undefined;
      const extOk = /\.(pdf|docx?)$/i.test(file.name);
      const typeOk = !file.type || (resume.acceptedTypes as readonly string[]).includes(file.type);
      if (!extOk || !typeOk) return "The selected file must be a PDF, DOC, or DOCX";
      if (file.size > resume.maxBytes) return "The selected file must be smaller than 5 MB";
      return undefined;
    },
  },
  consent: { label: "Consent", required: "Confirm that The Lion Group may review your information" },
  acknowledge: { label: "Acknowledgment", required: "Confirm that you understand applying does not guarantee a job" },
};

export function CareersForm() {
  const { formRef, summaryRef, errors, previewed, onSubmit } = useMockForm(rules);

  return (
    <div>
      <PreviewNotice id="careers-form-notice">
        <p className="font-semibold">Preview only: this form doesn&apos;t send information yet.</p>
        <p className="mt-1">
          Online applications will be connected once The Lion Group confirms where applications go and how resumes are
          stored securely. Until then, nothing you enter here leaves this page.
        </p>
      </PreviewNotice>

      <form
        ref={formRef}
        method="dialog"
        aria-labelledby="apply-heading"
        aria-describedby="careers-form-notice"
        onSubmit={onSubmit}
        className="mt-8 space-y-7"
      >
        <ErrorSummary summaryRef={summaryRef} errors={errors} rules={rules} title="Check the following before continuing" />

        <TextField id="fullName" label="Full name" required autoComplete="name" error={errors.fullName} />
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
            required
            autoComplete="tel"
            error={errors.phone}
          />
        </div>
        <TextField
          id="position"
          label="Position of interest"
          required
          hint="Enter a position from the list above, or “General application”."
          error={errors.position}
        />
        <RadioGroup
          name="employmentType"
          legend="Type of employment you're looking for"
          options={[
            { value: "full-time", label: "Full-time" },
            { value: "part-time", label: "Part-time" },
            { value: "seasonal", label: "Seasonal" },
          ]}
        />
        <TextField id="dateAvailable" label="Date you're available to start" type="date" className="md:max-w-xs" />
        <TextAreaField
          id="experience"
          label="Relevant experience"
          hint="Briefly describe related work experience, certifications, or training."
          error={errors.experience}
        />
        <TextField
          id="resume"
          label="Resume"
          type="file"
          accept={resume.accept}
          hint="PDF, DOC, or DOCX, up to 5 MB. Secure upload isn't set up yet, so files are not sent anywhere."
          error={errors.resume}
          className="file:mr-4 file:rounded-full file:border-0 file:bg-gold-700 file:px-4 file:py-2 file:font-ui file:font-semibold file:text-white"
        />

        <div className="space-y-4 border-t border-line pt-7">
          <CheckboxField id="consent" required error={errors.consent}>
            I agree that The Lion Group may store and review the information I submit for recruitment purposes, as
            described in{" "}
            <a href="#privacy-heading" className="text-link">
              How your information is used
            </a>
            .
          </CheckboxField>
          <CheckboxField id="acknowledge" required error={errors.acknowledge}>
            I understand that submitting this application does not guarantee a response, an interview, or a job offer.
          </CheckboxField>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="submit" className="btn btn-primary">
            Submit application
          </button>
          <p className="text-[0.9375rem]">Preview only: nothing will be sent.</p>
        </div>

        <PreviewStatus previewed={previewed}>
          <p className="font-semibold">Mockup only: nothing was sent.</p>
          <p className="mt-1">
            Your entries passed the form checks, but this form isn&apos;t connected to a destination yet. Integration is
            pending client approval.
          </p>
        </PreviewStatus>
      </form>
    </div>
  );
}
