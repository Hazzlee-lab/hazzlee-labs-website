"use client";

import { useEffect, useRef, useState } from "react";

type MobileNavProps = {
  links: Array<{ href: string; label: string }>;
};

export default function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="mobile-nav sm:hidden">
      <button
        type="button"
        className="mobile-nav__toggle"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span aria-hidden="true" className={`mobile-nav__icon ${isOpen ? "is-open" : ""}`}>
          <i />
          <i />
          <i />
        </span>
      </button>
      {isOpen ? (
        <nav id="mobile-nav-menu" className="mobile-nav__menu" aria-label="Site">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
