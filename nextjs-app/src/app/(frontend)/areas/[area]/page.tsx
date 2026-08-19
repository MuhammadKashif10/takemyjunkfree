import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, CheckCircle2, MapPin, Truck } from "lucide-react";
import { Container, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PricingBadge } from "@/components/site/PricingBadge";
import { JsonLd } from "@/components/site/JsonLd";
import {
  getAllAreas,
  getAllServices,
  getAreaBySlug,
  getServiceAreasForArea,
  getSiteSettings,
} from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph, serviceNode } from "@/lib/seo";

export async function generateStaticParams() {
  const areas = await getAllAreas();
  return areas.map((area) => ({ area: area.slug }));
}

type Params = { params: Promise<{ area: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { area: slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) return { title: "Area unavailable", robots: { index: false, follow: false } };

  return buildMetadata({
    title: area.seo?.metaTitle || `Junk Removal ${area.name} | Free Collection & Clearances`,
    description:
      area.seo?.metaDescription ||
      `Junk removal and free item collection in ${area.name}, Dubai. ${area.access ?? ""} Send photos for a written quote.`,
    path: `/areas/${slug}`,
  });
}

export default async function AreaDetailPage({ params }: Params) {
  const { area: slug } = await params;
  const [area, site, allAreas, allServices, serviceAreaLinks] = await Promise.all([
    getAreaBySlug(slug),
    getSiteSettings(),
    getAllAreas(),
    getAllServices(),
    getServiceAreasForArea(slug),
  ]);
  if (!area) notFound();

  const graph = schemaGraph([
    breadcrumbNode(`/areas/${slug}`, [
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/areas" },
      { name: area.name, path: `/areas/${slug}` },
    ]),
    serviceNode({
      path: `/areas/${slug}`,
      name: `Junk removal in ${area.name}`,
      description: area.intro,
    }),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Service Areas", to: "/areas" }, { label: area.name }]} />
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground">
            <MapPin className="size-3.5" aria-hidden /> {area.region}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold text-primary-foreground sm:text-5xl">
            Junk removal & free collection in {area.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{area.intro}</p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Building2 className="size-5 text-primary" aria-hidden />
                <h2 className="mt-3 text-lg font-bold text-foreground">Housing in {area.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.housing}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <Truck className="size-5 text-primary" aria-hidden />
                <h2 className="mt-3 text-lg font-bold text-foreground">Access & loading</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{area.access}</p>
              </div>
            </div>

            <h2 className="mt-10 text-2xl font-bold text-foreground">
              What we collect most in {area.name}
            </h2>
            <ul className="mt-5 space-y-3">
              {area.commonJobs.map((job) => (
                <li key={job} className="flex gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-free" aria-hidden />
                  <span>{job}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm text-muted-foreground">
              Nearby landmarks: {area.landmarks}. Free collection applies to qualifying reusable
              items here exactly as it does anywhere else in Dubai — condition and demand decide it,
              not the postcode.
            </p>

            {area.services.length > 0 ? (
              <>
                <h2 className="mt-10 text-2xl font-bold text-foreground">Popular services here</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {area.services.map((service) => (
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
              </>
            ) : null}

            {serviceAreaLinks.length > 0 ? (
              <>
                <h2 className="mt-10 text-2xl font-bold text-foreground">
                  Service guides for {area.name}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {serviceAreaLinks.map((link) => (
                    <li key={link.serviceSlug}>
                      <Link
                        href={`/services/${link.serviceSlug}/${slug}`}
                        className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-smooth hover:border-primary hover:text-primary"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {area.nearbyAreas.length > 0 ? (
              <>
                <h2 className="mt-10 text-2xl font-bold text-foreground">Nearby areas we cover</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {area.nearbyAreas.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/areas/${a.slug}`}
                        className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-smooth hover:border-primary hover:text-primary"
                      >
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lift">
              <h2 className="text-lg font-bold text-foreground">Book a collection in {area.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Send photos and we&apos;ll confirm free items and quote the rest.
              </p>
              <div className="mt-5">
                <QuoteForm
                  areas={allAreas}
                  services={allServices}
                  whatsappHref={site.whatsappHref}
                  defaultArea={area.name}
                />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
