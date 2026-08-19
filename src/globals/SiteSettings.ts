import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  fields: [
    { name: "name", type: "text", required: true },
    { name: "shortName", type: "text" },
    { name: "tagline", type: "text" },
    { name: "description", type: "textarea" },
    { name: "phone", type: "text" },
    { name: "phoneHref", type: "text" },
    { name: "whatsapp", type: "text" },
    { name: "whatsappHref", type: "text" },
    { name: "email", type: "text" },
    {
      name: "address",
      type: "group",
      fields: [
        { name: "line1", type: "text" },
        { name: "district", type: "text" },
        { name: "city", type: "text" },
        { name: "country", type: "text" },
      ],
    },
    { name: "hours", type: "text" },
    {
      name: "whatWeTake",
      type: "group",
      label: "What We Take page settings",
      fields: [
        { name: "notAccepted", type: "array", fields: [{ name: "item", type: "text", required: true }] },
        {
          name: "freeCriteria",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "body", type: "textarea", required: true },
          ],
        },
      ],
    },
  ],
};
