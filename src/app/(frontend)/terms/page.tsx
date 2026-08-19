import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { getSiteSettings } from "@/lib/payload-data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Terms of Service | Take My Junk Dubai Free",
    description: "The terms that apply to quote requests and collections booked through this site.",
    path: "/terms",
  });
}

export default async function TermsPage() {
  const site = await getSiteSettings();

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Terms of Service" }]} />
          <SectionHeading as="h1" onDark eyebrow="Legal" title="Terms of Service" />
        </Container>
      </div>

      <Section>
        <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <p>These terms apply when you request a quote or book a collection with {site.name}.</p>

          <div>
            <h2 className="text-lg font-bold text-foreground">Quotes</h2>
            <p className="mt-2">
              Quotes are based on the photos and information you provide. A quote is not final until
              confirmed in writing. If the items shown or their condition change before collection, the
              quote may be revised — we&apos;ll tell you before proceeding, not after.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Free collection</h2>
            <p className="mt-2">
              Whether an item qualifies for free collection is assessed on condition, completeness and
              demand, not on request. We reserve the right to decline free collection of an item on
              arrival if its actual condition differs materially from what was shown in photos, and to
              offer a paid removal instead.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Access and scheduling</h2>
            <p className="mt-2">
              You&apos;re responsible for arranging building access, lift bookings, parking permissions
              and permits required by your community or building management. Delays caused by access
              issues on the day may require rescheduling.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Excluded items</h2>
            <p className="mt-2">
              We do not collect hazardous materials, chemicals, medical or biological waste, asbestos,
              gas cylinders, or anything requiring specialist licensed disposal. See the{" "}
              <Link href="/what-we-take" className="text-primary hover:underline">
                what we take
              </Link>{" "}
              page for the full list.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Cancellations</h2>
            <p className="mt-2">
              You can cancel or reschedule a booked collection by contacting us before the arranged
              slot. There is no charge for cancelling a free collection.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about these terms can be sent to {site.email} or {site.phone}.
            </p>
          </div>

          <p className="border-t border-border pt-6 text-xs text-muted-foreground/70">
            These terms describe how the service actually operates as implemented on this site. They
            have not been reviewed by a lawyer and should be reviewed for compliance with applicable
            law before relying on them in production.
          </p>
        </div>
      </Section>
    </>
  );
}
