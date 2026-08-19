import { areas } from "../content/areas";
import { getMigrationPayload } from "./lib/payload-client";
import { upsertByField } from "./lib/upsert";

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export async function importRegions() {
  const payload = await getMigrationPayload();
  const regionNames = [...new Set(areas.map((a) => a.region))];
  const regionIdByName = new Map<string, string | number>();

  for (const name of regionNames) {
    const id = await upsertByField(payload, "regions", "slug", slugify(name), {
      name,
      slug: slugify(name),
    });
    regionIdByName.set(name, id);
  }

  payload.logger.info(`Regions imported: ${regionNames.length}`);
  return regionIdByName;
}
