"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SystemOrbitDesktop = dynamic(() => import("./SystemOrbitDesktop"), { ssr: false });

export default function DesktopSystemOrbit() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    if (!media.matches) {
      setShouldLoad(false);
      return;
    }

    const placeholder = document.querySelector(".system-orbit-desktop-placeholder");
    if (!placeholder || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, []);

  if (!shouldLoad) {
    return <div className="system-orbit-desktop-placeholder" aria-hidden="true" />;
  }

  return <SystemOrbitDesktop />;
}
