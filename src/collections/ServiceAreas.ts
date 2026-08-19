import type { CollectionConfig } from "payload";

import { seoFields } from "../fields/seo";

/**
 * Service × Area intersection pages. Empty at launch — populated manually,
 * one at a time, only once genuinely unique local content exists for that
 * pair. `publishState` gates both frontend rendering (404 unless
 * "published") and sitemap inclusion; this collection is never bulk-generated.
 */
export const ServiceAreas: CollectionConfig = {
  slug: "service-areas",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "service", "area", "publishState"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "service", type: "relationship", relationTo: "services", required: true },
    { name: "area", type: "relationship", relationTo: "areas", required: true },
    { name: "title", type: "text", required: true },
    { name: "intro", type: "textarea", required: true },
    { name: "logistics", type: "textarea" },
    { name: "jobs", type: "array", fields: [{ name: "item", type: "text", required: true }] },
    {
      name: "faqs",
      type: "array",
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    {
      name: "publishState",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Ready for review", value: "ready" },
        { label: "Published", value: "published" },
      ],
    },
    seoFields(),
  ],
};
