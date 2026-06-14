import { journeySteps, type StudioOffer } from "@/lib/system-map-data";
import DesktopSystemOrbit from "./DesktopSystemOrbit";

type SystemMapProps = {
  offers: StudioOffer[];
};

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

export default function SystemMap({ offers }: SystemMapProps) {
  return (
    <section
      id="systems"
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

      <DesktopSystemOrbit />

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
