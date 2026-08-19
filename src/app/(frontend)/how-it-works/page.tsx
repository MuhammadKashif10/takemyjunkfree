import type { Metadata } from "next";
import { Camera, ClipboardCheck, CalendarClock, Truck, Sparkles } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { JsonLd } from "@/components/site/JsonLd";
import { breadcrumbNode, buildMetadata, howToNode, schemaGraph } from "@/lib/seo";

const steps = [
  {
    icon: Camera,
    title: "Send photos of everything",
    body: "WhatsApp a photo of each item, a wide shot of the room, and one of the stairs, lift or parking. Five minutes here saves an hour later.",
  },
  {
    icon: ClipboardCheck,
    title: "We assess and reply in writing",
    body: "We tell you which items qualify for free collection and give a clear quote for anything chargeable, based on volume, weight and access.",
  },
  {
    icon: CalendarClock,
    title: "You pick a slot",
    body: "We agree a date and arrival window. If your building needs a service lift booking or gate registration, we tell you exactly what to arrange.",
  },
  {
    icon: Truck,
    title: "We collect and load",
    body: "Our team carries everything out — you don't move a thing. Bulky pieces are dismantled where needed and doorways are protected.",
  },
  {
    icon: Sparkles,
    title: "We leave the space clear",
    body: "The cleared area is swept before we go, so the property is ready for an inspection, a viewing or the next delivery.",
  },
];

const prepTips = [
  "Empty drawers, wardrobes and cabinets before the team arrives.",
  "Group small items and boxes into one place.",
  "Confirm service lift bookings and gate registrations in advance.",
  "Tell us about narrow doorways or items that need dismantling.",
  "Set aside anything that is staying so nothing is removed by mistake.",
  "Isolate appliances electrically or have them disconnected beforehand.",
];

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "How It Works | Photo Quotes & Junk Collection in Dubai",
    description:
      "Our five-step process for junk removal and free collection in Dubai: send photos, get a written assessment, book a slot, and we handle the lifting.",
    path: "/how-it-works",
  });
}

export default function HowItWorksPage() {
  const graph = schemaGraph([
    breadcrumbNode("/how-it-works", [
      { name: "Home", path: "/" },
      { name: "How It Works", path: "/how-it-works" },
    ]),
    howToNode({
      path: "/how-it-works",
      name: "How to book junk collection in Dubai",
      steps: steps.map((s) => ({ name: s.title, text: s.body })),
    }),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "How It Works" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="Process"
            title="How collection works, start to finish"
            description="Photo-first, written quotes, and no on-the-day surprises. Here is exactly what happens."
          />
        </Container>
      </div>

      <Section>
        <ol className="space-y-5">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft sm:grid-cols-[auto_1fr] sm:items-start"
            >
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <step.icon className="size-5" aria-hidden />
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Step {i + 1}
                </span>
                <h2 className="mt-1.5 text-xl font-bold text-foreground">{step.title}</h2>
                <p className="mt-2 leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Preparing"
          title="What helps a collection run smoothly"
          description="None of this is required, but each one shortens the visit."
        />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {prepTips.map((tip) => (
            <li key={tip} className="rounded-xl border border-border bg-card p-4 text-sm text-foreground shadow-soft">
              {tip}
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
