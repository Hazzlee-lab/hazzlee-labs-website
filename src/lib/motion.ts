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
