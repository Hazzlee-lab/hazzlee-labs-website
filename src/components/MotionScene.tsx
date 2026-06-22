"use client";

import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type IdleWindow = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export default function MotionScene() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const animations: Animation[] = [];
    const observedElements = new Set<HTMLElement>();
    const idleWindow = window as IdleWindow;
    let cancelled = false;
    let hasStarted = false;
    let observer: IntersectionObserver | null = null;
    let idleHandle: number | undefined;
    let timeoutHandle: number | undefined;

    const getRevealDelay = (element: HTMLElement) => {
      const rawDelay = getComputedStyle(element).getPropertyValue("--offer-stagger").trim();
      if (!rawDelay) return 0;

      const delay = rawDelay.endsWith("ms")
        ? Number.parseFloat(rawDelay)
        : Number.parseFloat(rawDelay) * 1000;

      return Number.isFinite(delay) ? Math.max(0, delay) : 0;
    };

    const getOfferPartKeyframes = (part: HTMLElement): Keyframe[] => {
      if (part.classList.contains("offer-speed-fill")) {
        part.style.transformOrigin = "bottom";
        return [
          { opacity: 0, transform: "scaleY(0.18)" },
          { opacity: 1, transform: "scaleY(1)" },
        ];
      }

      if (part.classList.contains("offer-audit-line")) {
        part.style.transformOrigin = "left";
        return [
          { opacity: 0, transform: "scaleX(0.18)" },
          { opacity: 1, transform: "scaleX(1)" },
        ];
      }

      return [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0)" },
      ];
    };

    const revealOfferCardParts = (card: HTMLElement, baseDelay: number) => {
      const parts = Array.from(card.querySelectorAll<HTMLElement>(".offer-card-part"));

      parts.forEach((part, index) => {
        part.style.opacity = "1";
        part.style.transform = "translateY(0)";

        const animation = part.animate(
          getOfferPartKeyframes(part),
          {
            delay: baseDelay + 220 + index * 60,
            duration: 520,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        );

        animation.addEventListener("finish", () => {
          if (cancelled) return;
          part.style.transform = "";
          animation.cancel();
        });

        animations.push(animation);
      });
    };

    const revealElement = (element: HTMLElement) => {
      const revealDelay = getRevealDelay(element);

      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
      element.style.filter = "blur(0)";
      const animation = element.animate(
        [
          { opacity: 0, transform: "translateY(32px)", filter: "blur(9px)" },
          { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
        ],
        {
          delay: revealDelay,
          duration: 820,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        },
      );

      animation.addEventListener("finish", () => {
        if (cancelled) return;
        element.style.transform = "";
        element.style.filter = "";
        animation.cancel();
      });

      animations.push(animation);

      if (element.classList.contains("interactive-card")) {
        revealOfferCardParts(element, revealDelay);
      }
    };

    const startRevealSetup = () => {
      if (cancelled || hasStarted) return;
      hasStarted = true;

      window.removeEventListener("scroll", startRevealSetup);
      window.removeEventListener("wheel", startRevealSetup);
      window.removeEventListener("touchstart", startRevealSetup);
      window.removeEventListener("pointerdown", startRevealSetup);
      window.removeEventListener("keydown", startRevealSetup);

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(".motion-reveal, .motion-card:not(.interactive-card), .interactive-card"),
      );

      if (!("IntersectionObserver" in window)) {
        elements.forEach(revealElement);
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target as HTMLElement;
            observer?.unobserve(element);
            observedElements.delete(element);
            revealElement(element);
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
      );

      const visibleLimit = window.innerHeight * 0.95;

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const alreadyVisible = rect.top < visibleLimit && rect.bottom > 0;

        if (alreadyVisible) {
          revealElement(element);
          return;
        }

        element.style.opacity = "0";
        element.style.transform = "translateY(32px)";
        element.style.filter = "blur(9px)";
        observedElements.add(element);
        observer?.observe(element);
      });
    };

    const listenerOptions: AddEventListenerOptions = { passive: true, once: true };

    window.addEventListener("scroll", startRevealSetup, listenerOptions);
    window.addEventListener("wheel", startRevealSetup, listenerOptions);
    window.addEventListener("touchstart", startRevealSetup, listenerOptions);
    window.addEventListener("pointerdown", startRevealSetup, listenerOptions);
    window.addEventListener("keydown", startRevealSetup, listenerOptions);

    if (idleWindow.requestIdleCallback) {
      idleHandle = idleWindow.requestIdleCallback(startRevealSetup, { timeout: 2200 });
    } else {
      timeoutHandle = window.setTimeout(startRevealSetup, 1600);
    }

    return () => {
      cancelled = true;
      if (idleHandle !== undefined) {
        idleWindow.cancelIdleCallback?.(idleHandle);
      }
      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle);
      }
      window.removeEventListener("scroll", startRevealSetup);
      window.removeEventListener("wheel", startRevealSetup);
      window.removeEventListener("touchstart", startRevealSetup);
      window.removeEventListener("pointerdown", startRevealSetup);
      window.removeEventListener("keydown", startRevealSetup);
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      observedElements.forEach((element) => {
        element.style.opacity = "";
        element.style.transform = "";
        element.style.filter = "";
      });
    };
  }, []);

  return null;
}
