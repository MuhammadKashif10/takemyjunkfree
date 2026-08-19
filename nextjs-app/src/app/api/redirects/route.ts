import { NextResponse } from "next/server";

import { getPayloadClient } from "@/lib/payload-data";

export const runtime = "nodejs";

/**
 * Internal-use only: middleware.ts (Edge runtime, no DB driver) fetches
 * this over HTTP to resolve redirects, rather than connecting to Postgres
 * directly. Kept tiny and cacheable — the redirects collection stays
 * near-empty since URLs are preserved during the migration.
 */
export async function GET() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "redirects", limit: 1000, depth: 0 });

  const redirects = docs.map((doc) => ({
    from: doc["from"] as string,
    to: doc["to"] as string,
    type: (doc["type"] as "301" | "302") ?? "301",
  }));

  return NextResponse.json(redirects, { headers: { "Cache-Control": "public, max-age=60" } });
}
