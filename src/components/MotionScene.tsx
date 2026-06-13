"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function reduceMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MotionScene({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (reduceMotion()) return;

      const root = scope.current;
      if (!root) return;

      gsap.fromTo(
        ".site-header",
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
      );

      gsap.utils.toArray<HTMLElement>(".motion-reveal", root).forEach((element) => {
        gsap.fromTo(
          element,
          { y: 42, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".motion-card", root).forEach((element, index) => {
        gsap.fromTo(
          element,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: Math.min(index * 0.05, 0.25),
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.to(".parallax-soft", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-experience",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
