"use client";

import { forwardRef, type AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName: string;
  eventParams?: Record<string, unknown>;
};

/**
 * A plain <a> that fires a tracking event on click before navigating.
 * Used for WhatsApp/phone CTAs so those clicks are measurable — no-ops
 * silently when analytics isn't configured (see lib/analytics.ts).
 */
export const TrackedLink = forwardRef<HTMLAnchorElement, TrackedLinkProps>(
  ({ eventName, eventParams, onClick, ...props }, ref) => (
    <a
      ref={ref}
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventParams);
        onClick?.(event);
      }}
    />
  ),
);
TrackedLink.displayName = "TrackedLink";
