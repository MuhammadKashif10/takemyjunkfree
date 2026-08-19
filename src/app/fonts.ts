import { Sora, Manrope } from "next/font/google";

/**
 * Self-hosted replacements for the original render-blocking Google Fonts
 * <link> tags in src/routes/__root.tsx. Same families, same weights —
 * next/font self-hosts and preloads them instead of a separate DNS/connection
 * round trip to fonts.googleapis.com / fonts.gstatic.com.
 */
export const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});
