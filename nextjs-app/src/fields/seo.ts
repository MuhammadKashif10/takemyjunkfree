import type { Field } from "payload";

export const seoFields = (): Field => ({
  name: "seo",
  type: "group",
  label: "SEO",
  fields: [
    { name: "metaTitle", type: "text" },
    { name: "metaDescription", type: "textarea" },
    {
      name: "canonicalOverride",
      type: "text",
      admin: {
        description: "Absolute URL. Leave blank to use the default canonical for this page.",
      },
    },
    { name: "noindex", type: "checkbox", defaultValue: false },
    { name: "ogImage", type: "upload", relationTo: "media" },
  ],
});
