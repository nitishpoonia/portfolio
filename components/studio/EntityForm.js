"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import readingTime from "reading-time";
import { Eye, ExternalLink, Trash2, ChevronDown, SlidersHorizontal } from "lucide-react";
import RichEditor from "./RichEditor";
import AutoTextarea from "./AutoTextarea";
import { ago } from "./time";
import { glass, input, area, btn, btnGhost, label, badge } from "./ui";

const slugify = (s) =>
  String(s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

// Fields that are sent to the API (everything else in `data` is display-only)
const pick = (d, names) => Object.fromEntries([...names, "content", "published"].map((k) => [k, d[k] ?? ""]));

// One editor for posts and projects.
// Layout: the writing column mirrors the live page (big title, lede, body);
// publishing and details live in a sticky sidebar on desktop, and in a
// collapsible panel + bottom bar on phones.
// Safety: warns before leaving with unsaved changes, Ctrl/Cmd+S saves, and a
// copy of unsaved work is kept in this browser so a crash or closed tab can be recovered.
export default function EntityForm({ kind, apiBase, backHref, publicPath, fields, initial, id }) {
  const router = useRouter();
  const names = useMemo(() => fields.map((f) => f.name), [fields]);
  const titleField = fields.find((f) => f.place === "title");
  const ledeField = fields.find((f) => f.place === "lede");
  const detailFields = fields.filter((f) => !f.place);

  const [data, setData] = useState(initial);
  const [saved, setSaved] = useState(() => JSON.stringify(pick(initial, names)));
  const [savedAt, setSavedAt] = useState(initial.updated_at || null);
  const [state, setState] = useState({ busy: false, msg: "", err: "" });
  const [backup, setBackup] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [, tick] = useState(0);
  const editorRef = useRef(null);
  const onEditorReady = useCallback((ed) => { editorRef.current = ed; }, []);
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

  // Tab title shows the post name, with a dot while there are unsaved changes
  useEffect(() => {
    const name = data.title?.trim() || `New ${kind}`;
    document.title = `${dirty ? "• " : ""}${name} · Studio`;
  }, [data.title, dirty, kind]);

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
    if (!res.ok) {
      if (/slug|title/i.test(json.error || "")) setDetailsOpen(true);
      return setState({ busy: false, msg: "", err: json.error || "Save failed" });
    }
    const wasLive = data.published;
    const next = { ...body, slug: json.slug || body.slug };
    setData(next);
    setSaved(JSON.stringify(pick(next, names)));
    setSavedAt(new Date().toISOString());
    try { localStorage.removeItem(backupKey); } catch {}
    const msg = next.published ? (wasLive ? "Live page updated" : "Published") : wasLive ? "Unpublished" : "Draft saved";
    setState({ busy: false, err: "", msg });
    if (!id) {
      dirtyRef.current = false;
      router.replace(`${backHref}/${json.id}`);
    }
    router.refresh();
  }, [data, id, apiBase, names, backupKey, backHref, router]);

  function unpublish() {
    if (window.confirm(`Take this ${kind} off the site? It stays here as a draft.`)) save(false);
  }

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
  const slug = slugify(data.slug || data.title);
  const url = `nitishpoonia.in${publicPath}/${slug || "…"}`;
  const live = Boolean(data.published);
  const status = state.err || (state.busy ? "Saving…" : dirty ? "Unsaved changes" : state.msg || (savedAt ? `Saved ${ago(savedAt)}` : "Not saved yet"));
  const statusTone = state.err ? "text-red-700" : dirty ? "text-amber-700" : "text-[#55555A]";
  const canPrimary = !state.busy && (!live || dirty || !id);
  const canSecondary = !state.busy && (live || dirty || !id);
  const primaryLabel = live ? "Update live page" : "Publish";
  const secondaryLabel = live ? "Unpublish" : "Save draft";
  const onSecondary = live ? unpublish : () => save(false);

  const counter = (f, v) => f.counter && (
    <p id={`${f.name}-help`} className={`mt-1 px-1 text-xs ${v.length >= f.counter[0] && v.length <= f.counter[1] ? "text-[#55555A]" : "text-amber-700"}`}>
      {v.length} characters · aim for {f.counter[0]}–{f.counter[1]}
    </p>
  );

  const renderField = (f) => {
    const v = data[f.name] ?? "";
    return (
      <div key={f.name}>
        <label htmlFor={f.name} className={label}>{f.label}</label>
        {f.options ? (
          <select id={f.name} className={input} value={v} onChange={(e) => set(f.name, e.target.value)}>
            {f.options.map((o) => <option key={o} value={o}>{o || "None"}</option>)}
          </select>
        ) : f.multiline ? (
          <AutoTextarea id={f.name} className={area} placeholder={f.hint} value={v} onChange={(e) => set(f.name, e.target.value)} />
        ) : (
          <input id={f.name} type={f.type || "text"} className={input} placeholder={f.hint} value={v}
            aria-describedby={f.name === "slug" ? "slug-help" : undefined}
            onChange={(e) => set(f.name, e.target.value)} />
        )}
        {f.name === "slug" && <p id="slug-help" className="mt-1 truncate px-1 text-xs text-[#55555A]" title={url}>{url}</p>}
        {f.help && <p className="mt-1 px-1 text-xs text-[#55555A]">{f.help}</p>}
      </div>
    );
  };

  const summary = [publicPath + "/" + (slug || "…"), ...detailFields.filter((f) => f.options && data[f.name]).map((f) => data[f.name])].join(" · ");

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
      {/* Writing column */}
      <div className="flex min-w-0 flex-col gap-4">
        {backup && (
          <div role="alert" className={`${glass} flex flex-wrap items-center gap-3 p-4`}>
            <p className="min-w-[200px] flex-1 text-sm">You have unsaved changes from {ago(backup.at)} in this browser.</p>
            <button className={btn} onClick={() => { setData({ ...initial, ...pick(backup.data, names) }); setBackup(null); }}>Restore</button>
            <button className={btnGhost} onClick={() => { try { localStorage.removeItem(backupKey); } catch {} setBackup(null); }}>Discard</button>
          </div>
        )}

        <article className={`${glass} px-5 pb-4 pt-5 md:px-10 md:pt-8`}>
          <div className="mb-4 flex items-center justify-between gap-3 text-xs text-[#55555A]">
            <span className={badge(live)}>{live ? "Live" : "Draft"}</span>
            <span>{stats.words.toLocaleString("en-IN")} words · {stats.text}</span>
          </div>

          <label htmlFor={titleField.name} className="sr-only">{titleField.label}</label>
          <AutoTextarea id={titleField.name} value={data[titleField.name] ?? ""} placeholder={titleField.hint || "Title"}
            className="bare-field w-full bg-transparent text-[30px] font-semibold leading-[1.15] tracking-[-0.03em] outline-none placeholder:text-[#b5b5ba] md:text-[40px]"
            onChange={(e) => set(titleField.name, e.target.value.replace(/\n/g, " "))}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const lede = ledeField && document.getElementById(ledeField.name);
                if (lede) lede.focus();
                else editorRef.current?.commands.focus("start");
              }
            }} />

          {ledeField && (
            <div className="mt-3">
              <label htmlFor={ledeField.name} className="sr-only">{ledeField.label}</label>
              <AutoTextarea id={ledeField.name} value={data[ledeField.name] ?? ""} placeholder={ledeField.hint}
                aria-describedby={`${ledeField.name}-help`}
                className="bare-field w-full bg-transparent text-[17px] leading-[1.55] text-[#3C3C41] outline-none placeholder:text-[#b5b5ba] md:text-[19px]"
                onChange={(e) => set(ledeField.name, e.target.value.replace(/\n/g, " "))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); editorRef.current?.commands.focus("start"); }
                }} />
              {counter(ledeField, data[ledeField.name] ?? "")}
            </div>
          )}

          <hr className="my-5 border-t border-black/10" />
          <RichEditor value={data.content} onChange={(v) => set("content", v)} onReady={onEditorReady} />
        </article>
      </div>

      {/* Sidebar (desktop) / panels (phone) */}
      <aside className="order-first flex flex-col gap-4 lg:sticky lg:top-[88px] lg:order-none">
        <section aria-label="Publish" className={`${glass} hidden flex-col gap-3 p-5 lg:flex`}>
          <div className="flex items-center justify-between gap-2">
            <span className={badge(live)}>{live ? "Live" : "Draft"}</span>
            <span role="status" aria-live="polite" className={`truncate text-sm ${statusTone}`}>{status}</span>
          </div>
          <button className={`${btn} w-full`} disabled={!canPrimary} onClick={() => save(true)}>{primaryLabel}</button>
          <div className="grid grid-cols-2 gap-2">
            <button className={`${btnGhost} !px-3`} disabled={!canSecondary} onClick={onSecondary}>{secondaryLabel}</button>
            <button className={`${btnGhost} !px-3`} onClick={preview}><Eye size={16} aria-hidden="true" />Preview</button>
          </div>
          {live && id && (
            <a className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full text-sm text-[#55555A] hover:text-[#0A0A0A]" href={`${publicPath}/${data.slug}`} target="_blank" rel="noreferrer">
              <ExternalLink size={15} aria-hidden="true" />View live page
            </a>
          )}
          <p className="text-center text-xs text-[#9a9aa0]">Ctrl/⌘ + S to save</p>
        </section>

        <section aria-label="Details" className={`${glass} p-5`}>
          <button type="button" aria-expanded={detailsOpen} aria-controls="details-body" onClick={() => setDetailsOpen((o) => !o)}
            className="-m-2 flex w-[calc(100%+1rem)] items-center gap-3 rounded-[20px] p-2 text-left lg:hidden">
            <SlidersHorizontal size={18} aria-hidden="true" className="shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">Details</span>
              <span className="block truncate text-xs text-[#55555A]">{summary}</span>
            </span>
            <ChevronDown size={18} aria-hidden="true" className={`shrink-0 transition-transform ${detailsOpen ? "rotate-180" : ""}`} />
          </button>
          <h2 className="mb-3 hidden text-sm font-medium lg:block">Details</h2>
          <div id="details-body" className={`${detailsOpen ? "mt-4 flex" : "hidden"} flex-col gap-4 lg:mt-0 lg:flex`}>
            {detailFields.map(renderField)}
            {id && (
              <button className="mt-1 inline-flex min-h-[40px] items-center gap-1.5 self-start rounded-full px-3 text-sm text-red-700 hover:bg-red-50" onClick={remove}>
                <Trash2 size={15} aria-hidden="true" />Delete {kind}
              </button>
            )}
          </div>
        </section>
      </aside>

      {/* Phone action bar */}
      <div className="sticky bottom-3 z-10 flex items-center gap-2 rounded-[28px] border border-white/90 bg-white/90 p-2 shadow-lg backdrop-blur-xl lg:hidden">
        <span role="status" aria-live="polite" className={`min-w-0 flex-1 truncate px-2 text-xs ${statusTone}`}>{status}</span>
        <button className={`${btnGhost} !min-w-[44px] !px-0`} onClick={preview} aria-label="Preview"><Eye size={17} aria-hidden="true" /></button>
        <button className={`${btnGhost} !px-4`} disabled={!canSecondary} onClick={onSecondary}>{live ? "Unpublish" : "Save"}</button>
        <button className={`${btn} !px-4`} disabled={!canPrimary} onClick={() => save(true)}>{live ? "Update" : "Publish"}</button>
      </div>
    </div>
  );
}
