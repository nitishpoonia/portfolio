"use client";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SKILL_ICONS } from "@/lib/icons";
import { useTabKeys } from "./useTabKeys";

export default function StackTabs({ skills: SKILLS }) {
  const [tab, setTab] = useState(0);
  const calm = useReducedMotion();
  const keys = useTabKeys(SKILLS.length, tab, setTab);
  return (
    <div>
      <div role="tablist" aria-label="Skill groups" className="tab-row">
        {SKILLS.map((s, i) => {
          const Icon = SKILL_ICONS[s.label];
          return (
          <button key={s.label} ref={keys.ref(i)} role="tab" id={`tab-${i}`} aria-selected={tab === i} aria-controls="tab-panel"
            tabIndex={tab === i ? 0 : -1} onKeyDown={keys.onKeyDown}
            className={`tab-pill${tab === i ? " is-on" : ""}`} onClick={() => setTab(i)}>
            {tab === i && (
              <motion.span layoutId="stack-tab-pill" className="tab-pill-bg" aria-hidden="true"
                transition={calm ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.5 }} />
            )}
            {Icon && <Icon size={16} strokeWidth={1.9} aria-hidden="true" />}
            {s.label}
          </button>
          );
        })}
      </div>
      <div role="tabpanel" id="tab-panel" aria-labelledby={`tab-${tab}`} className="chip-row tab-swap" key={tab}>
        {SKILLS[tab].items.map((it, i) => (
          <span key={it} className="chip" style={{ "--i": i }}>{it}</span>
        ))}
      </div>
    </div>
  );
}
