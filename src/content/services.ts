// Content for the two approved services. Service names are used exactly as the
// client supplied them. Wording is adapted from the client's current website
// (/health-care/ and /lion-group-agency/) and still needs approval; bracketed
// text is a placeholder for content the client must supply. Claims that need
// verification are kept out of this file and listed in docs/APPROVALS.md.

export type ServiceSlug = "dodd-agency-provider" | "health-care-consultant";

export interface Faq {
  question: string;
  answer: string;
  /** The answer is a bracketed placeholder for the client to supply. */
  placeholder?: boolean;
}

export interface ServiceContent {
  slug: ServiceSlug;
  name: "DODD Agency Provider" | "Health Care Consultant";
  href: string;
  icon: "hand-heart" | "clipboard-list";
  metaDescription: string;
  card: { summary: string };
  lede: { text: string };
  about: { paragraphs: string[]; placeholder?: string };
  audience: { intro: string; items: string[] };
  offerings: {
    heading: string;
    intro: string;
    items: { title: string; text: string }[];
    placeholder?: string;
  };
  faqs: Faq[];
  cta: { heading: string; text: string };
}

export const doddAgencyProvider: ServiceContent = {
  slug: "dodd-agency-provider",
  name: "DODD Agency Provider",
  href: "/dodd-agency-provider/",
  icon: "hand-heart",
  metaDescription:
    "DODD Agency Provider at The Lion Group: support for adults and youth with developmental and behavioral needs, built around personalized plans and consistent routines.",
  card: {
    summary:
      "Support for adults and youth with developmental and behavioral needs, built around personalized plans and consistent routines."
  },
  lede: {
    text: "Support for adults and youth with developmental and behavioral needs, through personalized plans, consistent routines, and strategies that build daily living skills and confidence."
  },
  about: {
    paragraphs: [
      "Our work is guided by three principles: advocacy, independence, and support. We work closely with each individual to develop a personalized service plan and keep every member of their support team informed and involved.",
      "We focus on helping individuals improve daily living and social skills, and on making their homes more accessible for their needs.",
    ]
  },
  audience: {
    intro: "This service is for:",
    items: [
      "Adults and youth with developmental and behavioral needs",
      "Families and guardians seeking support for a loved one",
      "Counties and organizations looking for an agency partner",
    ]
  },
  offerings: {
    heading: "Supports",
    intro: "Supports described on The Lion Group's current website include:",
    items: [
      {
        title: "Homemaker/Personal Care (HPC) and DSP support",
        text: "Support tailored to personal, medical, and behavioral needs.",
      },
      {
        title: "Respite, in-home, and drop-in support",
        text: "Short-term or scheduled visits that give families peace of mind.",
      },
      {
        title: "Shared living and respite housing",
        text: "Supported living environments that promote dignity, independence, and belonging.",
      },
      {
        title: "Day program",
        text: "Structured, sensory-friendly activities with individualized learning and social engagement.",
      },
      {
        title: "Community accessibility and adaptations",
        text: "Support for mobility, community access, and home adaptations that help with daily independence.",
      },
      {
        title: "Behavior support and developmental coaching",
        text: "Redirection strategies, safe-hands practice, and consistent routines that reinforce growth.",
      },
    ]
  },
  faqs: [
    {
      question: "Who can contact The Lion Group about this service?",
      answer:
        "Individuals, families, guardians, counties, and organizations can contact us to ask whether this service fits their situation."
    },
    {
      question: "Is The Lion Group a certified DODD provider?",
      answer:
        "[Client to supply verified certification details, or remove this question before publishing.]",
      placeholder: true,
    },
    {
      question: "What area do you serve?",
      answer:
        "[Client to confirm the service area. The Lion Group's office is in Cleveland, Ohio.]",
      placeholder: true,
    },
    {
      question: "Do you have shared living or respite housing available?",
      answer:
        "[Client to confirm how housing availability is shared and how requests are handled.]",
      placeholder: true,
    },
    {
      question: "How do I get started?",
      answer:
        "Call (216) 551-7270, email liongroup700@gmail.com, or send a message through our contact page to talk through your needs."
    },
  ],
  cta: {
    heading: "Have questions about DODD Agency Provider?",
    text: "Contact The Lion Group to talk through your situation and next steps.",
  },
};

export const healthCareConsultant: ServiceContent = {
  slug: "health-care-consultant",
  name: "Health Care Consultant",
  href: "/health-care-consultant/",
  icon: "clipboard-list",
  metaDescription:
    "Health Care Consultant at The Lion Group: health care consulting for families, counties, and organizations, with person-centered planning and coordination.",
  card: {
    summary:
      "Health care consulting for families, counties, and organizations, with person-centered planning and coordination."
  },
  lede: {
    text: "Health care consulting for families, counties, and organizations, with person-centered planning and coordination."
  },
  about: {
    paragraphs: [
      "The Lion Group partners with families, counties, and organizations to provide health care consulting.",
    ],
    placeholder:
      "[Client to supply: an approved description of the Health Care Consultant service, covering what it includes, what clients receive, and how engagements work.]"
  },
  audience: {
    intro: "This service is for:",
    items: ["Families and guardians", "Counties", "Organizations"]
  },
  offerings: {
    heading: "What consulting can include",
    intro: "Areas named on The Lion Group's current website include:",
    items: [
      {
        title: "Person-centered planning",
        text: "Planning that starts from the individual's needs, goals, and routines.",
      },
      {
        title: "Multidisciplinary coordination",
        text: "Coordinating the people and providers involved so everyone works from the same plan.",
      },
    ],
    placeholder: "[Client to supply any additional areas this service covers.]"
  },
  faqs: [
    {
      question: "Who is this service for?",
      answer: "Families, counties, and organizations looking for health care consulting."
    },
    {
      question: "How is this different from DODD Agency Provider?",
      answer:
        "DODD Agency Provider covers supports for individuals with developmental and behavioral needs. Health Care Consultant is a consulting service for families, counties, and organizations."
    },
    {
      question: "What does a consulting engagement look like?",
      answer: "[Client to supply: how engagements start, what is delivered, and typical timelines.]",
      placeholder: true,
    },
    {
      question: "How do I get started?",
      answer:
        "Call (216) 551-7270, email liongroup700@gmail.com, or send a message through our contact page to talk through what you need."
    },
  ],
  cta: {
    heading: "Have questions about Health Care Consultant services?",
    text: "Contact The Lion Group to talk through what you need.",
  },
};

export const services = [doddAgencyProvider, healthCareConsultant] as const;
