import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { buildHead, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/quote")({
  head: () => ({
    ...buildHead({
      title: "Get a Free Junk Removal Quote in Dubai | Photo Assessment",
      description:
        "Request a written junk removal quote in Dubai. Send photos of your items and we'll confirm which qualify for free collection and price the rest upfront.",
      path: "/quote",
    }),
    scripts: [breadcrumbSchema([{ name: "Home", item: "/" }, { name: "Get a Quote", item: "/quote" }])],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Get a Quote" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="Free quote"
            title="Get a written quote before anyone travels"
            description="Photos in, honest answer out. Free items confirmed as free, paid work priced clearly."
          />
        </Container>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8">
            <QuoteForm />
          </div>
          <aside className="space-y-4">
            <div className="rounded-2xl bg-secondary p-6">
              <h2 className="text-lg font-bold text-foreground">What happens next</h2>
              <ul className="mt-4 space-y-3 text-sm text-secondary-foreground">
                {[
                  "We review your photos and item list.",
                  "You get a written note on which items qualify free.",
                  "Anything chargeable is quoted on volume, weight and access.",
                  "You choose a collection slot — no obligation before that.",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground shadow-soft">
              <h2 className="text-base font-bold text-foreground">Make your quote accurate</h2>
              <p className="mt-2">
                Include the floor number, whether there's a lift, and any item that needs
                dismantling. Wide shots of the room are more useful than close-ups alone.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
