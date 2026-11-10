"use client";
import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "tiptap-markdown";
import {
  Heading2, Heading3, Bold, Italic, Strikethrough, Code, List, ListOrdered, Quote,
  SquareCode, Link2, ImagePlus, Minus, Undo2, Redo2, Type,
} from "lucide-react";
import { uploadImage, altFromName } from "./upload";

function Btn({ on, active, children, label, disabled }) {
  return (
    <button type="button" aria-label={label} title={label} aria-pressed={active === undefined ? undefined : !!active}
      onClick={on} disabled={disabled}
      className={`inline-flex min-h-[40px] min-w-[40px] items-center justify-center rounded-full px-2.5 text-sm disabled:opacity-30 ${active ? "bg-[#0A0A0A] text-white" : "hover:bg-black/10"}`}>
      {children}
    </button>
  );
}

// Languages offered for code blocks; the live page highlights by this name.
const LANGS = [["", "Plain text"], ["js", "JavaScript"], ["jsx", "JSX"], ["ts", "TypeScript"], ["tsx", "TSX"], ["bash", "Shell"], ["json", "JSON"], ["python", "Python"], ["sql", "SQL"], ["css", "CSS"], ["html", "HTML"], ["diff", "Diff"], ["yaml", "YAML"], ["swift", "Swift"], ["kotlin", "Kotlin"], ["java", "Java"]];

const Sep = () => <span aria-hidden="true" className="mx-0.5 my-2 w-px bg-black/10" />;
const I = { size: 17, strokeWidth: 1.9, "aria-hidden": true };

// The editor reads and writes Markdown, so the public pages keep rendering
// the saved text with next-mdx-remote exactly as before.
// Images can be added with the button, pasted, or dropped in; they're resized
// and uploaded to /media.
export default function RichEditor({ value, onChange }) {
  const fileRef = useRef(null);
  const [uploading, setUploading] = useState(0);
  const [err, setErr] = useState("");
  // Inline editor for a link URL or image alt text: { kind: "link" | "alt", value }
  const [pop, setPop] = useState(null);
  const editorRef = useRef(null);

  async function insertFiles(files, pos) {
    const images = [...files].filter((f) => f.type.startsWith("image/"));
    if (!images.length) return false;
    setErr("");
    for (const file of images) {
      setUploading((n) => n + 1);
      try {
        const src = await uploadImage(file);
        const ed = editorRef.current;
        // Insert after the current selection rather than replacing it, so a
        // just-inserted (and still selected) image isn't overwritten.
        const at = pos ?? ed.state.selection.to;
        ed.chain().focus().insertContentAt(at, { type: "image", attrs: { src, alt: altFromName(file.name) } }).run();
        pos = null;
      } catch (e) {
        setErr(`${file.name}: ${e.message}`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
    return true;
  }

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Start writing… paste or drop images anywhere." }),
      Markdown.configure({ html: false, transformPastedText: true }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "prose-studio min-h-[420px] rounded-[22px] border border-black/15 bg-white/70 px-5 py-4 outline-none focus:border-black",
        "aria-label": "Content",
      },
      handlePaste: (_view, event) => {
        const files = event.clipboardData?.files;
        if (files?.length && [...files].some((f) => f.type.startsWith("image/"))) {
          insertFiles(files);
          return true;
        }
        return false;
      },
      handleDrop: (view, event, _slice, moved) => {
        const files = event.dataTransfer?.files;
        if (moved || !files?.length) return false;
        const at = view.posAtCoords({ left: event.clientX, top: event.clientY });
        if (![...files].some((f) => f.type.startsWith("image/"))) return false;
        event.preventDefault();
        insertFiles(files, at?.pos);
        return true;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.storage.markdown.getMarkdown()),
  });
  editorRef.current = editor;

  // Follow outside changes to `value` (e.g. restoring unsaved work), without
  // fighting the user's own typing, which already matches.
  useEffect(() => {
    if (editor && value !== editor.storage.markdown.getMarkdown()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return null;

  const c = () => editor.chain().focus();
  const imageSelected = editor.isActive("image");

  return (
    <div>
      <div className="sticky top-[72px] z-[5] mb-2 flex overflow-x-auto rounded-[24px] [scrollbar-width:none] md:flex-wrap [&>*]:shrink-0 border border-white/90 bg-white/80 p-1 backdrop-blur-xl" role="toolbar" aria-label="Formatting">
        <Btn label="Undo (Ctrl+Z)" on={() => c().undo().run()} disabled={!editor.can().undo()}><Undo2 {...I} /></Btn>
        <Btn label="Redo (Ctrl+Shift+Z)" on={() => c().redo().run()} disabled={!editor.can().redo()}><Redo2 {...I} /></Btn>
        <Sep />
        <Btn label="Paragraph" active={editor.isActive("paragraph")} on={() => c().setParagraph().run()}><Type {...I} /></Btn>
        <Btn label="Heading 2" active={editor.isActive("heading", { level: 2 })} on={() => c().toggleHeading({ level: 2 }).run()}><Heading2 {...I} /></Btn>
        <Btn label="Heading 3" active={editor.isActive("heading", { level: 3 })} on={() => c().toggleHeading({ level: 3 }).run()}><Heading3 {...I} /></Btn>
        <Sep />
        <Btn label="Bold (Ctrl+B)" active={editor.isActive("bold")} on={() => c().toggleBold().run()}><Bold {...I} /></Btn>
        <Btn label="Italic (Ctrl+I)" active={editor.isActive("italic")} on={() => c().toggleItalic().run()}><Italic {...I} /></Btn>
        <Btn label="Strikethrough" active={editor.isActive("strike")} on={() => c().toggleStrike().run()}><Strikethrough {...I} /></Btn>
        <Btn label="Inline code" active={editor.isActive("code")} on={() => c().toggleCode().run()}><Code {...I} /></Btn>
        <Sep />
        <Btn label="Bullet list" active={editor.isActive("bulletList")} on={() => c().toggleBulletList().run()}><List {...I} /></Btn>
        <Btn label="Numbered list" active={editor.isActive("orderedList")} on={() => c().toggleOrderedList().run()}><ListOrdered {...I} /></Btn>
        <Btn label="Quote" active={editor.isActive("blockquote")} on={() => c().toggleBlockquote().run()}><Quote {...I} /></Btn>
        <Btn label="Code block" active={editor.isActive("codeBlock")} on={() => c().toggleCodeBlock().run()}><SquareCode {...I} /></Btn>
        {editor.isActive("codeBlock") && (
          <select aria-label="Code language" value={editor.getAttributes("codeBlock").language || ""}
            onChange={(e) => c().updateAttributes("codeBlock", { language: e.target.value || null }).run()}
            className="my-1 min-h-[36px] rounded-full border border-black/15 bg-white/70 px-3 text-sm">
            {!LANGS.some(([v]) => v === (editor.getAttributes("codeBlock").language || "")) && (
              <option value={editor.getAttributes("codeBlock").language}>{editor.getAttributes("codeBlock").language}</option>
            )}
            {LANGS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        )}
        <Sep />
        <Btn label="Link" active={editor.isActive("link")} on={() => {
          setPop({ kind: "link", value: editor.getAttributes("link").href || "" });
        }}><Link2 {...I} /></Btn>
        <Btn label="Upload image" on={() => fileRef.current?.click()} disabled={uploading > 0}><ImagePlus {...I} /></Btn>
        {imageSelected && (
          <Btn label="Edit image alt text" on={() => {
            setPop({ kind: "alt", value: editor.getAttributes("image").alt || "" });
          }}><span className="text-xs font-medium">Alt</span></Btn>
        )}
        <Btn label="Divider" on={() => c().setHorizontalRule().run()}><Minus {...I} /></Btn>
        <span role="status" className="flex items-center px-2 text-xs text-[#55555A]">
          {uploading > 0 ? `Uploading ${uploading} image${uploading > 1 ? "s" : ""}…` : ""}
        </span>
      </div>
      {pop && (
        <form
          className="mb-2 flex flex-wrap items-center gap-2 rounded-[22px] border border-black/15 bg-white/90 p-2"
          onSubmit={(e) => {
            e.preventDefault();
            const v = pop.value.trim();
            if (pop.kind === "link") {
              const href = v && !/^(https?:|mailto:|\/|#)/.test(v) ? `https://${v}` : v;
              href ? c().extendMarkRange("link").setLink({ href }).run() : c().extendMarkRange("link").unsetLink().run();
            } else {
              c().updateAttributes("image", { alt: v }).run();
            }
            setPop(null);
          }}
          onKeyDown={(e) => { if (e.key === "Escape") { setPop(null); editor.commands.focus(); } }}
        >
          <label htmlFor="pop-input" className="px-2 text-sm text-[#55555A]">{pop.kind === "link" ? "Link" : "Alt text"}</label>
          <input id="pop-input" autoFocus value={pop.value} onChange={(e) => setPop({ ...pop, value: e.target.value })}
            placeholder={pop.kind === "link" ? "https://… (empty removes the link)" : "Describe the image for screen readers"}
            className="min-h-[40px] min-w-[200px] flex-1 rounded-full border border-black/15 bg-white px-4 text-[15px] outline-none focus:border-black" />
          <button className="min-h-[40px] rounded-full bg-[#0A0A0A] px-4 text-sm font-medium text-white">Apply</button>
          {pop.kind === "link" && editor.isActive("link") && (
            <button type="button" className="min-h-[40px] rounded-full px-3 text-sm hover:bg-black/5"
              onClick={() => { c().extendMarkRange("link").unsetLink().run(); setPop(null); }}>Remove link</button>
          )}
          <button type="button" className="min-h-[40px] rounded-full px-3 text-sm hover:bg-black/5"
            onClick={() => { setPop(null); editor.commands.focus(); }}>Cancel</button>
        </form>
      )}
      {err && <p role="alert" className="mb-2 px-2 text-sm text-red-700">{err}</p>}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" multiple hidden
        onChange={(e) => { insertFiles(e.target.files); e.target.value = ""; }} />
      <EditorContent editor={editor} />
    </div>
  );
}
