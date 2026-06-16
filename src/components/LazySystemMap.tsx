"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useDeferredMount } from "@/lib/use-deferred-mount";

type StudioOffer = {
  name: string;
  tag: string;
  description: string;
};

type LazySystemMapProps = {
  offers: StudioOffer[];
};

export default function LazySystemMap({ offers }: LazySystemMapProps) {
  const { ref, shouldLoad } = useDeferredMount<HTMLDivElement>();
  const [SystemMap, setSystemMap] = useState<ComponentType<LazySystemMapProps> | null>(null);

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
