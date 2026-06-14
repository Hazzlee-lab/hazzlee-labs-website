"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

type StudioOffer = {
  name: string;
  tag: string;
  description: string;
};

type LazySystemMapProps = {
  offers: StudioOffer[];
};

export default function LazySystemMap({ offers }: LazySystemMapProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [SystemMap, setSystemMap] = useState<ComponentType<LazySystemMapProps> | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
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

    observer.observe(element);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || SystemMap) return;

    let mounted = true;
    import("./SystemMap").then((module) => {
      if (mounted) {
        setSystemMap(() => module.default);
      }
    });

    return () => {
      mounted = false;
    };
  }, [SystemMap, shouldLoad]);

  if (SystemMap) {
    return <SystemMap offers={offers} />;
  }

  return <div id="systems" ref={ref} className="lazy-system-placeholder" aria-hidden="true" />;
}
