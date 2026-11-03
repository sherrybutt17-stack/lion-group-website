// Careers copy and form setup. The form fields are a reduced version of the
// client's current PDF application. Sensitive items (SSN, felony history,
// references, military service, background-check consent) stay out of the
// web form and remain part of the client's own screening process.

export const careers = {
  metaDescription:
    "Careers at The Lion Group. Submit your information for review. The Lion Group reviews applications, shortlists candidates, and handles all screening and hiring.",
  lede: "Interested in working with The Lion Group? Submit your information below. The Lion Group reviews every application and contacts shortlisted candidates about next steps.",
  steps: [
    {
      title: "Submit your information",
      text: "Complete the application form with your contact details, the position you're interested in, and your relevant experience.",
    },
    {
      title: "The Lion Group reviews and shortlists",
      text: "The Lion Group reviews each application and decides which candidates to shortlist.",
    },
    {
      title: "Screening and hiring by The Lion Group",
      text: "If you're shortlisted, The Lion Group contacts you directly about next steps. The Lion Group handles all screening and hiring decisions.",
    },
  ],
  noGuarantee:
    "Submitting an application does not guarantee a response, an interview, or a job offer.",
  openingsFallback: "No positions are listed yet. You can still submit a general application.",
  privacy: [
    {
      term: "Who reviews it",
      detail: "The Lion Group reviews every application it receives.",
    },
    {
      term: "What not to include",
      detail:
        "Please don't include your Social Security number, health information, or other sensitive personal details in this form.",
    },
  ],
  eeo: "The Lion Group is an Equal Opportunity Employer.",
  resume: {
    accept: ".pdf,.doc,.docx",
    acceptedTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxBytes: 5 * 1024 * 1024,
  },
} as const;
