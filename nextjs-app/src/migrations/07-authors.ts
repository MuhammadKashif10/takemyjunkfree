import { site } from "../content/site";
import { getMigrationPayload } from "./lib/payload-client";
import { upsertByField } from "./lib/upsert";

/**
 * No author data exists in the old content — blog posts had no byline at
 * all. Rather than inventing a fake named individual, every post is
 * attributed to a single editorial-team author record. Replace with real
 * author profiles whenever the business wants named bylines.
 */
export async function importAuthors() {
  const payload = await getMigrationPayload();
  const slug = "editorial-team";

  const id = await upsertByField(payload, "authors", "slug", slug, {
    slug,
    name: `${site.shortName} Team`,
    bio: "Written by the operations team.",
  });

  payload.logger.info("Default editorial author imported.");
  return id;
}
