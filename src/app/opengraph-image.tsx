import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050a14",
          color: "white",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <div
            style={{
              color: "#93c5fd",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              maxWidth: 900,
              fontSize: 76,
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: "-0.055em",
            }}
          >
            Software. Automation. Engineering.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(147, 197, 253, 0.32)",
            paddingTop: "28px",
            color: "#cbd5e1",
            fontSize: 28,
          }}
        >
          <span>Practical systems for business outcomes.</span>
          <span style={{ color: "#18e0ff", fontWeight: 700 }}>hazzleelabs.com</span>
        </div>
      </div>
    ),
    size,
  );
}
