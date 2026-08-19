import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { getSiteSettings } from "@/lib/payload-data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Privacy Policy | Take My Junk Dubai Free",
    description: "How we collect, use and store the personal information submitted through our quote form and site.",
    path: "/privacy",
  });
}

export default async function PrivacyPage() {
  const site = await getSiteSettings();

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Privacy Policy" }]} />
          <SectionHeading as="h1" onDark eyebrow="Legal" title="Privacy Policy" />
        </Container>
      </div>

      <Section>
        <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-muted-foreground">
          <p>
            This policy explains what information {site.name} collects when you use this website or
            request a quote, and how that information is used and stored.
          </p>

          <div>
            <h2 className="text-lg font-bold text-foreground">Information we collect</h2>
            <p className="mt-2">
              When you submit the quote form, we collect the name, phone number, and optionally the
              email address you provide, along with the area and service you select, a description of
              your items, and any photos you choose to attach.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">How we use it</h2>
            <p className="mt-2">
              This information is used solely to assess your request, confirm which items qualify for
              free collection, provide a quote for chargeable work, and arrange a collection. We do not
              sell or rent your information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Where it&apos;s stored</h2>
            <p className="mt-2">
              Quote request details and photos are stored in our content management system, backed by a
              managed Postgres database. Access is restricted to our team.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Photos</h2>
            <p className="mt-2">
              Photos submitted with a quote request are used only to assess your items and are not
              published publicly or shared outside our team without your permission.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Your choices</h2>
            <p className="mt-2">
              You can ask us to delete the information you&apos;ve submitted at any time by contacting us
              at {site.email}. If you submit a request via WhatsApp instead of this site, that
              conversation is subject to WhatsApp&apos;s own privacy terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground">Contact</h2>
            <p className="mt-2">
              Questions about this policy can be sent to {site.email} or {site.phone}.
            </p>
          </div>

          <p className="border-t border-border pt-6 text-xs text-muted-foreground/70">
            This policy describes our actual data practices as implemented on this site. It has not
            been reviewed by a lawyer and should be reviewed for compliance with applicable law before
            relying on it in production.
          </p>
        </div>
      </Section>
    </>
  );
}
