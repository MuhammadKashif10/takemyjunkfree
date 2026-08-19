import { NextResponse, type NextRequest } from "next/server";

// Edge runtime (default) — fetches the redirect map over HTTP from
// /api/redirects (Node runtime, has the Postgres driver) instead of
// connecting to the DB directly, since Payload's Local API isn't
// Edge-compatible and Next stable doesn't support Node middleware yet.
export const config = {
  matcher: ["/((?!_next|admin|api|favicon.ico).*)"],
};

type RedirectEntry = { from: string; to: string; type: "301" | "302" };
type RedirectMap = Map<string, { to: string; type: "301" | "302" }>;

let cache: { map: RedirectMap; expiresAt: number } | null = null;
const CACHE_TTL_MS = 60_000;

async function getRedirectMap(request: NextRequest): Promise<RedirectMap> {
  if (cache && cache.expiresAt > Date.now()) return cache.map;

  const res = await fetch(new URL("/api/redirects", request.url));
  const entries = (await res.json()) as RedirectEntry[];

  const map: RedirectMap = new Map(entries.map((e) => [e.from, { to: e.to, type: e.type }]));

  cache = { map, expiresAt: Date.now() + CACHE_TTL_MS };
  return map;
}

export default async function middleware(request: NextRequest) {
  const map = await getRedirectMap(request);
  const match = map.get(request.nextUrl.pathname);

  if (!match) return NextResponse.next();

  const destination = match.to.startsWith("http") ? match.to : new URL(match.to, request.url);
  return NextResponse.redirect(destination, match.type === "301" ? 308 : 307);
}
