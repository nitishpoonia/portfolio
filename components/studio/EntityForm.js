"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import readingTime from "reading-time";
import { Eye, ExternalLink, Trash2 } from "lucide-react";
import RichEditor from "./RichEditor";
import { ago } from "./time";
import { slugify } from "@/lib/format";
import { glass, input, area, btn, btnGhost, label } from "./ui";
import ImageField from "./ImageField";


// Fields that are sent to the API (everything else in `data` is display-only)
const pick = (d, names) => Object.fromEntries([...names, "content", "published"].map((k) => [k, d[k] ?? ""]));

// One form for posts and projects. `fields` describes the inputs above the editor.
// Safety: warns before leaving with unsaved changes, Ctrl/Cmd+S saves, and a
// copy of unsaved work is kept in this browser so a crash or closed tab can be recovered.
export default function EntityForm({ kind, apiBase, backHref, publicPath, fields, initial, id }) {
  const router = useRouter();
  const names = useMemo(() => fields.map((f) => f.name), [fields]);
  const [data, setData] = useState(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(pick(initial, names)));
  const [savedAt, setSavedAt] = useState(initial.updated_at || null);
  const [state, setState] = useState({ busy: false, msg: "", err: "" });
  const [backup, setBackup] = useState(null);
  const [, tick] = useState(0);
  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const backupKey = `studio-draft:${kind}:${id || "new"}`;
  const current = JSON.stringify(pick(data, names));
  const dirty = current !== saved;
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;

  // Offer to restore unsaved work left in this browser
  useEffect(() => {
    try {
      const b = JSON.parse(localStorage.getItem(backupKey) || "null");
      if (b && JSON.stringify(pick(b.data, names)) !== JSON.stringify(pick(initial, names))) setBackup(b);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep a local copy of unsaved work (debounced)
  useEffect(() => {
    if (!dirty || backup) return;
    const t = setTimeout(() => {
      try { localStorage.setItem(backupKey, JSON.stringify({ data, at: Date.now() })); } catch {}
    }, 800);
    return () => clearTimeout(t);
  }, [current, dirty, backup, backupKey, data]);

  // Warn before closing the tab or following a link with unsaved changes
  useEffect(() => {
    const onUnload = (e) => { if (dirtyRef.current) { e.preventDefault(); e.returnValue = ""; } };
    const onClick = (e) => {
      const a = e.target.closest?.("a[href]");
      if (!a || a.target === "_blank" || !dirtyRef.current) return;
      if (!window.confirm("You have unsaved changes. Leave without saving?")) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", onUnload);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
      document.removeEventListener("click", onClick, true);
    };
  }, []);

  // Refresh the "saved x min ago" label
  useEffect(() => {
    const t = setInterval(() => tick((n) => n + 1), 30000);
    return () => clearInterval(t);
  }, []);

  const save = useCallback(async (publish) => {
    setState({ busy: true, msg: "", err: "" });
    const body = { ...data, published: publish ?? data.published };
    const res = await fetch(id ? `${apiBase}/${id}` : apiBase, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return setState({ busy: false, msg: "", err: json.error || "Save failed" });
    const next = { ...body, slug: json.slug || body.slug };
    setData(next);
    setSaved(JSON.stringify(pick(next, names)));
    setSavedAt(new Date().toISOString());
    try { localStorage.removeItem(backupKey); } catch {}
    setState({ busy: false, err: "", msg: next.published ? "Saved and live" : "Draft saved" });
    if (!id) {
      dirtyRef.current = false;
      router.replace(`${backHref}/${json.id}`);
    }
    router.refresh();
  }, [data, id, apiBase, names, backupKey, backHref, router]);

  // Ctrl/Cmd+S saves, keeping the current live/draft state
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!state.busy) save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [save, state.busy]);

  async function preview() {
    const win = window.open("about:blank", "_blank"); // open now so the popup isn't blocked
    const res = await fetch("/api/studio/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, data }),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok && win) win.location.href = json.url;
    else {
      win?.close();
      setState((s) => ({ ...s, err: json.error || "Preview failed" }));
    }
  }

  async function remove() {
    if (!window.confirm(`Delete this ${kind}? This cannot be undone.`)) return;
    const res = await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    if (res.ok) {
      dirtyRef.current = false;
      try { localStorage.removeItem(backupKey); } catch {}
      router.replace(backHref);
      router.refresh();
    } else setState({ busy: false, msg: "", err: "Delete failed" });
  }

  const stats = readingTime(data.content || "");
  const url = `nitishpoonia.in${publicPath}/${slugify(data.slug || data.title) || "…"}`;
  const status = state.err || (state.busy ? "Saving…" : dirty ? "Unsaved changes" : state.msg || (savedAt ? `Saved ${ago(savedAt)}` : ""));

  return (
    <div className="flex flex-col gap-5">
      {backup && (
        <div role="alert" className={`${glass} flex flex-wrap items-center gap-3 p-4`}>
          <p className="min-w-[200px] flex-1 text-sm">You have unsaved changes from {ago(backup.at)} in this browser.</p>
          <button className={btn} onClick={() => { setData({ ...initial, ...pick(backup.data, names) }); setBackup(null); }}>Restore</button>
          <button className={btnGhost} onClick={() => { try { localStorage.removeItem(backupKey); } catch {} setBackup(null); }}>Discard</button>
        </div>
      )}

      <div className={`${glass} grid gap-4 p-5 sm:grid-cols-2`}>
        {fields.map((f) => {
          const v = data[f.name] ?? "";
          return (
            <div key={f.name} className={f.wide ? "sm:col-span-2" : ""}>
              {f.type !== "checkbox" && <label htmlFor={f.name} className={label}>{f.label}</label>}
              {f.type === "checkbox" ? (
                <label htmlFor={f.name} className="flex min-h-[44px] cursor-pointer items-center gap-3 px-1 text-[15px]">
                  <input id={f.name} type="checkbox" className="h-5 w-5 accent-[#0A0A0A]" checked={Boolean(data[f.name])}
                    onChange={(e) => set(f.name, e.target.checked)} />
                  {f.label}
                </label>
              ) : f.type === "image" ? (
                <ImageField id={f.name} value={v} onChange={(url) => set(f.name, url)} />
              ) : f.type === "textarea" ? (
                <textarea id={f.name} rows={f.rows || 3} className={area} placeholder={f.hint} value={v}
                  aria-describedby={f.help ? `${f.name}-help` : undefined}
                  onChange={(e) => set(f.name, e.target.value)} />
              ) : f.options ? (
                <select id={f.name} className={input} value={v} onChange={(e) => set(f.name, e.target.value)}>
                  {f.options.map((o) => <option key={o} value={o}>{o || "None"}</option>)}
                </select>
              ) : (
                <input id={f.name} type={f.type || "text"} className={input} placeholder={f.hint} value={v}
                  aria-describedby={f.counter || f.name === "slug" ? `${f.name}-help` : undefined}
                  onChange={(e) => set(f.name, e.target.value)} />
              )}
              {f.help && <p id={`${f.name}-help`} className="mt-1 px-1 text-xs text-[#55555A]">{f.help}</p>}
              {f.name === "slug" && <p id="slug-help" className="mt-1 truncate px-1 text-xs text-[#55555A]">{url}</p>}
              {f.counter && (
                <p id={`${f.name}-help`} className={`mt-1 px-1 text-xs ${v.length >= f.counter[0] && v.length <= f.counter[1] ? "text-[#55555A]" : "text-amber-700"}`}>
                  {v.length} characters · aim for {f.counter[0]}–{f.counter[1]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className={`${glass} p-5`}>
        <div className="mb-2 flex items-baseline justify-between px-1">
          <span className={label}>Content</span>
          <span className="text-xs text-[#55555A]">{stats.words.toLocaleString("en-IN")} words · {stats.text}</span>
        </div>
        <RichEditor value={data.content} onChange={(v) => set("content", v)} />
      </div>

      <div className="sticky bottom-3 z-10 flex items-center gap-2 overflow-x-auto rounded-[28px] [scrollbar-width:none] md:flex-wrap [&>*]:shrink-0 border border-white/90 bg-white/80 p-2 shadow-lg backdrop-blur-xl">
        <button className={btn} disabled={state.busy} onClick={() => save(true)}>{data.published ? "Update live" : "Publish"}</button>
        <button className={btnGhost} disabled={state.busy} onClick={() => save(false)}>{data.published ? "Unpublish" : "Save draft"}</button>
        <button className={`${btnGhost} gap-1.5`} onClick={preview}><Eye size={16} aria-hidden="true" />Preview</button>
        {data.published && id && (
          <a className={`${btnGhost} gap-1.5`} href={`${publicPath}/${data.slug}`} target="_blank" rel="noreferrer">
            <ExternalLink size={16} aria-hidden="true" />View live
          </a>
        )}
        <span role="status" aria-live="polite" className={`whitespace-nowrap px-2 text-sm ${state.err ? "text-red-700" : dirty ? "text-amber-700" : "text-[#55555A]"}`}>
          {status}
        </span>
        <span className="hidden px-1 text-xs text-[#9a9aa0] md:inline">Ctrl/⌘+S to save</span>
        {id && (
          <button className="ml-auto inline-flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-sm text-red-700 hover:bg-red-50" onClick={remove}>
            <Trash2 size={16} aria-hidden="true" />Delete
          </button>
        )}
      </div>
    </div>
  );
}
