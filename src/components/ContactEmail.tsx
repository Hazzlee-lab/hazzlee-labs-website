"use client";

import { useEffect, useState } from "react";

const CONTACT_EMAIL_USER = "andrew";
const CONTACT_EMAIL_DOMAIN = "hazzleelabs.com";

function getContactEmail() {
  return `${CONTACT_EMAIL_USER}@${CONTACT_EMAIL_DOMAIN}`;
}

type ContactEmailProps = {
  className?: string;
};

export function ContactEmailLink({ className }: ContactEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getContactEmail());
  }, []);

  if (!email) {
    return (
      <span className={className} aria-label="Email address">
        Contact by email
      </span>
    );
  }

  return (
    <a className={className} href={`mailto:${email}`}>
      {email}
    </a>
  );
}

export function ContactEmailText({ className }: ContactEmailProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getContactEmail());
  }, []);

  return (
    <span className={className} aria-label={email ? undefined : "Email address"}>
      {email ?? "our contact email"}
    </span>
  );
}
