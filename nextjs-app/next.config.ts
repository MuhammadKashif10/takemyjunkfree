import type { NextConfig } from "next";
import path from "path";

import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Pin the tracing root explicitly rather than relying on Next's
  // lockfile-based inference, since this app lives in a subdirectory of
  // the git repo rather than at its root.
  outputFileTracingRoot: path.join(__dirname),
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
