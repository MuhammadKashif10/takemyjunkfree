import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { JsonLd } from "@/components/site/JsonLd";
import { getFaqsByCategory, getItemCategories, getWhatWeTakeSettings } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Free Junk Collection Dubai | Reusable Furniture & Appliances",
    description:
      "Find out which furniture, appliances and luxury items qualify for free collection in Dubai, how the photo assessment works, and what is always chargeable.",
    path: "/free-collection",
  });
}

export default async function FreeCollectionPage() {
  const [itemCategories, whatWeTake, faqs] = await Promise.all([
    getItemCategories(),
    getWhatWeTakeSettings(),
    getFaqsByCategory("free"),
  ]);

  const freeGroups = itemCategories.filter((g) => g.track === "free");
  const paidGroups = itemCategories.filter((g) => g.track === "paid");

  const graph = schemaGraph([
    breadcrumbNode("/free-collection", [
      { name: "Home", path: "/" },
      { name: "Free Collection", path: "/free-collection" },
    ]),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Free Collection" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="Free collection"
            title="Free collection for items someone else can still use"
            description="If an item is clean, complete and in demand, its reuse value covers the cost of collecting it. That is the entire reason free collection exists — and why some items will never qualify."
          />
        </Container>
      </div>

      <Section>
        <SectionHeading
          eyebrow="The criteria"
          title="Four things decide whether an item qualifies"
          description="Brand and original price are not on this list. Condition and demand are."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {whatWeTake.freeCriteria.map((c, i) => (
            <div key={c.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-bold text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-free/30 bg-card p-7 shadow-lift">
            <span className="inline-flex items-center gap-2 rounded-full bg-free-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-free">
              <CheckCircle2 className="size-3.5" aria-hidden /> Can be free
            </span>
            <h2 className="mt-4 text-2xl font-bold text-foreground">Items that often qualify</h2>
            <div className="mt-6 space-y-6">
              {freeGroups.map((group) => (
                <div key={group.slug}>
                  <h3 className="font-bold text-foreground">{group.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{group.note}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-free" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 shadow-lift">
            <span className="inline-flex items-center gap-2 rounded-full bg-paid-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-paid">
              <XCircle className="size-3.5" aria-hidden /> Always paid
            </span>
            <h2 className="mt-4 text-2xl font-bold text-foreground">Items that don&apos;t qualify</h2>
            <div className="mt-6 space-y-6">
              {paidGroups.map((group) => (
                <div key={group.slug}>
                  <h3 className="font-bold text-foreground">{group.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{group.note}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-foreground">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <XCircle className="mt-0.5 size-4 shrink-0 text-paid" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Not sure where your items sit?{" "}
          <Link href="/what-we-take" className="font-semibold text-primary hover:underline">
            See the full what-we-take list
          </Link>
          .
        </p>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading eyebrow="FAQs" title="Free collection questions" />
          <FaqAccordion items={faqs} idPrefix="free-faq" />
        </div>
      </Section>

      <CtaBand
        title="Send photos and find out in minutes"
        description="We review condition, completeness and demand, then confirm in writing which of your items are free to collect."
      />

      <JsonLd data={graph} />
    </>
  );
}
