import { createFileRoute } from "@tanstack/react-router";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CtaBand } from "@/components/site/CtaBand";
import { services } from "@/content/services";
import { buildHead, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => ({
    ...buildHead({
      title: "Junk Removal & Clearance Services in Dubai | Free or Paid",
      description:
        "Browse every collection and clearance service we offer across Dubai, each clearly marked as free-if-qualifying or a paid removal.",
      path: "/services",
    }),
    scripts: [breadcrumbSchema([{ name: "Home", item: "/" }, { name: "Services", item: "/services" }])],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Services" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="Services"
            title="Collection and clearance services across Dubai"
            description="Every service below states plainly whether it can be free, is always paid, or depends on the condition of your items."
          />
        </Container>
      </div>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
