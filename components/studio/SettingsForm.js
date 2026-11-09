"use client";
import { useState } from "react";
import { glass, input, btn, label } from "./ui";

const TYPES = { email: { type: "email", autoComplete: "email" }, whatsapp: { type: "tel", inputMode: "numeric" } };

export default function SettingsForm({ initial }) {
  const [v, setV] = useState(initial);
  const [msg, setMsg] = useState("");
  const [saved, setSaved] = useState(() => JSON.stringify(initial));
  const dirty = JSON.stringify(v) !== saved;
  async function save(e) {
    e.preventDefault();
    setMsg("Saving…");
    const res = await fetch("/api/studio/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: "contact", value: v }),
    });
    if (res.ok) { setSaved(JSON.stringify(v)); setMsg("Saved. The site now shows these details."); }
    else setMsg((await res.json()).error || "Failed");
  }
  const f = (k, l, hint) => (
    <div>
      <label htmlFor={k} className={label}>{l}</label>
      <input id={k} {...TYPES[k]} className={input} placeholder={hint} value={v[k] ?? ""} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
    </div>
  );
  return (
    <form onSubmit={save} className={`${glass} flex flex-col gap-4 p-6`}>
      <div>
        <h2 className="text-lg font-semibold">Contact details</h2>
        <p className="mt-1 text-sm text-[#55555A]">Used by the email and WhatsApp buttons across the site.</p>
      </div>
      {f("email", "Email")}
      {f("whatsapp", "WhatsApp number", "919521337968 (country code, no +)")}
      {f("whatsappMessage", "WhatsApp pre-filled message")}
      <div className="flex items-center gap-3">
        <button className={btn} disabled={!dirty}>Save</button>
        <span role="status" className="text-sm text-[#55555A]">{dirty ? "Unsaved changes" : msg}</span>
      </div>
    </form>
  );
}
