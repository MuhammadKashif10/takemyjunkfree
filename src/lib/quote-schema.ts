import { z } from "zod";

/**
 * Shared client/server validation for the quote request form. Photos and
 * the honeypot field are handled outside this schema (see QuoteForm.tsx
 * and app/api/quote/route.ts) since they're read from FormData/File
 * inputs rather than react-hook-form's controlled values.
 */
export const quoteFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name"),
  phone: z.string().trim().min(6, "Enter a valid phone number"),
  email: z.union([z.string().trim().email("Enter a valid email"), z.literal("")]).optional(),
  area: z.string().trim().optional(),
  service: z.string().trim().optional(),
  items: z.string().trim().min(10, "Describe your items in a bit more detail"),
  consent: z.literal(true, { message: "Consent is required to submit a request" }),
});

export type QuoteFormValues = z.infer<typeof quoteFormSchema>;

export const MAX_PHOTOS = 6;
export const MAX_PHOTO_BYTES = 8 * 1024 * 1024;
