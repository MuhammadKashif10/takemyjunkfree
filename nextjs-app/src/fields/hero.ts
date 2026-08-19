import type { Field } from "payload";

export const heroFields = (): Field => ({
  name: "hero",
  type: "group",
  label: "Hero",
  fields: [
    { name: "heading", type: "text" },
    { name: "subheading", type: "textarea" },
    { name: "image", type: "upload", relationTo: "media" },
  ],
});
