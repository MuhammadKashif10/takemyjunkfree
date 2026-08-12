import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2, Info } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PricingBadge } from "@/components/site/PricingBadge";
import { CtaBand } from "@/components/site/CtaBand";
import { QuoteForm } from "@/components/site/QuoteForm";
import { serviceBySlug, services, type Service } from "@/content/services";
import { areas } from "@/content/areas";
import { buildHead, breadcrumbSchema, jsonLd } from "@/lib/seo";
import { site } from "@/content/site";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = serviceBySlug(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    return {
      ...buildHead({
        title: service.metaTitle,
        description: service.metaDescription,
        path: `/services/${params.slug}`,
      }),
      scripts: [
        breadcrumbSchema([
          { name: "Home", item: "/" },
          { name: "Services", item: "/services" },
          { name: service.shortTitle, item: `/services/${params.slug}` },
        ]),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.metaDescription,
          serviceType: service.shortTitle,
          areaServed: { "@type": "City", name: "Dubai" },
          provider: { "@type": "LocalBusiness", name: site.name },
        }),
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { service } = Route.useLoaderData() as { service: Service };
  const related = service.relatedSlugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs
            onDark
            items={[{ label: "Services", to: "/services" }, { label: service.shortTitle }]}
          />
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

            <h2 className="mt-10 text-2xl font-bold text-foreground">What's included</h2>
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
                Send photos and we'll confirm what's free and what's chargeable.
              </p>
              <div className="mt-5">
                <QuoteForm defaultService={service.slug} />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Related" title="Other services people book with this" />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {related.map((item) => (
            <Link
              key={item.slug}
              to="/services/$slug"
              params={{ slug: item.slug }}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-lift"
            >
              <PricingBadge pricing={item.pricing} />
              <h3 className="mt-3 font-bold text-foreground">{item.shortTitle}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{item.summary}</p>
            </Link>
          ))}
        </div>

        <h2 className="mt-12 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {service.shortTitle} by area
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {areas
            .filter((a) => a.popularServices.includes(service.slug))
            .slice(0, 12)
            .map((area) => (
              <li key={area.slug}>
                <Link
                  to="/areas/$slug"
                  params={{ slug: area.slug }}
                  className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm transition-smooth hover:border-primary hover:text-primary"
                >
                  {area.name}
                </Link>
              </li>
            ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
