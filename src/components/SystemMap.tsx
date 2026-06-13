"use client";

import { useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StudioOffer = {
  name: string;
  tag: string;
  description: string;
};

type SystemMapProps = {
  offers: StudioOffer[];
};

const journeySteps = [
  {
    id: "website",
    number: "01",
    label: "01 / FRONT DOOR",
    shortLabel: "Front door",
    title: "Website front door",
    body: "The public site becomes the first stable surface: faster pages, cleaner messaging, working forms, better trust signals, and a clear path into the business.",
    tag: "Stable first impression",
    metric: "A+ / 98 / working forms",
    angle: 0,
  },
  {
    id: "crm",
    number: "02",
    label: "02 / LEAD CAPTURE",
    shortLabel: "Lead capture",
    title: "CRM handoff",
    body: "Forms, checkups, and requests stop disappearing into inbox noise. Leads move into a trackable system with status, source, next action, and context.",
    tag: "Cleaner follow-up loop",
    metric: "New → contacted → qualified",
    angle: 72,
  },
  {
    id: "automation",
    number: "03",
    label: "03 / WORKFLOW ENGINE",
    shortLabel: "Workflow engine",
    title: "Automation workflows",
    body: "The repeated handoffs get wired together: intake, notifications, data movement, routing, document creation, and operational triggers.",
    tag: "Less manual drag",
    metric: "Notify / route / create / update",
    angle: 144,
  },
  {
    id: "ai",
    number: "04",
    label: "04 / INTELLIGENCE LAYER",
    shortLabel: "Intelligence layer",
    title: "AI workflows",
    body: "AI gets placed where it belongs: summarizing, classifying, drafting, checking, and accelerating work without turning the system into a black box.",
    tag: "Useful intelligence",
    metric: "Classify / summarize / draft / check",
    angle: 216,
  },
  {
    id: "dashboard",
    number: "05",
    label: "05 / OPERATING VIEW",
    shortLabel: "Operating view",
    title: "Dashboards and portals",
    body: "Once the system is connected, dashboards and portals make the work visible: what came in, what changed, what needs attention, and what should happen next.",
    tag: "Readable operations",
    metric: "248 leads / 98.6% success",
    angle: 288,
  },
];

function reduceMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function activeNodeLabel(id: string) {
  if (id === "crm") return "CRM";
  if (id === "ai") return "AI";
  if (id === "website") return "WEBSITE";
  if (id === "dashboard") return "DASHBOARD";
  return id.toUpperCase();
}

function CategoryIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 8.4 12 4l7 4.4-7 4.4-7-4.4Z" />
        <path d="m5 12 7 4.4L19 12" />
        <path d="m5 15.6 7 4.4 7-4.4" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7h4v4H7zM14 13h4v4h-4z" />
        <path d="M11 9h3.2c2.2 0 3.8 1.4 3.8 3.4V13" />
        <path d="M9 11v3.2c0 2.1 1.5 3.8 3.7 3.8H14" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.5 4.3c2.4.7 4.4 2.6 5.2 5.2l-4.4 4.4-3.2-3.2 2.4-6.4Z" />
      <path d="m9.3 11.5-4 4 3.2.7.7 3.2 4-4" />
      <path d="m14.8 7.3 1.9 1.9" />
    </svg>
  );
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

export default function SystemMap({ offers }: SystemMapProps) {
  const scope = useRef<HTMLElement | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = journeySteps[activeIndex];

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      if (reduceMotion()) {
        setActiveIndex(journeySteps.length - 1);
        gsap.set(".orbit-copy-panel, .orbit-node, .orbit-energy-path", { autoAlpha: 1, clearProps: "transform,filter" });
        gsap.set(".orbit-energy-path", { strokeDashoffset: 0 });
        gsap.set(".orbit-progress__fill", { width: "100%" });
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pin = root.querySelector<HTMLElement>(".system-orbit-pin");
        if (!pin) return undefined;

        const setActiveStep = (progress: number) => {
          const nextIndex = Math.min(journeySteps.length - 1, Math.floor(progress * journeySteps.length));
          if (nextIndex !== activeIndexRef.current) {
            activeIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        };

        gsap.set(".orbit-copy-panel", { autoAlpha: 0, y: 22, filter: "blur(10px)" });
        gsap.set(".orbit-copy-panel--website", { autoAlpha: 1, y: 0, filter: "blur(0px)" });
        gsap.set(".orbit-node", { autoAlpha: 0.48 });
        gsap.set(".orbit-node__inner", { rotation: 0, scale: 0.78, transformOrigin: "50% 50%" });
        gsap.set(".orbit-node--website", { autoAlpha: 1 });
        gsap.set(".orbit-node--website .orbit-node__inner", { scale: 1.12 });
        gsap.set(".orbit-energy-path", { strokeDashoffset: 1 });
        gsap.set(".orbit-progress__fill", { width: "0%" });
        gsap.set(".orbit-core", { scale: 0.9, autoAlpha: 0.7 });

        // Pinned orbit timeline: the viewport freezes, then scroll scrub rotates the node system like a solar system.
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: pin,
            pin,
            start: "top top",
            end: "+=540%",
            scrub: 0.85,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActiveStep(self.progress),
          },
        });

        tl.to(".orbit-progress__fill", { width: "100%", duration: 5 }, 0);
        tl.to(".orbit-core", { scale: 1.08, autoAlpha: 1, duration: 0.5, ease: "power2.out" }, 0);
        tl.to(".orbit-energy-path", { strokeDashoffset: 0, duration: 4.8, stagger: 0.06 }, 0.1);

        journeySteps.forEach((step, index) => {
          const previous = journeySteps[index - 1];
          const rotation = -step.angle;
          const stageAt = index === 0 ? 0 : index - 0.28;

          tl.to(".orbit-map", { rotation, duration: 0.74, ease: "power2.inOut" }, stageAt);
          tl.to(".orbit-node__inner", { rotation: -rotation, duration: 0.74, ease: "power2.inOut" }, stageAt);
          tl.to(`.orbit-node--${step.id}`, { autoAlpha: 1, duration: 0.42, ease: "power2.out" }, stageAt + 0.06);
          tl.to(`.orbit-node--${step.id} .orbit-node__inner`, { scale: 1.12, duration: 0.42, ease: "power2.out" }, stageAt + 0.06);
          tl.to(`.orbit-node:not(.orbit-node--${step.id})`, { autoAlpha: 0.52, duration: 0.34, ease: "power2.out" }, stageAt + 0.06);
          tl.to(`.orbit-node:not(.orbit-node--${step.id}) .orbit-node__inner`, { scale: 0.78, duration: 0.34, ease: "power2.out" }, stageAt + 0.06);
          tl.fromTo(`.orbit-node--${step.id} .orbit-node-pulse`, { scale: 0.8, opacity: 0.65 }, { scale: 2.25, opacity: 0, duration: 0.62, ease: "power2.out" }, stageAt + 0.1);

          if (previous) {
            tl.to(`.orbit-copy-panel--${previous.id}`, { autoAlpha: 0, y: -18, filter: "blur(8px)", duration: 0.2, ease: "power2.out" }, stageAt - 0.04);
            tl.to(`.orbit-copy-panel--${step.id}`, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.3, ease: "power2.out" }, stageAt + 0.04);
          }
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        setActiveIndex(0);
        gsap.set(".orbit-copy-panel, .orbit-node, .orbit-node__inner, .orbit-energy-path, .orbit-map", { clearProps: "all" });
        return undefined;
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section ref={scope} className="system-journey section-shell" aria-labelledby="then-expand-title">
      <div className="system-static-intro mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="system-static-intro__panel">
          <div className="system-static-intro__copy">
            <p className="brand-eyebrow">THEN EXPAND</p>
            <h2 id="then-expand-title" className="font-display mt-4 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl lg:text-5xl">
              The same builder can handle what comes after the website.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 lg:text-lg">
              Once the front door is stable, the work can move into custom apps, automations, AI workflows, integrations, dashboards, portals, and launch engineering.
            </p>
          </div>

          <div className="system-static-intro__offers" aria-label="Then Expand service categories">
            {offers.map((offer, index) => (
              <article key={offer.name} className="system-category-card">
                <span className="system-category-card__icon"><CategoryIcon index={index} /></span>
                <div>
                  <h3>{offer.name}</h3>
                  <p>{offer.tag}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="system-orbit-pin" aria-label="Pinned scroll animation showing the system expanding from website to CRM, automation, AI workflows, and dashboards">
        <div className="system-orbit-bg brand-grid" aria-hidden="true" />
        <div className="system-orbit-matrix" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => <span key={index}>0101<br />SYS<br />FLOW<br />CRM<br />AI</span>)}
        </div>

        <div className="orbit-status-bar" aria-hidden="true">
          <span>ACTIVE NODE: {activeNodeLabel(activeStep.id)}</span>
          <b>{activeStep.shortLabel}</b>
        </div>

        <div className="orbit-copy-stack" aria-live="polite">
          {journeySteps.map((step, index) => (
            <article key={step.id} className={`orbit-copy-panel orbit-copy-panel--${step.id} ${index === activeIndex ? "is-active" : ""}`}>
              <p className="code-label">{step.label}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <span>{step.tag}</span>
            </article>
          ))}
        </div>

        <div className="orbit-progress" aria-hidden="true">
          <span className="orbit-progress__fill" />
          {journeySteps.map((step, index) => (
            <i key={step.id} className={index <= activeIndex ? "is-complete" : ""}>{step.number}</i>
          ))}
        </div>

        <div className="orbit-visual" aria-hidden="true">
          <svg className="orbit-energy" viewBox="0 0 1200 760">
            <defs>
              <filter id="orbitBlueGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <ellipse cx="744" cy="382" rx="345" ry="178" className="orbit-ring-svg" />
            <ellipse cx="744" cy="382" rx="460" ry="270" className="orbit-ring-svg orbit-ring-svg--outer" />
            <path className="orbit-energy-path" pathLength="1" d="M744 382 C910 280 1074 345 1088 382 C1050 450 910 480 744 382" />
            <path className="orbit-energy-path" pathLength="1" d="M744 382 C690 170 482 144 398 252 C330 380 430 522 744 382" />
            <path className="orbit-energy-path" pathLength="1" d="M744 382 C630 590 884 674 1054 526 C1138 438 1024 344 744 382" />
          </svg>

          <div className="orbit-core">
            <span>Hazzlee Labs</span>
            <b>connected operating system</b>
          </div>

          <div className="orbit-map">
            {journeySteps.map((step, index) => {
              const style = {
                "--angle": `${step.angle}deg`,
                "--angle-negative": `${-step.angle}deg`,
              } as CSSProperties;

              return (
                <article key={step.id} style={style} className={`orbit-node orbit-node--${step.id} ${index <= activeIndex ? "is-online" : ""} ${index === activeIndex ? "is-active" : ""}`}>
                  <div className="orbit-node__inner">
                    <span className="orbit-node-pulse" />
                    <div className="orbit-node-label"><b>{step.number}</b><span>{step.title}</span></div>
                    <NodeInterface id={step.id} />
                    <em>{step.metric}</em>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="system-mobile-sequence mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10" aria-label="Then Expand mobile sequence">
        {journeySteps.map((step) => (
          <article key={step.id} className="system-mobile-step">
            <p className="code-label">{step.label}</p>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
            <span>{step.tag}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
