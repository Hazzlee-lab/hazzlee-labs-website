"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion, runScrollTriggerSetup } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MotionScene() {
  useGSAP(() => {
    if (prefersReducedMotion()) return;

    return runScrollTriggerSetup(() => {
      gsap.fromTo(
        ".site-header",
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
      );

      gsap.set(".motion-reveal", { y: 42, opacity: 0, filter: "blur(10px)" });
      const revealTriggers = ScrollTrigger.batch(".motion-reveal", {
        start: "top 84%",
        onEnter: (elements) => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.05,
            overwrite: true,
          });
        },
        onLeaveBack: (elements) => {
          gsap.to(elements, {
            y: 42,
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.5,
            ease: "power2.in",
            stagger: 0.03,
            overwrite: true,
          });
        },
      });

      gsap.set(".motion-card", { y: 26, opacity: 0 });
      const cardTriggers = ScrollTrigger.batch(".motion-card", {
        start: "top 88%",
        onEnter: (elements) => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.05,
            overwrite: true,
          });
        },
        onLeaveBack: (elements) => {
          gsap.to(elements, {
            y: 26,
            opacity: 0,
            duration: 0.45,
            ease: "power2.in",
            stagger: 0.03,
            overwrite: true,
          });
        },
      });

      return () => {
        revealTriggers.forEach((trigger) => trigger.kill());
        cardTriggers.forEach((trigger) => trigger.kill());
      };
    });
  }, {});

  return null;
}
