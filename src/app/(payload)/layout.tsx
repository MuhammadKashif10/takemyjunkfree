import "@payloadcms/next/css";
import type { ReactNode } from "react";

import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";

import config from "@/payload.config";
import { importMap } from "./admin/importMap.js";

const serverFunction: ServerFunctionClient = async (args) => {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

// Separate root layout for the Payload admin panel — renders its own
// <html>/<body>, independent of the site's (frontend) root layout, per
// Next.js's multi-root-layout route-group pattern. Do not add site
// chrome (Header/Footer) here.
const Layout = ({ children }: { children: ReactNode }) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
