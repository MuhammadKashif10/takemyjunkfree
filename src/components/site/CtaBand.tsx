import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/site/Section";
import { TrackedLink } from "@/components/site/TrackedLink";
import { getSiteSettings } from "@/lib/payload-data";

export async function CtaBand({
  title = "Send photos. Get an honest answer.",
  description = "We tell you which items qualify for free collection and quote everything else upfront — before anyone travels to you.",
}: {
  title?: string;
  description?: string;
}) {
  const site = await getSiteSettings();

  return (
    <section className="bg-hero-gradient py-14 sm:py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary-foreground sm:text-4xl">{title}</h2>
            <p className="mt-4 max-w-xl text-primary-foreground/80">{description}</p>
          </div>
          <div className="flex flex-col gap-3">
            <Button asChild variant="whatsapp" size="xl">
              <TrackedLink
                eventName="whatsapp_click"
                eventParams={{ placement: "cta_band" }}
                href={site.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> WhatsApp your photos
              </TrackedLink>
            </Button>
            <Button asChild variant="onDark" size="xl">
              <TrackedLink eventName="phone_click" eventParams={{ placement: "cta_band" }} href={site.phoneHref}>
                <Phone /> Call {site.phone}
              </TrackedLink>
            </Button>
            <Button asChild variant="ghost" size="lg" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/quote">
                Request a written quote <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
