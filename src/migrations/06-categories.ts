import { posts } from "../content/blog";
import { getMigrationPayload } from "./lib/payload-client";
import { upsertByField } from "./lib/upsert";

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export async function importCategories() {
  const payload = await getMigrationPayload();
  const categoryNames = [...new Set(posts.map((p) => p.category))];
  const idByName = new Map<string, string | number>();

  for (const name of categoryNames) {
    const id = await upsertByField(payload, "categories", "slug", slugify(name), {
      name,
      slug: slugify(name),
    });
    idByName.set(name, id);
  }

  payload.logger.info(`Categories imported: ${categoryNames.length}`);
  return idByName;
}
