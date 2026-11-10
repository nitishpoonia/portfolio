"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { glass, input, area, btn, btnGhost, label } from "./ui";

// Studio → Site content. Each card saves one site_settings key through
// /api/studio/settings; "Use default" deletes it so lib/story.js applies again.
function useSaver(key) {
  const router = useRouter();
  const [msg, setMsg] = useState({ text: "", err: false });
  async function save(value) {
    setMsg({ text: "Saving…", err: false });
    const res = await fetch("/api/studio/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    const json = await res.json().catch(() => ({}));
    setMsg(res.ok ? { text: "Saved. Live on the site now.", err: false } : { text: json.error || "Save failed", err: true });
    if (res.ok) router.refresh();
    return res.ok ? json.value : null;
  }
  async function reset() {
    if (!window.confirm("Go back to the version in the code (lib/story.js)? Your saved changes here are removed.")) return;
    const res = await fetch(`/api/studio/settings?key=${key}`, { method: "DELETE" });
    setMsg(res.ok ? { text: "Back to the default.", err: false } : { text: "Reset failed", err: true });
    if (res.ok) window.location.reload();
  }
  return { save, reset, msg };
}

function Card({ title, hint, children, onSave, saver, custom }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className={`${glass} flex flex-col gap-4 p-6`}>
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {hint && <p className="mt-1 text-sm text-[#55555A]">{hint}</p>}
      </div>
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <button className={btn}>Save</button>
        {custom && <button type="button" className={btnGhost} onClick={saver.reset}>Use default</button>}
        <span role="status" className={`text-sm ${saver.msg.err ? "text-red-700" : "text-[#55555A]"}`}>{saver.msg.text}</span>
      </div>
    </form>
  );
}

const Field = ({ id, text, children }) => (
  <div>
    <label htmlFor={id} className={label}>{text}</label>
    {children}
  </div>
);

export function AvailabilityForm({ initial, custom }) {
  const [v, setV] = useState(initial);
  const saver = useSaver("availability");
  return (
    <Card title="Availability" hint="The pill at the top of the home and hire pages, and the line on the link-preview card."
      onSave={() => saver.save(v)} saver={saver} custom={custom}>
      <label className="flex min-h-[44px] cursor-pointer items-center gap-3 px-1 text-[15px]">
        <input type="checkbox" className="h-5 w-5 accent-[#0A0A0A]" checked={v.open} onChange={(e) => setV({ ...v, open: e.target.checked })} />
        Show that I’m open to roles
      </label>
      <Field id="av-label" text="Pill text">
        <input id="av-label" className={input} value={v.label} onChange={(e) => setV({ ...v, label: e.target.value })} />
      </Field>
    </Card>
  );
}

export function NowBuildingForm({ initial, custom }) {
  const [v, setV] = useState({ ...initial, points: (initial.points || []).join("\n"), tags: (initial.tags || []).join(", "), href: initial.href || "" });
  const saver = useSaver("now_building");
  const set = (k) => (e) => setV({ ...v, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  return (
    <Card title="Now building" hint="The dark card on the home page." onSave={() => saver.save(v)} saver={saver} custom={custom}>
      <Field id="nb-title" text="Title"><input id="nb-title" className={input} value={v.title} onChange={set("title")} /></Field>
      <Field id="nb-text" text="Description"><textarea id="nb-text" rows={4} className={area} value={v.text} onChange={set("text")} /></Field>
      <Field id="nb-points" text="Points (one per line)"><textarea id="nb-points" rows={4} className={area} value={v.points} onChange={set("points")} /></Field>
      <Field id="nb-tags" text="Tags (comma separated)"><input id="nb-tags" className={input} value={v.tags} onChange={set("tags")} /></Field>
      <Field id="nb-href" text="Link to the code or demo (shows a “View the code” button)">
        <input id="nb-href" className={input} placeholder="https://github.com/…" value={v.href} onChange={set("href")} />
      </Field>
      <label className="flex min-h-[44px] cursor-pointer items-center gap-3 px-1 text-[15px]">
        <input type="checkbox" className="h-5 w-5 accent-[#0A0A0A]" checked={Boolean(v.diagram)} onChange={set("diagram")} />
        Show the health-claims flow diagram (turn off if this card is about something else)
      </label>
    </Card>
  );
}

// Chapters and skill groups are nested lists, so they're edited as JSON with a check on save.
export function JsonForm({ settingKey, title, hint, initial, custom }) {
  const [textValue, setText] = useState(JSON.stringify(initial, null, 2));
  const [parseErr, setParseErr] = useState("");
  const saver = useSaver(settingKey);
  async function onSave() {
    let value;
    try {
      value = JSON.parse(textValue);
      setParseErr("");
    } catch (e) {
      setParseErr(`Not valid JSON: ${e.message}`);
      return;
    }
    const clean = await saver.save(value);
    if (clean) setText(JSON.stringify(clean, null, 2));
  }
  return (
    <Card title={title} hint={hint} onSave={onSave} saver={saver} custom={custom}>
      <textarea aria-label={title} rows={16} spellCheck={false} className={`${area} text-[13px] leading-relaxed`}
        style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
        value={textValue} onChange={(e) => setText(e.target.value)} />
      {parseErr && <p role="alert" className="px-1 text-sm text-red-700">{parseErr}</p>}
    </Card>
  );
}
