"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useDeferredMount } from "@/lib/use-deferred-mount";

type ProcessStep = {
  title: string;
  body: string;
};

type LazyProcessTimelineProps = {
  steps: ProcessStep[];
};

export default function LazyProcessTimeline({ steps }: LazyProcessTimelineProps) {
  const { ref, shouldLoad } = useDeferredMount<HTMLDivElement>();
  const [ProcessTimeline, setProcessTimeline] = useState<ComponentType<LazyProcessTimelineProps> | null>(null);

  useEffect(() => {
    if (!shouldLoad || ProcessTimeline) return;

    let mounted = true;
    import("./ProcessTimeline").then((module) => {
      if (mounted) {
        setProcessTimeline(() => module.default);
      }
    });

    return () => {
      mounted = false;
    };
  }, [ProcessTimeline, shouldLoad]);

  if (ProcessTimeline) {
    return <ProcessTimeline steps={steps} />;
  }

  return <div ref={ref} className="lazy-process-placeholder" aria-hidden="true" />;
}
