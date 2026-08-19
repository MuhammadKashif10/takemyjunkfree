import type { Metadata } from "next";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { getFaqsByCategory, type FaqCategory } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, faqPageNode, schemaGraph } from "@/lib/seo";

const groups: { key: FaqCategory; label: string }[] = [
  { key: "free", label: "Free collection" },
  { key: "pricing", label: "Pricing" },
  { key: "booking", label: "Booking" },
  { key: "practical", label: "On the day" },
];

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Junk Removal FAQs Dubai | Free Collection Questions Answered",
    description:
      "Answers on how free collection qualifies, how paid junk removal is priced in Dubai, booking, access and what we cannot take.",
    path: "/faqs",
  });
}

export default async function FaqsPage() {
  const groupedFaqs = await Promise.all(groups.map((g) => getFaqsByCategory(g.key)));
  const allFaqs = groupedFaqs.flat();

  const graph = schemaGraph([
    breadcrumbNode("/faqs", [
      { name: "Home", path: "/" },
      { name: "FAQs", path: "/faqs" },
    ]),
    faqPageNode("/faqs", allFaqs),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "FAQs" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="FAQs"
            title="Frequently asked questions"
            description="Everything about how the free and paid sides of our service work in Dubai."
          />
        </Container>
      </div>

      <Section>
        <div className="space-y-12">
          {groups.map((group, i) => (
            <div key={group.key} className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr]">
              <h2 className="text-xl font-bold text-foreground">{group.label}</h2>
              <FaqAccordion items={groupedFaqs[i] ?? []} idPrefix={group.key} />
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
