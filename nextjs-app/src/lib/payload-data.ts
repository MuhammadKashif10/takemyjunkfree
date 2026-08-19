import { cache } from "react";
import { getPayload } from "payload";

import config from "../payload.config";

export async function getPayloadClient() {
  return getPayload({ config });
}

export type PricingModel = "free-if-qualifying" | "paid" | "mixed";

export type SiteSettings = {
  name: string;
  shortName?: string | undefined;
  tagline?: string | undefined;
  description?: string | undefined;
  phone?: string | undefined;
  phoneHref?: string | undefined;
  whatsapp?: string | undefined;
  whatsappHref?: string | undefined;
  email?: string | undefined;
  address?:
    | { line1?: string | undefined; district?: string | undefined; city?: string | undefined; country?: string | undefined }
    | undefined;
  hours?: string | undefined;
};

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({ slug: "site-settings" });

  return {
    name: settings["name"] as string,
    shortName: settings["shortName"] as string | undefined,
    tagline: settings["tagline"] as string | undefined,
    description: settings["description"] as string | undefined,
    phone: settings["phone"] as string | undefined,
    phoneHref: settings["phoneHref"] as string | undefined,
    whatsapp: settings["whatsapp"] as string | undefined,
    whatsappHref: settings["whatsappHref"] as string | undefined,
    email: settings["email"] as string | undefined,
    address: settings["address"] as SiteSettings["address"],
    hours: settings["hours"] as string | undefined,
  };
});

export type WhatWeTakeSettings = {
  notAccepted: string[];
  freeCriteria: { title: string; body: string }[];
};

export const getWhatWeTakeSettings = cache(async (): Promise<WhatWeTakeSettings> => {
  const payload = await getPayloadClient();
  const settings = await payload.findGlobal({ slug: "site-settings" });
  const group = settings["whatWeTake"] as Record<string, unknown> | undefined;

  return {
    notAccepted: ((group?.["notAccepted"] as { item: string }[] | undefined) ?? []).map((i) => i.item),
    freeCriteria: (group?.["freeCriteria"] as { title: string; body: string }[] | undefined) ?? [],
  };
});

export type NavItem = { label: string; href: string };
export type FooterNavGroup = { title: string; items: NavItem[] };

export const getNavigation = cache(
  async (): Promise<{ primaryNav: NavItem[]; footerNav: FooterNavGroup[] }> => {
    const payload = await getPayloadClient();
    const nav = await payload.findGlobal({ slug: "navigation" });

    return {
      primaryNav: (nav["primaryNav"] as NavItem[] | undefined) ?? [],
      footerNav: (nav["footerNav"] as FooterNavGroup[] | undefined) ?? [],
    };
  },
);

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export type ServiceSummary = {
  slug: string;
  title: string;
  shortTitle: string;
  summary?: string | undefined;
  pricing: PricingModel;
};

const toServiceSummary = (doc: Record<string, unknown>): ServiceSummary => ({
  slug: doc["slug"] as string,
  title: doc["title"] as string,
  shortTitle: doc["shortTitle"] as string,
  summary: doc["summary"] as string | undefined,
  pricing: doc["pricing"] as PricingModel,
});

export const getAllServices = cache(async (): Promise<ServiceSummary[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "services", limit: 100, depth: 0 });
  return docs.map(toServiceSummary);
});

export type ServiceDetail = ServiceSummary & {
  intro: string[];
  includes: string[];
  goodToKnow: string[];
  typicalJobs: string[];
  relatedServices: ServiceSummary[];
  areas: { slug: string; name: string }[];
  seo?: { metaTitle?: string | undefined; metaDescription?: string | undefined } | undefined;
};

export const getServiceBySlug = cache(async (slug: string): Promise<ServiceDetail | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "services",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  const doc = docs[0];
  if (!doc) return null;

  const relatedServices = ((doc["relatedServices"] as Record<string, unknown>[] | undefined) ?? []).map(
    toServiceSummary,
  );
  const areas = ((doc["areas"] as Record<string, unknown>[] | undefined) ?? []).map((a) => ({
    slug: a["slug"] as string,
    name: a["name"] as string,
  }));

  return {
    ...toServiceSummary(doc),
    intro: ((doc["intro"] as { paragraph: string }[] | undefined) ?? []).map((p) => p.paragraph),
    includes: ((doc["includes"] as { item: string }[] | undefined) ?? []).map((i) => i.item),
    goodToKnow: ((doc["goodToKnow"] as { item: string }[] | undefined) ?? []).map((i) => i.item),
    typicalJobs: ((doc["typicalJobs"] as { item: string }[] | undefined) ?? []).map((i) => i.item),
    relatedServices,
    areas,
    seo: doc["seo"] as ServiceDetail["seo"],
  };
});

// ---------------------------------------------------------------------------
// Areas
// ---------------------------------------------------------------------------

export type AreaSummary = {
  slug: string;
  name: string;
  region: string;
  housing?: string | undefined;
};

const toAreaSummary = (doc: Record<string, unknown>): AreaSummary => {
  const region = doc["region"] as Record<string, unknown> | string | undefined;
  return {
    slug: doc["slug"] as string,
    name: doc["name"] as string,
    region: typeof region === "object" && region ? (region["name"] as string) : "",
    housing: doc["housing"] as string | undefined,
  };
};

export const getAllAreas = cache(async (): Promise<AreaSummary[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "areas", limit: 200, depth: 1, sort: "name" });
  return docs.map(toAreaSummary);
});

export const getAreasByRegion = cache(async (): Promise<[string, AreaSummary[]][]> => {
  const areas = await getAllAreas();
  const grouped = new Map<string, AreaSummary[]>();
  for (const area of areas) {
    const list = grouped.get(area.region) ?? [];
    list.push(area);
    grouped.set(area.region, list);
  }
  return [...grouped.entries()];
});

export type AreaDetail = AreaSummary & {
  type: string;
  landmarks?: string | undefined;
  intro: string;
  access?: string | undefined;
  commonJobs: string[];
  services: ServiceSummary[];
  nearbyAreas: AreaSummary[];
  seo?: { metaTitle?: string | undefined; metaDescription?: string | undefined } | undefined;
};

export const getAreaBySlug = cache(async (slug: string): Promise<AreaDetail | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "areas",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  const doc = docs[0];
  if (!doc) return null;

  const services = ((doc["services"] as Record<string, unknown>[] | undefined) ?? []).map(toServiceSummary);
  const nearbyAreas = ((doc["nearbyAreas"] as Record<string, unknown>[] | undefined) ?? []).map(toAreaSummary);

  return {
    ...toAreaSummary(doc),
    type: doc["type"] as string,
    landmarks: doc["landmarks"] as string | undefined,
    intro: doc["intro"] as string,
    access: doc["access"] as string | undefined,
    commonJobs: ((doc["commonJobs"] as { item: string }[] | undefined) ?? []).map((i) => i.item),
    services,
    nearbyAreas,
    seo: doc["seo"] as AreaDetail["seo"],
  };
});

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

export type FaqSummary = { question: string; answer: string };

export const getGeneralFaqs = cache(async (limit = 100): Promise<FaqSummary[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "faqs",
    limit,
    depth: 0,
    where: { and: [{ relatedService: { exists: false } }, { relatedArea: { exists: false } }] },
  });
  return docs.map((d) => ({ question: d["question"] as string, answer: d["answer"] as string }));
});

export type FaqCategory = "free" | "pricing" | "booking" | "practical";

export const getFaqsByCategory = cache(async (category: FaqCategory): Promise<FaqSummary[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "faqs",
    limit: 100,
    depth: 0,
    where: { category: { equals: category } },
  });
  return docs.map((d) => ({ question: d["question"] as string, answer: d["answer"] as string }));
});

// ---------------------------------------------------------------------------
// Item categories
// ---------------------------------------------------------------------------

export type ItemCategory = {
  slug: string;
  title: string;
  track: "free" | "paid";
  note?: string | undefined;
  items: string[];
};

export const getItemCategories = cache(async (): Promise<ItemCategory[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "item-categories", limit: 100, depth: 0 });
  return docs.map((d) => ({
    slug: d["slug"] as string,
    title: d["title"] as string,
    track: d["track"] as "free" | "paid",
    note: d["note"] as string | undefined,
    items: ((d["items"] as { item: string }[] | undefined) ?? []).map((i) => i.item),
  }));
});

export type ItemCategoryDetail = ItemCategory & { relatedService?: ServiceSummary | undefined };

export const getItemCategoryBySlug = cache(async (slug: string): Promise<ItemCategoryDetail | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "item-categories",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const doc = docs[0];
  if (!doc) return null;

  const relatedService = doc["relatedService"] as Record<string, unknown> | string | undefined;

  return {
    slug: doc["slug"] as string,
    title: doc["title"] as string,
    track: doc["track"] as "free" | "paid",
    note: doc["note"] as string | undefined,
    items: ((doc["items"] as { item: string }[] | undefined) ?? []).map((i) => i.item),
    relatedService: typeof relatedService === "object" && relatedService ? toServiceSummary(relatedService) : undefined,
  };
});

// ---------------------------------------------------------------------------
// Reviews
// ---------------------------------------------------------------------------

export type ReviewSummary = {
  authorName: string;
  rating: number;
  body: string;
  serviceName?: string | undefined;
  areaName?: string | undefined;
};

export const getReviews = cache(async (): Promise<ReviewSummary[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "reviews", limit: 100, depth: 1, sort: "-date" });
  return docs.map((d) => {
    const service = d["service"] as Record<string, unknown> | string | undefined;
    const area = d["area"] as Record<string, unknown> | string | undefined;
    return {
      authorName: d["authorName"] as string,
      rating: d["rating"] as number,
      body: d["body"] as string,
      serviceName: typeof service === "object" && service ? (service["shortTitle"] as string) : undefined,
      areaName: typeof area === "object" && area ? (area["name"] as string) : undefined,
    };
  });
});

// ---------------------------------------------------------------------------
// Gallery
// ---------------------------------------------------------------------------

export type GalleryImage = { url: string; alt: string };

export const getGalleryImages = cache(async (): Promise<GalleryImage[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "media",
    limit: 100,
    depth: 0,
    where: { gallery: { equals: true } },
  });
  return docs
    .map((d) => ({ url: d["url"] as string | undefined, alt: d["alt"] as string }))
    .filter((d): d is GalleryImage => Boolean(d.url));
});

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

export type PostSummary = {
  slug: string;
  title: string;
  excerpt?: string | undefined;
  category?: string | undefined;
};

const toPostSummary = (d: Record<string, unknown>): PostSummary => {
  const category = d["category"] as Record<string, unknown> | string | undefined;
  return {
    slug: d["slug"] as string,
    title: d["title"] as string,
    excerpt: d["excerpt"] as string | undefined,
    category: typeof category === "object" && category ? (category["name"] as string) : undefined,
  };
};

export const getLatestPosts = cache(async (limit = 3): Promise<PostSummary[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "posts", limit, depth: 1, sort: "-publishedDate" });
  return docs.map(toPostSummary);
});

export type PostListItem = PostSummary & { readingMinutes?: number | undefined };

export const getAllPosts = cache(async (): Promise<PostListItem[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "posts", limit: 200, depth: 1, sort: "-publishedDate" });
  return docs.map((d) => ({ ...toPostSummary(d), readingMinutes: d["readingMinutes"] as number | undefined }));
});

export type PostDetail = PostSummary & {
  body: unknown;
  authorName?: string | undefined;
  publishedDate: string;
  updatedDate?: string | undefined;
  readingMinutes?: number | undefined;
  heroImageUrl?: string | undefined;
  seo?: { metaTitle?: string | undefined; metaDescription?: string | undefined } | undefined;
};

export const getPostBySlug = cache(async (slug: string): Promise<PostDetail | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  const doc = docs[0];
  if (!doc) return null;

  const author = doc["author"] as Record<string, unknown> | string | undefined;
  const heroImage = doc["heroImage"] as Record<string, unknown> | string | undefined;

  return {
    ...toPostSummary(doc),
    body: doc["body"],
    authorName: typeof author === "object" && author ? (author["name"] as string) : undefined,
    publishedDate: doc["publishedDate"] as string,
    updatedDate: doc["updatedDate"] as string | undefined,
    readingMinutes: doc["readingMinutes"] as number | undefined,
    heroImageUrl: typeof heroImage === "object" && heroImage ? (heroImage["url"] as string) : undefined,
    seo: doc["seo"] as PostDetail["seo"],
  };
});

// ---------------------------------------------------------------------------
// Service × Area (gated — only "published" entries are ever returned to the
// frontend; drafts/ready-for-review 404 on the public site and are excluded
// from the sitemap. The collection stays empty until content is authored
// per-pair, never bulk-generated.)
// ---------------------------------------------------------------------------

export type ServiceAreaLink = { serviceSlug: string; areaSlug: string; title: string };

const toServiceAreaLink = (d: Record<string, unknown>): ServiceAreaLink | null => {
  const service = d["service"] as Record<string, unknown> | string | undefined;
  const area = d["area"] as Record<string, unknown> | string | undefined;
  if (typeof service !== "object" || !service || typeof area !== "object" || !area) return null;
  return {
    serviceSlug: service["slug"] as string,
    areaSlug: area["slug"] as string,
    title: d["title"] as string,
  };
};

export const getPublishedServiceAreaParams = cache(async (): Promise<{ service: string; area: string }[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "service-areas",
    where: { publishState: { equals: "published" } },
    limit: 1000,
    depth: 1,
  });
  return docs
    .map(toServiceAreaLink)
    .filter((l): l is ServiceAreaLink => Boolean(l))
    .map((l) => ({ service: l.serviceSlug, area: l.areaSlug }));
});

export type ServiceAreaDetail = {
  title: string;
  intro: string;
  logistics?: string | undefined;
  jobs: string[];
  faqs: { question: string; answer: string }[];
  service: ServiceSummary;
  area: AreaSummary;
  seo?: { metaTitle?: string | undefined; metaDescription?: string | undefined } | undefined;
};

export const getServiceAreaBySlugs = cache(
  async (serviceSlug: string, areaSlug: string): Promise<ServiceAreaDetail | null> => {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "service-areas",
      where: {
        and: [
          { "service.slug": { equals: serviceSlug } },
          { "area.slug": { equals: areaSlug } },
          { publishState: { equals: "published" } },
        ],
      },
      limit: 1,
      depth: 2,
    });
    const doc = docs[0];
    if (!doc) return null;

    const service = doc["service"] as Record<string, unknown>;
    const area = doc["area"] as Record<string, unknown>;

    return {
      title: doc["title"] as string,
      intro: doc["intro"] as string,
      logistics: doc["logistics"] as string | undefined,
      jobs: ((doc["jobs"] as { item: string }[] | undefined) ?? []).map((i) => i.item),
      faqs: (doc["faqs"] as { question: string; answer: string }[] | undefined) ?? [],
      service: toServiceSummary(service),
      area: toAreaSummary(area),
      seo: doc["seo"] as ServiceAreaDetail["seo"],
    };
  },
);

export const getServiceAreasForService = cache(async (serviceSlug: string): Promise<ServiceAreaLink[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "service-areas",
    where: { and: [{ "service.slug": { equals: serviceSlug } }, { publishState: { equals: "published" } }] },
    limit: 50,
    depth: 1,
  });
  return docs.map(toServiceAreaLink).filter((l): l is ServiceAreaLink => Boolean(l));
});

export const getServiceAreasForArea = cache(async (areaSlug: string): Promise<ServiceAreaLink[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "service-areas",
    where: { and: [{ "area.slug": { equals: areaSlug } }, { publishState: { equals: "published" } }] },
    limit: 50,
    depth: 1,
  });
  return docs.map(toServiceAreaLink).filter((l): l is ServiceAreaLink => Boolean(l));
});
