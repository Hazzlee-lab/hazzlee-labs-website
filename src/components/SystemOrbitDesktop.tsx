"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/motion";
import { runScrollTriggerSetup } from "@/lib/scroll-motion";
import { journeySteps } from "@/lib/system-map-data";
import BrandLogo from "./BrandLogo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ORBIT_SLOTS = [
  { mx: 0, my: 0, scale: 1, opacity: 1 },
  { mx: 1, my: -1, scale: 0.56, opacity: 0.5 },
  { mx: 1, my: 1, scale: 0.56, opacity: 0.5 },
  { mx: -1, my: 1, scale: 0.56, opacity: 0.5 },
  { mx: -1, my: -1, scale: 0.56, opacity: 0.5 },
];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smoothstep = (t: number) => t * t * (3 - 2 * t);

function slotTransformCSS(rel: number) {
  const slot = ORBIT_SLOTS[rel];
  const x = slot.mx === 0 ? "0rem" : `calc(${slot.mx} * clamp(17rem, 27vw, 29rem))`;
  const y = slot.my === 0 ? "0rem" : `calc(${slot.my} * clamp(8rem, 16vh, 13rem))`;
  return `translate(-50%, -50%) translate(${x}, ${y}) scale(${slot.scale})`;
}

function activeNodeLabel(id: string) {
  if (id === "crm") return "CRM";
  if (id === "ai") return "AI";
  if (id === "website") return "WEBSITE";
  if (id === "dashboard") return "DASHBOARD";
  return id.toUpperCase();
}

function NodeInterface({ id }: { id: string }) {
  if (id === "website") {
    return (
      <div className="orbit-node-ui orbit-node-ui--website">
        <div className="orbit-browser"><span /><span /><span /><b>front door</b></div>
        <strong>Solutions that move your business forward.</strong>
        <div className="orbit-metrics"><span>A+</span><span>Vitals 98</span><span>Forms OK</span></div>
      </div>
    );
  }

  if (id === "crm") {
    return (
      <div className="orbit-node-ui orbit-node-ui--crm">
        <b>CRM</b>
        {[["Alex J.", "New"], ["Jamie L.", "Contacted"], ["Taylor S.", "Qualified"]].map(([name, status]) => (
          <span key={name}><i>{name}</i><em>{status}</em></span>
        ))}
      </div>
    );
  }

  if (id === "automation") {
    return (
      <div className="orbit-node-ui orbit-node-ui--automation">
        <b>Workflow engine</b>
        <span>Notify team</span>
        <span>Create tasks</span>
        <span>Route owner</span>
        <span>Update CRM</span>
      </div>
    );
  }

  if (id === "ai") {
    return (
      <div className="orbit-node-ui orbit-node-ui--ai">
        <div className="orbit-ai-core">AI</div>
        <span>Classify intent</span>
        <span>Summarize context</span>
        <span>Draft response</span>
      </div>
    );
  }

  return (
    <div className="orbit-node-ui orbit-node-ui--dashboard">
      <b>Operations overview</b>
      <div className="orbit-kpis"><span>248</span><span>76</span><span>$240K</span></div>
      <div className="orbit-bars"><i /><i /><i /></div>
    </div>
  );
}

export default function SystemOrbitDesktop() {
  const scope = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = journeySteps[activeIndex];

  const cardBaseStyles = useMemo<CSSProperties[]>(
    () =>
      journeySteps.map((_, index) => {
        const style: CSSProperties = {
          transform: slotTransformCSS(index),
          opacity: ORBIT_SLOTS[index].opacity,
          zIndex: index === 0 ? 9 : 3,
        };
        (style as Record<string, string | number>)["--reveal"] = index === 0 ? 1 : 0;
        return style;
      }),
    [],
  );

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      if (prefersReducedMotion()) {
        setActiveIndex(0);
        root.style.setProperty("--scroll-progress", "1");
        return;
      }

      return runScrollTriggerSetup(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".orbit-card", root);
        const total = journeySteps.length;
        const rem = 16;
        let orbitH = Math.min(Math.max(17 * rem, 0.27 * window.innerWidth), 29 * rem);
        let orbitV = Math.min(Math.max(8 * rem, 0.16 * window.innerHeight), 13 * rem);

        const updateOrbitRadii = () => {
          orbitH = Math.min(Math.max(17 * rem, 0.27 * window.innerWidth), 29 * rem);
          orbitV = Math.min(Math.max(8 * rem, 0.16 * window.innerHeight), 13 * rem);
        };

        window.addEventListener("resize", updateOrbitRadii, { passive: true });

        const setActiveStep = (progress: number) => {
          const clamped = Math.max(0, Math.min(0.99999, progress));
          root.style.setProperty("--scroll-progress", clamped.toFixed(5));

          const activeFloat = clamped * total;
          const index = Math.min(total - 1, Math.floor(activeFloat));
          const frac = clamp01(activeFloat - index);
          const isLast = index >= total - 1;

          root.style.setProperty("--step-frac", frac.toFixed(5));
          root.style.setProperty("--pulse-enabled", isLast ? "0" : "1");

          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }

          const ramp = smoothstep(clamp01((frac - 0.6) / 0.4));
          const activeFloatPos = Math.min(index + ramp, total - 1);

          cards.forEach((card, i) => {
            const relCont = (((i - activeFloatPos) % total) + total) % total;
            const i0 = Math.floor(relCont) % total;
            const i1 = (i0 + 1) % total;
            const t = relCont - Math.floor(relCont);
            const a = ORBIT_SLOTS[i0];
            const b = ORBIT_SLOTS[i1];
            const x = lerp(a.mx, b.mx, t) * orbitH;
            const y = lerp(a.my, b.my, t) * orbitV;
            const scale = lerp(a.scale, b.scale, t);
            const opacity = lerp(a.opacity, b.opacity, t);

            const dist = Math.min(relCont, total - relCont);
            const reveal = smoothstep(clamp01(1 - dist / 0.55));

            card.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`;
            card.style.opacity = opacity.toFixed(4);
            card.style.zIndex = String(Math.round(reveal * 6) + 3);
            card.style.setProperty("--reveal", reveal.toFixed(4));
          });
        };

        const st = ScrollTrigger.create({
          trigger: root,
          pin: root,
          start: "top top",
          end: "+=560%",
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActiveStep(self.progress),
          onRefresh: (self) => setActiveStep(self.progress),
        });

        setActiveStep(st.progress);

        return () => {
          window.removeEventListener("resize", updateOrbitRadii);
          st.kill();
        };
      });
    },
    { scope },
  );

  return (
    <div
      ref={scope}
      className="system-orbit-pin"
      aria-label="Pinned scroll animation showing the system expanding from website to CRM, automation, AI workflows, and dashboards"
    >
      <div className="system-orbit-bg brand-grid" aria-hidden="true" />
      <div className="system-orbit-matrix" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => <span key={index}>0101<br />SYS<br />FLOW<br />CRM<br />AI</span>)}
      </div>

      <div className="orbit-status-bar" aria-hidden="true">
        <span>ACTIVE NODE: {activeNodeLabel(activeStep.id)}</span>
        <b>{activeStep.shortLabel}</b>
      </div>

      <div className="orbit-stage" aria-live="polite">
        <div className="orbit-stage__glow" aria-hidden="true" />
        <BrandLogo variant="icon" decorative className="orbit-brand-ghost" />
        <div className="orbit-rings" aria-hidden="true">
          <span className="orbit-orbit orbit-orbit--1" />
          <span className="orbit-orbit orbit-orbit--2" />
          <span className="orbit-orbit orbit-orbit--3" />
          <span className="orbit-sat orbit-sat--1" />
          <span className="orbit-sat orbit-sat--2" />
          <span className="orbit-sat orbit-sat--3" />
        </div>
        <span className="orbit-pulse" aria-hidden="true" />
        {journeySteps.map((step, index) => (
          <article
            key={step.id}
            className={`orbit-card orbit-card--${step.id}`}
            style={cardBaseStyles[index]}
            aria-hidden={index !== activeIndex}
          >
            <div className="orbit-card__head">
              <b className="orbit-card__badge">{step.number}</b>
              <span className="orbit-card__kicker">{step.shortLabel}</span>
            </div>
            <p className="orbit-card__label code-label">{step.label}</p>
            <h3 className="orbit-card__title">{step.title}</h3>
            <p className="orbit-card__body">{step.body}</p>
            <div className="orbit-card__mockup"><NodeInterface id={step.id} /></div>
            <div className="orbit-card__foot">
              <span className="orbit-card__tag">{step.tag}</span>
              <em className="orbit-card__metric">{step.metric}</em>
            </div>
          </article>
        ))}
      </div>

      <div className="orbit-progress" aria-hidden="true">
        <span className="orbit-progress__fill" />
        <span className="orbit-progress__head" />
        {journeySteps.map((step, index) => (
          <i key={step.id} className={index <= activeIndex ? "is-complete" : ""}>{step.number}</i>
        ))}
      </div>
    </div>
  );
}
