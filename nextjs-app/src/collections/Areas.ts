import type { CollectionConfig } from "payload";

import { heroFields } from "../fields/hero";
import { seoFields } from "../fields/seo";

export const Areas: CollectionConfig = {
  slug: "areas",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "region", "type", "slug"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "name", type: "text", required: true },
    { name: "region", type: "relationship", relationTo: "regions", required: true },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Apartment", value: "apartment" },
        { label: "Villa", value: "villa" },
        { label: "Mixed", value: "mixed" },
        { label: "Commercial", value: "commercial" },
      ],
    },
    { name: "landmarks", type: "textarea" },
    { name: "intro", type: "textarea", required: true },
    { name: "housing", type: "textarea" },
    { name: "access", type: "textarea" },
    { name: "commonJobs", type: "array", fields: [{ name: "item", type: "text", required: true }] },
    { name: "services", type: "relationship", relationTo: "services", hasMany: true },
    { name: "nearbyAreas", type: "relationship", relationTo: "areas", hasMany: true },
    heroFields(),
    seoFields(),
  ],
};
