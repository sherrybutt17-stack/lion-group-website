// Site-wide facts and navigation. Contact details are taken from the current
// live site (theliongroup.us) and still need client confirmation (see docs/APPROVALS.md).

export interface NavLink {
  label: string;
  href: string;
}

export const site = {
  name: "The Lion Group",
  url: "https://www.theliongroup.us",
  tagline: "Advocacy. Independence. Support.",
  contact: {
    street: "1486 East 55th St",
    city: "Cleveland",
    region: "OH",
    regionName: "Ohio",
    postalCode: "44103",
    phoneDisplay: "(216) 551-7270",
    phoneHref: "tel:+12165517270",
    email: "liongroup700@gmail.com",
    hours: "Monday–Friday, 9:00\u00a0AM–4:00\u00a0PM",
    hoursShort: "Mon–Fri 9:00\u00a0AM–4:00\u00a0PM",
    mapsHref:
      "https://www.google.com/maps/search/?api=1&query=1486+East+55th+St%2C+Cleveland%2C+OH+44103",
  },
  social: [{ label: "Facebook", href: "https://www.facebook.com/LIONGROUPLLC/" }],
} as const;

export const serviceLinks: NavLink[] = [
  { label: "DODD Agency Provider", href: "/dodd-agency-provider/" },
  { label: "Health Care Consultant", href: "/health-care-consultant/" },
];

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  ...serviceLinks,
  { label: "Careers", href: "/careers/" },
  { label: "About", href: "/about-us/" },
  { label: "Contact", href: "/contact-us/" },
];

export const footerNav = {
  // Useful Links must contain only the two approved services.
  usefulLinks: serviceLinks,
  company: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about-us/" },
    { label: "Careers", href: "/careers/" },
    { label: "Contact", href: "/contact-us/" },
  ] satisfies NavLink[],
};

