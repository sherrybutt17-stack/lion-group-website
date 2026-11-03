import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { serviceLinks } from "@/content/site";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section aria-labelledby="page-title" className="bg-paper">
          <div className="container-page py-20 md:py-28">
            <p className="eyebrow">Error 404</p>
            <h1 id="page-title" className="mt-3 text-display">
              Page not found
            </h1>
            <p className="mt-5 max-w-[55ch] text-lede">
              The page you&apos;re looking for isn&apos;t here. It may have moved, or the address may be incorrect.
            </p>
            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <li>
                <Link prefetch={false} href="/" className="btn btn-primary">
                  Go to the homepage
                </Link>
              </li>
              {serviceLinks.map((l) => (
                <li key={l.href}>
                  <Link prefetch={false} href={l.href} className="btn btn-secondary">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link prefetch={false} href="/contact-us/" className="btn btn-secondary">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
