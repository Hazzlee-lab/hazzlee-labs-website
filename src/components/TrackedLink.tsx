import { type AnchorHTMLAttributes, type ReactNode } from "react";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  analyticsLabel: string;
  analyticsLocation: string;
  children: ReactNode;
};

// Server component: renders a plain anchor carrying analytics metadata. Click
// tracking is handled by a single document-level listener (AnalyticsDelegate)
// instead of hydrating one client island per link.
export default function TrackedLink({
  analyticsLabel,
  analyticsLocation,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <a {...props} data-analytics-label={analyticsLabel} data-analytics-location={analyticsLocation}>
      {children}
    </a>
  );
}
