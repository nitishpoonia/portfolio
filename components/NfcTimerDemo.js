"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const START = 2 * 3600 + 14 * 60 + 8; // a shift already ~2h14m in
const WIND = 2 * 3600; // "+2 hours"

function fmt(totalSeconds) {
  const s = Math.max(0, Math.floor(totalSeconds));
  const hh = String(Math.floor(s / 3600)).padStart(2, "0");
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function NfcTimerDemo() {
  const reduce = useReducedMotion();

  // The true shift duration — ticks forward one second per second.
  const [real, setReal] = useState(START);
  // Manipulation applied to the phone's system clock (persists across reboot).
  const [deviceOffset, setDeviceOffset] = useState(0);
  // The boot-anchored timer's state after a reboot wipes time-since-boot.
  const [phase, setPhase] = useState("idle"); // "idle" | "resyncing"
  const [flash, setFlash] = useState(false);

  const resyncTimer = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setReal((r) => r + 1), 1000);
    return () => {
      clearInterval(id);
      if (resyncTimer.current) clearTimeout(resyncTimer.current);
    };
  }, []);

  const tampered = deviceOffset > 0;

  const windClock = () => {
    setDeviceOffset((o) => o + WIND);
    setFlash(true);
    setTimeout(() => setFlash(false), 650);
  };

  const reboot = () => {
    setPhase("resyncing");
    if (resyncTimer.current) clearTimeout(resyncTimer.current);
    // Anchor is gone; the app re-fetches server time + last scan and rebuilds.
    resyncTimer.current = setTimeout(() => setPhase("idle"), 1700);
  };

  const reset = () => {
    if (resyncTimer.current) clearTimeout(resyncTimer.current);
    setDeviceOffset(0);
    setPhase("idle");
    setReal(START);
  };

  let caption;
  if (phase === "resyncing") {
    caption =
      "Reboot wiped time-since-boot. The anchored timer lost its reference and is re-fetching the server's time and the last scan…";
  } else if (tampered) {
    caption =
      "The system clock jumped forward two hours. The device-clock timer paid out time that was never worked — the anchored timer never moved.";
  } else if (real > START + 5 && deviceOffset === 0) {
    caption =
      "Back on the truth. The anchored timer rebuilt the shift from the server, ignoring the tampered system clock.";
  } else {
    caption = "A shift in progress. Both timers agree — for now. Try winding the phone's clock.";
  }

  return (
    <div className="nfc-demo" aria-label="Interactive demonstration of the clock-anchoring engineering">
      <div className="nfc-demo-head">
        <span className="nfc-demo-eyebrow">Interactive · try it</span>
        <h4 className="nfc-demo-title">The clock that can&apos;t be gamed</h4>
        <p className="nfc-demo-sub">
          Two timers for the same shift. One trusts the phone&apos;s clock; the other is
          anchored to server time plus time-since-boot. Change the clock and watch them
          disagree.
        </p>
      </div>

      <div className="nfc-cards">
        {/* Device-clock timer */}
        <div className={`nfc-card ${tampered ? "is-bad" : ""}`}>
          <div className="nfc-card-top">
            <span className="nfc-card-label">Device clock</span>
            <span className={`nfc-chip ${tampered ? "chip-bad" : "chip-neutral"}`}>
              {tampered ? "Tampered" : "Live"}
            </span>
          </div>
          <motion.div
            className="nfc-readout"
            animate={
              flash && !reduce ? { scale: [1, 1.06, 1] } : {}
            }
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ color: tampered ? "#b4472e" : "var(--sec-ink)" }}
          >
            {fmt(real + deviceOffset)}
          </motion.div>
          <span className="nfc-card-foot">reads the phone&apos;s OS clock</span>
        </div>

        {/* Boot-anchored timer */}
        <div className="nfc-card is-anchored">
          <div className="nfc-card-top">
            <span className="nfc-card-label">Boot-anchored</span>
            <span className="nfc-chip chip-good">
              {phase === "resyncing" ? "Re-syncing" : "Verified"}
            </span>
          </div>
          <div className="nfc-readout" style={{ color: "var(--sec-ink)" }}>
            {phase === "resyncing" ? (
              <span className="nfc-resync">
                <span className="nfc-dots" aria-hidden="true">
                  <i /> <i /> <i />
                </span>
                server…
              </span>
            ) : (
              <motion.span
                key="time"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {fmt(real)}
              </motion.span>
            )}
          </div>
          <span className="nfc-card-foot">server time + time-since-boot</span>
        </div>
      </div>

      <p className="nfc-caption" aria-live="polite">
        {caption}
      </p>

      <div className="nfc-controls">
        <button type="button" onClick={windClock} className="nfc-btn">
          Wind phone clock +2h
        </button>
        <button type="button" onClick={reboot} className="nfc-btn">
          Reboot phone
        </button>
        <button type="button" onClick={reset} className="nfc-btn nfc-btn-ghost">
          Reset
        </button>
      </div>

      <style>{`
        .nfc-demo {
          margin: 2.75rem 0;
          padding: clamp(1.4rem, 3vw, 2.25rem);
          background: var(--sec-card, rgba(255,255,255,0.45));
          border: 1px solid var(--sec-line, rgba(42,35,26,0.14));
          border-radius: var(--r-xl);
          box-shadow: var(--sec-shadow, 0 2px 22px rgba(76,65,48,0.10));
        }
        .nfc-demo-eyebrow {
          font-family: var(--mono);
          font-size: 0.64rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-deep);
        }
        .nfc-demo-title {
          font-family: var(--display);
          font-size: clamp(1.3rem, 2.4vw, 1.8rem);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--sec-ink);
          margin: 0.5rem 0 0.6rem;
        }
        .nfc-demo-sub {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--sec-mid);
          max-width: 56ch;
          margin: 0 0 1.6rem;
        }
        .nfc-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .nfc-card {
          padding: 1.25rem 1.35rem;
          border-radius: var(--r-lg);
          border: 1px solid var(--sec-line, rgba(42,35,26,0.14));
          background: rgba(255,255,255,0.4);
          transition: border-color var(--t-med) var(--ease-soft), background var(--t-med) var(--ease-soft);
        }
        .nfc-card.is-bad { border-color: rgba(180,71,46,0.5); background: rgba(180,71,46,0.05); }
        .nfc-card.is-anchored { border-color: rgba(62,84,73,0.35); }
        .nfc-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
          min-height: 1.6rem;
        }
        .nfc-card-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--sec-ink);
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .nfc-chip {
          font-family: var(--mono);
          font-size: 0.56rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.28rem 0.55rem;
          border-radius: var(--r-pill);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .chip-neutral { background: rgba(42,35,26,0.08); color: var(--sec-mid); }
        .chip-bad { background: rgba(180,71,46,0.14); color: #b4472e; }
        .chip-good { background: rgba(62,84,73,0.14); color: var(--accent-deep); }
        .nfc-readout {
          font-family: var(--mono);
          font-size: clamp(1.7rem, 4.4vw, 2.4rem);
          font-weight: 700;
          letter-spacing: 0.01em;
          font-variant-numeric: tabular-nums;
          line-height: 1;
          margin-bottom: 0.7rem;
          min-height: 1em;
        }
        .nfc-card-foot {
          display: block;
          font-family: var(--mono);
          font-size: 0.62rem;
          letter-spacing: 0.03em;
          line-height: 1.4;
          color: var(--sec-mid);
        }
        .nfc-resync {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--accent-deep);
          letter-spacing: 0;
        }
        .nfc-dots { display: inline-flex; gap: 3px; }
        .nfc-dots i {
          width: 6px; height: 6px; border-radius: 999px;
          background: var(--accent-deep); display: inline-block;
          animation: nfcpulse 1s ease-in-out infinite;
        }
        .nfc-dots i:nth-child(2) { animation-delay: 0.15s; }
        .nfc-dots i:nth-child(3) { animation-delay: 0.3s; }
        @keyframes nfcpulse { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
        .nfc-caption {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--sec-mid);
          margin: 1.4rem 0;
          min-height: 2.9em;
          max-width: 60ch;
        }
        .nfc-controls { display: flex; flex-wrap: wrap; gap: 0.7rem; }
        .nfc-btn {
          font-family: var(--font);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: #f4efe2;
          background: var(--accent-deep);
          border: 1px solid var(--accent-deep);
          border-radius: var(--r-pill);
          padding: 0.6rem 1.2rem;
          cursor: pointer;
          transition: transform var(--t-fast) var(--ease-soft), box-shadow var(--t-fast) var(--ease-soft), opacity var(--t-fast);
        }
        .nfc-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(62,84,73,0.26); }
        .nfc-btn:active { transform: translateY(0); }
        .nfc-btn-ghost {
          color: var(--sec-mid);
          background: transparent;
          border-color: var(--sec-line, rgba(42,35,26,0.2));
        }
        .nfc-btn-ghost:hover { color: var(--sec-ink); box-shadow: none; }
        @media (max-width: 560px) {
          .nfc-cards { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .nfc-btn:hover { transform: none; }
          .nfc-dots i { animation: none; opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
