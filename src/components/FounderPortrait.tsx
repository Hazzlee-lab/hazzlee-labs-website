"use client";

import { useState } from "react";

export default function FounderPortrait() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <button
      type="button"
      className={`founder-portrait ${isRevealed ? "is-revealed" : ""}`}
      aria-pressed={isRevealed}
      aria-label="Reveal portrait of Andrew Hazzlee"
      onClick={() => setIsRevealed((current) => !current)}
    >
      <div aria-hidden="true" className="founder-portrait__real" />
      <div aria-hidden="true" className="founder-portrait__code" />
      <div aria-hidden="true" className="founder-portrait__wipe" />
    </button>
  );
}
