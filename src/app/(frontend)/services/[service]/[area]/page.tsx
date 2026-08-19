import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Container, Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { QuoteForm } from "@/components/site/QuoteForm";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { JsonLd } from "@/components/site/JsonLd";
import {
  getAllAreas,
  getAllServices,
  getPublishedServiceAreaParams,
  getServiceAreaBySlugs,
  getServiceAreasForArea,
  getServiceAreasForService,
  getSiteSettings,
} from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph, serviceNode } from "@/lib/seo";

export async function generateStaticParams() {
  return getPublishedServiceAreaParams();
}

type Params = { params: Promise<{ service: string; area: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { service, area } = await params;
  const entry = await getServiceAreaBySlugs(service, area);
  if (!entry) return { title: "Page unavailable", robots: { index: false, follow: false } };

  return buildMetadata({
    title: entry.seo?.metaTitle || entry.title,
    description: entry.seo?.metaDescription || entry.intro,
    path: `/services/${service}/${area}`,
  });
}

export default async function ServiceAreaPage({ params }: Params) {
  const { service: serviceSlug, area: areaSlug } = await params;

  // getServiceAreaBySlugs already gates on publishState — draft/ready
  // entries 404 here exactly as if they didn't exist, matching the
  // "unpublished pages are not publicly indexable" requirement.
  const entry = await getServiceAreaBySlugs(serviceSlug, areaSlug);
  if (!entry) notFound();

  const [site, allAreas, allServices, siblingAreas, siblingServices] = await Promise.all([
    getSiteSettings(),
    getAllAreas(),
    getAllServices(),
    getServiceAreasForService(serviceSlug),
    getServiceAreasForArea(areaSlug),
  ]);

  const otherAreasForService = siblingAreas.filter((l) => l.areaSlug !== areaSlug);
  const otherServicesForArea = siblingServices.filter((l) => l.serviceSlug !== serviceSlug);

  const graph = schemaGraph([
    breadcrumbNode(`/services/${serviceSlug}/${areaSlug}`, [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: entry.service.shortTitle, path: `/services/${serviceSlug}` },
      { name: entry.area.name, path: `/services/${serviceSlug}/${areaSlug}` },
    ]),
    serviceNode({
      path: `/services/${serviceSlug}/${areaSlug}`,
      name: entry.title,
      description: entry.intro,
    }),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            onDark
            items={[
              { label: entry.service.shortTitle, to: `/services/${serviceSlug}` },
              { label: entry.area.name },
            ]}
          />
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold text-primary-foreground sm:text-5xl">
            {entry.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/80">{entry.intro}</p>
        </Container>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            {entry.logistics ? (
              <>
                <h2 className="text-2xl font-bold text-foreground">Getting it done in {entry.area.name}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{entry.logistics}</p>
              </>
            ) : null}

            {entry.jobs.length > 0 ? (
              <>
                <h2 className="mt-10 text-2xl font-bold text-foreground">
                  {entry.service.shortTitle} jobs we see in {entry.area.name}
                </h2>
                <ul className="mt-5 space-y-3">
                  {entry.jobs.map((job) => (
                    <li key={job} className="flex gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-free" aria-hidden />
                      <span>{job}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {entry.faqs.length > 0 ? (
              <>
                <h2 className="mt-10 text-2xl font-bold text-foreground">Local FAQs</h2>
                <div className="mt-5">
                  <FaqAccordion items={entry.faqs} idPrefix={`${serviceSlug}-${areaSlug}-faq`} />
                </div>
              </>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-4 text-sm">
              <Link href={`/services/${serviceSlug}`} className="font-semibold text-primary hover:underline">
                More about {entry.service.shortTitle} →
              </Link>
              <Link href={`/areas/${areaSlug}`} className="font-semibold text-primary hover:underline">
                More about {entry.area.name} →
              </Link>
            </div>

            {otherAreasForService.length > 0 ? (
              <>
                <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {entry.service.shortTitle} in nearby areas
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {otherAreasForService.map((link) => (
                    <li key={link.areaSlug}>
                      <Link
                        href={`/services/${serviceSlug}/${link.areaSlug}`}
                        className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-smooth hover:border-primary hover:text-primary"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {otherServicesForArea.length > 0 ? (
              <>
                <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Other services in {entry.area.name}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {otherServicesForArea.map((link) => (
                    <li key={link.serviceSlug}>
                      <Link
                        href={`/services/${link.serviceSlug}/${areaSlug}`}
                        className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-smooth hover:border-primary hover:text-primary"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lift">
              <h2 className="text-lg font-bold text-foreground">
                Book {entry.service.shortTitle.toLowerCase()} in {entry.area.name}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Send photos and we&apos;ll confirm what&apos;s free and what&apos;s chargeable.
              </p>
              <div className="mt-5">
                <QuoteForm
                  areas={allAreas}
                  services={allServices}
                  whatsappHref={site.whatsappHref}
                  defaultService={serviceSlug}
                  defaultArea={entry.area.name}
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
