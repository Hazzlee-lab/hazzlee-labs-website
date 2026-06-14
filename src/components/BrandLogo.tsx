type BrandLogoVariant = "icon" | "lockup" | "full" | "wordmark";

type BrandLogoProps = {
  variant?: BrandLogoVariant;
  className?: string;
  title?: string;
  decorative?: boolean;
};

const layouts: Record<BrandLogoVariant, string> = {
  icon: "260 0 540 455",
  lockup: "0 0 1053.58 600",
  full: "0 0 1053.58 666.05",
  wordmark: "0 524 1058 74",
};

export default function BrandLogo({
  variant = "lockup",
  className,
  title = "Hazzlee Labs",
  decorative = false,
}: BrandLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={layouts[variant]}
      className={className}
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": title })}
    >
      {!decorative ? <title>{title}</title> : null}
      <image href="/hazzlee-labs-primary.svg" width="1053.58" height="666.05" />
    </svg>
  );
}

function BrandHeaderWordmark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 680 150"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient
          id="hl-header-gradient"
          x1="908.92"
          y1="590.43"
          x2="1066.33"
          y2="521.91"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#005dfb" />
          <stop offset=".03" stopColor="#0083fc" />
          <stop offset=".4" stopColor="#00b4ff" />
          <stop offset=".49" stopColor="#0091fe" />
          <stop offset=".58" stopColor="#0078fe" />
          <stop offset=".6" stopColor="#007dfd" />
          <stop offset=".83" stopColor="#00b6fd" />
          <stop offset=".94" stopColor="#00cdfd" />
        </linearGradient>
        <linearGradient
          id="hl-header-gradient-2"
          x1="819.07"
          y1="602.8"
          x2="890.97"
          y2="547.28"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#015fff" />
          <stop offset=".16" stopColor="#0065fe" />
          <stop offset=".38" stopColor="#0078fe" />
          <stop offset=".65" stopColor="#0097fd" />
          <stop offset=".95" stopColor="#00c2fc" />
          <stop offset="1" stopColor="#00cbfc" />
        </linearGradient>
        <linearGradient
          id="hl-header-gradient-3"
          x1="736.77"
          y1="579.69"
          x2="818.1"
          y2="540.95"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#005dfc" />
          <stop offset=".21" stopColor="#007afc" />
          <stop offset=".56" stopColor="#00a5fc" />
          <stop offset=".84" stopColor="#00c0fc" />
          <stop offset="1" stopColor="#01cafc" />
        </linearGradient>
        <linearGradient
          id="hl-header-gradient-4"
          x1="104.62"
          y1="560.58"
          x2="173.31"
          y2="560.58"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#016cfe" />
          <stop offset="1" stopColor="#00cbfc" />
        </linearGradient>
      </defs>

      <g transform="translate(0, -529)">
        <g id="wordmark-hazzlee">
          <polygon
            points="62.82 591.24 52.84 591.21 52.82 564.92 10.02 564.93 9.97 591.18 .01 591.19 0 529.37 9.89 529.35 10.07 555.62 52.78 555.63 52.8 529.42 62.8 529.35 62.82 591.24"
            fill="#fff"
          />
          <path
            d="M161.71,591.33l-22.76-47.16-23.12,46.61c-3.66.05-7.07.06-11.21.04l30.36-60.84c2.34-.03,5.51-.14,7.82-.15l30.51,61.31-11.6.2Z"
            fill="url(#hl-header-gradient-4)"
          />
          <polygon
            points="478.56 582.09 478.69 591.33 424.06 591.33 424.29 529.26 433.81 529.28 433.87 582.03 478.56 582.09"
            fill="#fff"
          />
          <polygon
            points="569.75 564.84 531.18 564.9 531.18 581.97 578.34 581.94 578.44 591.24 521.54 591.28 521.53 529.35 578.34 529.31 578.28 538.86 531.25 538.85 531.23 555.62 569.69 555.43 569.75 564.84"
            fill="#fff"
          />
          <polygon
            points="670.12 564.85 631.17 564.92 631.18 581.97 678.76 581.93 678.79 591.26 621.31 591.24 621.27 529.34 678.78 529.33 678.79 538.83 631.16 538.86 631.2 555.56 670.17 555.66 670.12 564.85"
            fill="#fff"
          />
          <path
            d="M378.71,591.25l-57.58.03.02-7.85,41.53-44.45-41.56-.19-.21-9.48,56.78.06-.23,8.22-41.66,44.31,42.83.19.07,9.15Z"
            fill="#fff"
          />
          <polygon
            points="275.54 591.53 218.13 591.55 218.29 583.57 259.57 539.21 218.13 539.09 218.01 529.62 274.76 529.6 274.88 537.36 232.71 582.09 275.57 582.36 275.54 591.53"
            fill="#fff"
          />
        </g>

        <g id="wordmark-labs" transform="translate(-752, 86)">
          <path
            d="M968.56,559.45c3.98,4.53,7.94,10.49,5.33,17.69-1.72,4.76-6.66,11.06-13.68,11.13l-41.62.43v-56.66s40.75.22,40.75.22c6.57.04,11.14,5.44,13.18,9.64,3.26,6.72-.27,12.74-3.96,17.55ZM958.26,555.65c4.38-.04,6.93-5.01,6.79-7.67-.22-3.91-3.29-6.88-7.54-6.9l-29.93-.16.02,15.01,30.66-.28ZM958.31,579.6c5.29-.03,7.97-4.74,7.47-8.76s-3.75-6.88-8.24-6.86l-29.82.09-.25,15.7,30.84-.18ZM1053.57,572.3c.26-8.57-5.46-15.62-14.41-15.85l-20.55-.53c-4.07-.11-7.19-2.79-7.67-6.4-.4-3.03,1.9-7.48,5.67-8.11,11.72-1.94,22.8-.59,34.94.82l-.17-8.73c-12.59-1.44-25.38-3.01-36.11-.55-8.43,1.93-13.86,9.14-13.31,16.81.53,7.38,6.53,14.07,14.85,14.27l19.65.48c4.99.12,8.49,2.63,8.52,7.37.02,3.42-4.96,7.77-8.74,8.25-8.22,1.04-15.42.9-30.94-2.09-1.16,2.34-2.24,5.54-3.11,7.95,7.77,2.2,13.31,2.37,20.31,2.78s12.6,0,17.11-1.19,13.73-7.44,13.96-15.28Z"
            fill="url(#hl-header-gradient)"
          />
          <path
            d="M875.03,575.14l-30.63-.19-6.47,13.3c-2.75.03-6.23,0-9.91-.02l27.78-55.64,8.29-.1,27.53,56.12-10.18.04-6.42-13.51ZM870.97,566.79l-11.14-22.54-10.87,22.72,22-.18Z"
            fill="url(#hl-header-gradient-2)"
          />
          <polygon
            points="801.7 579.52 801.75 588.64 752.88 588.66 752.85 532.13 761.9 532.14 761.87 579.61 801.7 579.52"
            fill="url(#hl-header-gradient-3)"
          />
        </g>
      </g>
    </svg>
  );
}

export function BrandHeaderLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 sm:gap-3.5 ${className ?? ""}`}>
      <BrandLogo variant="icon" decorative className="h-14 w-auto shrink-0 sm:h-16" />
      <BrandHeaderWordmark className="h-[2.2rem] w-auto sm:h-[2.35rem]" />
    </span>
  );
}

export function BrandLambdaMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <path
        d="M3.4 20.4 L12 3.6 L20.6 20.4"
        fill="none"
        stroke="#18e0ff"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BrandRingDivider({ className }: { className?: string }) {
  return (
    <div className={`brand-divider ${className ?? ""}`} aria-hidden>
      <span className="brand-divider__line" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 24"
        className="brand-divider__mark"
        aria-hidden
      >
        <circle
          cx="32"
          cy="12"
          r="7"
          fill="none"
          stroke="#2563eb"
          strokeWidth="1.6"
          strokeDasharray="30 14"
          strokeLinecap="round"
        />
        <circle cx="25" cy="12" r="2.4" fill="#016cfe" />
        <circle cx="39" cy="12" r="2.4" fill="#00cbfc" />
      </svg>
      <span className="brand-divider__line" />
    </div>
  );
}
