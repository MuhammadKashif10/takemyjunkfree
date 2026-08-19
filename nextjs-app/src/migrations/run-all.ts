/**
 * One-off content migration: imports the old TanStack app's static
 * content/*.ts arrays into Payload/Postgres. Idempotent for everything
 * except FAQs (create-only — see 09-faqs.ts). Run with:
 *
 *   npm run migrate:import
 *
 * Requires DATABASE_URI (Neon) to be set in .env.
 */
import { importAreas } from "./04-areas";
import { importAuthors } from "./07-authors";
import { importCategories } from "./06-categories";
import { importFaqs } from "./09-faqs";
import { importItemCategories } from "./10-item-categories";
import { linkRelationships } from "./05-link-relationships";
import { getMigrationPayload } from "./lib/payload-client";
import { importPosts } from "./08-posts";
import { importRegions } from "./02-regions";
import { importServices } from "./03-services";
import { importSiteSettings } from "./01-site-settings";

async function run() {
  const payload = await getMigrationPayload();
  payload.logger.info("Starting content migration...");

  await importSiteSettings();

  const regionIdByName = await importRegions();
  const serviceIdBySlug = await importServices();
  const areaIdBySlug = await importAreas(regionIdByName);
  await linkRelationships(serviceIdBySlug, areaIdBySlug);

  const categoryIdByName = await importCategories();
  const authorId = await importAuthors();
  await importPosts(categoryIdByName, authorId);

  await importFaqs();
  await importItemCategories();

  payload.logger.info("Content migration complete.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
