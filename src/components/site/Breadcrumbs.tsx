import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

export function Breadcrumbs({ items, onDark }: { items: Crumb[]; onDark?: boolean }) {
  const base = onDark ? "text-primary-foreground/70" : "text-muted-foreground";
  const active = onDark ? "text-primary-foreground" : "text-foreground";

  return (
    <nav aria-label="Breadcrumb" className={`text-xs sm:text-sm ${base}`}>
      <ol className="flex flex-wrap items-center gap-1">
        <li className="flex items-center gap-1">
          <Link href="/" className="transition-smooth hover:underline">
            Home
          </Link>
        </li>
        {items.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="flex items-center gap-1">
            <ChevronRight className="size-3.5 opacity-60" aria-hidden />
            {crumb.to && i < items.length - 1 ? (
              <Link href={crumb.to} className="transition-smooth hover:underline">
                {crumb.label}
              </Link>
            ) : (
              <span className={`font-medium ${active}`} aria-current="page">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
