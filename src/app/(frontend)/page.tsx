import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Camera, CheckCircle2, MapPin, MessageCircle, Phone, Truck, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { ServiceCard } from "@/components/site/ServiceCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import {
  getAllAreas,
  getAllServices,
  getGeneralFaqs,
  getLatestPosts,
  getSiteSettings,
} from "@/lib/payload-data";
import { buildMetadata, faqPageNode, schemaGraph } from "@/lib/seo";
import { JsonLd } from "@/components/site/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Junk Removal Dubai | Free Collection for Reusable Items",
    description:
      "Dubai junk removal with a difference: qualifying reusable furniture, appliances and luxury items collected free. Clear, upfront quotes for everything else.",
    path: "/",
  });
}

const steps = [
  { icon: Camera, title: "Send photos", body: "WhatsApp photos of your items, the room and the route out. Takes two minutes." },
  { icon: BadgeCheck, title: "Get an honest answer", body: "We confirm which items qualify for free collection and quote the rest in writing." },
  { icon: Truck, title: "We collect", body: "Our team loads everything from inside your property and leaves the space swept." },
];

export default async function HomePage() {
  const [site, services, areas, faqs, posts] = await Promise.all([
    getSiteSettings(),
    getAllServices(),
    getAllAreas(),
    getGeneralFaqs(6),
    getLatestPosts(3),
  ]);

  const graph = schemaGraph([faqPageNode("/", faqs)]);

  return (
    <>
      <section className="relative overflow-hidden bg-hero-gradient">
        <Container className="relative py-16 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <Eyebrow onDark>Dubai · Free & paid collection</Eyebrow>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] text-primary-foreground sm:text-5xl lg:text-6xl">
                Some of your junk is worth something.
                <span className="block text-accent">We&apos;ll take that part for free.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/80">
                Reusable furniture, working appliances and quality pieces can qualify for free
                collection anywhere in Dubai. General junk, mattresses, garden waste and full
                clearances are quoted upfront — no surprises on the day.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="whatsapp" size="xl">
                  <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle /> WhatsApp your photos
                  </a>
                </Button>
                <Button asChild variant="accent" size="xl">
                  <Link href="/quote">
                    Get a free quote <ArrowRight />
                  </Link>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary-foreground/75">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-accent" aria-hidden /> Photo assessment before we travel
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-accent" aria-hidden /> We do all the lifting
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-accent" aria-hidden /> {areas.length} Dubai areas covered
                </span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-free/30 bg-card p-6 shadow-lift">
                <span className="inline-flex items-center gap-2 rounded-full bg-free-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-free">
                  <CheckCircle2 className="size-3.5" aria-hidden /> Free collection
                </span>
                <h2 className="mt-4 text-lg font-bold text-foreground">Reusable & valuable items</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Clean sofas, solid furniture, working appliances, designer pieces and quality
                  office furniture — collected at no cost when they qualify.
                </p>
                <Link
                  href="/free-collection"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  See what qualifies <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
              <div className="rounded-2xl border border-border bg-card/95 p-6 shadow-lift">
                <span className="inline-flex items-center gap-2 rounded-full bg-paid-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-paid">
                  <XCircle className="size-3.5" aria-hidden /> Paid service
                </span>
                <h2 className="mt-4 text-lg font-bold text-foreground">General junk & clearances</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Mattresses, garden waste, broken furniture, renovation leftovers and full property
                  clearances — priced on volume, weight and access.
                </p>
                <Link
                  href="/services"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                >
                  Browse services <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, no site visit needed to get a price"
          description="Everything starts with photos, so you get a real answer before anyone gets in a vehicle."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <step.icon className="size-5" aria-hidden />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="outline" size="lg">
            <Link href="/how-it-works">
              See the full process <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Services"
          title="Every kind of removal, clearly labelled free or paid"
          description="No guessing which side of the line your job falls on — each service page states it plainly."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </Section>

      <CtaBand />

      <Section tone="sand">
        <SectionHeading
          eyebrow="Service areas"
          title={`Collecting across ${areas.length} Dubai communities`}
          description="Each area page covers the housing type, access constraints and the jobs we see most often there."
        />
        <ul className="mt-8 flex flex-wrap gap-2">
          {areas.slice(0, 24).map((area) => (
            <li key={area.slug}>
              <Link
                href={`/areas/${area.slug}`}
                className="inline-flex rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground transition-smooth hover:border-primary hover:text-primary"
              >
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/areas">
              View all service areas <ArrowRight />
            </Link>
          </Button>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="FAQs"
            title="The questions we're asked most"
            description="Straight answers about how free collection works and how paid jobs are priced."
          />
          <div>
            <FaqAccordion items={faqs} idPrefix="home-faq" />
            <Button asChild variant="outline" className="mt-6">
              <Link href="/faqs">
                All FAQs <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionHeading eyebrow="Guides" title="Practical advice for clearing out in Dubai" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                {post.category}
              </span>
              <h3 className="mt-3 text-lg font-bold text-foreground">{post.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read guide <ArrowRight className="size-4 transition-smooth group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="card" className="border-t border-border">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Prefer to talk it through?</h2>
            <p className="mt-2 text-muted-foreground">
              Call us and describe the job — we&apos;ll tell you what&apos;s free and what isn&apos;t.
            </p>
          </div>
          <Button asChild size="xl">
            <a href={site.phoneHref}>
              <Phone /> {site.phone}
            </a>
          </Button>
        </div>
      </Section>

      <JsonLd data={graph} />
    </>
  );
}
