import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CtaBand } from "@/components/site/CtaBand";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { getGalleryImages, getSiteSettings } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Gallery | Take My Junk Dubai Free",
    description: "Photos from junk removal and free collection jobs across Dubai.",
    path: "/gallery",
  });
}

export default async function GalleryPage() {
  const [images, site] = await Promise.all([getGalleryImages(), getSiteSettings()]);

  const graph = schemaGraph([
    breadcrumbNode("/gallery", [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ]),
  ]);

  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Gallery" }]} />
          <SectionHeading as="h1" onDark eyebrow="Gallery" title="Collections and clearances in Dubai" />
        </Container>
      </div>

      <Section>
        {images.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <div key={image.url} className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
                <Image src={image.url} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-soft">
            <h2 className="text-lg font-bold text-foreground">Photos are coming soon</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We&apos;re building out this page with real job photos. In the meantime, WhatsApp us and
              we&apos;re happy to share recent examples directly.
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
