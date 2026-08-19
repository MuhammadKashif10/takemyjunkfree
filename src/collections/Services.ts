import type { CollectionConfig } from "payload";

import { heroFields } from "../fields/hero";
import { seoFields } from "../fields/seo";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "pricing", "slug"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true },
    { name: "shortTitle", type: "text" },
    {
      name: "pricing",
      type: "select",
      required: true,
      options: [
        { label: "Free (if qualifying)", value: "free-if-qualifying" },
        { label: "Paid", value: "paid" },
        { label: "Mixed", value: "mixed" },
      ],
    },
    { name: "summary", type: "textarea" },
    { name: "intro", type: "array", fields: [{ name: "paragraph", type: "textarea", required: true }] },
    { name: "includes", type: "array", fields: [{ name: "item", type: "text", required: true }] },
    { name: "goodToKnow", type: "array", fields: [{ name: "item", type: "text", required: true }] },
    { name: "typicalJobs", type: "array", fields: [{ name: "item", type: "text", required: true }] },
    { name: "relatedServices", type: "relationship", relationTo: "services", hasMany: true },
    { name: "areas", type: "relationship", relationTo: "areas", hasMany: true },
    heroFields(),
    seoFields(),
  ],
};
