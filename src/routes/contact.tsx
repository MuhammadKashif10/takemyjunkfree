import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { buildHead, breadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...buildHead({
      title: "Contact Take My Junk Dubai Free | WhatsApp, Call or Quote",
      description:
        "Contact our Dubai collection team by WhatsApp, phone or the quote form. Based in Arabian Ranches 2, covering communities across Dubai.",
      path: "/contact",
    }),
    scripts: [breadcrumbSchema([{ name: "Home", item: "/" }, { name: "Contact", item: "/contact" }])],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <div className="bg-hero-gradient py-12 sm:py-16">
        <Container>
          <Breadcrumbs onDark items={[{ label: "Contact" }]} />
          <SectionHeading
            as="h1"
            onDark
            eyebrow="Contact"
            title="Talk to the collection team"
            description="WhatsApp is fastest because photos get you a real answer straight away. Calls and the form work just as well."
          />
        </Container>
      </div>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="text-lg font-bold text-foreground">Get in touch</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-primary" aria-hidden />
                  <a href={site.phoneHref} className="hover:underline">
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="size-4 text-primary" aria-hidden />
                  <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {site.whatsapp}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-primary" aria-hidden />
                  {site.email}
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="size-4 text-primary" aria-hidden />
                  {site.hours}
                </li>
              </ul>
              <Button asChild variant="whatsapp" size="lg" className="mt-5 w-full">
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Message on WhatsApp
                </a>
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <MapPin className="size-5 text-primary" aria-hidden /> Where we're based
              </h2>
              <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
                {site.address.line1}
                <br />
                {site.address.district}
                <br />
                {site.address.city}, {site.address.country}
              </address>
              <p className="mt-3 text-sm text-muted-foreground">
                We operate across Dubai from our Arabian Ranches 2 base. Collections are booked in
                advance — please don't visit without an appointment.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">Send us your details</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us what you have and where you are, and we'll come back with a clear answer.
            </p>
            <div className="mt-6">
              <QuoteForm />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
