import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Info } from "lucide-react";
import { Section, SectionHeading, Container } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PricingBadge } from "@/components/site/PricingBadge";
import { CtaBand } from "@/components/site/CtaBand";
import { QuoteForm } from "@/components/site/QuoteForm";
import { JsonLd } from "@/components/site/JsonLd";
import {
  getAllAreas,
  getAllServices,
  getServiceAreasForService,
  getServiceBySlug,
  getSiteSettings,
} from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph, serviceNode } from "@/lib/seo";

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({ service: service.slug }));
}

type Params = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service: slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service unavailable", robots: { index: false, follow: false } };

  return buildMetadata({
    title: service.seo?.metaTitle || service.title,
    description: service.seo?.metaDescription || service.summary,
    path: `/services/${slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Params) {
  const { service: slug } = await params;
  const [service, site, allAreas, allServices, serviceAreaLinks] = await Promise.all([
    getServiceBySlug(slug),
    getSiteSettings(),
    getAllAreas(),
    getAllServices(),
    getServiceAreasForService(slug),
  ]);
  if (!service) notFound();

  const servedAreas = allAreas.filter((a) => service.areas.some((sa) => sa.slug === a.slug)).slice(0, 12);

  const graph = schemaGraph([
    breadcrumbNode(`/services/${slug}`, [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.shortTitle, path: `/services/${slug}` },
    ]),
    serviceNode({ path: `/services/${slug}`, name: service.title, description: service.summary }),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Services", to: "/services" }, { label: service.shortTitle }]} />
          <div className="mt-6">
            <PricingBadge pricing={service.pricing} className="bg-primary-foreground/15 text-primary-foreground" />
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold text-primary-foreground sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{service.summary}</p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              {service.intro.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-bold text-foreground">What&apos;s included</h2>
            <ul className="mt-5 space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-foreground">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-free" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-foreground">Good to know</h2>
            <ul className="mt-5 space-y-3">
              {service.goodToKnow.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl bg-secondary p-4 text-sm text-secondary-foreground">
                  <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-2xl font-bold text-foreground">Typical jobs</h2>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              {service.typicalJobs.map((job) => (
                <li key={job}>{job}</li>
              ))}
            </ul>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lift">
              <h2 className="text-lg font-bold text-foreground">Request this service</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Send photos and we&apos;ll confirm what&apos;s free and what&apos;s chargeable.
              </p>
              <div className="mt-5">
                <QuoteForm
                  areas={allAreas}
                  services={allServices}
                  whatsappHref={site.whatsappHref}
                  defaultService={service.slug}
                />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {service.relatedServices.length > 0 || servedAreas.length > 0 || serviceAreaLinks.length > 0 ? (
        <Section tone="sand">
          {service.relatedServices.length > 0 ? (
            <>
              <SectionHeading eyebrow="Related" title="Other services people book with this" />
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {service.relatedServices.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-lift"
                  >
                    <PricingBadge pricing={item.pricing} />
                    <h3 className="mt-3 font-bold text-foreground">{item.shortTitle}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{item.summary}</p>
                  </Link>
                ))}
              </div>
            </>
          ) : null}

          {servedAreas.length > 0 ? (
            <>
              <h2 className="mt-12 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {service.shortTitle} by area
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {servedAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/areas/${area.slug}`}
                      className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-smooth hover:border-primary hover:text-primary"
                    >
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {serviceAreaLinks.length > 0 ? (
            <>
              <h2 className="mt-12 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Local guides for {service.shortTitle}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {serviceAreaLinks.map((link) => (
                  <li key={link.areaSlug}>
                    <Link
                      href={`/services/${slug}/${link.areaSlug}`}
                      className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-smooth hover:border-primary hover:text-primary"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Section>
      ) : null}

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
