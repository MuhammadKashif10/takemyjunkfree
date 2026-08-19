/**
 * Minimal resolve hook so extensionless relative imports (the normal
 * TS/bundler convention used throughout src/) work under native Node ESM.
 * Only used for one-off scripts run via `node --experimental-strip-types
 * --import ./scripts/register-ts-hooks.mjs` (see migrate:import in
 * package.json) — not part of the Next.js app itself, which uses its own
 * bundler and never hits this.
 */
export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".") || specifier.startsWith("/")) {
    try {
      return await nextResolve(specifier, context);
    } catch (err) {
      for (const candidate of [`${specifier}.ts`, `${specifier}/index.ts`]) {
        try {
          return await nextResolve(candidate, context);
        } catch {
          // try next candidate
        }
      }
      throw err;
    }
  }
  return nextResolve(specifier, context);
}
