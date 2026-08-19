"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { AreaSummary } from "@/lib/payload-data";

export function AreasBrowser({ areas }: { areas: AreaSummary[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string | null>(null);

  const regions = useMemo(() => [...new Set(areas.map((a) => a.region))], [areas]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return areas.filter((area) => {
      const matchesQuery = q.length === 0 || area.name.toLowerCase().includes(q);
      const matchesRegion = !region || area.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [areas, query, region]);

  const grouped = useMemo(() => {
    const map = new Map<string, AreaSummary[]>();
    for (const area of filtered) {
      const list = map.get(area.region) ?? [];
      list.push(area);
      map.set(area.region, list);
    }
    return [...map.entries()];
  }, [filtered]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            placeholder="Search areas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
            aria-label="Search areas"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setRegion(null)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-smooth",
              region === null
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary hover:text-primary",
            )}
          >
            All regions
          </button>
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-smooth",
                region === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:border-primary hover:text-primary",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {grouped.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">No areas match that search.</p>
      ) : (
        <div className="mt-10 space-y-12">
          {grouped.map(([regionName, list]) => (
            <div key={regionName}>
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground">
                <MapPin className="size-5 text-primary" aria-hidden /> {regionName}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/areas/${area.slug}`}
                    className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift"
                  >
                    <h3 className="font-bold text-foreground">{area.name}</h3>
                    <p className="mt-1.5 line-clamp-3 text-sm text-muted-foreground">{area.housing}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
