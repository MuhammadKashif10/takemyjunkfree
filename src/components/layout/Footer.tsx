import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone, Recycle } from "lucide-react";
import { Container } from "@/components/site/Section";
import { footerNav, site } from "@/content/site";
import { services } from "@/content/services";
import { areas } from "@/content/areas";

export function Footer() {
  const featuredAreas = areas.slice(0, 10);

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
                  {site.address.line1}
                  <br />
                  {site.address.district}, {site.address.city}
                  <br />
                  {site.address.country}
                </span>
              </span>
              <a href={site.phoneHref} className="flex items-center gap-2 hover:underline">
                <Phone className="size-4 shrink-0" aria-hidden /> {site.phone}
              </a>
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:underline"
              >
                <MessageCircle className="size-4 shrink-0" aria-hidden /> {site.whatsapp}
              </a>
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
                  <li key={item.to}>
                    <Link to={item.to} className="text-primary-foreground/85 hover:underline">
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
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="text-primary-foreground/85 hover:underline"
                  >
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
            {featuredAreas.map((area) => (
              <li key={area.slug}>
                <Link to="/areas/$slug" params={{ slug: area.slug }} className="hover:underline">
                  {area.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/areas" className="font-semibold text-accent hover:underline">
                All {areas.length} areas →
              </Link>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Based in {site.address.district}, Dubai.
          </p>
          <p>{site.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
