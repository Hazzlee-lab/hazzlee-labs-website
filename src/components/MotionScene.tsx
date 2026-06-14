"use client";

import { useEffect } from "react";
import { prefersReducedMotion, deferAfterPaint } from "@/lib/motion";

export default function MotionScene() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const animations: Animation[] = [];
    const observedElements = new Set<HTMLElement>();

    deferAfterPaint(() => {
      const header = document.querySelector<HTMLElement>(".site-header");
      if (!header) return;

      animations.push(
        header.animate(
          [
            { opacity: 0, transform: "translateY(-18px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 850, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" },
        ),
      );
    });

    const revealElement = (element: HTMLElement) => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
      element.style.filter = "blur(0)";
      animations.push(
        element.animate(
          [
            { opacity: 0, transform: "translateY(32px)", filter: "blur(9px)" },
            { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
          ],
          { duration: 820, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" },
        ),
      );
    };

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".motion-reveal, .motion-card:not(.interactive-card)"),
    );

    if (!("IntersectionObserver" in window)) {
      elements.forEach(revealElement);
      return () => {
        animations.forEach((animation) => animation.cancel());
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          observer.unobserve(element);
          observedElements.delete(element);
          revealElement(element);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    elements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(32px)";
      element.style.filter = "blur(9px)";
      observedElements.add(element);
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
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
