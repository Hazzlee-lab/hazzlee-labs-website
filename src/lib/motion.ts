import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerConfigured = false;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function deferAfterPaint(callback: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}

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

  deferAfterPaint(() => {
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
