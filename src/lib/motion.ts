import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let scrollTriggerConfigured = false;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function isMobileViewport() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 700px)").matches;
}

export function deferAfterPaint(callback: () => void) {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback);
  });
}

export function deferMainWork(callback: () => void) {
  if (typeof window === "undefined") return;

  if (isMobileViewport() && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => callback(), { timeout: 2200 });
    return;
  }

  deferAfterPaint(callback);
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
