import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/content/site";

interface CtaBandProps {
  heading: string;
  text: string;
  href?: string;
  buttonLabel?: string;
  id?: string;
}

export function CtaBand({ heading, text, href = "/contact-us/", buttonLabel = "Contact us", id = "cta-heading" }: CtaBandProps) {
  return (
    <section aria-labelledby={id} className="on-dark bg-brown-800" data-reveal>
      <div className="container-page flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-16">
        <div className="max-w-2xl">
          <h2 id={id} className="text-title text-white">
            {heading}
          </h2>
          <p className="mt-3 text-lede text-line-strong">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
          <Link prefetch={false} href={href} className="btn btn-primary">
            {buttonLabel}
          </Link>
          <a href={site.contact.phoneHref} className="btn btn-secondary">
            <Phone aria-hidden="true" className="size-4" />
            <span>
              <span className="sr-only">Call </span>
              {site.contact.phoneDisplay}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
