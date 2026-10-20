"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RichEditor from "./RichEditor";
import { glass, input, btn, btnGhost, label } from "./ui";

// One form for posts and projects. `fields` describes the inputs above the editor.
export default function EntityForm({ kind, apiBase, backHref, publicPath, fields, initial, id }) {
  const router = useRouter();
  const [data, setData] = useState(initial);
  const [state, setState] = useState({ busy: false, msg: "", err: "" });
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  async function save(publish) {
    setState({ busy: true, msg: "", err: "" });
    const body = { ...data, published: publish ?? data.published };
    const res = await fetch(id ? `${apiBase}/${id}` : apiBase, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) return setState({ busy: false, msg: "", err: json.error || "Save failed" });
    setData(body);
    setState({ busy: false, err: "", msg: body.published ? "Saved and live" : "Draft saved" });
    if (!id) router.replace(`${backHref}/${json.id}`);
    router.refresh();
  }

  async function remove() {
    if (!window.confirm(`Delete this ${kind}? This cannot be undone.`)) return;
    const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.replace(backHref);
      router.refresh();
    } else setState({ busy: false, msg: "", err: "Delete failed" });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className={`${glass} grid gap-4 p-5 sm:grid-cols-2`}>
        {fields.map((f) => (
          <div key={f.name} className={f.wide ? "sm:col-span-2" : ""}>
            <label htmlFor={f.name} className={label}>{f.label}</label>
            {f.options ? (
              <select id={f.name} className={input} value={data[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)}>
                {f.options.map((o) => <option key={o} value={o}>{o || "None"}</option>)}
              </select>
            ) : (
              <input id={f.name} type={f.type || "text"} className={input} placeholder={f.hint} value={data[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} />
            )}
          </div>
        ))}
      </div>

      <div className={`${glass} p-5`}>
        <span className={label}>Content</span>
        <RichEditor value={data.content} onChange={(v) => set("content", v)} />
      </div>

      <div className="sticky bottom-3 z-10 flex flex-wrap items-center gap-2 rounded-full border border-white/90 bg-white/70 p-2 shadow-lg backdrop-blur-xl">
        <button className={btn} disabled={state.busy} onClick={() => save(true)}>{data.published ? "Update live" : "Publish"}</button>
        <button className={btnGhost} disabled={state.busy} onClick={() => save(false)}>{data.published ? "Unpublish" : "Save draft"}</button>
        {data.published && id && <a className={btnGhost} href={`${publicPath}/${data.slug}`} target="_blank" rel="noreferrer">View</a>}
        {id && <button className="ml-auto min-h-[44px] px-4 text-sm text-red-700" onClick={remove}>Delete</button>}
        <span role="status" className={`px-2 text-sm ${state.err ? "text-red-700" : "text-[#55555A]"}`}>{state.err || state.msg}</span>
      </div>
    </div>
  );
}
