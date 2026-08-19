import type { CollectionConfig } from "payload";

/**
 * Created only by the /quote submission route handler (Phase 9), which
 * validates + honeypot-checks before writing. Read/update/delete require an
 * authenticated admin; anonymous create is allowed since visitors submit
 * without logging in.
 */
export const QuoteRequests: CollectionConfig = {
  slug: "quote-requests",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "phone", "service", "area", "status", "createdAt"],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "phone", type: "text", required: true },
    { name: "email", type: "text" },
    { name: "area", type: "relationship", relationTo: "areas" },
    { name: "service", type: "relationship", relationTo: "services" },
    { name: "items", type: "textarea" },
    { name: "photos", type: "upload", relationTo: "media", hasMany: true },
    { name: "consent", type: "checkbox", required: true },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Booked", value: "booked" },
        { label: "Spam", value: "spam" },
      ],
    },
  ],
};
