export default function FounderPortrait() {
  return (
    <div
      className="founder-portrait"
      role="img"
      tabIndex={0}
      aria-label="Portrait of Andrew Hazzlee revealed through a code-rendered version"
    >
      <div aria-hidden="true" className="founder-portrait__real" />
      <div aria-hidden="true" className="founder-portrait__code" />
      <div aria-hidden="true" className="founder-portrait__wipe" />
    </div>
  );
}
