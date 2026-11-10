import { readFile } from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";

// Shared look for every share card (the 1200x630 image WhatsApp, LinkedIn and X
// show for a link): black, Geist, eyebrow line, big title, name + domain at the foot.
export const OG_SIZE = { width: 1200, height: 630 };

const font = (file) => readFile(path.join(process.cwd(), "assets/fonts", file));

export async function shareCard({ eyebrow, title, subtitle, footer = "Nitish Poonia" }) {
  const [regular, semibold] = await Promise.all([font("Geist-Regular.ttf"), font("Geist-SemiBold.ttf")]);
  const long = title.length > 60;
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
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#B9B9BE" }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: "#F2F2F2" }} />
          {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: subtitle ? 96 : long ? 64 : 84, fontWeight: 600, letterSpacing: -2.5, lineHeight: 1.05, maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle && <div style={{ display: "flex", fontSize: 40, color: "#CFCFD3", lineHeight: 1.3, maxWidth: 900 }}>{subtitle}</div>}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#9A9AA0" }}>
          <span>{footer}</span>
          <span>nitishpoonia.in</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
      ],
    }
  );
}
