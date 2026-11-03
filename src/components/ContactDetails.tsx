import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { ReviewFlag } from "./ReviewFlag";

export function ContactDetails() {
  const { contact } = site;
  const rows = [
    {
      icon: MapPin,
      term: "Address",
      detail: (
        <>
          <address className="not-italic">
            {contact.street}, {contact.city}, {contact.regionName} {contact.postalCode}
          </address>
          <a href={contact.mapsHref} className="text-link mt-1 inline-flex min-h-11 items-center gap-1.5">
            Get directions<span className="sr-only"> (opens Google Maps)</span>
            <ExternalLink aria-hidden="true" className="size-4" />
          </a>
        </>
      ),
    },
    {
      icon: Phone,
      term: "Phone",
      detail: (
        <a href={contact.phoneHref} className="text-link inline-flex min-h-11 items-center">
          {contact.phoneDisplay}
        </a>
      ),
    },
    {
      icon: Mail,
      term: "Email",
      detail: (
        <a href={`mailto:${contact.email}`} className="text-link inline-flex min-h-11 items-center [overflow-wrap:anywhere]">
          {contact.email}
        </a>
      ),
    },
    { icon: Clock, term: "Office hours", detail: <span>{contact.hours}</span> },
  ];

  return (
    <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
      <dl className="space-y-5">
        {rows.map(({ icon: Icon, term, detail }) => (
          <div key={term}>
            <dt className="flex items-center gap-4 font-ui text-sm font-semibold uppercase tracking-[0.08em] text-ink">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold-50 text-gold-700">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              {term}
            </dt>
            <dd className="mt-1 pl-14">{detail}</dd>
          </div>
        ))}
      </dl>
      <ReviewFlag kind="confirm" className="mt-6" />
    </div>
  );
}
