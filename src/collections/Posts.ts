import type { CollectionConfig } from "payload";

import { seoFields } from "../fields/seo";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedDate"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "title", type: "text", required: true },
    { name: "excerpt", type: "textarea" },
    { name: "category", type: "relationship", relationTo: "categories" },
    { name: "author", type: "relationship", relationTo: "authors" },
    { name: "body", type: "richText" },
    { name: "heroImage", type: "upload", relationTo: "media" },
    { name: "publishedDate", type: "date", required: true },
    { name: "updatedDate", type: "date" },
    { name: "readingMinutes", type: "number" },
    { name: "relatedServices", type: "relationship", relationTo: "services", hasMany: true },
    { name: "relatedAreas", type: "relationship", relationTo: "areas", hasMany: true },
    { name: "relatedPosts", type: "relationship", relationTo: "posts", hasMany: true },
    seoFields(),
  ],
};
