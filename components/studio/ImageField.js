"use client";
import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { uploadImage } from "./upload";
import { btnGhost } from "./ui";

// A single image (e.g. a project cover): upload, preview, remove. Value is its URL.
export default function ImageField({ id, value, onChange }) {
  const file = useRef(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  async function pick(e) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    setBusy(true);
    setErr("");
    try {
      onChange(await uploadImage(f));
    } catch (x) {
      setErr(x.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="h-20 w-36 rounded-2xl border border-black/10 object-cover" />
      ) : (
        <span className="flex h-20 w-36 items-center justify-center rounded-2xl border border-dashed border-black/20 text-xs text-[#55555A]">No image</span>
      )}
      <button id={id} type="button" className={`${btnGhost} gap-1.5`} disabled={busy} onClick={() => file.current?.click()}>
        <ImagePlus size={16} aria-hidden="true" />{busy ? "Uploading…" : value ? "Replace" : "Upload"}
      </button>
      {value && (
        <button type="button" className={`${btnGhost} gap-1.5`} onClick={() => onChange("")}>
          <X size={16} aria-hidden="true" />Remove
        </button>
      )}
      <input ref={file} type="file" accept="image/*" hidden onChange={pick} />
      {err && <p role="alert" className="w-full px-1 text-sm text-red-700">{err}</p>}
    </div>
  );
}
