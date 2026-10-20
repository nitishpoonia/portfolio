"use client";
import { useState } from "react";
import { SKILLS } from "@/lib/story";

export default function StackTabs() {
  const [tab, setTab] = useState(0);
  return (
    <div>
      <div role="tablist" aria-label="Skill groups" className="tab-row">
        {SKILLS.map((s, i) => (
          <button key={s.label} role="tab" id={`tab-${i}`} aria-selected={tab === i} aria-controls="tab-panel"
            className={`tab-pill${tab === i ? " is-on" : ""}`} onClick={() => setTab(i)}>
            {s.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="tab-panel" aria-labelledby={`tab-${tab}`} className="chip-row">
        {SKILLS[tab].items.map((it) => (
          <span key={it} className="chip">{it}</span>
        ))}
      </div>
    </div>
  );
}
