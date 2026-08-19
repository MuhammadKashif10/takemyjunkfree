import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { PricingBadge } from "@/components/site/PricingBadge";
import { JsonLd } from "@/components/site/JsonLd";
import { getAllServices, getWhatWeTakeSettings } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "How Pricing Works | Junk Removal Dubai",
    description:
      "How we price junk removal in Dubai: what's always free, what's always paid, and what depends on condition — plus what decides the price of paid work.",
    path: "/pricing",
  });
}

export default async function PricingPage() {
  const [services, whatWeTake] = await Promise.all([getAllServices(), getWhatWeTakeSettings()]);

  const graph = schemaGraph([
    breadcrumbNode("/pricing", [
      { name: "Home", path: "/" },
      { name: "Pricing", path: "/pricing" },
    ]),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Pricing" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="Pricing"
            title="No price list — because it depends on your items, not a menu"
            description="We quote from photos, not a fixed rate card. Here is exactly what decides whether something is free and what decides the price when it isn't."
          />
        </Container>
      </div>

      <Section>
        <SectionHeading eyebrow="Free work" title="What makes an item free to collect" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {whatWeTake.freeCriteria.map((c) => (
            <div key={c.title} className="flex gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-free" aria-hidden />
              <div>
                <h3 className="font-bold text-foreground">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Paid work"
          title="What decides the price on chargeable jobs"
          description="Every paid quote is based on the same three factors, confirmed from your photos before we travel."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-bold text-foreground">Volume</h3>
            <p className="mt-2 text-sm text-muted-foreground">How much needs to be loaded and taken away.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-bold text-foreground">Weight</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Some categories — soil, sand, stone — are priced by weight as much as volume.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <h3 className="font-bold text-foreground">Access</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Stairs, lift bookings and long carries are factored in before the visit, not on the day.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="By service" title="Where each service sits" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-lift"
            >
              <PricingBadge pricing={service.pricing} />
              <h3 className="mt-3 font-bold text-foreground">{service.shortTitle}</h3>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title="Send photos for a real number"
        description="No call-out fee to find out. We tell you what's free and quote the rest before anyone travels to you."
      />

      <JsonLd data={graph} />
    </>
  );
}
