import type { Metadata } from "next";
import { MessageCircle, Star } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { getReviews, getSiteSettings } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Customer Reviews | Take My Junk Dubai Free",
    description: "Reviews from customers who've used our junk removal and free collection service in Dubai.",
    path: "/reviews",
  });
}

export default async function ReviewsPage() {
  const [reviews, site] = await Promise.all([getReviews(), getSiteSettings()]);

  const graph = schemaGraph([
    breadcrumbNode("/reviews", [
      { name: "Home", path: "/" },
      { name: "Reviews", path: "/reviews" },
    ]),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Reviews" }]} />
          <SectionHeading as="h1" onDark eyebrow="Reviews" title="What customers say" />
        </Container>
      </div>

      <Section>
        {reviews.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <div key={`${review.authorName}-${i}`} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <Star key={star} className="size-4" fill={star < review.rating ? "currentColor" : "none"} aria-hidden />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-foreground">{review.body}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {review.authorName}
                  {review.areaName ? ` · ${review.areaName}` : null}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
            <h2 className="text-lg font-bold text-foreground">Reviews are coming soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;re just getting this page set up — check back shortly, or message us on WhatsApp if
              you&apos;d like to hear from past customers directly.
            </p>
            {site.whatsappHref ? (
              <Button asChild variant="whatsapp" size="lg" className="mt-6">
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Ask us on WhatsApp
                </a>
              </Button>
            ) : null}
          </div>
        )}
      </Section>

      <CtaBand />

      <JsonLd data={graph} />
    </>
  );
}
