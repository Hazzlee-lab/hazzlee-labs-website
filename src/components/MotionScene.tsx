"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { deferAfterPaint, prefersReducedMotion } from "@/lib/motion";

const MotionSceneDesktop = dynamic(() => import("./MotionSceneDesktop"), { ssr: false });

function isDesktopViewport() {
  return typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
}

export default function MotionScene() {
  const [enableDesktopMotion, setEnableDesktopMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setEnableDesktopMotion(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion() || isDesktopViewport()) return;

    const animations: Animation[] = [];
    const observedElements = new Set<HTMLElement>();
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".motion-reveal, .motion-card:not(.interactive-card)"),
    );

    deferAfterPaint(() => {
      const header = document.querySelector<HTMLElement>(".site-header");
      if (header) {
        animations.push(
          header.animate(
            [
              { opacity: 0, transform: "translateY(-18px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 850, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" },
          ),
        );
      }
    });

    const revealElement = (element: HTMLElement) => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
      element.style.filter = "blur(0)";
      animations.push(
        element.animate(
          [
            { opacity: 0, transform: "translateY(28px)", filter: "blur(8px)" },
            { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
          ],
          { duration: 760, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "both" },
        ),
      );
    };

    if (!("IntersectionObserver" in window)) {
      elements.forEach(revealElement);
      return () => animations.forEach((animation) => animation.cancel());
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
      element.style.transform = "translateY(28px)";
      element.style.filter = "blur(8px)";
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

  return enableDesktopMotion ? <MotionSceneDesktop /> : null;
}
