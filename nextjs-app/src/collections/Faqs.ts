import type { CollectionConfig } from "payload";

export const Faqs: CollectionConfig = {
  slug: "faqs",
  admin: {
    useAsTitle: "question",
    defaultColumns: ["question", "category"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Free collection", value: "free" },
        { label: "Pricing", value: "pricing" },
        { label: "Booking", value: "booking" },
        { label: "Practical", value: "practical" },
      ],
    },
    {
      name: "relatedService",
      type: "relationship",
      relationTo: "services",
      admin: { description: "Set to scope this FAQ as a service-specific local FAQ." },
    },
    {
      name: "relatedArea",
      type: "relationship",
      relationTo: "areas",
      admin: { description: "Set to scope this FAQ as an area-specific local FAQ." },
    },
  ],
};
