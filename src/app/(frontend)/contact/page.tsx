import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container, Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { QuoteForm } from "@/components/site/QuoteForm";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/site/JsonLd";
import { TrackedLink } from "@/components/site/TrackedLink";
import { getAllAreas, getAllServices, getSiteSettings } from "@/lib/payload-data";
import { breadcrumbNode, buildMetadata, schemaGraph } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return buildMetadata({
    title: `Contact ${site.name} | WhatsApp, Call or Quote`,
    description: `Contact our Dubai collection team by WhatsApp, phone or the quote form. Based in ${site.address?.district ?? "Dubai"}, covering communities across Dubai.`,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const [site, areas, services] = await Promise.all([getSiteSettings(), getAllAreas(), getAllServices()]);

  const graph = schemaGraph([
    breadcrumbNode("/contact", [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  ]);

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
                  <TrackedLink
                    eventName="phone_click"
                    eventParams={{ placement: "contact_page" }}
                    href={site.phoneHref}
                    className="hover:underline"
                  >
                    {site.phone}
                  </TrackedLink>
                </li>
                <li className="flex items-center gap-3">
                  <MessageCircle className="size-4 text-primary" aria-hidden />
                  <TrackedLink
                    eventName="whatsapp_click"
                    eventParams={{ placement: "contact_page" }}
                    href={site.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {site.whatsapp}
                  </TrackedLink>
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
                <TrackedLink
                  eventName="whatsapp_click"
                  eventParams={{ placement: "contact_page" }}
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle /> Message on WhatsApp
                </TrackedLink>
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
                <MapPin className="size-5 text-primary" aria-hidden /> Where we&apos;re based
              </h2>
              <address className="mt-3 text-sm not-italic leading-relaxed text-muted-foreground">
                {site.address?.line1}
                <br />
                {site.address?.district}
                <br />
                {site.address?.city}, {site.address?.country}
              </address>
              <p className="mt-3 text-sm text-muted-foreground">
                We operate across Dubai from our {site.address?.district ?? "Dubai"} base. Collections are
                booked in advance — please don&apos;t visit without an appointment.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8">
            <h2 className="text-2xl font-bold text-foreground">Send us your details</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us what you have and where you are, and we&apos;ll come back with a clear answer.
            </p>
            <div className="mt-6">
              <QuoteForm areas={areas} services={services} whatsappHref={site.whatsappHref} />
            </div>
          </div>
        </div>
      </Section>

      <JsonLd data={graph} />
    </>
  );
}
