import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/site/TrackedLink";
import { getSiteSettings } from "@/lib/payload-data";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Quote Request Received | Take My Junk Dubai Free",
    description: "Your quote request has been received. We'll be in touch shortly.",
    path: "/quote/thank-you",
    noindex: true,
  });
}

export default async function QuoteThankYouPage() {
  const site = await getSiteSettings();

  return (
    <Section tone="sand" className="min-h-[60vh]">
      <Container className="max-w-xl text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-free-soft text-free">
          <CheckCircle2 className="size-7" aria-hidden />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">Request received</h1>
        <p className="mt-4 text-muted-foreground">
          Thanks — we&apos;ve got your photos and item details. We&apos;ll confirm which items
          qualify for free collection and quote the rest, usually within a few hours.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          For the fastest reply, send the same photos on WhatsApp too.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {site.whatsappHref ? (
            <Button asChild variant="whatsapp" size="lg">
              <TrackedLink
                eventName="whatsapp_click"
                eventParams={{ placement: "quote_thank_you" }}
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> WhatsApp your photos
              </TrackedLink>
            </Button>
          ) : null}
          <Button asChild variant="outline" size="lg">
            <Link href="/">Back to homepage</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
