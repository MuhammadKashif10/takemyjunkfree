/**
 * No-ops when NEXT_PUBLIC_GA_ID is unset (no GA script loaded, so
 * window.gtag never exists) — never fakes a tracking call.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}
