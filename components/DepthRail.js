"use client";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

const STRATA = [
  { label: "Surface", depth: "0 cm" },
  { label: "Loam", depth: "20 cm" },
  { label: "Clay", depth: "45 cm" },
  { label: "Humus", depth: "70 cm" },
  { label: "Subsoil", depth: "95 cm" },
];

/**
 * Fixed strata spine down the left edge — the signature element.
 * Fills as the visitor descends and reads out the current depth.
 * Drives only transform / color (never layout). Decorative + informational,
 * so it is aria-hidden and never traps focus.
 */
export default function DepthRail() {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const [trackH, setTrackH] = useState(0);
  const [pct, setPct] = useState(0);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setTrackH(trackRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.round(v * 100);
    setPct((prev) => (prev === next ? prev : next));
  });

  // Bands 0–1 (surface, loam) are light → the rail needs dark ink.
  // From clay down the ground is dark → the rail needs cream.
  const onDark = pct >= 28;
  const railInk = onDark ? "#ede7d8" : "#2a231a";
  const railMid = onDark ? "rgba(237, 231, 216, 0.6)" : "rgba(42, 35, 26, 0.55)";
  const railTrack = onDark ? "rgba(237, 231, 216, 0.22)" : "rgba(42, 35, 26, 0.18)";
  const railHalo = onDark ? "#120d08" : "#efe9d8";

  // Fill grows top→down; colour darkens like descending earth.
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const fillColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["#cabf9c", "#7a6a48", "#4c4130", "#1c160f", "#120d08"]
  );
  const markerY = useTransform(scrollYProgress, [0, 1], [0, trackH]);

  const activeIndex = Math.min(
    STRATA.length - 1,
    Math.floor((pct / 100) * STRATA.length)
  );

  return (
    <aside
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "84px",
        zIndex: 40,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="depth-rail"
    >
      <div
        style={{
          position: "relative",
          height: "62vh",
          display: "flex",
          alignItems: "stretch",
          gap: "14px",
        }}
      >
        {/* Track + fill */}
        <div
          ref={trackRef}
          style={{
            position: "relative",
            width: "3px",
            borderRadius: "var(--r-pill)",
            background: railTrack,
            overflow: "visible",
            transition: "background var(--t-med) var(--ease-soft)",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "var(--r-pill)",
              background: reduce ? "#7a6a48" : fillColor,
              transformOrigin: "top",
              scaleY: reduce ? 0.001 : fillScale,
            }}
          />
          {/* Head marker */}
          {!reduce && (
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                x: "-50%",
                y: markerY,
                width: "11px",
                height: "11px",
                marginTop: "-5.5px",
                borderRadius: "var(--r-pill)",
                background: "var(--accent-lite)",
                boxShadow: `0 0 0 4px ${railHalo}`,
              }}
            />
          )}
        </div>

        {/* Strata labels */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
        >
          {STRATA.map((s, i) => (
            <div
              key={s.label}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.58rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                lineHeight: 1.1,
                color: i === activeIndex ? railInk : railMid,
                opacity: i === activeIndex ? 1 : 0.7,
                fontWeight: i === activeIndex ? 700 : 400,
                transition: "color var(--t-med) var(--ease-soft), opacity var(--t-med) var(--ease-soft), font-weight var(--t-med)",
              }}
            >
              {s.label}
            </div>
          ))}
        </div>
      </div>

      {/* Depth readout */}
      <div
        style={{
          position: "absolute",
          bottom: "18px",
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: "var(--mono)",
          fontSize: "0.56rem",
          letterSpacing: "0.1em",
          color: railMid,
          transition: "color var(--t-med) var(--ease-soft)",
        }}
      >
        {String(pct).padStart(2, "0")}%
      </div>

      <style>{`
        @media (max-width: 1080px) {
          .depth-rail { display: none !important; }
        }
      `}</style>
    </aside>
  );
}
