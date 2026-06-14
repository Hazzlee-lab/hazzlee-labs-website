"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

type ProcessStep = {
  title: string;
  body: string;
};

type LazyProcessTimelineProps = {
  steps: ProcessStep[];
};

export default function LazyProcessTimeline({ steps }: LazyProcessTimelineProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ProcessTimeline, setProcessTimeline] = useState<ComponentType<LazyProcessTimelineProps> | null>(null);

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
