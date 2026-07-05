import { ImageResponse } from "next/og";

import { PROFILE } from "@/lib/seo";

export const runtime = "edge";

export const alt = "Somyaranjan Sethy AI Frontend Engineer portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #080811 0%, #111827 46%, #0f766e 100%)",
        color: "#f8fafc",
        padding: "72px",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-140px",
          top: "-100px",
          width: "460px",
          height: "460px",
          borderRadius: "460px",
          background: "rgba(59, 130, 246, 0.28)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "160px",
          bottom: "-180px",
          width: "520px",
          height: "520px",
          borderRadius: "520px",
          background: "rgba(16, 185, 129, 0.22)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div
          style={{
            display: "flex",
            width: "fit-content",
            border: "1px solid rgba(248, 250, 252, 0.28)",
            borderRadius: "999px",
            padding: "12px 20px",
            fontSize: "24px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#bae6fd",
          }}
        >
          AI Frontend Engineer
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "820px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "88px",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
          >
            {PROFILE.name}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: "34px",
              lineHeight: 1.25,
              color: "#dbeafe",
            }}
          >
            React, Next.js and TypeScript systems with measurable business impact.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "18px",
          fontSize: "24px",
          color: "#ecfeff",
        }}
      >
        <span>65% performance gains</span>
        <span>Enterprise IAM</span>
        <span>SaaS and e-commerce</span>
      </div>
    </div>,
    size,
  );
}
