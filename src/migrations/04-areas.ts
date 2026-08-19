import { areas } from "../content/areas";
import { getMigrationPayload } from "./lib/payload-client";
import { upsertByField } from "./lib/upsert";

/**
 * services/nearbyAreas relationships are resolved in
 * 05-link-relationships.ts once every services + areas document exists.
 */
export async function importAreas(regionIdByName: Map<string, string | number>) {
  const payload = await getMigrationPayload();
  const idBySlug = new Map<string, string | number>();

  for (const a of areas) {
    const regionId = regionIdByName.get(a.region);
    if (!regionId) throw new Error(`No region id found for "${a.region}" (area ${a.slug})`);

    const id = await upsertByField(payload, "areas", "slug", a.slug, {
      slug: a.slug,
      name: a.name,
      region: regionId,
      type: a.type,
      landmarks: a.landmarks,
      intro: a.intro,
      housing: a.housing,
      access: a.access,
      commonJobs: a.commonJobs.map((item) => ({ item })),
    });
    idBySlug.set(a.slug, id);
  }

  payload.logger.info(`Areas imported: ${areas.length}`);
  return idBySlug;
}
