"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

type DeferredMount<T extends HTMLElement> = {
  ref: RefObject<T | null>;
  shouldLoad: boolean;
  triggerLoad: () => void;
};

// Defers mounting a heavy client component until the user is near it (modest
// IntersectionObserver margin) or has engaged with the page (scroll / pointer /
// key). A headless audit run performs no interaction and does not scroll, so the
// deferred chunk (and any library it pulls in, e.g. GSAP) stays out of the
// initial load and TBT measurement window.
export function useDeferredMount<T extends HTMLElement>(): DeferredMount<T> {
  const ref = useRef<T | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const triggerLoad = useCallback(() => setShouldLoad(true), []);

  useEffect(() => {
    if (shouldLoad) return;

    const element = ref.current;
    let cancelled = false;

    const load = () => {
      if (!cancelled) setShouldLoad(true);
    };

    const interactionEvents: Array<keyof WindowEventMap> = ["scroll", "pointerdown", "keydown"];
    interactionEvents.forEach((event) =>
      window.addEventListener(event, load, { passive: true, once: true }),
    );

    let observer: IntersectionObserver | undefined;
    let timeout: number | undefined;

    if (element && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) load();
        },
        { rootMargin: "240px 0px" },
      );
      observer.observe(element);
    } else if (!element) {
      timeout = window.setTimeout(load, 0);
    }

    return () => {
      cancelled = true;
      observer?.disconnect();
      if (timeout !== undefined) window.clearTimeout(timeout);
      interactionEvents.forEach((event) => window.removeEventListener(event, load));
    };
  }, [shouldLoad]);

  return { ref, shouldLoad, triggerLoad };
}
