"use client";

import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  analyticsLabel: string;
  analyticsLocation: string;
  children: ReactNode;
};

export default function TrackedLink({
  analyticsLabel,
  analyticsLocation,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent("CTA Clicked", {
          label: analyticsLabel,
          location: analyticsLocation,
        });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
