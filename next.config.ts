import type { NextConfig } from "next";

import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Vercel Blob public storage (production media). Falls back to local
      // /api/media/file/* (same-origin, no remotePattern needed) when
      // BLOB_READ_WRITE_TOKEN is unset.
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
