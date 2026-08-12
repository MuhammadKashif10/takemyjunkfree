import { createFileRoute } from "@tanstack/react-router";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { CtaBand } from "@/components/site/CtaBand";
import { faqs } from "@/content/faqs";
import { buildHead, breadcrumbSchema, jsonLd } from "@/lib/seo";

const groups = [
  { key: "free", label: "Free collection" },
  { key: "pricing", label: "Pricing" },
  { key: "booking", label: "Booking" },
  { key: "practical", label: "On the day" },
] as const;

export const Route = createFileRoute("/faqs")({
  head: () => ({
    ...buildHead({
      title: "Junk Removal FAQs Dubai | Free Collection Questions Answered",
      description:
        "Answers on how free collection qualifies, how paid junk removal is priced in Dubai, booking, access and what we cannot take.",
      path: "/faqs",
    }),
    scripts: [
      breadcrumbSchema([{ name: "Home", item: "/" }, { name: "FAQs", item: "/faqs" }]),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }),
    ],
  }),
  component: FaqsPage,
});

function FaqsPage() {
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
          {groups.map((group) => (
            <div key={group.key} className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr]">
              <h2 className="text-xl font-bold text-foreground">{group.label}</h2>
              <FaqAccordion
                items={faqs.filter((f) => f.category === group.key)}
                idPrefix={group.key}
              />
            </div>
          ))}
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
