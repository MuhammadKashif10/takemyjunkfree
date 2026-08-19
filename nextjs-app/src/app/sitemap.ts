import type { MetadataRoute } from "next";
import { getPayload } from "payload";

import config from "../payload.config";
import { SITE_URL } from "../lib/seo";

const STATIC_PATHS = [
  "/",
  "/about",
  "/how-it-works",
  "/free-collection",
  "/what-we-take",
  "/services",
  "/areas",
  "/blog",
  "/faqs",
  "/quote",
  "/contact",
  "/pricing",
  "/reviews",
  "/gallery",
  "/privacy",
  "/terms",
];

/**
 * Never includes: drafts, noindex pages, unpublished service-area pages,
 * or admin/API routes. Service×area pages only appear once
 * publishState = "published".
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config });

  const notNoindex = { "seo.noindex": { not_equals: true } };

  const [services, areas, posts, itemCategories, serviceAreas] = await Promise.all([
    payload.find({ collection: "services", limit: 1000, depth: 0, where: notNoindex }),
    payload.find({ collection: "areas", limit: 1000, depth: 0, where: notNoindex }),
    payload.find({ collection: "posts", limit: 1000, depth: 0, where: notNoindex }),
    payload.find({ collection: "item-categories", limit: 1000, depth: 0 }),
    payload.find({
      collection: "service-areas",
      limit: 1000,
      depth: 1,
      where: { and: [{ publishState: { equals: "published" } }, notNoindex] },
    }),
  ]);

  const entries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  for (const s of services.docs) {
    entries.push({ url: `${SITE_URL}/services/${s["slug"]}`, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const a of areas.docs) {
    entries.push({ url: `${SITE_URL}/areas/${a["slug"]}`, changeFrequency: "monthly", priority: 0.8 });
  }
  for (const p of posts.docs) {
    entries.push({ url: `${SITE_URL}/blog/${p["slug"]}`, changeFrequency: "monthly", priority: 0.6 });
  }
  for (const c of itemCategories.docs) {
    entries.push({ url: `${SITE_URL}/what-we-take/${c["slug"]}`, changeFrequency: "monthly", priority: 0.5 });
  }
  for (const sa of serviceAreas.docs) {
    const service = sa["service"];
    const area = sa["area"];
    const serviceSlug = typeof service === "object" && service ? (service as { slug?: string })["slug"] : null;
    const areaSlug = typeof area === "object" && area ? (area as { slug?: string })["slug"] : null;
    if (serviceSlug && areaSlug) {
      entries.push({
        url: `${SITE_URL}/services/${serviceSlug}/${areaSlug}`,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
