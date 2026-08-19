import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { AreasBrowser } from "@/components/site/AreasBrowser";
import { JsonLd } from "@/components/site/JsonLd";
import { getAllAreas } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, itemListNode, schemaGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const areas = await getAllAreas();
  return buildMetadata({
    title: `Junk Removal Service Areas in Dubai | ${areas.length} Communities`,
    description:
      "See every Dubai community we collect from, grouped by region, with access notes and the jobs we handle most often in each area.",
    path: "/areas",
  });
}

export default async function AreasIndexPage() {
  const areas = await getAllAreas();

  const graph = schemaGraph([
    breadcrumbNode("/areas", [
      { name: "Home", path: "/" },
      { name: "Service Areas", path: "/areas" },
    ]),
    itemListNode(
      "/areas",
      areas.map((a) => ({ name: a.name, path: `/areas/${a.slug}` })),
    ),
  ]);

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
        <AreasBrowser areas={areas} />
      </Section>

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
