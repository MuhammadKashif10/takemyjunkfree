// Next.js's own ambient types (next/types/global.d.ts) only declare
// "*.module.css" (CSS Modules), not plain global stylesheet imports like
// "./globals.css" in app/layout.tsx. With `noUncheckedSideEffectImports`
// enabled (ported from the original tsconfig.json), TypeScript requires
// side-effect imports to resolve to a real typed module — this fills that
// gap for plain, non-module CSS imports.
declare module "*.css";
