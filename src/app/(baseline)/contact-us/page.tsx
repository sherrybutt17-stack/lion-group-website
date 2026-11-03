import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactDetails } from "@/components/ContactDetails";
import { ContactForm } from "@/components/forms/ContactForm";
import { ReviewFlag } from "@/components/ReviewFlag";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact The Lion Group in Cleveland, Ohio by phone, email, or message about DODD Agency Provider or Health Care Consultant.",
  alternates: { canonical: "/contact-us/" },
};

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="border-b border-line bg-paper">
        <div className="container-page py-12 md:py-16">
          <Breadcrumbs current="Contact" />
          <p className="eyebrow mt-8">Contact</p>
          <h1 id="page-title" className="mt-3 max-w-3xl text-display">
            Contact The Lion Group
          </h1>
          <p className="mt-5 max-w-[60ch] text-lede">
            Questions about DODD Agency Provider or Health Care Consultant? Reach us by phone, email, or the form below.
          </p>
          <ReviewFlag kind="draft" className="mt-4" />
        </div>
      </section>

      <section aria-label="Contact options" className="py-16 md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div className="max-w-3xl">
            <h2 id="contact-form-heading" className="text-title">
              Send a message
            </h2>
            <p className="mt-4 mb-8">Fields marked “(required)” must be completed.</p>
            <ContactForm />
          </div>
          <div className="space-y-6 self-start">
            <h2 className="font-serif text-2xl">Contact details</h2>
            <ContactDetails />
            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="font-serif text-xl">Looking for a job?</h2>
              <p className="mt-2">
                Job applications go through the{" "}
                <Link prefetch={false} href="/careers/" className="text-link">
                  Careers page
                </Link>
                , not this form.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
