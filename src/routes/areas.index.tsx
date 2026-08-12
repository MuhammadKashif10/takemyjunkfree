import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { areas, areasByRegion } from "@/content/areas";
import { buildHead, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/areas/")({
  head: () => ({
    ...buildHead({
      title: `Junk Removal Service Areas in Dubai | ${areas.length} Communities`,
      description:
        "See every Dubai community we collect from, grouped by region, with access notes and the jobs we handle most often in each area.",
      path: "/areas",
    }),
    scripts: [breadcrumbSchema([{ name: "Home", item: "/" }, { name: "Service Areas", item: "/areas" }])],
  }),
  component: AreasIndex,
});

function AreasIndex() {
  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Service Areas" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="Coverage"
            title={`Junk collection across ${areas.length} Dubai communities`}
            description="From high-rise towers with strict lift bookings to villa communities with gated access — each area page explains how collections work there."
          />
        </Container>
      </div>

      <Section>
        <div className="space-y-12">
          {areasByRegion().map(([region, list]) => (
            <div key={region}>
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                <MapPin className="size-5 text-primary" aria-hidden /> {region}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((area) => (
                  <Link
                    key={area.slug}
                    to="/areas/$slug"
                    params={{ slug: area.slug }}
                    className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
                  >
                    <h3 className="font-bold text-foreground">{area.name}</h3>
                    <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">{area.housing}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
