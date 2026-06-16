import { ScrollTrigger } from "gsap/ScrollTrigger";
import { deferMainWork } from "./motion";

let scrollTriggerConfigured = false;

export function initScrollTrigger() {
  if (scrollTriggerConfigured || typeof window === "undefined") return;
  scrollTriggerConfigured = true;

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });
}

export function runScrollTriggerSetup(callback: () => void | (() => void)) {
  initScrollTrigger();

  let cleanup: (() => void) | undefined;
  let cancelled = false;

  deferMainWork(() => {
    if (cancelled) return;

    const result = callback();
    ScrollTrigger.refresh();

    if (typeof result === "function") {
      cleanup = result;
    }
  });

  return () => {
    cancelled = true;
    cleanup?.();
  };
}
