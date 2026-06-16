import { type AnchorHTMLAttributes, type ReactNode } from "react";

type OfferLeadLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  leadType: string;
  children: ReactNode;
};

// Server component: the lead-type selection and analytics are handled by the
// shared document-level listener (AnalyticsDelegate) via this data attribute.
export default function OfferLeadLink({ leadType, children, ...props }: OfferLeadLinkProps) {
  return (
    <a {...props} data-lead-type={leadType}>
      {children}
    </a>
  );
}
