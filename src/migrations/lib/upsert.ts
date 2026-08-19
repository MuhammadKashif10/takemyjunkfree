import type { Payload } from "payload";

/**
 * Idempotent create-or-update by a unique field (usually "slug"). Safe to
 * re-run a migration script without duplicating records.
 */
export async function upsertByField<T extends Record<string, unknown>>(
  payload: Payload,
  collection: string,
  field: string,
  value: string,
  data: T,
): Promise<string | number> {
  const existing = await payload.find({
    collection: collection as never,
    where: { [field]: { equals: value } },
    limit: 1,
    depth: 0,
  });

  if (existing.docs[0]) {
    const doc = await payload.update({
      collection: collection as never,
      id: existing.docs[0]["id"] as string | number,
      data: data as never,
    });
    return doc.id;
  }

  const doc = await payload.create({
    collection: collection as never,
    data: data as never,
  });
  return doc.id;
}
