import type { Metadata } from "next";

/**
 * Centralized SEO primitives. Every canonical/OG/schema URL in the app
 * routes through SITE_URL + absoluteUrl() — nothing emits a relative URL
 * into metadata or JSON-LD (the old TanStack app's lib/seo.ts used
 * relative canonical paths; this is the fix).
 */
export const SITE_URL = (process.env["NEXT_PUBLIC_SITE_URL"] ?? "http://localhost:3000").replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export type SeoInput = {
  title: string;
  description?: string | undefined;
  path: string;
  image?: string | undefined;
  noindex?: boolean | undefined;
  canonicalOverride?: string | undefined;
  siteName?: string | undefined;
};

export function buildMetadata(input: SeoInput): Metadata {
  const canonical = input.canonicalOverride || absoluteUrl(input.path);
  const images = input.image ? [{ url: input.image }] : undefined;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: input.siteName,
      type: "website",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: input.image ? [input.image] : undefined,
    },
  };
}

// ---------------------------------------------------------------------------
// Schema graph. One @graph array per page with stable, absolute @id values,
// so nodes (Organization, WebSite, WebPage, ...) can reference each other by
// @id instead of duplicating data — per the spec's "use @graph, not
// disconnected schema objects" requirement.
// ---------------------------------------------------------------------------

type SchemaNode = Record<string, unknown>;

export type OrgSettings = {
  name: string;
  description?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  address?:
    | {
        line1?: string | undefined;
        district?: string | undefined;
        city?: string | undefined;
        country?: string | undefined;
      }
    | undefined;
};

export function organizationNode(settings: OrgSettings): SchemaNode {
  return {
    "@type": "LocalBusiness",
    "@id": absoluteUrl("/#organization"),
    name: settings.name,
    description: settings.description,
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email,
    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address.line1,
          addressLocality: settings.address.district ?? settings.address.city,
          addressRegion: settings.address.city,
          addressCountry: settings.address.country,
        }
      : undefined,
  };
}

export function websiteNode(settings: { name: string }): SchemaNode {
  return {
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: SITE_URL,
    name: settings.name,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function webPageNode(input: { path: string; title: string; description?: string | undefined }): SchemaNode {
  return {
    "@type": "WebPage",
    "@id": absoluteUrl(`${input.path}#webpage`),
    url: absoluteUrl(input.path),
    name: input.title,
    description: input.description,
    isPartOf: { "@id": absoluteUrl("/#website") },
  };
}

export function breadcrumbNode(path: string, items: { name: string; path: string }[]): SchemaNode {
  return {
    "@type": "BreadcrumbList",
    "@id": absoluteUrl(`${path}#breadcrumb`),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListNode(path: string, items: { name: string; path: string }[]): SchemaNode {
  return {
    "@type": "ItemList",
    "@id": absoluteUrl(`${path}#itemlist`),
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function faqPageNode(path: string, faqs: { question: string; answer: string }[]): SchemaNode {
  return {
    "@type": "FAQPage",
    "@id": absoluteUrl(`${path}#faq`),
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function serviceNode(input: { path: string; name: string; description?: string | undefined }): SchemaNode {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`${input.path}#service`),
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Dubai",
  };
}

export function articleNode(input: {
  path: string;
  headline: string;
  description?: string | undefined;
  image?: string | undefined;
  authorName: string;
  datePublished: string;
  dateModified?: string | undefined;
}): SchemaNode {
  return {
    "@type": "Article",
    "@id": absoluteUrl(`${input.path}#article`),
    headline: input.headline,
    description: input.description,
    image: input.image ? [input.image] : undefined,
    author: { "@type": "Person", name: input.authorName },
    publisher: { "@id": absoluteUrl("/#organization") },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: { "@id": absoluteUrl(`${input.path}#webpage`) },
  };
}

export function howToNode(input: {
  path: string;
  name: string;
  steps: { name: string; text: string }[];
}): SchemaNode {
  return {
    "@type": "HowTo",
    "@id": absoluteUrl(`${input.path}#howto`),
    name: input.name,
    step: input.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.name,
      text: step.text,
    })),
  };
}

export function schemaGraph(nodes: (SchemaNode | undefined | false)[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.filter((node): node is SchemaNode => Boolean(node)),
  };
}
