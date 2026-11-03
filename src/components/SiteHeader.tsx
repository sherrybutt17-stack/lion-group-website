import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavList } from "./NavList";

export function SiteHeader() {
  const { contact } = site;
  return (
    <header className="no-print">
      <div className="on-dark hidden bg-brown-900 text-[0.875rem] text-line-strong md:block">
        <div className="container-page flex items-center justify-between gap-6">
          <p className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4 text-gold-400" />
              {contact.city}, {contact.regionName}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock aria-hidden="true" className="size-4 text-gold-400" />
              {contact.hoursShort}
            </span>
          </p>
          <p className="flex items-center gap-5">
            <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-2 text-white hover:text-gold-200">
              <Phone aria-hidden="true" className="size-4 text-gold-400" />
              {contact.phoneDisplay}
            </a>
            <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center gap-2 text-white hover:text-gold-200">
              <Mail aria-hidden="true" className="size-4 text-gold-400" />
              {contact.email}
            </a>
          </p>
        </div>
      </div>
      <div className="relative border-b border-line bg-white">
        <div className="container-page flex min-h-[4.75rem] items-center justify-between gap-4">
          <Logo />
          <nav aria-label="Primary" className="hidden nav:block">
            <NavList variant="desktop" />
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
