import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getSiteSettings } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return buildMetadata({
    title: `About ${site.name} | Free & Paid Junk Collection in Dubai`,
    description: site.description,
    path: "/about",
  });
}

export default async function AboutPage() {
  const site = await getSiteSettings();

  const graph = schemaGraph([
    breadcrumbNode("/about", [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "About" }]} />
          <SectionHeading as="h1" onDark eyebrow="About us" title={site.tagline ?? site.name} description={site.description} />
        </Container>
      </div>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-free/30 bg-card p-7 shadow-soft">
            <span className="inline-flex items-center gap-2 rounded-full bg-free-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-free">
              <CheckCircle2 className="size-3.5" aria-hidden /> Why free collection exists
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Reusable items still hold value to someone else. When furniture, appliances or quality
              homeware can be passed on and used again, that reuse value covers the cost of collecting
              them — so we don&apos;t charge for it. Condition, completeness and demand decide whether an
              item qualifies, not the price you originally paid.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-7 shadow-soft">
            <span className="inline-flex items-center gap-2 rounded-full bg-paid-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-paid">
              <XCircle className="size-3.5" aria-hidden /> Why other work is paid
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              General junk, mattresses, garden waste and full clearances have no resale value. That work
              is labour, transport and disposal from start to finish, so it&apos;s quoted upfront from
              your photos — on volume, weight and access, with no on-the-day surprises.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/how-it-works" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See how a collection works <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/free-collection" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Check what qualifies as free <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/areas" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            See areas we cover <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Section>

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
