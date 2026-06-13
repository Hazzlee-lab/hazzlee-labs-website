"use client";

import { useRef, useState } from "react";
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

const nodes = [
  { id: "website", label: "Website front door", x: 95, y: 155 },
  { id: "crm", label: "CRM", x: 265, y: 80 },
  { id: "automation", label: "Automation", x: 425, y: 155 },
  { id: "ai", label: "AI workflows", x: 275, y: 245 },
  { id: "dashboard", label: "Dashboards", x: 510, y: 255 },
];

const paths = [
  "M110 155 C160 105 205 85 250 82",
  "M280 88 C340 100 375 125 410 150",
  "M110 165 C170 225 220 245 260 245",
  "M292 242 C345 220 385 190 416 164",
  "M435 168 C485 188 510 220 510 242",
  "M290 252 C360 285 435 290 500 262",
];

function reduceMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function SystemMap({ offers }: SystemMapProps) {
  const scope = useRef<HTMLElement | null>(null);
  const [activeNode, setActiveNode] = useState("website");

  useGSAP(
    () => {
      if (reduceMotion()) return;

      gsap.fromTo(
        ".system-path",
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 72%",
          },
        },
      );

      gsap.fromTo(
        ".system-node",
        { scale: 0.72, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          stagger: 0.06,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: scope.current,
            start: "top 72%",
          },
        },
      );
    },
    { scope },
  );

  return (
    <section ref={scope} className="section-shell mx-auto max-w-7xl px-6 pb-24 sm:px-8 lg:px-10">
      <div className="system-map-panel motion-reveal rounded-[2rem] border border-[rgba(37,99,235,0.18)] bg-[rgba(5,13,26,0.58)] p-6 sm:p-8">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="brand-eyebrow">Then expand</p>
            <h3 className="font-display mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              The same builder can handle what comes after the website.
            </h3>
            <p className="mt-4 leading-7 text-slate-300">
              Once the front door is stable, the work can move into custom apps, automations, AI workflows, integrations, dashboards, portals, and launch engineering.
            </p>
            <div className="mt-7 grid gap-3">
              {offers.map((offer) => (
                <article key={offer.name} className="motion-card rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-[rgba(37,99,235,0.42)] hover:bg-white/[0.055]">
                  <p className="text-sm font-semibold text-[var(--brand-blue-soft)]">{offer.tag}</p>
                  <h4 className="font-display mt-2 text-xl font-semibold text-white">{offer.name}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{offer.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#050d1a] p-4 sm:min-h-[26rem] sm:p-6">
            <div className="brand-grid absolute inset-0 opacity-45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(37,99,235,0.16),transparent_22rem)]" />
            <svg className="relative z-10 hidden h-full min-h-[22rem] w-full sm:block" viewBox="0 0 600 340" role="img" aria-label="System expansion map">
              <defs>
                <filter id="blueGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {paths.map((path) => (
                <path
                  key={path}
                  className="system-path"
                  d={path}
                  pathLength="1"
                  fill="none"
                  stroke="rgba(37,99,235,0.72)"
                  strokeWidth="1.6"
                  strokeDasharray="1"
                  filter="url(#blueGlow)"
                />
              ))}
              {nodes.map((node) => (
                <g key={node.id} className="system-node cursor-pointer" onMouseEnter={() => setActiveNode(node.id)}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={activeNode === node.id ? 18 : 14}
                    fill={activeNode === node.id ? "rgba(37,99,235,0.42)" : "rgba(5,13,26,0.9)"}
                    stroke="rgba(147,197,253,0.85)"
                    strokeWidth="1.4"
                  />
                  <circle cx={node.x} cy={node.y} r="4" fill="#2563eb" />
                  <text x={node.x} y={node.y + 36} textAnchor="middle" fill="rgba(226,232,240,0.86)" fontSize="11" fontFamily="Courier New, monospace">
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
            <div className="relative z-10 grid gap-3 sm:hidden">
              {nodes.map((node, index) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setActiveNode(node.id)}
                  className={`mobile-node ${activeNode === node.id ? "is-active" : ""}`}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {node.label}
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute bottom-5 left-5 hidden rounded-full border border-[rgba(37,99,235,0.28)] bg-[#050d1a]/80 px-3 py-1 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue-300 sm:block">
              active node: {activeNode}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
