import { services } from "../content/services";
import { getMigrationPayload } from "./lib/payload-client";
import { upsertByField } from "./lib/upsert";

/**
 * relatedServices/areas relationships are resolved in
 * 05-link-relationships.ts once every services + areas document exists.
 */
export async function importServices() {
  const payload = await getMigrationPayload();
  const idBySlug = new Map<string, string | number>();

  for (const s of services) {
    const id = await upsertByField(payload, "services", "slug", s.slug, {
      slug: s.slug,
      title: s.title,
      shortTitle: s.shortTitle,
      pricing: s.pricing,
      summary: s.summary,
      intro: s.intro.map((paragraph) => ({ paragraph })),
      includes: s.includes.map((item) => ({ item })),
      goodToKnow: s.goodToKnow.map((item) => ({ item })),
      typicalJobs: s.typicalJobs.map((item) => ({ item })),
      seo: {
        metaTitle: s.metaTitle,
        metaDescription: s.metaDescription,
      },
    });
    idBySlug.set(s.slug, id);
  }

  payload.logger.info(`Services imported: ${services.length}`);
  return idBySlug;
}
