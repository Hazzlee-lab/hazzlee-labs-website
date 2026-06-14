"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

type ProcessStep = {
  title: string;
  body: string;
};

type LazyProcessTimelineProps = {
  steps: ProcessStep[];
};

const ProcessTimeline = dynamic(() => import("./ProcessTimeline"), {
  ssr: false,
});

export default function LazyProcessTimeline({ steps }: LazyProcessTimelineProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) {
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
  }, []);

  if (shouldLoad) {
    return <ProcessTimeline steps={steps} />;
  }

  return <div ref={ref} className="lazy-section-placeholder lazy-section-placeholder--process" aria-hidden="true" />;
}
