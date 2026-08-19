import { faqs } from "../content/faqs";
import { getMigrationPayload } from "./lib/payload-client";

/**
 * Faqs have no natural unique key in the old data (no slug/id), so this
 * step is create-only. Re-running it will duplicate entries — clear the
 * collection first if you need to re-import.
 */
export async function importFaqs() {
  const payload = await getMigrationPayload();

  const existing = await payload.find({ collection: "faqs", limit: 1 });
  if (existing.totalDocs > 0) {
    payload.logger.info("FAQs already imported, skipping (create-only step).");
    return;
  }

  for (const f of faqs) {
    await payload.create({
      collection: "faqs",
      data: {
        question: f.question,
        answer: f.answer,
        category: f.category,
      },
    });
  }

  payload.logger.info(`FAQs imported: ${faqs.length}`);
}
