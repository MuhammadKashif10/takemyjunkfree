import type { PricingModel } from "@/content/services";
import { cn } from "@/lib/utils";

const labels: Record<PricingModel, { text: string; className: string }> = {
  "free-if-qualifying": {
    text: "Free if it qualifies",
    className: "bg-free-soft text-free",
  },
  paid: { text: "Paid service", className: "bg-paid-soft text-paid" },
  mixed: { text: "Free or paid", className: "bg-secondary text-secondary-foreground" },
};

export function PricingBadge({
  pricing,
  className,
}: {
  pricing: PricingModel;
  className?: string | undefined;
}) {
  const meta = labels[pricing];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        meta.className,
        className,
      )}
    >
      {meta.text}
    </span>
  );
}
