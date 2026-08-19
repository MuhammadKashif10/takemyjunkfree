import type { CollectionConfig } from "payload";

export const Redirects: CollectionConfig = {
  slug: "redirects",
  admin: {
    useAsTitle: "from",
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "from", type: "text", required: true, unique: true, index: true },
    { name: "to", type: "text", required: true },
    {
      name: "type",
      type: "select",
      required: true,
      defaultValue: "301",
      options: [
        { label: "301 (permanent)", value: "301" },
        { label: "302 (temporary)", value: "302" },
      ],
    },
  ],
};
