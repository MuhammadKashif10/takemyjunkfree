import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { itemGroups, notAccepted } from "@/content/items";
import { buildHead, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/what-we-take")({
  head: () => ({
    ...buildHead({
      title: "What We Take | Junk, Furniture & Appliances in Dubai",
      description:
        "A full list of what we collect in Dubai — from reusable furniture and working appliances to mattresses, garden waste and renovation leftovers — plus what we cannot accept.",
      path: "/what-we-take",
    }),
    scripts: [
      breadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "What We Take", item: "/what-we-take" },
      ]),
    ],
  }),
  component: WhatWeTakePage,
});

function WhatWeTakePage() {
  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "What We Take" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="Item list"
            title="What we take — and how each category is priced"
            description="Every category below is tagged free-if-qualifying or paid, so you know where your items stand before you contact us."
          />
        </Container>
      </div>

      <Section>
        <div className="grid gap-5 sm:grid-cols-2">
          {itemGroups.map((group) => (
            <div
              key={group.slug}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                  group.track === "free" ? "bg-free-soft text-free" : "bg-paid-soft text-paid"
                }`}
              >
                {group.track === "free" ? (
                  <CheckCircle2 className="size-3.5" aria-hidden />
                ) : (
                  <XCircle className="size-3.5" aria-hidden />
                )}
                {group.track === "free" ? "Can be free" : "Paid service"}
              </span>
              <h2 className="mt-4 text-lg font-bold text-foreground">{group.title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{group.note}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-foreground">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sand">
        <div className="rounded-2xl border border-destructive/25 bg-card p-7 shadow-soft">
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-destructive">
            <AlertTriangle className="size-4" aria-hidden /> What we cannot accept
          </span>
          <p className="mt-3 text-sm text-muted-foreground">
            These require specialist licensed handling. If you're unsure about an item, send a photo
            and we'll tell you before anything is booked.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-foreground sm:grid-cols-2">
            {notAccepted.map((item) => (
              <li key={item} className="flex gap-2">
                <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
