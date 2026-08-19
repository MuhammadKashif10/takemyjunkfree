import type { CollectionConfig } from "payload";

export const ItemCategories: CollectionConfig = {
  slug: "item-categories",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "track", "slug"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true },
    {
      name: "track",
      type: "select",
      required: true,
      options: [
        { label: "Free", value: "free" },
        { label: "Paid", value: "paid" },
      ],
    },
    { name: "note", type: "textarea" },
    { name: "items", type: "array", fields: [{ name: "item", type: "text", required: true }] },
    { name: "relatedService", type: "relationship", relationTo: "services" },
  ],
};
