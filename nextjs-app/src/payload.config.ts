import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Areas } from "./collections/Areas";
import { Authors } from "./collections/Authors";
import { Categories } from "./collections/Categories";
import { Faqs } from "./collections/Faqs";
import { ItemCategories } from "./collections/ItemCategories";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { QuoteRequests } from "./collections/QuoteRequests";
import { Redirects } from "./collections/Redirects";
import { Regions } from "./collections/Regions";
import { Reviews } from "./collections/Reviews";
import { ServiceAreas } from "./collections/ServiceAreas";
import { Services } from "./collections/Services";
import { Users } from "./collections/Users";
import { Navigation } from "./globals/Navigation";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env["PAYLOAD_SECRET"] ?? "",
  admin: {
    user: "users",
  },
  collections: [
    Users,
    Media,
    Regions,
    Categories,
    Authors,
    Services,
    Areas,
    ServiceAreas,
    Posts,
    Faqs,
    ItemCategories,
    Reviews,
    QuoteRequests,
    Redirects,
  ],
  globals: [SiteSettings, Navigation],
  editor: lexicalEditor(),
  sharp,
  db: postgresAdapter({
    pool: {
      connectionString: process.env["DATABASE_URI"] ?? "",
    },
  }),
  plugins: [
    // Falls back to local filesystem storage automatically when
    // BLOB_READ_WRITE_TOKEN is unset (local dev / self-hosted).
    vercelBlobStorage({
      enabled: Boolean(process.env["BLOB_READ_WRITE_TOKEN"]),
      token: process.env["BLOB_READ_WRITE_TOKEN"],
      collections: {
        media: true,
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
