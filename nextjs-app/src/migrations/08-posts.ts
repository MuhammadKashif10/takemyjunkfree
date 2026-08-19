import { posts } from "../content/blog";
import { sectionsToLexicalState } from "./lib/lexical";
import { getMigrationPayload } from "./lib/payload-client";
import { upsertByField } from "./lib/upsert";

export async function importPosts(
  categoryIdByName: Map<string, string | number>,
  defaultAuthorId: string | number,
) {
  const payload = await getMigrationPayload();

  for (const p of posts) {
    await upsertByField(payload, "posts", "slug", p.slug, {
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: categoryIdByName.get(p.category),
      author: defaultAuthorId,
      body: sectionsToLexicalState(p.sections),
      publishedDate: new Date(p.publishedISO).toISOString(),
      readingMinutes: p.readingMinutes,
      seo: {
        metaTitle: p.metaTitle,
        metaDescription: p.metaDescription,
      },
    });
  }

  payload.logger.info(`Posts imported: ${posts.length}`);
}
