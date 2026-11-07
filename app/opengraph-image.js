import { ImageResponse } from "next/og";

// Link-preview card for WhatsApp, LinkedIn, X etc. Edit the text here.
export const alt = "Nitish Poonia, software developer building mobile, web and AI products";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0A0A0A",
          color: "#F2F2F2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#B9B9BE" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#F2F2F2" }} />
          Open to full-time roles
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>Nitish Poonia</div>
          <div style={{ fontSize: 40, color: "#CFCFD3", lineHeight: 1.3, maxWidth: 900 }}>
            Software developer building mobile, web and AI products
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9A9AA0" }}>
          <span>Mobile · Web · AI</span>
          <span>nitishpoonia.in</span>
        </div>
      </div>
    ),
    size
  );
}
