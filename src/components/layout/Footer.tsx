import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Recycle } from "lucide-react";
import { Container } from "@/components/site/Section";
import { TrackedLink } from "@/components/site/TrackedLink";
import { getPayloadClient, type FooterNavGroup, type SiteSettings } from "@/lib/payload-data";
import { SITE_URL } from "@/lib/seo";

type FooterProps = {
  footerNav: FooterNavGroup[];
  site: SiteSettings;
};

async function getFooterServicesAndAreas() {
  const payload = await getPayloadClient();

  const [services, areas] = await Promise.all([
    payload.find({ collection: "services", limit: 6, depth: 0, sort: "title" }),
    payload.find({ collection: "areas", limit: 10, depth: 0, sort: "name" }),
  ]);

  return {
    services: services.docs.map((s) => ({ slug: s["slug"] as string, shortTitle: s["shortTitle"] as string })),
    areas: areas.docs.map((a) => ({ slug: a["slug"] as string, name: a["name"] as string })),
    totalAreas: areas.totalDocs,
  };
}

export async function Footer({ footerNav, site }: FooterProps) {
  const { services, areas, totalAreas } = await getFooterServicesAndAreas();

  return (
    <footer className="bg-primary-deep text-primary-foreground">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/15">
                <Recycle className="size-5" aria-hidden />
              </span>
              <span className="font-display text-base font-bold">{site.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">{site.tagline}</p>
            <address className="mt-5 space-y-2 text-sm not-italic text-primary-foreground/80">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {site.address?.line1}
                  <br />
                  {site.address?.district}, {site.address?.city}
                  <br />
                  {site.address?.country}
                </span>
              </span>
              <TrackedLink
                eventName="phone_click"
                eventParams={{ placement: "footer" }}
                href={site.phoneHref}
                className="flex items-center gap-2 hover:underline"
              >
                <Phone className="size-4 shrink-0" aria-hidden /> {site.phone}
              </TrackedLink>
              <TrackedLink
                eventName="whatsapp_click"
                eventParams={{ placement: "footer" }}
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <MessageCircle className="size-4 shrink-0" aria-hidden /> {site.whatsapp}
              </TrackedLink>
              <span className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden /> {site.email}
              </span>
            </address>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-primary-foreground/85 hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Popular services">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
              Popular services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-primary-foreground/85 hover:underline">
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-primary-foreground/15 pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/60">
            Areas we cover
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-foreground/80">
            {areas.map((area) => (
              <li key={area.slug}>
                <Link href={`/areas/${area.slug}`} className="hover:underline">
                  {area.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/areas" className="font-semibold text-accent hover:underline">
                All {totalAreas} areas →
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Based in {site.address?.district}, Dubai.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <p>{new URL(SITE_URL).host}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
