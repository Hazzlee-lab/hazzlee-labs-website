"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import BrandLogo from "./BrandLogo";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Orbit slot layout, indexed by a card's integer position relative to the active
// card: 0 = centered, then the four corners. Offsets are multiples of the
// horizontal (H) and vertical (V) radii computed at runtime.
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

  // Stable per-card base styles (initial/no-JS state with card 0 centered). GSAP
  // owns these transforms after mount, so keeping the refs stable prevents React
  // re-renders from fighting the scrubbed values.
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

      if (reduceMotion()) {
        setActiveIndex(0);
        const pin = root.querySelector<HTMLElement>(".system-orbit-pin");
        if (pin) pin.style.setProperty("--scroll-progress", "1");
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const pin = root.querySelector<HTMLElement>(".system-orbit-pin");
        if (!pin) return undefined;

        const cards = gsap.utils.toArray<HTMLElement>(".orbit-card", root);
        const total = journeySteps.length;

        // Translate raw scroll progress into a continuous, scrubbed scene: the
        // active card dwells at center while its mockup "plays", then the orbit
        // smoothly rotates the next card into the center near the step boundary.
        const setActiveStep = (progress: number) => {
          const clamped = Math.max(0, Math.min(0.99999, progress));
          pin.style.setProperty("--scroll-progress", clamped.toFixed(5));

          const activeFloat = clamped * total;
          const index = Math.min(total - 1, Math.floor(activeFloat));
          const frac = clamp01(activeFloat - index);
          const isLast = index >= total - 1;

          pin.style.setProperty("--step-frac", frac.toFixed(5));
          pin.style.setProperty("--pulse-enabled", isLast ? "0" : "1");

          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index;
            setActiveIndex(index);
          }

          // Position progress dwells near 0 for most of the step, then ramps so
          // the swap happens in the last third of the scroll for that step.
          const ramp = smoothstep(clamp01((frac - 0.6) / 0.4));
          const activeFloatPos = Math.min(index + ramp, total - 1);

          const rem = 16;
          const H = Math.min(Math.max(17 * rem, 0.27 * window.innerWidth), 29 * rem);
          const V = Math.min(Math.max(8 * rem, 0.16 * window.innerHeight), 13 * rem);

          cards.forEach((card, i) => {
            const relCont = (((i - activeFloatPos) % total) + total) % total;
            const i0 = Math.floor(relCont) % total;
            const i1 = (i0 + 1) % total;
            const t = relCont - Math.floor(relCont);
            const a = ORBIT_SLOTS[i0];
            const b = ORBIT_SLOTS[i1];
            const x = lerp(a.mx, b.mx, t) * H;
            const y = lerp(a.my, b.my, t) * V;
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
          trigger: pin,
          pin,
          start: "top top",
          end: "+=560%",
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActiveStep(self.progress),
          onRefresh: (self) => setActiveStep(self.progress),
        });

        setActiveStep(st.progress);

        return () => st.kill();
      });

      mm.add("(max-width: 1023px)", () => {
        setActiveIndex(0);
        return undefined;
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <section
      id="systems"
      ref={scope}
      data-section-label="Systems"
      className="system-journey section-shell"
      aria-labelledby="then-expand-title"
    >
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

      <div className="sr-only">
        <h2>System expansion journey</h2>
        {journeySteps.map((step) => (
          <article key={step.id}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
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
