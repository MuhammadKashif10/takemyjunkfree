import { MessageCircle, Phone } from "lucide-react";
import { TrackedLink } from "@/components/site/TrackedLink";
import type { SiteSettings } from "@/lib/payload-data";

/** Persistent mobile-first contact actions. */
export function FloatingActions({ site }: { site: SiteSettings }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 sm:inset-x-auto sm:right-5 sm:bottom-6">
      <div className="pointer-events-auto flex gap-2 border-t border-border bg-background/95 p-3 backdrop-blur-md sm:flex-col sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
        <TrackedLink
          eventName="whatsapp_click"
          eventParams={{ placement: "floating_actions" }}
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 text-sm font-semibold text-whatsapp-foreground shadow-float transition-smooth hover:brightness-105 sm:h-14 sm:w-14 sm:flex-none sm:rounded-full sm:px-0"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="size-5" aria-hidden />
          <span className="sm:sr-only">WhatsApp</span>
        </TrackedLink>
        <TrackedLink
          eventName="phone_click"
          eventParams={{ placement: "floating_actions" }}
          href={site.phoneHref}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-float transition-smooth hover:bg-primary-deep sm:h-14 sm:w-14 sm:flex-none sm:rounded-full sm:px-0"
          aria-label="Call us"
        >
          <Phone className="size-5" aria-hidden />
          <span className="sm:sr-only">Call</span>
        </TrackedLink>
      </div>
    </div>
  );
}
