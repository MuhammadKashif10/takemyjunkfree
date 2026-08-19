import type { Metadata } from "next";
import type { ReactNode } from "react";

import "../globals.css";
import { sora, manrope } from "../fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { Toaster } from "@/components/ui/sonner";
import { JsonLd } from "@/components/site/JsonLd";
import { Analytics } from "@/components/site/Analytics";
import { getNavigation, getSiteSettings } from "@/lib/payload-data";
import { buildMetadata, organizationNode, schemaGraph, websiteNode } from "@/lib/seo";

// Ported from src/routes/__root.tsx (RootShell + RootComponent).
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: `${settings.name} | Junk Removal & Free Collection Dubai`,
    description: settings.description,
    path: "/",
    siteName: settings.name,
  });
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [settings, nav] = await Promise.all([getSiteSettings(), getNavigation()]);

  const graph = schemaGraph([organizationNode(settings), websiteNode({ name: settings.name })]);

  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body>
        <div className="flex min-h-screen flex-col">
          <Header primaryNav={nav.primaryNav} site={settings} />
          <main className="flex-1 pb-20 sm:pb-0">{children}</main>
          <Footer footerNav={nav.footerNav} site={settings} />
        </div>
        <FloatingActions site={settings} />
        <Toaster />
        <JsonLd data={graph} />
        <Analytics />
      </body>
    </html>
  );
}
