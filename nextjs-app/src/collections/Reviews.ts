import type { CollectionConfig } from "payload";

/**
 * No review data exists in the source content and none may be fabricated
 * (explicit no-fake-reviews rule). This collection is architecture only —
 * empty until real customer reviews are entered.
 */
export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "rating", "date"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "authorName", type: "text", required: true },
    { name: "rating", type: "number", required: true, min: 1, max: 5 },
    { name: "body", type: "textarea", required: true },
    { name: "service", type: "relationship", relationTo: "services" },
    { name: "area", type: "relationship", relationTo: "areas" },
    { name: "date", type: "date" },
  ],
};
