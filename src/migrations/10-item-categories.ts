import { itemGroups } from "../content/items";
import { getMigrationPayload } from "./lib/payload-client";
import { upsertByField } from "./lib/upsert";

/**
 * relatedService is left unset — the old data has no explicit link between
 * an item group and a service, and one shouldn't be guessed. Set it
 * manually in the admin UI where it's genuinely a 1:1 match (e.g.
 * "mattresses" -> "mattress-disposal").
 */
export async function importItemCategories() {
  const payload = await getMigrationPayload();

  for (const g of itemGroups) {
    await upsertByField(payload, "item-categories", "slug", g.slug, {
      slug: g.slug,
      title: g.title,
      track: g.track,
      note: g.note,
      items: g.items.map((item) => ({ item })),
    });
  }

  payload.logger.info(`Item categories imported: ${itemGroups.length}`);
}
