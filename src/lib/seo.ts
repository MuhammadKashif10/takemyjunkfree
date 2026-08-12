import { site } from "@/content/site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
};

/** Builds a consistent per-route head() payload. */
export function buildHead({ title, description, path, type = "website", image }: MetaInput) {
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { property: "og:site_name", content: site.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }
  return {
    meta,
    links: [{ rel: "canonical", href: path }],
  };
}

export function jsonLd(data: Record<string, unknown>) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

export function breadcrumbSchema(items: { name: string; item: string }[]) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: entry.item,
    })),
  });
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  description: site.description,
  areaServed: { "@type": "City", name: "Dubai" },
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: `${site.address.district}, ${site.address.city}`,
    addressCountry: "AE",
  },
  telephone: site.phone,
};
