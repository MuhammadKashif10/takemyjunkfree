import { areas as oldAreas } from "../content/areas";
import { services as oldServices } from "../content/services";
import { getMigrationPayload } from "./lib/payload-client";

const NEARBY_LIMIT = 6;
const AREAS_PER_SERVICE_LIMIT = 12;

/**
 * The old content model only stores one direction of each relationship as
 * a plain slug array (Service.relatedSlugs, Area.popularServices). This
 * derives the reverse direction and writes real Payload relationship
 * fields both ways, plus a same-region "nearby areas" list that didn't
 * exist in the source data at all.
 */
export async function linkRelationships(
  serviceIdBySlug: Map<string, string | number>,
  areaIdBySlug: Map<string, string | number>,
) {
  const payload = await getMigrationPayload();

  // Service -> relatedServices (direct port of relatedSlugs)
  for (const s of oldServices) {
    const relatedIds = s.relatedSlugs.map((slug) => serviceIdBySlug.get(slug)).filter(Boolean);
    await payload.update({
      collection: "services",
      id: serviceIdBySlug.get(s.slug)!,
      data: { relatedServices: relatedIds as (string | number)[] },
    });
  }

  // Area -> services (direct port of popularServices)
  for (const a of oldAreas) {
    const serviceIds = a.popularServices.map((slug) => serviceIdBySlug.get(slug)).filter(Boolean);
    await payload.update({
      collection: "areas",
      id: areaIdBySlug.get(a.slug)!,
      data: { services: serviceIds as (string | number)[] },
    });
  }

  // Service -> areas (reverse lookup: derived, didn't exist in source data)
  for (const s of oldServices) {
    const areaIds = oldAreas
      .filter((a) => a.popularServices.includes(s.slug))
      .slice(0, AREAS_PER_SERVICE_LIMIT)
      .map((a) => areaIdBySlug.get(a.slug))
      .filter(Boolean);
    await payload.update({
      collection: "services",
      id: serviceIdBySlug.get(s.slug)!,
      data: { areas: areaIds as (string | number)[] },
    });
  }

  // Area -> nearbyAreas (derived: same region, excluding self, capped)
  for (const a of oldAreas) {
    const nearbyIds = oldAreas
      .filter((other) => other.region === a.region && other.slug !== a.slug)
      .slice(0, NEARBY_LIMIT)
      .map((other) => areaIdBySlug.get(other.slug))
      .filter(Boolean);
    await payload.update({
      collection: "areas",
      id: areaIdBySlug.get(a.slug)!,
      data: { nearbyAreas: nearbyIds as (string | number)[] },
    });
  }

  payload.logger.info("Relationships linked: relatedServices, area<->service, nearbyAreas.");
}
