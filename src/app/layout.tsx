import type { Metadata, Viewport } from "next";
import { Lato, Poly, Space_Grotesk } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const poly = Poly({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-poly", display: "swap" });
const lato = Lato({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-lato", display: "swap" });
// Preloaded: it is the headline font in Concept C, so a late swap would shift the hero.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "The Lion Group | DODD Agency Provider and Health Care Consultant",
    template: "%s | The Lion Group",
  },
  description:
    "The Lion Group in Cleveland, Ohio offers two services: DODD Agency Provider and Health Care Consultant. Learn about each service, careers, and how to get in touch.",
  // Mockup for client review: keep it out of search engines.
  robots: { index: false, follow: false },
  openGraph: { siteName: site.name, type: "website", locale: "en_US" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#311c20",
  width: "device-width",
  initialScale: 1,
};

// Only facts already published on the current site; no service or medical schema until approved.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: "https://www.theliongroup.us/wp-content/uploads/2023/03/ff-8ee2af2d74e468978e3c0778ee8f7825-ff-Liongroup-Logo-copy-2-1-1-2.png",
  telephone: "+1-216-551-7270",
  email: site.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.street,
    addressLocality: site.contact.city,
    addressRegion: site.contact.region,
    postalCode: site.contact.postalCode,
    addressCountry: "US",
  },
  sameAs: site.social.map((s) => s.href),
};

// Marks JS as available before first paint and restores the visitor's "pause
// animation" choice. If the reveal script hasn't started within 3s (slow or
// failed JS), reveals are switched off so content stays visible.
const bootScript =
  "(function(){var r=document.documentElement;r.classList.remove('no-js');r.classList.add('js');try{if(localStorage.getItem('tlg-motion-paused')==='1')r.classList.add('motion-paused')}catch(e){}setTimeout(function(){if(!r.classList.contains('reveal-ready'))r.classList.add('reveal-off')},3000)})();";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`no-js ${poly.variable} ${lato.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ink px-5 py-3 font-ui font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
