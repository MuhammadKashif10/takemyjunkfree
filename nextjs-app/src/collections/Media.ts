import type { CollectionConfig } from "payload";

/**
 * Shared upload collection for both public marketing images (service/area/
 * blog hero images, gallery) and private customer-submitted quote-request
 * photos. `isPrivate` (set true by the /api/quote route for uploaded
 * photos) keeps those documents out of the public read/list API — an
 * authenticated admin can still see them via quote-requests.
 *
 * Caveat: Vercel Blob only supports "public" access mode, so a private
 * doc's underlying file URL is still fetchable by anyone who already has
 * the exact (unguessable, unlinked) URL — this access control stops it
 * from being discoverable/listed, not from being an unlisted public file.
 * If stronger protection is ever needed, that requires a private-ACL
 * adapter (e.g. S3) instead of Vercel Blob.
 */
export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "alt",
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { isPrivate: { not_equals: true } };
    },
  },
  fields: [
    { name: "alt", type: "text", required: true },
    {
      name: "isPrivate",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Set automatically for quote-request photo uploads. Hides the file from public API reads." },
    },
    {
      name: "gallery",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Show this image on the public /gallery page." },
    },
  ],
  upload: {
    imageSizes: [
      { name: "thumbnail", width: 400, height: 300, position: "centre" },
      { name: "card", width: 768, height: 512, position: "centre" },
      { name: "hero", width: 1600, height: 900, position: "centre" },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
};
