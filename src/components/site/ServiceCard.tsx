import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PricingModel } from "@/lib/payload-data";
import { PricingBadge } from "@/components/site/PricingBadge";

export type ServiceCardData = {
  slug: string;
  shortTitle: string;
  summary?: string | undefined;
  pricing: PricingModel;
};

export function ServiceCard({ service }: { service: ServiceCardData }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
    >
      <PricingBadge pricing={service.pricing} />
      <h3 className="mt-4 text-lg font-bold text-foreground">{service.shortTitle}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        Learn more
        <ArrowRight className="size-4 transition-smooth group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
